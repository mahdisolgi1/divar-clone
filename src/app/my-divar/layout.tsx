"use client";

import BottomNav from "../_components/BottomNav";
import Navbar from "../_components/Navbar";
import { UserProvider } from "../_context/UserContext";
import "../globals.css";

export default function MyDivarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en">
    <body className="dark:bg-black bg-white"> 
    <UserProvider>
        <Navbar />
        <main className="mt-28 px-4">{children}</main>
        <BottomNav />
      </UserProvider> 
      </body>
      </html>  );
}