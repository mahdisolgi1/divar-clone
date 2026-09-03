"use client";

import Navbar from "../_components/Navbar";
import { UserProvider } from "../_context/UserContext";
// import "../globals.css";
import BottomNav from "../_components/BottomNav";
import { usePathname } from "next/navigation";
import { FilterProvider } from "../_context/FilterContext";
export default function AdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {  const pathname = usePathname();
  const isUsedInGallery = pathname === "/ads";

  
  return ( 
      //  <html  lang="en">
      <div className="dark:bg-black bg-white"> 

    <FilterProvider>
      <UserProvider>
        <Navbar isUsedInGallery={isUsedInGallery}/>
        <main className="mt-20 px-4">{children}</main>
     <BottomNav />
      
    
      </UserProvider>
    </FilterProvider>
    
      </div>
      //  </html>
  );
}