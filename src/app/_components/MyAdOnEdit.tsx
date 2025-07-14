"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import React from "react";
import { MdOutlineHomeWork } from "react-icons/md";
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
import ProvinceDropDown from "./ProvincDropDown";
import ImageUploader from "./ImageUploader";
import PriceInput from "./PriceInput";
import StatusDropDown from "./StatusDropDown";
import PhoneInput from "./PhoneInput";
import { Button } from "@mui/material";
import OTECheckBox from "./OTECheckBox";
import {  getAd, updateAd, getSubCates1, getSubCates2 } from "../_lib/data-service";
import { Ad, Category } from "../_types/modalTypes";
import { useUser } from "../_context/UserContext";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  املاک: MdOutlineHomeWork,
  "وسایل نقلیه": PiCarLight,
  "کالای دیجیتال": CgSmartphone,
  "خانه و آشپزخانه": BsLamp,
  خدمات: PiPaintBrushBroadLight,
  "وسایل شخصی": FiWatch,
  "سرگرمی و فراغت": LuDices,
  اجتماعی: HiOutlineUsers,
  "تجهیزات و صنعتی": PiOfficeChairBold,
  "استخدام و کاریابی": PiToolboxLight,
};

const categories = [
  "املاک",
  "وسایل نقلیه",
  "کالای دیجیتال",
  "خانه و آشپزخانه",
  "خدمات",
  "وسایل شخصی",
  "سرگرمی و فراغت",
  "اجتماعی",
  "تجهیزات و صنعتی",
  "استخدام و کاریابی"
];

const MyAdOnEdit: FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [placeID, setPlaceID] = useState<number | undefined>(undefined);
  const [positon, setPosition] = useState<[number, number]>([32.4279, 53.688]);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [img1, setImg1] = useState<string | null>(null);
  const [img2, setImg2] = useState<string | null>(null);
  const [img3, setImg3] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOTEChecked, setIsOTEChecked] = useState<boolean>(false);
  const [categoryDetail, setCategoryDetail] = useState<Category | null>(null);
  const { cat, id } = useParams();
  const { user } = useUser();
  const router = useRouter();
  const maxLength = 200;

  // Category dropdown states
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubCategory1Open, setIsSubCategory1Open] = useState<boolean>(false);
  const [isSubCategory2Open, setIsSubCategory2Open] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory1, setSelectedSubCategory1] = useState<string | null>(null);
  const [subCategories1, setSubCategories1] = useState<string[]>([]);
  const [subCategories2, setSubCategories2] = useState<string[]>([]);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Fetch ad details when component loads
  useEffect(() => {
    const fetchAdDetails = async () => {
      if (!id) return;
      try {
        const adData = await getAd(Number(id));
        if (adData) {
          if (adData.userID !== user?.id) {
            console.error("It's not your ad.");
            return;
          }
          setTitle(adData.title);
          setDescription(adData.description);
          setPrice(adData.price);
          setPlaceID(adData.placeID);
          setPosition([adData.latitude, adData.longitude]);
          setPhoneNumber(adData.phoneNumber.toString());
          setStatus(adData.status);
          setImg1(adData.img1);
          setImg2(adData.img2);
          setImg3(adData.img3);
          setIsOTEChecked(adData.openToExchange);
          setCategoryDetail(adData.category);
          setSelectedCategory(adData.category.category);
          setSelectedSubCategory1(adData.category.subCategory1);
        }
      } catch (error) {
        console.error("Error fetching ad details:", error);
      }
    };
  
    fetchAdDetails();
  }, [id, user?.id]);
  

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    try {
      const data = await getSubCates1(category);
      const uniqueSubCategories = Array.from(new Set(data.map(sc => sc.subCategory1)));
      setSubCategories1(uniqueSubCategories);
      setIsSubCategory1Open(true);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSubCategory1Select = async (subCategory1: string) => {
    setSelectedSubCategory1(subCategory1);
    setIsSubCategory1Open(false);
    try {
      const subCategory2Data = await getSubCates2(subCategory1);
      const uniqueSubCategories2 = Array.from(new Set(subCategory2Data.map(sc => sc.subCategory2)));
      setSubCategories2(uniqueSubCategories2);
      
      if (uniqueSubCategories2.length > 0 && uniqueSubCategories2[0]) {
        setIsSubCategory2Open(true);
      } else {
        const subCategory1Data = await getSubCates1(selectedCategory!);
        const selectedData = subCategory1Data.find(sc => sc.subCategory1 === subCategory1);
        if (selectedData) {
          router.push(`/my-divar/${selectedData.id}`);
        }
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSubCategory2Select = async (subCategory2: string) => {
    setIsSubCategory2Open(false);
    try {
      const subCategory2Data = await getSubCates2(selectedSubCategory1!);
      const selectedData = subCategory2Data.find(sc => sc.subCategory2 === subCategory2);
      if (selectedData) {
        router.push(`/my-divar/${selectedData.id}`);
      }
    } catch (error) {
      console.error("Error selecting subcategory:", error);
    }
  };

  const handleSubmit = async () => {
    if (!placeID || !id || !user?.id) {
      alert("Please select a location");
      return;
    }
    const updatedAd = {
      title,
      description,
      price,
      phoneNumber: Number(phoneNumber),
      placeID,
      latitude: Number(positon[0]),
      longitude: Number(positon[1]),
      categoryID: Number(cat),
      status,
      img1,
      img2,
      img3,
      openToExchange: isOTEChecked,
      userID: user.id,
      userEmail: user.email,
    };

    try {
      setLoading(true);
      await updateAd(Number(id),user?.id, updatedAd);
      router.push(`/ads/${id}`);
    } catch (error) {
      console.error("Error updating ad", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-end gap-5 w-full max-w-[40rem] mx-auto flex-col pb-10">
      <h2 className="text-xl font-medium text-gray">ویرایش آگهی</h2>
      <div className="w-full me-auto text-right flex gap-1 flex-col">
        <h3 className="text-base text-black-primary dark:text-dark-white-primary pr-1">دسته</h3>
        <div className="relative w-full mx-auto cursor-pointer" ref={dropdownRef}>
          <div
            className="flex items-center w-full justify-between px-4 py-2 bg-white border hover:border-black-dark-100 border-black-medium-100 dark:border-dark-white-medium-100 rounded-md cursor-pointer  hover:bg-gray-50 dark:hover:bg-dark-gray-50"
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
            <ul className="absolute z-40 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-right text-black-secondary dark:text-dark-white-secondary text-[0.875rem] hover:bg-black-light-200 dark:hover:bg-dark-white-light-200  cursor-pointer"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}

          {isSubCategory1Open && selectedCategory && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
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
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
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

      <ProvinceDropDown 
        onPosition={setPosition} 
        onPlaceID={setPlaceID}
      />
      
      <div className="w-full text-right items-end flex gap-2 flex-col">
        <h3 className="text-base text-black-primary dark:text-dark-white-primary pr-1">* عکس آگهی</h3>
        <ImageUploader onImg1={setImg1} onImg2={setImg2} onImg3={setImg3} />
        <span className="text-base text-black-secondary dark:text-dark-white-secondary">
          تعداد عکس‌های انتخاب شده نباید بیشتر ۳ از باشد.
        </span>
      </div>
      <PriceInput onPriceChange={setPrice} price={price} />
      <div className="w-full me-auto text-right flex gap-1 flex-col">
        <h3 className="text-base text-black-primary dark:text-dark-white-primary pr-1">عنوان</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-white border hover:border-black-dark-100 border-black-medium-100 dark:border-dark-white-medium-100 w-full mx-auto rounded-lg px-2 py-2 text-black placeholder:text-right text-right pl-10"
          placeholder="عنوان"
        />
      </div>
      <OTECheckBox
        isOTEChecked={isOTEChecked}
        onIsOTEcheckbox={setIsOTEChecked}
      />
      <div className="w-full me-auto text-right flex gap-1 flex-col">
        <h3 className="text-base text-black-primary dark:text-dark-white-primary pr-1">توضیحات</h3>
        <textarea
          rows={3}
          maxLength={maxLength}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-white border hover:border-black-dark-100 border-black-medium-100 dark:border-dark-white-medium-100 w-full mx-auto rounded-lg px-2 py-2 text-black placeholder:text-right text-right resize-none"
          placeholder="توضیحات"
        />
      </div>
      <StatusDropDown onStatus={setStatus} />
      <PhoneInput phoneNumber={phoneNumber} onPhoneChange={setPhoneNumber} />
      <div className="self-start flex justify-center items-center gap-3 mt-3">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          sx={{ background: "#a62626" }}
          className="hover:bg-[#be3737] hover:shadow-none whitespace-nowrap"
        >
          {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
        <Link className="cursor-pointer" href="/my-ads">
          <Button
            variant="contained"
            sx={{ background: "white", color: " rgba(0, 0, 0, 0.56)" }}
            className="hover:bg-black/5 text-black-secondary dark:text-dark-white-secondary hover:shadow-none whitespace-nowrap bg-transparent text-content-primary"
          >
            انصراف
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MyAdOnEdit;
