"use client";
import Image from "next/image";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import AdInGallery from "./AdInGallery";

import { Ad } from "../_types/modalTypes";
import { useEffect, useState } from "react";
import { filterAds } from "../_lib/data-service";
import PriceFilter from "./PriceFilter";
import AdStatusFilter from "./AdStatusFilter";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CategoryFilter from "./CategoryFilter";
import  MobileCat  from "./MobileCat";
import { useFilter } from "../_context/FilterContext";
const Gallery: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { isExchangeOpen,maxPrice,minPrice,setIsExchangeOpen,setMaxPrice,setMinPrice,setStatus,status,setIsFilterModalOpen} = useFilter();

  const searchParams = useSearchParams();
  const province = searchParams ? searchParams.get("province") : "";
  const city = searchParams ? searchParams.get("city") || "" : "";
  const activeCategory = searchParams ? searchParams.get("category") || "" : "";
  const activeSub1 = searchParams ? searchParams.get("subCategory1") || "" : "";
  const activeSub2 = searchParams ? searchParams.get("subCategory2") || "" : "";
  const titleSearch = searchParams ? searchParams.get("query") || "" : "";


  useEffect(() => {
    const handleFilter = async () => {
      try {
        setLoading(true);
        const filteredAds = await filterAds(
          titleSearch || undefined,
          province || undefined,
          activeCategory,
          status,
          minPrice ? Number(minPrice) : undefined,
          maxPrice ? Number(maxPrice) : undefined,
          isExchangeOpen,
          activeSub1,
          activeSub2,
          city
        );
        setAds(filteredAds);
   console.log(filteredAds)
      } catch (error) {
        console.error("Failed to fetch ads:", error);
      } finally {
        setLoading(false);
      }
    };

    handleFilter();
  }, [
    province,
    titleSearch,
    activeCategory,
    status,
    minPrice,
    maxPrice,
    isExchangeOpen,
    activeSub1,
    activeSub2,city
  ]);

  return (
    <section className="flex relative justify-center gap-12">
      <div>
        {!activeCategory && <MobileCat setIsFilterModalOpen={setIsFilterModalOpen}/>}
        <p className="text-center lg:text-right text-black-secondary dark:text-dark-white-secondary mb-4">
          انواع آگهی‌ها و نیازمندی های {province || "ایران"}
        </p>
        <div className="grid  grid-cols-1 md:grid-cols-2 pt-2 pb-20 lg:pt-0 lg:pb-0 lg:grid-cols-3 gap-4 max-w-7xl min-w-2xl ">
          <AdInGallery ads={ads} loading={loading} />
        </div>
      </div>

      {/* Sidebar for md+ screens */}
      <div className="right-0  top-0 w-1/8 mb-[0.25rem] h-screen flex-col gap-3 overflow-y-auto filter-section pb-[20px] hidden lg:flex">
        <CategoryFilter/>
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

        <div className="-z-10 flex flex-col gap-2">
          <div className="flex whitespace-nowrap gap-5 text-black-secondary dark:text-dark-white-secondary justify-center items-center text-sm ">
            <Link
              className="hover:text-black-primary dark:text-dark-white-primary cursor-pointer"
              href="https://divar.ir/help/download"
              target="_blank"
            >
              دریافت برنامه
            </Link>
            <Link
              className="hover:text-black-primary dark:text-dark-white-primary cursor-pointer"
              href="https://divar.ir/about"
            >
              دربارهٔ دیوار
            </Link>
            <Link
              className="hover:text-black-primary dark:text-dark-white-primary cursor-pointer"
              href="https://divar.ir/help.news"
            >
              اتاق خبر
            </Link>
          </div>
          <div className="flex text-black-secondary dark:text-dark-white-secondary whitespace-nowrap justify-center items-center text-sm  gap-5">
            <Link
              className="hover:text-black-primary dark:text-dark-white-primary cursor-pointer"
              href="https://divar.ir/pro/introduction"
              target="_blank"
            >
              دیوار حرفه‌ای
            </Link>
            <Link
              className="hover:text-black-primary dark:text-dark-white-primary cursor-pointer"
              href="https://www.linkedin.com/in/mahdi-solgi"              target="_blank"
            >
              گزارش آسیب‌پذیری
            </Link>
          </div>
          <div className="flex text-black-secondary dark:text-dark-white-secondary justify-center whitespace-nowrap items-center text-sm  gap-5">
            <Link
              className="hover:text-black-primary dark:text-dark-white-primary cursor-pointer"
              href="https://careers.divar.ir/"
              target="_blank"
            >
              دیواری شو
            </Link>
            <Link
              className="hover:text-black-primary dark:text-dark-white-primary cursor-pointer"
              href="https://www.linkedin.com/in/mahdi-solgi"              target="_blank"
            >
              پشتیبانی و قوانین
            </Link>
          </div>
        </div>
        <div className="flex gap-5 justify-center items-center w-full">
          <Link href="https://www.linkedin.com/in/mahdi-solgi" target="_blank">
            <FaLinkedin
              className="text-black-secondary dark:text-dark-white-secondary hover:opacity-80 cursor-pointer  "
              size={18}
            />
          </Link>
          <Link href="https://twitter.com/divar" target="_blank">
            <FaTwitter
              className="text-black-secondary dark:text-dark-white-secondary hover:opacity-80 cursor-pointer  "
              size={18}
            />
          </Link>
          <Link href="https://instagram.com/divar" target="_blank">
            <AiFillInstagram
              className="text-black-secondary dark:text-dark-white-secondary hover:opacity-80 cursor-pointer    "
              size={18}
            />
          </Link>
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

 
      {/* Button for small screens to open modal */}


      {/* Modal for small screens */}
      
    </section>
  );
};

export default Gallery;
