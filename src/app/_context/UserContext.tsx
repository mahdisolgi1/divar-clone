"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../_lib/supabase.js";

interface UserContextType {
  user: User | null;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const savedSession = localStorage.getItem("supabaseSession");
      if (savedSession) {
        const session = JSON.parse(savedSession);
        setUser(session.user);
        supabase.auth.setSession(session.access_token);
      } else {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
        }
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
          localStorage.setItem("supabaseSession", JSON.stringify(session));
        } else {
          setUser(null);
          localStorage.removeItem("supabaseSession");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };

    const { error: loginError } = await login(email, password);
    if (loginError) return { error: loginError };

    return {};
  };

  const login = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { error: error.message };

    if (data?.session) {
      localStorage.setItem("supabaseSession", JSON.stringify(data.session));
    }
    return {};
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem("supabaseSession");
  };

  return (
    <UserContext.Provider value={{ user, signUp, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
