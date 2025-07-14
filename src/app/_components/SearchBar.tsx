"use client";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { searchAds } from "../_lib/data-service";
import Link from "next/link";

 interface Ad {
  id: number;
  created_at: string;
  title: string;
  categoryID: number;
  category: {
    id: number;
    category: string;
    subCategory1: string;
    subCategory2?: string;
  };
}
const toPersianNumber = (num: number) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (x) => persianDigits[parseInt(x)]);
};

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Ad[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const province = searchParams.get("province") || "";
  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim()) {
        const ads = await searchAds(query, province);
          setResults(ads);
          console.log(ads);
          setShowDropdown(true);
        }
       else {
        setResults([]);
        setShowDropdown(false);
      }
    };

    const timeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeout);
  }, [query, province]);

  const handleRemoveProvince = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("query");
    router.push(url.toString());

    setQuery("");
    setShowDropdown(false);
  };

  const handleProvinceSelect = (query: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("query", query);

    router.push(url.toString());
  };
  return (
    <div className="relative w-full max-w-md ">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className="bg-[#f0f0f1] dark:bg-dark-white-light-200 pr-8 rounded-lg px-4 py-2 md:w-[25rem] lg:w-[30rem] text-black-primary dark:text-dark-white-primary placeholder:text-right text-right pl-10"
        placeholder="جستجو در همه آگهی ها"
      />
      <IoIosSearch
        onClick={() => router.push(`/search?query=${query}`)}
        className="absolute cursor-pointer left-3 top-1/2 transform -translate-y-1/2 text-black-secondary dark:text-dark-white-secondary text-xl"
      />

      {query && (
        <IoClose
          className="absolute right-[-1.5rem] top-1/2 transform -translate-y-1/2 text-black-secondary dark:text-dark-white-secondary cursor-pointer hover:text-black-primary dark:hover:text-dark-white-primary"
          size={18}
          onClick={handleRemoveProvince}
        />
      )}

      {showDropdown && results.length > 0 && (
        <div className="absolute p-4 md:w-[25rem] gap-2  lg:w-[30rem] bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
         
          {results.map((ad) => (
            <Link
              href={`/ads/${ad.id.toString()}`}
              key={ad.id}
              className="px-4 flex justify-around items-center placeholder: text-black-secondary dark:text-dark-white-secondary py-2 text-right  cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-gray-100"
              onClick={() => setShowDropdown(false)}
            >   
                <div className="flex flex-col justify-around items-center">

              <span>
                {ad.title}
                </span>
              <span>{ad?.category?.subCategory1 || 'بدون دسته‌بندی'}</span>
           
                </div>
            </Link>
          ))}
          <div className="flex justify-between  items-center">
          <div className="text-sm text-nowrap flex justify-center items-center flex-row-reverse gap-1 text-black-secondary dark:text-dark-white-secondary mb-2">
             <span >{toPersianNumber(results.length)}</span> 
             <span>نتیجه یافت شد </span>
            </div> <span
            className="w-full flex gap-5 justify-end items-center text-black-secondary dark:text-dark-white-secondary text-right py-2  hover:bg-gray-300"
            onClick={() => handleProvinceSelect(query)}
          >
 {query}  جستجوی 
            <IoIosSearch/>
  </span>
            </div>  
        </div>
      )}
    </div>
  );
};

export default SearchBar;
