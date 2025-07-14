"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
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
import { createAd, getCatesByID } from "../_lib/data-service";
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


const CreateAd: FC = () => {
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
  const { cat } = useParams();
  const { user } = useUser();
useEffect(()=>{console.log(user)},[user]);
  const maxLength = 200;

useEffect(()=>{ 
  if (!cat) return;
  const fetchCategory = async () => {
    try {
      const category = await getCatesByID(Number(cat));
      setCategoryDetail(category);
      console.log(Number(cat));
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };
  fetchCategory();
},[cat]);
  const handleSubmit = async () => {
    if (!placeID) {
      alert("Please select a location");
      return;
    }
    const newAd = {
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
      userID: user?.id,
      userEmail: user?.email,
    };

    try {
      setLoading(true);
      const result = await createAd(newAd);
      console.log("Ad created successfully", result);
    } catch (error) {
      console.error("Error creating ad", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-end gap-5 w-full max-w-[40rem] mx-auto flex-col pb-10">
      <h2 className="text-xl font-medium text-gray">ثبت آگهی</h2>
      <span className="text-[1.125rem] text-black-primary dark:text-dark-white-primary">دستهٔ آگهی</span>;
      <div className="flex justify-between border-b  w-full flex-row-reverse  p-4">
        <div className="flex justify-center gap-5 flex-row-reverse">
          {categoryDetail?.category && (
            <div className="text-black-secondary dark:text-dark-white-secondary text-2xl">
              {iconMap[categoryDetail.category] && 
                React.createElement(iconMap[categoryDetail.category], { className: "text-black-secondary dark:text-dark-white-secondary text-2xl" })
              }
            </div>
          )}
          <div className="flex flex-col justify-between items-center">
            <span className="text-content-primary text-[0.875rem]">
              {categoryDetail?.category}
            </span>

            <div className="flex">
              {/* <MdOutlineKeyboardArrowLeft className="text-black-secondary dark:text-dark-white-secondary w-5" /> */}
              <span className="text-content-secondary text-xs">
                {categoryDetail?.subCategory2}
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/create-Ad"
          className="flex justify-center gap-2 items-center cursor-pointer "
        >
          <MdOutlineKeyboardArrowLeft className="text-black-secondary dark:text-dark-white-secondary text-[0.875rem]" />
          <span className="text-black-secondary dark:text-dark-white-secondary text-[0.875rem]">
            تغییر دسته 
          </span>
        </Link>
      </div>
      <ProvinceDropDown 
        onPosition={setPosition} 
        onPlaceID={setPlaceID}
      />
      
      <div className="w-full text-right  items-end flex gap-2 flex-col">
        <h3 className="text-base text-black-primary dark:text-dark-white-primary  pr-1">* عکس آگهی</h3>
        <ImageUploader onImg1={setImg1} onImg2={setImg2} onImg3={setImg3} />
        <span className="text-base text-black-secondary dark:text-dark-white-secondary">
          تعداد عکس‌های انتخاب شده نباید بیشتر ۳ از باشد.
        </span>
      </div>
      <PriceInput onPriceChange={setPrice} price={price} />
      <div className="w-full me-auto text-right flex gap-1 flex-col">
        <h3 className="text-base text-black-primary dark:text-dark-white-primary  pr-1">عنوان</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-white border hover:border-black-dark-100 border-black-medium-100 dark:border-dark-white-medium-100 w-full mx-auto rounded-lg px-2 py-2  text-black placeholder:text-right text-right pl-10 "
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
          className="hover:bg-[#be3737] hover:shadow-none  whitespace-nowrap"
        >
          ثبت اطلاعات{" "}
        </Button>
        <Link className="cursor-pointer" href="/create-Ad">
          <Button
            variant="contained"
            sx={{ background: "white", color: " rgba(0, 0, 0, 0.56)" }}
            className="hover:bg-black/5 text-black-secondary dark:text-dark-white-secondary hover:shadow-none  whitespace-nowrap bg-transparent text-content-primary"
          >
            انصراف
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateAd;
