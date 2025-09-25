"use client"
import { IoClose } from "react-icons/io5";
import PriceFilter from "./PriceFilter";
import { useSearchParams } from "next/navigation";
import AdStatusFilter from "./AdStatusFilter";
import { useFilter } from "../_context/FilterContext";

  const ActiveFilterForMobile = () => {
    const searchParams = useSearchParams();

    const activeCategory = searchParams?.get("category") || "";
    const activeSub1 = searchParams?.get("subCategory1") || "";
    const activeSub2 = searchParams?.get("subCategory2") || "";
  
    const { isExchangeOpen,maxPrice,minPrice,setIsExchangeOpen,setMaxPrice,setMinPrice,setStatus,status ,setIsFilterModalOpen} = useFilter();
  
    
    return (
      <div className="fixed w-full h-full">
        <div className="flex justify-between items-center mx-5 my-10">
            <span>فیلتر ها</span>
            <span><IoClose/></span>
        </div>
        <div className="flex justify-between items-center mx-5 my-10" 
        onClick={()=>setIsFilterModalOpen(true)}>
            <span>دسته ها</span>
            <span>{activeCategory ||
activeSub1||
activeSub2}</span>
        </div>
        <PriceFilter maxPrice={maxPrice} onMaxPrice={setMaxPrice} minPrice={minPrice} onMinPrice={setMinPrice} />
        <AdStatusFilter isExchangeOpen={isExchangeOpen} onIsExchangeOpen={setIsExchangeOpen} onStatus={setStatus} status={status}/>

      </div>
    );
  };
  export default ActiveFilterForMobile;