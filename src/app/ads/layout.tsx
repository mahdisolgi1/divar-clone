import "../globals.css";
import Navbar from "@/app/_components/Navbar";

export default function AdsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="mt-28">{children}</main>
    </>
  );
}
