"use client";
import { useState, useEffect, useRef } from "react";
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
import { MdKeyboardArrowDown, MdOutlineHomeWork } from "react-icons/md";
import { IconType } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@mui/material";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Spinner from "./Spinner";

interface CategoryItem {
  subCategory1: string;
  subCategory2?: string;
}

interface Category {
  name: string;
  icon: IconType;
  img: string;
}

const CategoryFilterForNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subCategories, setSubCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("املاک");
  const [activeSub1, setActiveSub1] = useState<string>("");
  const [activeSub2, setActiveSub2] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "";
  const sub1FromUrl = searchParams.get("subCategory1") || "";
  const sub2FromUrl = searchParams.get("subCategory2") || "";

  useEffect(() => {
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
      if (sub1FromUrl) {
        setActiveSub1(sub1FromUrl);
        if (sub2FromUrl) {
          setActiveSub2(sub2FromUrl);
        }
      }
    }
  }, [categoryFromUrl, sub1FromUrl, sub2FromUrl]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (activeCategory) {
        setLoading(true);
        try {
          const data = await getSubCategories(activeCategory);
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
  }, [activeCategory]);

  const uniqueSubCategories1 = Array.from(
    new Set(subCategories.map((item) => item.subCategory1))
  );

  const uniqueSubCategories2 = Array.from(
    new Set(
      subCategories
        .map((item) => item.subCategory2)
        .filter((item): item is string => item !== undefined)
    )
  );

  const categories: Category[] = [
    {
      name: "املاک",
      icon: MdOutlineHomeWork,
      img: "/images/real-estate.png",
    },
    {
      name: "وسایل نقلیه",
      icon: PiCarLight,
      img: "/images/vehicles.png",
    },
    {
      name: "کالای دیجیتال",
      icon: CgSmartphone,
      img: "/images/electronic-devices.png",
    },
    {
      name: "خانه و آشپزخانه",
      icon: BsLamp,
      img: "/images/home-kitchen.png",
    },
    {
      name: "خدمات",
      icon: PiPaintBrushBroadLight,
      img: "/images/services.png",
    },
    {
      name: "وسایل شخصی",
      icon: FiWatch,
      img: "/images/personal-goods.png",
    },
    {
      name: "سرگرمی و فراغت",
      icon: LuDices,
      img: "/images/entertainment.png",
    },
    {
      name: "اجتماعی",
      icon: HiOutlineUsers,
      img: "/images/social-services.png",
    },
    {
      name: "تجهیزات و صنعتی",
      icon: PiOfficeChairBold,
      img: "/images/tools-materials-equipment.png",
    },
    {
      name: "استخدام و کاریابی",
      icon: PiToolboxLight,
      img: "/images/jobs.png",
    },
  ];

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    setActiveSub1("");
    setActiveSub2("");

    const url = new URL(window.location.href);
    url.searchParams.set("category", category);
    url.searchParams.delete("subCategory1");
    url.searchParams.delete("subCategory2");
    router.push(url.toString());
  };

  const handleSub1Select = (sub1: string) => {
    setActiveSub1(sub1);
    setActiveSub2("");

    const url = new URL(window.location.href);
    url.searchParams.set("subCategory1", sub1);
    url.searchParams.delete("subCategory2");
    router.push(url.toString());
  };

  const handleSub2Select = (sub2: string) => {
    setActiveSub2(sub2);

    const url = new URL(window.location.href);
    url.searchParams.set("subCategory2", sub2);
    router.push(url.toString());

    setIsOpen(false);
  };

  const handleRemoveAll = () => {
    setActiveCategory("");
    setActiveSub1("");
    setActiveSub2("");

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
    fontWeight: isActive ? 600 : isBold ? 500 : 400,
    textAlign: "right" as const,
  });

  const handleScroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = 300;

      if (direction === "left") {
        container.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  // Function to get subCategory2 items for a specific subCategory1
  const getSubCategories2ForSub1 = (sub1: string) => {
    return subCategories
      .filter((item) => item.subCategory1 === sub1)
      .map((item) => item.subCategory2)
      .filter((item): item is string => item !== undefined);
  };

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        variant="text"
        sx={{
          color: "rgba(0, 0, 0, 0.56)",
          padding: "0.5rem 1rem",
          display: "flex",
          gap: "0.5rem",
          flexDirection: "row-reverse",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            color: "rgba(0, 0, 0, 0.87)",
          },
        }}
      >
        <MdKeyboardArrowDown
          className={`${
            isOpen ? "rotate-180 transition-transform duration-300" : ""
          }`}
          style={{ fontSize: "1.25rem" }}
        />
        <span style={{ fontSize: "1rem", fontWeight: 500, whiteSpace: "nowrap" }}>
          دسته ها
        </span>
      </Button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            style={{ top: "64px" }}
            onClick={() => setIsOpen(false)}
          />

          <div
            ref={modalRef}
            className="absolute top-16 left-1/2 -translate-x-1/2 bg-white rounded-md p-6 w-[80rem] max-w-[85rem] min-h-[496px] max-h-[520px]  z-50 shadow-[0_1px_6px_0_rgba(0,0,0,0.1),0_-8px_32px_-4px_rgba(0,0,0,0.05),0_16px_24px_-6px_rgba(0,0,0,0.05)]"
            dir="rtl"
          >
            <div className="flex justify-between items-center mb-4"></div>

            <div className="flex gap-8">
              <div className="w-1/5 border-l border-gray-200 pl-4">
                <div className="flex flex-col gap-2">
                  {categoryFromUrl && (
                    <button
                      className="flex items-center text-black-secondary shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] hover:bg-black-light-100 text-xs px-4 py-2 cursor-pointer justify-start gap-2"
                      onClick={handleRemoveAll}
                    >
                      <FaArrowRight />
                      <span className="text-gray-500 text-base  text-black-secondary">
                        همهٔ آگهی‌ها
                      </span>
                    </button>
                  )}

                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onMouseEnter={() => setActiveCategory(category.name)}
                      className={`flex items-center hover:bg-black-light-100 justify-between  gap-1 px-4  text-black-secondary text-xs rounded-md transition-colors ${
                        activeCategory === category.name
                          ? "bg-gray-100"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <category.icon
                          style={getIconStyle(activeCategory === category.name)}
                        />
                        <span style={getTextStyle(activeCategory === category.name)}>
                          {category.name}
                        </span>
                      </div>
                      <span
                        className="text-black-secondary text-base"
                        style={getTextStyle(activeCategory === category.name)}
                      >
                        <FaChevronLeft />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-4/5 flex relative justify-center flex-row-reverse items-center">
                {loading ? (
                  <Spinner />
                ) : (
                  uniqueSubCategories1.length > 0 && (
                
                    <>
                    
                          <button
                            onClick={() => handleScroll("right")}
                            className="absolute p-3 right-0 top-1/2 text-black-secondary bg-white-nav -translate-y-1/2  rounded-full hover:bg-gray-100"
                            >
                            <FaChevronRight className="text-gray-500" />
                          </button>
                          <button
                            onClick={() => handleScroll("left")}
                            className="absolute left-0 top-1/2 text-black-secondary bg-white-nav -translate-y-1/2 p-3 rounded-full hover:bg-gray-100"
                          >
                            <FaChevronLeft className="text-gray-500" />
                          </button>

                        <div
                          ref={containerRef}
                          className="overflow-x-auto flex flex-col flex-wrap h-full pr-6 max-h-[300px]"
                          style={{ scrollbarWidth: "none" }}
                        >
                          {uniqueSubCategories1.map((sub1) => (
                            <div
                              key={sub1}
                              className="ml-6"
                            >
                              <button
                                onClick={() => handleSub1Select(sub1)}
                                className={`w-full text-right text-nowrap inline-block text-xs p-2 text-black-primary rounded-md transition-colors ${
                                  activeSub1 === sub1
                                    ? "bg-gray-100"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                <span style={getTextStyle(activeSub1 === sub1)}>
                                  {sub1}
                                </span>
                              </button>

                              {getSubCategories2ForSub1(sub1).length > 0 && (
                                <div className="mt-2 pr-4 flex flex-col gap-1">
                                  {getSubCategories2ForSub1(sub1).map((sub2) => (
                                    <button
                                      key={sub2}
                                      onClick={() => handleSub2Select(sub2)}
                                      className={`w-full text-right text-black-secondary text-xs rounded-md transition-colors ${
                                        activeSub2 === sub2
                                          ? "bg-gray-100"
                                          : "hover:bg-gray-50"
                                      }`}
                                    >
                                      <span
                                        style={getTextStyle(
                                          activeSub2 === sub2,
                                          false
                                        )}
                                      >
                                        {sub2}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}  <div className="flex justify-center mt-auto w-[370px] flex-col gap-2 items-center">
                          <Image
                            width={640}
                            height={640}
                            src={
                              categories.find(
                                (c) => c.name === activeCategory
                              )?.img || "/images/categories/default.png"
                            }
                            alt={activeCategory}
                            className="w-[280px] object-contain"
                          />
                          <button
                            className="text-black-secondary border-1 px-4 py-2 border-light-100 rounded-sm text-base bg-transparent text-nowrap shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"
                            onClick={() => handleCategorySelect(activeCategory)}
                          >
                            همهٔ آگهی‌های {activeCategory}
                          </button>
                        </div>
                        </div>
                        </>
                 
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryFilterForNavbar;