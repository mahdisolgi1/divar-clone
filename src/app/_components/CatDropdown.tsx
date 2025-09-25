"use client";
import { useEffect, useRef, useState } from "react";
import {  getSubCates1, getSubCates2 } from "../_lib/data-service";
import { FaChevronDown } from "react-icons/fa";


const CatDropdown: React.FC = () => {
  const [subCategories1, setSubCategories1] = useState<string[]>([]);
  const [subCategories2, setSubCategories2] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory1, setSelectedSubCategory1] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubCategory1Open, setIsSubCategory1Open] = useState<boolean>(false);
  const [isSubCategory2Open, setIsSubCategory2Open] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
const cates= [ "املاک",
   "وسایل نقلیه",
   "کالای دیجیتال",
   "خانه و آشپزخانه",
   "خدمات",
   "وسایل شخصی",
   "سرگرمی و فراغت",
   "اجتماعی",
   "تجهیزات و صنعتی",
   "استخدام و کاریابی"]


  const fetchSubCategories1 = async (category: string) => {
    try {
      const data = await getSubCates1(category);
      
      const uniqueSubCategories = Array.from(new Set(data.map(sc => sc.subCategory1)));
      setSubCategories1(uniqueSubCategories);
      } catch (err) {
      setError("Failed to load subcategories");
        console.error(err);
      }
    };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsSubCategory1Open(false);
        setIsSubCategory2Open(false);
      }
    };

    if (isOpen || isSubCategory1Open || isSubCategory2Open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isSubCategory1Open, isSubCategory2Open]);

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory1(null);
    
    setIsOpen(false);
    await fetchSubCategories1(category);
    setIsSubCategory1Open(true);
  };

  const handleSubCategory1Select = async (subCategory1: string) => {
    setSelectedSubCategory1(subCategory1);
    
    setIsSubCategory1Open(false);
    const subCategory2Data = await getSubCates2(subCategory1);
    const uniqueSubCategories2 = Array.from(new Set(subCategory2Data.map(sc => sc.subCategory2)));
    setSubCategories2(uniqueSubCategories2);
    
    if (uniqueSubCategories2.length > 0 && uniqueSubCategories2[0]) {
      setIsSubCategory2Open(true);
    } else {
      
      const subCategory1Data = await getSubCates1(selectedCategory!);
      const selectedData = subCategory1Data.find(sc => sc.subCategory1 === subCategory1);
      if (selectedData) {
      window.location.href = `${selectedData.id}`;
      }
    }
  };

  const handleSubCategory2Select = async (subCategory2: string) => {
    
    setIsSubCategory2Open(false);
    const subCategory2Data = await getSubCates2(selectedSubCategory1!);
    const selectedData = subCategory2Data.find(sc => sc.subCategory2 === subCategory2);
    if (selectedData) {
      window.location.href = `/ads/create-ad/${selectedData.id}`;
    }
  };


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full me-auto text-right flex bg-white dark:bg-dark-white-light-200 gap-1 flex-col">
      <h3 className="text-base text-black-primary dark:text-dark-white-primary pr-1">دسته</h3>
      <div className="relative w-full mx-auto cursor-pointer" ref={dropdownRef}>
        <div
          className="flex items-center w-full justify-between px-4 py-2 bg-white dark:bg-dark-white-light-200 border hover:border-black-dark-100 border-black-medium-100 dark:border-dark-white-medium-100 rounded-md cursor-pointer  hover:bg-gray-50 dark:hover:bg-dark-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`arrow transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
            <FaChevronDown className="text-black-hint dark:text-dark-white-hint text-lg" />
          </span>
          <span className="text-black-primary dark:text-dark-white-primary text-base">
            {selectedCategory ? selectedCategory : "دسته"}
          </span>
        </div>

        {isOpen && (
          <ul className="absolute z-40 mt-1 w-full bg-white dark:bg-dark-white-light-200 border border-gray-300 rounded-md shadow-lg">
            {cates.map((category, index) => (
              <li
                key={index}
                className="px-4 py-2 text-right text-black-secondary dark:text-dark-white-secondary text-[0.875rem] hover:bg-black-light-200 dark:hover:bg-dark-white-light-200 cursor-pointer"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        )}

        {isSubCategory1Open && selectedCategory && (
          <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-dark-white-light-200 border border-gray-300 rounded-md shadow-lg">
            {subCategories1.map((subCategory1, index) => (
              <li
                key={index}
                className="px-4 py-2 text-right text-black-secondary dark:text-dark-white-secondary text-[0.875rem] hover:bg-black-light-200 dark:hover:bg-dark-white-light-200  cursor-pointer"
                onClick={() => handleSubCategory1Select(subCategory1)}
              >
                {subCategory1}
              </li>
            ))}
          </ul>
        )}

        {isSubCategory2Open && selectedCategory && selectedSubCategory1 && (
          <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-dark-white-light-200 border border-gray-300 rounded-md shadow-lg">
            {subCategories2.map((subCategory2, index) => (
              <li
                key={index}
                className="px-4 py-2 text-right text-black-secondary dark:text-dark-white-secondary text-[0.875rem] hover:bg-black-light-200 dark:hover:bg-dark-white-light-200  cursor-pointer"
                onClick={() => handleSubCategory2Select(subCategory2)}
              >
                {subCategory2}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CatDropdown;
