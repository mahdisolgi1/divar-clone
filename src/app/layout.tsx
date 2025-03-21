import type { Metadata } from "next";
import "./globals.css";

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
        <main className=" mt-28">{children}</main>
      </body>
    </html>
  );
}
