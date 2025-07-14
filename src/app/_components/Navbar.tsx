"use client";
import { Button, Menu, MenuItem } from "@mui/material";
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserModal from "./UserModal";
import { FaMoon, FaSun } from "react-icons/fa";


interface NavbarProps {
  isUsedInGallery?: boolean; }

const Navbar: React.FC<NavbarProps> = ({ isUsedInGallery= false  }) => { 
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2 ] = useState<null | HTMLElement>(null);
  const [dark, setDark] = useState<boolean>(false);

  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const  handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  const handleAuthenticated1 = () => {
    router.push("/ads/create-ad");
  };

  const handleAuthenticated2 = () => {
    router.push("/ads/create-ad");
  };

  useEffect(() => {

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);


  return (
    <>
      <header className={` z-50 shadow-[0_1px_2px_0_rgba(0,0,0,0.12)] dark:border-[#2c2c2c] dark:border-b dark:border-transparent flex flex-row-reverse fixed items-center py-4 top-0 w-full bg-white text-#000 text-base ${isUsedInGallery ? "justify-around": "justify-between px-24"} dark:bg-black `}>
        <div className=" flex  items-center flex-row-reverse gap-4">
          <div className="flex items-center flex-row-reverse ">
            <Link href="/ads">
              <Image
                src="/images/divar.svg"
                width={200}
                className="hidden lg:block ml-2 cursor-pointer h-12 w-12"
                height={200}
                alt="divar icon"
              />
            </Link>
          {isUsedInGallery && <>
          <hr
              className="h-6 w-px mx-2 hidden lg:block bg-[#dbdbe4]"
              role="presentation"
              />
            <FilterProvidence />
              </>  
            }
          </div>
        {isUsedInGallery &&  <div className="flex items-center flex-row-reverse gap-10">
          <CategoryFilterForNavbar />

            <SearchBar />
          </div>}
        </div>
        <div className="flex flex-row-reverse gap-4">
      
        <Button
  onClick={handleClick}

  sx={{
    padding: '0.5rem 1rem',
    display: 'flex',
    gap: '0.5rem',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    color:  'rgba(0, 0, 0, 0.56)',
    '&:hover': {
      backgroundColor:  'rgba(0, 0, 0, 0.04)',
      color: 'rgba(0, 0, 0, 0.87)',
    },
  }}
  className=" dark:text-dark-white-secondary  dark:hover:bg-dark-white-light-100  dark:hover:text-dark-white-primary "
  
  variant="text"
>
            <CiUser className="text-[1.4rem]" />
            <span style={{ fontSize: "1rem", fontWeight: 500 }}>
            دیوار من
            </span>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}  slotProps={{
              paper: {
                className: "bg-white dark:bg-black text-black-primary dark:text-dark-white-primary min-w-[200px]"
              }
            }}
          >
            <UserModal onAuthenticated={handleAuthenticated2}>
              <Link href="/my-divar?filter=my-saved-ads">
                <MenuItem sx={{ justifyContent: 'center' }} onClick={() => handleClose2()}>آگهی های ذخیره شده</MenuItem>
              </Link>
            </UserModal>
            <UserModal onAuthenticated={handleAuthenticated2}>
              <Link href="/my-divar?filter=my-ads">
                <MenuItem sx={{ justifyContent: 'center' }} onClick={() => handleClose2()}>آگهی های من</MenuItem>
              </Link>
            </UserModal>
            <UserModal onAuthenticated={handleAuthenticated2}>
              <Link href="/my-divar?filter=my-notes">
                <MenuItem sx={{ justifyContent: 'center' }} onClick={() => handleClose2()}>آگهی های یادداشت شده</MenuItem>
              </Link>
            </UserModal>
            <MenuItem sx={{ justifyContent: 'center', display:"flex" , gap:"0.75rem" }} onClick={() => setDark((prev) => !prev)}>
              <span>{dark ? "حالت روز" : "حالت شب "}</span>
              <span>{dark ? <FaSun color="white" /> : <FaMoon color="black" />}</span>
            </MenuItem>
          </Menu>
          <Button 

sx={{
  padding: '0.5rem 1rem',
  display: 'flex',
  gap: '0.5rem',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  color:  'rgba(0, 0, 0, 0.56)',
  '&:hover': {
    backgroundColor:  'rgba(0, 0, 0, 0.04)',
    color: 'rgba(0, 0, 0, 0.87)',
  },
}}
className=" dark:text-dark-white-secondary  dark:hover:bg-dark-white-light-100  dark:hover:text-dark-white-primary "

            variant="text"
            onClick={handleClick2}
    
          >
            <FiMessageCircle style={{ fontSize: "1.25rem" }} />
            <span style={{ fontSize: "1rem", fontWeight: 500 }}>
              چت
            </span>
          </Button>
          <Menu
  anchorEl={anchorEl2}
  open={Boolean(anchorEl2)}
  onClose={handleClose2}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  slotProps={{
    paper: {
      className: "bg-white dark:bg-black text-black-primary dark:text-dark-white-primary min-w-[200px]"
    }
  }}
>
                   <UserModal onAuthenticated={handleAuthenticated1}>
                   <Link href="/my-chat">
                   <MenuItem sx={{ justifyContent: 'center' }} onClick={() => handleClose()}>چت های من</MenuItem>
                   </Link>
                   </UserModal>
                   
                   <UserModal onAuthenticated={handleAuthenticated1}>
                   <Link href="/my-chat-for-my-ads">
                   <MenuItem sx={{ justifyContent: 'center' }} onClick={() => handleClose()}>چت آگهی من</MenuItem>
                   </Link>
                   </UserModal>

            
         </Menu>

          <Link href="https://www.linkedin.com/in/mahdi-solgi" target="_blank">
            <Button

sx={{
  padding: '0.5rem 1rem',
  display: 'flex',
  gap: '0.5rem',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  color:  'rgba(0, 0, 0, 0.56)',
  '&:hover': {
    backgroundColor:  'rgba(0, 0, 0, 0.04)',
    color: 'rgba(0, 0, 0, 0.87)',
  },
}}
className=" dark:text-dark-white-secondary  dark:hover:bg-dark-white-light-100  dark:hover:text-dark-white-primary "


              variant="text"

            >
              <GrSupport className="text-xl" />
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
