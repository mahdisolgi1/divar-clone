"use client";

import { UserProvider } from "@/app/_context/UserContext";
import "../../globals.css";

export default function AdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
        <div className="">
    <UserProvider>
        <main className="mt-28 px-4">{children}</main>
      </UserProvider>
      </div>
      );
}