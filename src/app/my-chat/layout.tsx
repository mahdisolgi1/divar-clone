"use client";

import Navbar from "../_components/Navbar";
import { UserProvider } from "../_context/UserContext";
import "../globals.css";
import BottomNav from "../_components/BottomNav";
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <UserProvider>
        <Navbar />
        <main className="mt-10 lg:mt-28 w-full lg:w-auto lg:px-4">{children}</main>
        <BottomNav />
      </UserProvider>
      );
}