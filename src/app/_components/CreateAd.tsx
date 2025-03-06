"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

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
import CheckBox from "./CheckBox";
import StatusDropDown from "./StatusDropDown";
import PhoneInput from "./NumInput";
import { Button } from "@mui/material";

const iconMap: Record<string, FC<{ className?: string }>> = {
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

const categories = Object.keys(iconMap);

const CreateAd: FC = () => {
  const { cat } = useParams();
  const decodedCat = cat && decodeURIComponent(cat.toString());
  const [text, setText] = useState<string>("");
  const maxLength = 200;

  const category = decodedCat && categories.find((c) => c === decodedCat);
  const IconComponent = category ? iconMap[category] : null;

  return (
    <div className="flex justify-center items-end gap-5 w-full max-w-[40rem] mx-auto flex-col pb-10">
      <h2 className="text-xl font-medium text-gray">ثبت آگهی</h2>
      <span className="text-[1.125rem] text-black-primary">دستهٔ آگهی</span>;
      <div className="flex justify-between border-b  w-full flex-row-reverse  p-4">
        <div className="flex justify-center gap-5 flex-row-reverse">
          {IconComponent && (
            <IconComponent className="text-black-secondary text-2xl" />
          )}
          <div className="flex flex-col justify-between items-center">
            <span className="text-content-primary text-[0.875rem]">
              {decodedCat}
            </span>

            <div className="flex">
              <MdOutlineKeyboardArrowLeft className="text-black-secondary w-5" />
              <span className="text-content-secondary text-xs">
                {decodedCat}
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/create-Ad"
          className="flex justify-center gap-2 items-center cursor-pointer "
        >
          <MdOutlineKeyboardArrowLeft className="text-black-secondary text-[0.875rem]" />
          <span className="text-black-secondary text-[0.875rem]">
            تغییر دسته
          </span>
        </Link>
      </div>
      <ProvinceDropDown />
      <div className="w-full me-auto text-right flex gap-1 flex-col">
        <h3 className="text-base text-black-primary  pr-1">محله</h3>
        <input
          type="text"
          className="bg-white border hover:border-black-dark-100 border-black-medium-100  w-full mx-auto rounded-lg px-2 py-2  text-black placeholder:text-right text-right pl-10 "
          placeholder="محله"
        />
      </div>
      <div className="w-full text-right  items-end flex gap-2 flex-col">
        <h3 className="text-base text-black-primary  pr-1">* عکس آگهی</h3>
        <ImageUploader />
        <span className="text-base text-black-secondary">
          تعداد عکس‌های انتخاب شده نباید بیشتر ۳ از باشد.
        </span>
      </div>
      <PriceInput />
      <div className="w-full me-auto text-right flex gap-1 flex-col">
        <h3 className="text-base text-black-primary  pr-1">عنوان</h3>
        <input
          type="text"
          className="bg-white border hover:border-black-dark-100 border-black-medium-100  w-full mx-auto rounded-lg px-2 py-2  text-black placeholder:text-right text-right pl-10 "
          placeholder="عنوان"
        />
      </div>
      <CheckBox />
      <div className="w-full me-auto text-right flex gap-1 flex-col">
        <h3 className="text-base text-black-primary pr-1">توضیحات</h3>
        <textarea
          rows={3}
          value={text}
          maxLength={maxLength}
          onChange={(e) => setText(e.target.value)}
          className="bg-white border hover:border-black-dark-100 border-black-medium-100 w-full mx-auto rounded-lg px-2 py-2 text-black placeholder:text-right text-right resize-none"
          placeholder="توضیحات"
        />
      </div>
      <StatusDropDown />
      <PhoneInput />
      <div className="self-start flex justify-center items-center gap-3 mt-3">
        <Button
          variant="contained"
          sx={{ background: "#a62626" }}
          className="hover:bg-[#be3737] hover:shadow-none  whitespace-nowrap"
        >
          ثبت اطلاعات{" "}
        </Button>{" "}
        <Button
          variant="contained"
          sx={{ background: "white", color: " rgba(0, 0, 0, 0.56)" }}
          className="hover:bg-black/5 text-black-secondary hover:shadow-none  whitespace-nowrap bg-transparent text-content-primary"
        >
          انصراف
        </Button>
      </div>
    </div>
  );
};

export default CreateAd;
