import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/_components/Navbar";

export const metadata: Metadata = {
  title: "divar",
  description: "divar online marketplace",
  icons: {
    icon: [{ url: "/images/divar.svg", type: "image/svg" }],
    apple: [{ url: "/images/apple-touch-icon.png" }],
  },
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
