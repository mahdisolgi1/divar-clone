import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "./_context/UserContext";
import { Suspense } from "react";

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
    <html className="dark" lang="en">
      <body className="dark:bg-black bg-white"> 
      <UserProvider>
          <main className="mt-10 md:mt-28"> <Suspense fallback={<div>Loading...</div>}>
                {children}
                  </Suspense></main>
        </UserProvider>
      </body>
    </html>
  );
}
