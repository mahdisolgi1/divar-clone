import Image from "next/image";
import { FC } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import AdInGallery from "./AdInGallery";
const Gallery: FC = () => {
  return (
    <section>
      <div className="flex justify-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3 mr-[300px]">
          <p className="text-right text-black-secondary lg:col-span-3 md:col-span-2">
            انواع آگهی‌ها و نیازمندی های کرج
          </p>

          <AdInGallery />
        </div>
        <div className="flex p-[32px_20px_0_20px] flex-col text-right w-1/4 gap-5 fixed right-0 h-screen overflow-y-auto filter-section">
          <div className="flex   flex-col text-right justify-start gap-2   items-end">
            <span className=" text-[0.875rem] text-xs text-black-primary">
              دسته ها
            </span>
            <span className=" text-[0.875rem]  leading-8 text-black-secondary text-right">
              املاک
            </span>
            <span className=" text-[0.875rem] text-black-secondary text-right">
              وسایل نقلیه
            </span>
            <span className=" text-[0.875rem] text-black-secondary text-right">
              کالای دیجیتال
            </span>
            <span className=" text-[0.875rem] text-black-secondary text-right">
              خانه و آشپزخانه
            </span>
            <span className=" text-[0.875rem] text-black-secondary text-right">
              خدمات
            </span>
            <span className=" text-[0.875rem] text-black-secondary text-right">
              وسایل شخصی
            </span>
            <span className=" text-[0.875rem] text-black-secondary text-right">
              سرگرمی و فراغت
            </span>
            <span className=" text-[0.875rem] text-black-secondary text-right">
              اجتماعی
            </span>
            <span className=" text-[0.875rem] text-black-secondary text-right">
              تجهیزات و صنعتی
            </span>
            <span className=" text-[0.875rem] text-black-secondary text-right">
              استخدام و کاریابی
            </span>
            <span className=" text-[0.875rem] text-black-secondary text-right">
              استخدام و کاریابی
            </span>
            <span className=" text-[0.875rem] text-black-secondary text-right">
              استخدام و کاریابی
            </span>
            <span className=" text-[0.875rem] text-black-secondary text-right">
              استخدام و کاریابی
            </span>
          </div>
          <div>
            <div className="text-black-primary border-y w-full border-[#dbdbe4] p-4 text-right self-end flex justify-end items-center font-medium gap-2">
              <span className="text-xs">محل</span>
              <MdKeyboardArrowDown className=" text-[0.875rem] text-lg" />
            </div>
            <div className="text-black-primary border-b  p-4 text-right self-end border-[#dbdbe4] flex w-full justify-end  items-center gap-2 font-medium">
              <span className="text-xs">قیمت</span>
              <MdKeyboardArrowDown className=" text-[0.875rem] text-lg" />
            </div>
            <div className="text-black-primary border-b  p-4 text-right self-end border-[#dbdbe4] flex w-full justify-end  items-center gap-2 font-medium">
              <span className="text-xs">قیمت</span>
              <MdKeyboardArrowDown className=" text-[0.875rem] text-lg" />
            </div>
          </div>
          <div>
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
          <div className="flex items-center justify-center">
            <Image
              width={100}
              height={100}
              src="/images/inema.png"
              alt="inema"
            />
            <Image
              width={100}
              height={100}
              src="/images/samandeh.png"
              alt="samandeh"
            />
            <Image
              width={100}
              height={100}
              src="/images/enamad.png"
              alt="inema"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
