"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Spinner from "./Spinner";
import Link from "next/link";
import { getProvinces } from "../_lib/data-service";
import { province } from "../_types/modalTypes";
import { useRouter } from "next/navigation";
import { GoSearch } from "react-icons/go";

const ProvinceSelector: React.FC = () => {
  const [provinces, setProvinces] = useState<province[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (err) {
        setError("Failed to load provinces");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceSelect = (province: province) => {
    localStorage.setItem("selectedProvince", province.province);
    const url = new URL(window.location.href);
    url.searchParams.set("province", province.province);
    router.push(`/ads/${url.search}`);
  };
  const filteredProvinces = provinces.filter((province) =>
    province.province.includes(searchTerm)
  );

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
          className="text-[0.75rem]  pb-3 text-black-secondary  whitespace-nowrap"
          href="/ads/create-Ad"
        >
          ثبت آگهی
        </Link>
        <Link
          className="text-[0.75rem] pb-3 text-black-secondary whitespace-nowrap"
          href="https://divar.ir/about"
        >
          دربارهٔ دیوار
        </Link>
        <Link
          className="text-[0.75rem] pb-3 text-black-secondary whitespace-nowrap"
          href="https://divar.ir/help/download"
        >
          دریافت برنامه
        </Link>
        <Link
          className="text-[0.75rem] pb-3 text-black-secondary whitespace-nowrap"
          href="https://divar.ir/help.news"
        >
          اتاق خبر
        </Link>
        <Link
          className="text-[0.75rem] pb-3 text-black-secondary whitespace-nowrap"
          href="https://divar.ir/help"
        >
          پشتیبانی
        </Link>
      </div>
      <div className="text-center">
        <span className="text-[0.875rem]  text-black-secondary leading-8 ">
          !دﯾﻮار، ﭘﺎﯾﮕﺎه ﺧﺮﯾﺪ و ﻓﺮوش ﺑﯽ‌واﺳﻄﻪ‌
        </span>
        <p className="text-[0.875rem] text-black-secondary leading-8">
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
              className="w-full p-2 border border-gray-300 rounded-md border-black-medium-200 shadow-[0_1px_2px_0_rgba(0,0,0,0.12)] focus:border-[#be3737] focus:outline-none focus:ring-1 focus:ring-[#be3737] pr-10"
              dir="rtl"
            />
            <GoSearch
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.56)]"
              size={16}
            />
          </div>
          <h3 className=" text-black-primary text-right self-end text-base font-medium">
            انتخاب استان
          </h3>
        </div>
        <div className="max-h-[400px]  ">
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
            dir="rtl"
          >
            {loading ? (
              <div className="w-full flex  lg:col-start-2  justify-center">
                <Spinner />
              </div>
            ) : error ? (
              <div className="w-full text-red-600 text-center">{error}</div>
            ) : filteredProvinces.length === 0 ? (
              <div className="w-full text-center text-gray-500 p-4">
                استانی یافت نشد
              </div>
            ) : (
              filteredProvinces.map((province) => (
                <span
                  key={province.id}
                  onClick={() => handleProvinceSelect(province)}
                  className="p-3 text-[0.875rem] leading-8 font-medium text-black-secondary cursor-pointer hover:text-black-primary "
                >
                  {province.province}
                </span>
              ))
            )}
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
            className="text-black-secondary hover:opacity-80 cursor-pointer  "
            size={24}
          />
        </Link>
        <Link href="https://twitter.com/divar" target="_blank">
          <FaTwitter
            className="text-black-secondary hover:opacity-80 cursor-pointer  "
            size={24}
          />
        </Link>
        <Link href="https://instagram.com/divar" target="_blank">
          <FaInstagram
            className="text-black-secondary hover:opacity-80 cursor-pointer  "
            size={24}
          />
        </Link>
      </div>
    </div>
  );
};

export default ProvinceSelector;
