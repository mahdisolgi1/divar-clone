"use client";
import Image from "next/image";
import { useState } from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoSearch } from "react-icons/go";
const cities = [
  "تهران",
  "مشهد",
  "کرج",
  "شیراز",
  "اصفهان",
  "اهواز",
  "تبریز",
  "کرمانشاه",
  "قم",
  "رشت"
];

const ProvinceSelector: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();



  const handleProvinceSelect = (province: string) => {
    localStorage.setItem("selectedProvince", province);
    const url = new URL(window.location.href);
    url.searchParams.set("province", province);
    router.push(`/ads/${url.search}`);
  };
  

  return (
    <div className="flex mx-auto w-[calc(33.333%+3rem)] flex-col items-center justify-center gap-10">
      <Image
        width={300}
        height={300}
        src="/images/divar.svg"
        alt="divar"
        className="w-16 h-w-16"
      />
      <div className="flex shadow-[0_1px_0_rgba(0,0,0,0.12)]  items-center px-10 justify-center w-full flex-row-reverse gap-16">
        <Link
          className="text-[0.75rem]  pb-3 text-black-secondary dark:text-dark-white-secondary  whitespace-nowrap"
          href="/ads/create-Ad"
        >
          ثبت آگهی
        </Link>
        <Link
          className="text-[0.75rem] pb-3 text-black-secondary dark:text-dark-white-secondary whitespace-nowrap"
          href="https://divar.ir/about"
        >
          دربارهٔ دیوار
        </Link>
        <Link
          className="text-[0.75rem] pb-3 text-black-secondary dark:text-dark-white-secondary whitespace-nowrap"
          href="https://divar.ir/help/download"
        >
          دریافت برنامه
        </Link>
        <Link
          className="text-[0.75rem] pb-3 text-black-secondary dark:text-dark-white-secondary whitespace-nowrap"
          href="https://divar.ir/help.news"
        >
          اتاق خبر
        </Link>
        <Link
          className="text-[0.75rem] pb-3 text-black-secondary dark:text-dark-white-secondary whitespace-nowrap"
          href="https://divar.ir/help"
        >
          پشتیبانی
        </Link>
      </div>
      <div className="text-center">
        <span className="text-[0.875rem]  text-black-secondary dark:text-dark-white-secondary leading-8 ">
          !دﯾﻮار، ﭘﺎﯾﮕﺎه ﺧﺮﯾﺪ و ﻓﺮوش ﺑﯽ‌واﺳﻄﻪ‌
        </span>
        <p className="text-[0.875rem] text-black-secondary dark:text-dark-white-secondary leading-8">
          اﮔﻪ دﻧﺒﺎل ﭼﯿﺰی ﻫﺴﺘﯽ، ﺷﻬﺮت رو اﻧﺘﺨﺎب ﮐﻦ و ﺗﻮ دﺳﺘﻪ‌ﺑﻨﺪی‌ﻫﺎ ﺑﻪ دﻧﺒﺎﻟﺶ
          ﺑﮕﺮد. اﮔﺮ ﻫﻢ ﻣﯽ‌ﺧﻮای ﭼﯿﺰی ﺑﻔﺮوﺷﯽ، ﭼﻨﺪ ﺗﺎ ﻋﮑﺲ ﺧﻮب ازش ﺑﮕﯿﺮ و آﮔﻬﯿﺖ رو
          ﺑﭽﺴﺒﻮن ﺑﻪ دﯾﻮار
        </p>
      </div>

      <div className="w-full shadow-[0_1px_0_rgba(0,0,0,0.12)] max-w-2xl">
        <div className="mb-4 flex flex-col  gap-7">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجوی استان..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md border-black-medium-200 dark:border-dark-white-medium-200 shadow-[0_1px_2px_0_rgba(0,0,0,0.12)] focus:border-[#be3737] focus:outline-none focus:ring-1 focus:ring-[#be3737] pr-10"
              dir="rtl"
            />
            <GoSearch
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.56)]"
              size={16}
            />
          </div>
          <h3 className=" text-black-primary dark:text-dark-white-primary text-right self-end text-base font-medium">
            انتخاب استان
          </h3>
        </div>
        <div className="max-h-[400px]  ">
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
            dir="rtl"
          >
           
             { cities.map((province,i) => (
                <span
                  key={i} 
                  onClick={() => handleProvinceSelect(province)}
                  className="p-3 text-[0.875rem] leading-8 font-medium text-black-secondary dark:text-dark-white-secondary cursor-pointer hover:text-black-primary dark:text-dark-white-primary "
                >
                  {province}
                </span>
              ))}
            
          </div>
        </div>
      </div>
      <div className="flex items-center  w-full pb-6 shadow-[0_1px_0_rgba(0,0,0,0.12)]  gap-0 justify-center">
        <div className="w-1/6 h-16 relative">
          <Image
            src="/images/inema.png"
            alt="inema"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="w-1/6   h-16 relative">
          <Image
            src="/images/samandeh.png"
            alt="samandeh"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="w-1/6 h-16 relative">
          <Image
            src="/images/enamad.png"
            alt="enamad"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="flex gap-5 justify-center py-10 items-center w-full pt-4">
        <Link href="https://linkedin.com/company/divar" target="_blank">
          <FaLinkedin
            className="text-black-secondary dark:text-dark-white-secondary hover:opacity-80 cursor-pointer  "
            size={24}
          />
        </Link>
        <Link href="https://twitter.com/divar" target="_blank">
          <FaTwitter
            className="text-black-secondary dark:text-dark-white-secondary hover:opacity-80 cursor-pointer  "
            size={24}
          />
        </Link>
        <Link href="https://instagram.com/divar" target="_blank">
          <FaInstagram
            className="text-black-secondary dark:text-dark-white-secondary hover:opacity-80 cursor-pointer  "
            size={24}
          />
        </Link>
      </div>
    </div>
  );
};

export default ProvinceSelector;
