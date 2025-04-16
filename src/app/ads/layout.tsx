"use client";

import Navbar from "../_components/Navbar";
import { UserProvider } from "../_context/UserContext";
import "../globals.css";

export default function AdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <UserProvider>
        <Navbar />
        <main className="mt-28 px-4">{children}</main>
      </UserProvider>
    </div>
  );
}