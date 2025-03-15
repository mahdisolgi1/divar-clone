"use client";
import Image from "next/image";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";
import AdInGallery from "./AdInGallery";
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
import { Ad } from "../_types/modalTypes";
import { useEffect, useState } from "react";
import { filterAds } from "../_lib/data-service";
import PriceFilter from "./PriceFilter";
import AdStatusFilter from "./AdStatusFilter";

const Gallery: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isExchangeOpen, setIsExchangeOpen] = useState<boolean>(false);
  const [status, setStatus] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const [activeCategory, setActiveCategory] = useState<string>("");
  const categories = [
    {
      name: "املاک",
      icon: (
        <MdOutlineHomeWork
          className={`text-black-secondary text-xl group-hover:text-black-primary ${
            activeCategory === "املاک"
              ? "font-semibold text-base mr-5 text-black-primary"
              : ""
          }`}
        />
      ),
    },
    {
      name: "وسایل نقلیه",
      icon: (
        <PiCarLight
          className={`text-black-secondary text-xl group-hover:text-black-primary ${
            activeCategory === "وسایل نقلیه"
              ? "font-semibold text-base mr-5 text-black-primary"
              : ""
          }`}
        />
      ),
    },
    {
      name: "کالای دیجیتال",
      icon: (
        <CgSmartphone
          className={`text-black-secondary text-xl group-hover:text-black-primary ${
            activeCategory === "کالای دیجیتال"
              ? "font-semibold text-base mr-5 text-black-primary"
              : ""
          }`}
        />
      ),
    },
    {
      name: "خانه و آشپزخانه",
      icon: (
        <BsLamp
          className={`text-black-secondary text-xl group-hover:text-black-primary ${
            activeCategory === "خانه و آشپزخانه"
              ? "font-semibold text-base mr-5 text-black-primary"
              : ""
          }`}
        />
      ),
    },
    {
      name: "خدمات",
      icon: (
        <PiPaintBrushBroadLight
          className={`text-black-secondary text-xl group-hover:text-black-primary ${
            activeCategory === "خدمات"
              ? "font-semibold text-base mr-5 text-black-primary"
              : ""
          }`}
        />
      ),
    },
    {
      name: "وسایل شخصی",
      icon: (
        <FiWatch
          className={`text-black-secondary text-xl group-hover:text-black-primary ${
            activeCategory === "وسایل شخصی"
              ? "font-semibold text-base mr-5 text-black-primary"
              : ""
          }`}
        />
      ),
    },
    {
      name: "سرگرمی و فراغت",
      icon: (
        <LuDices
          className={`text-black-secondary text-xl group-hover:text-black-primary ${
            activeCategory === "سرگرمی و فراغت"
              ? "font-semibold text-base mr-5 text-black-primary"
              : ""
          }`}
        />
      ),
    },
    {
      name: "اجتماعی",
      icon: (
        <HiOutlineUsers
          className={`text-black-secondary text-xl group-hover:text-black-primary ${
            activeCategory === "اجتماعی"
              ? "font-semibold text-base mr-5 text-black-primary"
              : ""
          }`}
        />
      ),
    },
    {
      name: "تجهیزات و صنعتی",
      icon: (
        <PiOfficeChairBold
          className={`text-black-secondary text-xl group-hover:text-black-primary ${
            activeCategory === "تجهیزات و صنعتی"
              ? "font-semibold text-base mr-5 text-black-primary"
              : ""
          }`}
        />
      ),
    },
    {
      name: "استخدام و کاریابی",
      icon: (
        <PiToolboxLight
          className={`text-black-secondary text-xl group-hover:text-black-primary ${
            activeCategory === "استخدام و کاریابی"
              ? "font-semibold text-base mr-5 text-black-primary"
              : ""
          }`}
        />
      ),
    },
  ];

  useEffect(() => {
    const handleFilter = async () => {
      try {
        setLoading(true);
        const filteredAds = await filterAds(
          activeCategory,
          status,
          minPrice ? Number(minPrice) : undefined,
          maxPrice ? Number(maxPrice) : undefined,
          isExchangeOpen
        );
        setAds(filteredAds);
      } catch (error) {
        console.error("Failed to fetch ads:", error);
      } finally {
        setLoading(false);
      }
    };

    handleFilter();
  }, [status, minPrice, maxPrice, activeCategory, isExchangeOpen]);

  return (
    <section className="flex  overflow-y-visible justify-center relative">
      <p className="text-right absolute text-black-secondary  top-1 right-96">
        انواع آگهی‌ها و نیازمندی های کرج
      </p>
      <div className="grid w-2/4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3 mr-[300px]  mt-10 items-center">
        <AdInGallery ads={ads} loading={loading} />
      </div>

      <div className="flex p-[32px_20px_0_20px] flex-col text-right w-1/4 gap-5 fixed right-0 h-screen overflow-y-auto filter-section">
        <div className="flex   flex-col text-right justify-start gap-2   items-end">
          <span className=" text-[0.875rem] text-xs text-black-primary">
            دسته ها
          </span>

          {categories.map((category) => (
            <div
              onClick={() => {
                setActiveCategory(
                  activeCategory !== category.name ? category.name : ""
                );
              }}
              key={category.name}
              className={`group flex justify-center items-center gap-2 cursor-pointer  ${
                activeCategory === category.name && "mr-2"
              }`}
            >
              <span
                className={`text-[0.875rem] leading-8 text-black-secondary text-right group-hover:text-black-primary ${
                  activeCategory === category.name &&
                  "font-semibold text-base text-black"
                }`}
              >
                {category.name}
              </span>
              {category.icon}
            </div>
          ))}
        </div>
        <div className="relative">
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

        <div className="-z-10">
          <div className="flex whitespace-nowrap gap-5 text-black-secondary justify-center items-center ">
            <span>دریافت برنامه</span>
            <span>دربارهٔ دیوار</span>
            <span>اتاق خبر</span>
          </div>
          <div className="flex text-black-secondary whitespace-nowrap justify-center items-center  gap-5">
            <span>دیوار حرفه‌ای</span>
            <span>گزارش آسیب‌پذیری</span>
          </div>
          <div className="flex text-black-secondary justify-center whitespace-nowrap items-center  gap-5">
            <span>دیواری شو</span>
            <span>پشتیبانی و قوانین</span>
          </div>
        </div>
        <div className="flex gap-5 justify-center items-center w-full">
          <FaLinkedin color="black" />
          <FaTwitter color="black" />
          <AiFillInstagram color="black" />
        </div>
        <div className="flex items-center gap-3 justify-center">
          <div className="w-1/4 h-28 relative">
            <Image
              src="/images/inema.png"
              alt="inema"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="w-1/4 h-28 relative">
            <Image
              src="/images/samandeh.png"
              alt="samandeh"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="w-1/4 h-28 relative">
            <Image
              src="/images/enamad.png"
              alt="enamad"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
