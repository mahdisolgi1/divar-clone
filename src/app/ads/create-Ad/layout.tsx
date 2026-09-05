"use client";

import "../../globals.css";
import { UserProvider } from "@/app/_context/UserContext";

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <UserProvider>
        <main className="mt-28 px-4">{children}</main>
      </UserProvider>
    </div>
  );
}