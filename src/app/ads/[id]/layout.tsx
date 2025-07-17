"use client";

import Navbar from "@/app/_components/Navbar";
import { UserProvider } from "@/app/_context/UserContext";
import "../../globals.css";

export default function AdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
        <div className="dark dark:bg-black bg-white">
    <UserProvider>
        <Navbar />
        <main className="mt-28 px-4">{children}</main>
      </UserProvider>
      </div>
      );
}