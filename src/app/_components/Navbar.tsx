"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
import { GrSupport } from "react-icons/gr";
import { MdKeyboardArrowDown } from "react-icons/md";
import SearchBar from "./SearchBar";
import FilterProvidence from "./FilterProvidence";
import RegisterAd from "./RegisterAd";
import CategoryFilterForNavbar from "./CategoryFilterForNavbar";

const Navbar: React.FC = () => {
  return (
    <>
      <header className=" z-50 shadow-[0_1px_2px_0_rgba(0,0,0,0.12)] flex flex-row-reverse fixed items-center justify-around py-4 top-0 w-full bg-white text-#000 text-base">
        <div className=" flex items-center flex-row-reverse gap-4">
          <div className="flex items-center flex-row-reverse">
            <Link href="/ads">
              <Image
                src="/images/divar.svg"
                width={200}
                className="hidden lg:block ml-2 cursor-pointer h-12 w-12"
                height={200}
                alt="divar icon"
              />
            </Link>
            <hr
              className="h-6 w-px mx-2 hidden lg:block bg-[#dbdbe4]"
              role="presentation"
            />
            <FilterProvidence />
          </div>
          <div className="flex items-center flex-row-reverse gap-10">
          <CategoryFilterForNavbar />

            <SearchBar />
          </div>
        </div>
        <div className="flex flex-row-reverse gap-4">
          <Button
            variant="text"
            sx={{
              color: "rgba(0, 0, 0, 0.56)",
              padding: "0.5rem 1rem",
              display: "flex",
              gap: "0.5rem",
              flexDirection: "row-reverse",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                color: "rgba(0, 0, 0, 0.87)",
              },
            }}
          >
            <CiUser style={{ fontSize: "1.25rem" }} />
            <span style={{ fontSize: "1rem", fontWeight: 500, whiteSpace: "nowrap" }}>
              دیوار من
            </span>
          </Button>
          <Button
            variant="text"
            sx={{
              color: "rgba(0, 0, 0, 0.56)",
              padding: "0.5rem 1rem",
              display: "flex",
              gap: "0.5rem",
              flexDirection: "row-reverse",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                color: "rgba(0, 0, 0, 0.87)",
              },
            }}
          >
            <FiMessageCircle style={{ fontSize: "1.25rem" }} />
            <span style={{ fontSize: "1rem", fontWeight: 500 }}>
              چت
            </span>
          </Button>

          <Link href="https://divar.ir/helpAd" target="_blank">
            <Button
              variant="text"
              sx={{
                color: "rgba(0, 0, 0, 0.56)",
                padding: "0.5rem 1rem",
                display: "flex",
                gap: "0.5rem",
                flexDirection: "row-reverse",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  color: "rgba(0, 0, 0, 0.87)",
                },
              }}
            >
              <GrSupport style={{ fontSize: "1.25rem" }} />
              <span style={{ fontSize: "1rem", fontWeight: 500 }}>
                پشتیبانی
              </span>
            </Button>
          </Link>
          <RegisterAd />
        </div>
      </header>
    </>
  );
};

export default Navbar;
