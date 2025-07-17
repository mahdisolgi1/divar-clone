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

const defaultContextValue: UserContextType = {
  user: null,
  signUp: async () => ({ error: "UserProvider not initialized" }),
  login: async () => ({ error: "UserProvider not initialized" }),
  logout: () => {}, 

};

const UserContext = createContext<UserContextType>(defaultContextValue);
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (typeof window !== 'undefined') {
          const savedSession = localStorage.getItem("supabaseSession");
          if (savedSession) {
            try {
              const session = JSON.parse(savedSession);
              setUser(session.user);
              if (supabase && supabase.auth) {
                supabase.auth.setSession(session.access_token);
              }
            } catch (error) {
              console.error("Error parsing saved session:", error);
              localStorage.removeItem("supabaseSession");
            }
          } else if (supabase && supabase.auth) {
            try {
              const {
                data: { session },
              } = await supabase.auth.getSession();
              if (session?.user) {
                setUser(session.user);
              }
            } catch (error) {
              console.error("Error getting session:", error);
            }
          }
        }
      } catch (error) {
        console.error("Error in fetchUser:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    if (supabase && supabase.auth) {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session?.user) {
            setUser(session.user);
            if (typeof window !== 'undefined') {
              localStorage.setItem("supabaseSession", JSON.stringify(session));
            }
          } else {
            setUser(null);
            if (typeof window !== 'undefined') {
              localStorage.removeItem("supabaseSession");
            }
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const signUp = async (email: string, password: string) => {
    if (!supabase || !supabase.auth) {
      return { error: "Supabase client not initialized" };
    }
    
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) return { error: error.message };

      const { error: loginError } = await login(email, password);
      if (loginError) return { error: loginError };

      return {};
    } catch (error) {
      console.error("Error in signUp:", error);
      return { error: "An unexpected error occurred" };
    }
  };

  const login = async (email: string, password: string) => {
    if (!supabase || !supabase.auth) {
      return { error: "Supabase client not initialized" };
    }
    
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { error: error.message };

      if (data?.session && typeof window !== 'undefined') {
        localStorage.setItem("supabaseSession", JSON.stringify(data.session));
      }
      return {};
    } catch (error) {
      console.error("Error in login:", error);
      return { error: "An unexpected error occurred" };
    }
  };

  const logout = async () => {
    if (supabase && supabase.auth) {
      try {
        await supabase.auth.signOut();
        setUser(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem("supabaseSession");
        }
      } catch (error) {
        console.error("Error in logout:", error);
      }
    }
  };
  if (isLoading) {
    return <>{children}</>;
  }

  return (
    <UserContext.Provider  value={{ user, signUp, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
