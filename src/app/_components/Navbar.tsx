"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn, CiUser } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
import { GrSupport } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar: React.FC = () => {
  return (
    <>
      <header className=" z-50 border-b  flex flex-row-reverse fixed items-center justify-around py-4 ab top-0 w-full bg-white text-#000 text-base">
        <div className="flex items-center flex-row-reverse gap-4">
          <div className="flex items-center flex-row-reverse ">
            <Link href="/">
              <Image
                src="/images/divar.svg"
                width={200}
                className="hidden lg:block ml-2 cursor-pointer  h-12 w-12"
                height={200}
                alt="divar icon"
              />
            </Link>
            <hr
              className=" h-6 w-px mx-2 hidden lg:block bg-[#dbdbe4]"
              role="presentation"
            />

            <Button
              sx={{
                color: " rgba(0, 0, 0, 0.56)",
                padding: "0.5rem 1rem",
              }}
              className="flex gap-2 p-10 px-4 py-2 hover:bg-black-light-100  rounded transition-colors  transition-border duration-[360ms] ease-in-out  hover:text-black-primary text-black-secondary  items-center flex-row-reverse hover:bg-opacity-90"
            >
              <CiLocationOn className=" text-lg" />
              <span className="text-inherit text-base font-medium">کرج </span>
            </Button>
          </div>
          <div className="flex items-center flex-row-reverse gap-10 ">
            <Button
              sx={{
                color: "rgba(0, 0, 0, 0.56)",
                padding: "0.5rem  1rem",
              }}
              className="flex gap-2 px-4 py-2 hover:bg-black-light-100 rounded transition-colors transition-border duration-[360ms] ease-in-out hover:text-black-primary text-black-secondary items-center hover:bg-opacity-90"
            >
              <MdKeyboardArrowDown className="text-lg" size={20} />
              <span className="text-base font-medium whitespace-nowrap">
                دسته ها
              </span>
            </Button>

            <div className="relative w-full max-w-md">
              <input
                type="text"
                className="bg-[#f0f0f1] rounded-lg px-2 py-2 md:w-[25rem] lg:w-[30rem] text-black placeholder:text-right text-right pl-10 "
                placeholder="جستجو در همه آگهی ها"
              />
              <IoIosSearch className="absolute left-3 top-1/4 text-black-secondary   text-xl" />
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-4">
          <Button
            sx={{
              color: " rgba(0, 0, 0, 0.56)",
              padding: "0.5rem 1rem",
            }}
            className=" flex gap-2 px-4 py-2 hover:bg-black-light-100 rounded transition-colors transition-border duration-[360ms] ease-in-out hover:text-black-primary text-black-secondary items-center flex-row-reverse hover:bg-opacity-90"
          >
            <CiUser className="text-inherit font-medium text-lg" />
            <span className="text-inherit text-base font-medium  whitespace-nowrap">
              دیوار من
            </span>
          </Button>
          <Button
            sx={{
              color: " rgba(0, 0, 0, 0.56)",
              padding: "0.5rem 1rem",
            }}
            className="flex gap-2 px-4 py-2 hover:bg-black-light-100 rounded transition-colors transition-border duration-[360ms] ease-in-out hover:text-black-primary text-black-secondary items-center flex-row-reverse hover:bg-opacity-90"
          >
            <FiMessageCircle className="text-lg" />
            <span className="text-inherit text-base font-medium">چت</span>
          </Button>
          <Button
            sx={{
              color: " rgba(0, 0, 0, 0.56)",
              padding: "0.5rem 1rem",
            }}
            className="flex gap-2 p-10 px-4 py-2 hover:bg-black-light-100 rounded transition-colors  transition-border duration-[360ms] ease-in-out  hover:text-black-primary text-black-secondary  items-center flex-row-reverse hover:bg-opacity-90"
          >
            <GrSupport className="text-lg" />
            <span className="text-inherit text-base font-medium">پشتیبانی</span>
          </Button>
          <Link href="/create-Ad">
            <Button
              variant="contained"
              sx={{ background: "#a62626" }}
              className="hover:bg-[#be3737] hover:shadow-none  whitespace-nowrap"
            >
              ثبت آگهی
            </Button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
