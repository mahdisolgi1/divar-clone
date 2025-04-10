"use client";
import { useState, useEffect } from "react";
import { getSubCategories } from "../_lib/data-service";
import {
  PiCarLight,
  PiOfficeChairBold,
  PiPaintBrushBroadLight,
  PiToolboxLight,
} from "react-icons/pi";
import { CgSmartphone } from "react-icons/cg";
import { BsLamp } from "react-icons/bs";
import { FiWatch } from "react-icons/fi";
import { LuDices } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineHomeWork } from "react-icons/md";
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

interface CategoryItem {
  subCategory1: string;
  subCategory2?: string;
}

interface Category {
  name: string;
  icon: IconType;
  img: string;
}

const CategoryFilter: React.FC = () => {
  const [subCategories, setSubCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get category from URL
  const categoryFromUrl = searchParams.get("category") || "";
  const sub1FromUrl = searchParams.get("subCategory1") || "";
  const sub2FromUrl = searchParams.get("subCategory2") || "";

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (categoryFromUrl) {
        setLoading(true);
        try {
          const data = await getSubCategories(categoryFromUrl);
          setSubCategories(data);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
          setSubCategories([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSubCategories([]);
      }
    };

    fetchSubCategories();
  }, [categoryFromUrl]);

  // Get unique subCategory1 values
  const uniqueSubCategories1 = Array.from(
    new Set(subCategories.map((item) => item.subCategory1))
  );

  // Get unique subCategory2 values for the active subCategory1
  const uniqueSubCategories2 = Array.from(
    new Set(
      subCategories
        .filter((item) => item.subCategory1 === sub1FromUrl)
        .map((item) => item.subCategory2)
        .filter((item): item is string => item !== undefined)
    )
  );

  // Check if the selected subCategory1 has any subCategory2 items

  const categories: Category[] = [
    {
      name: "املاک",
      icon: MdOutlineHomeWork,
      img: "/images/categories/real-estate.png",
    },
    {
      name: "وسایل نقلیه",
      icon: PiCarLight,
      img: "/images/categories/vehicles.png",
    },
    {
      name: "کالای دیجیتال",
      icon: CgSmartphone,
      img: "/images/categories/digital.png",
    },
    {
      name: "خانه و آشپزخانه",
      icon: BsLamp,
      img: "/images/categories/home.png",
    },
    {
      name: "خدمات",
      icon: PiPaintBrushBroadLight,
      img: "/images/categories/services.png",
    },
    {
      name: "وسایل شخصی",
      icon: FiWatch,
      img: "/images/categories/personal.png",
    },
    {
      name: "سرگرمی و فراغت",
      icon: LuDices,
      img: "/images/categories/entertainment.png",
    },
    {
      name: "اجتماعی",
      icon: HiOutlineUsers,
      img: "/images/categories/social.png",
    },
    {
      name: "تجهیزات و صنعتی",
      icon: PiOfficeChairBold,
      img: "/images/categories/industrial.png",
    },
    {
      name: "استخدام و کاریابی",
      icon: PiToolboxLight,
      img: "/images/categories/jobs.png",
    },
  ];

  const handleCategorySelect = (category: string) => {
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set("category", category);
    url.searchParams.delete("subCategory1");
    url.searchParams.delete("subCategory2");
    router.push(url.toString());
  };

  const handleSub1Select = (sub1: string) => {
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set("subCategory1", sub1);
    url.searchParams.delete("subCategory2");
    router.push(url.toString());
  };

  const handleSub2Select = (sub2: string) => {
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set("subCategory2", sub2);
    router.push(url.toString());
  };

  const handleRemoveAll = () => {
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.delete("category");
    url.searchParams.delete("subCategory1");
      url.searchParams.delete("subCategory2");
    router.push(url.toString());
  };

  const getIconStyle = (isActive: boolean) => ({
    fontSize: "1.25rem",
    color: isActive ? "rgba(0, 0, 0, 0.75)" : "rgba(0, 0, 0, 0.56)",
    fontWeight: isActive ? 600 : 400,
  });

  const getTextStyle = (isActive: boolean, isBold: boolean = true) => ({
    fontSize: isBold ? "0.875rem" : "0.75rem",
    lineHeight: isBold ? "2rem" : "1.5rem",
    color: isActive ? "rgba(0, 0, 0, 0.87)" : "rgba(0, 0, 0, 0.56)",
    fontWeight: isActive ? 600 : (isBold ? 500 : 400),
    textAlign: "right" as const,
  });

  return (
    <div className="flex flex-col text-right justify-start gap-2 items-end">
      <span className="text-[0.875rem] text-xs text-black-primary">
        دسته ها
      </span>  {categoryFromUrl &&   <div  onClick={handleRemoveAll} className="flex items-center text-black-secondary text-base cursor-pointer  justify-center gap-2">
                        <span  className="text-gray-500 text-sm">
                    همهٔ آگهی‌ها  
      </span>
                    <FaArrowRight />
                    
                        </div>}
      {!categoryFromUrl ? (
        categories.map((category) => (
          <div
            key={category.name}
            onClick={() => handleCategorySelect(category.name)}
            className="group flex justify-center items-center gap-2 cursor-pointer"
          >
            <span style={getTextStyle(false)}>
              {category.name}
            </span>
            <category.icon style={getIconStyle(false)} />
          </div>
        ))
      ) : (
        <div
          onClick={handleRemoveAll}
          className="group flex justify-center items-center gap-2 cursor-pointer mr-3"
        >
          <span style={getTextStyle(true)}>
            {categories.find(c => c.name === categoryFromUrl)?.name}
          </span>
          {(() => {
            const category = categories.find(c => c.name === categoryFromUrl);
            return category ? <category.icon style={getIconStyle(true)} /> : null;
          })()}
        </div>
      )}

      {categoryFromUrl && !sub1FromUrl && uniqueSubCategories1.length > 0 && (
        <div className="w-full">
          <span className="text-[0.875rem] text-xs text-black-primary block mb-2">
            زیر دسته‌ها
          </span>
          {loading ? (
            <div className="text-center">در حال بارگذاری...</div>
          ) : (
            uniqueSubCategories1.map((subCategory) => (
              <div
                key={subCategory}
                onClick={() => handleSub1Select(subCategory)}
                className="group flex justify-end items-center gap-1 cursor-pointer py-2"
              >
                <span style={getTextStyle(false)}>
                  {subCategory}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {sub1FromUrl && (
        <div className="w-full">
          <div
            onClick={() => handleSub1Select("")}
            className="group flex justify-end items-center gap-2 cursor-pointer py-2 mr-3"
          >
            <span style={getTextStyle(true)}>
              {sub1FromUrl}
            </span>
          </div>
          {uniqueSubCategories2.length > 0 && (
            <>
              <span className="text-[0.875rem] text-xs text-black-primary block mb-2">
                زیر دسته‌های {sub1FromUrl}
              </span>
              {loading ? (
                <div className="text-center">در حال بارگذاری...</div>
              ) : (
                uniqueSubCategories2.map((subCategory2) => (
                  <div
                    key={subCategory2}
                    onClick={() => handleSub2Select(subCategory2)}
                    className={`group flex justify-end items-center cursor-pointer ${
                      sub2FromUrl === subCategory2 
                      ? "text-brand border-r-brand" 
                      : "border-r-black-secondary text-black-secondary"
                    }`}
                  >
                    <span className={`border-r-2 pr-2 text-base text-right py-2`}>
                      {subCategory2}
                    </span>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
