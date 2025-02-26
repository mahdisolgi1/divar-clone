import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/_components/Navbar";

export const metadata: Metadata = {
  title: "divar",
  description: "divar online marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className=" mt-28">{children}</main>
      </body>
    </html>
  );
}
