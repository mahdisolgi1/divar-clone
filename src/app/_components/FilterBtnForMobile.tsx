"use client";

import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useFilter } from "../_context/FilterContext";
import AdStatusFilter from "./AdStatusFilter";
import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CategoryFilter";
import { IoMdArrowBack } from "react-icons/io";
import { motion } from "framer-motion";

const FilterBtnForMobile: React.FC = () => {


  const searchParams = useSearchParams();

  const activeCategory = searchParams?.get("category") || "";
  const activeSub1 = searchParams?.get("subCategory1") || "";
  const activeSub2 = searchParams?.get("subCategory2") || "";

  const hasActiveCategory = activeCategory || activeSub1 || activeSub2;
  const { isExchangeOpen,maxPrice,minPrice,setIsExchangeOpen,setMaxPrice,setMinPrice,setStatus,status ,isFilterModalOpen,setIsFilterModalOpen} = useFilter();

  if (!hasActiveCategory) return null;

  return (<>
    { hasActiveCategory && <div className="fixed dark:bg-dark-gray-50 bg-dark-gray lg:hidden top-12 right-5 flex justify-around gap-2 p-2 rounded-lg shadow-md">
      <button
        className="z-50 bg-[#a62626] text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
        onClick={() => setIsFilterModalOpen(true)}
      >
        فیلترها
      </button>
      
      <button
        className="z-50 bg-[#a62626] text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
        onClick={() => setIsFilterModalOpen(true)}
      >
        {activeCategory || activeSub1 || activeSub2}
      </button>
      
      <button
        className="z-50 bg-[#a62626] text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
      >
        قیمت
      </button>
      
      <button
        className="z-50 bg-[#a62626] text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
      >
        وضعیت
      </button>
    </div> }{isFilterModalOpen  && (
  <motion.div
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "100%" }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="fixed inset-0 z-50 dark:bg-dark-gray-50   bg-white  flex flex-col h-full w-full lg:hidden"
  >   <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <button onClick={() => setIsFilterModalOpen(false)} className="mr-2 text-black-primary dark:text-dark-white-secondary hover:text-gray-500">
              <IoMdArrowBack size={28} />
            </button>
            <span className="text-lg self-end font-bold text-black-primary dark:text-dark-white-secondary text-right">فیلترها</span>
          </div>
          <div className="flex-1 relative pb-20 overflow-y-auto p-4 flex flex-col gap-4">
            <CategoryFilter/>
            <PriceFilter
              maxPrice={maxPrice}
              minPrice={minPrice}
              onMaxPrice={setMaxPrice}
              onMinPrice={setMinPrice}
            />
            <AdStatusFilter
              status={status}
              isExchangeOpen={isExchangeOpen}
              onIsExchangeOpen={setIsExchangeOpen}
              onStatus={setStatus}
            />
          </div>
          </motion.div>
  )}
</>
);
}
export default FilterBtnForMobile;