
"use client";

import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { CiBookmark, CiCirclePlus, CiUser } from 'react-icons/ci'
import UserModal from './UserModal';
import { Button, Menu, MenuItem } from '@mui/material';
import { FaBookmark, FaMoon, FaPlusCircle, FaSun, FaUser } from 'react-icons/fa';
import { IoHome, IoHomeOutline } from 'react-icons/io5';
import { useUser } from '../_context/UserContext';
import {  BsChat, BsChatFill } from 'react-icons/bs';

export default function BottomNav() {
 const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2 ] = useState<null | HTMLElement>(null);
  const [anchorEl3, setAnchorEl3 ] = useState<null | HTMLElement>(null);
  const [dark, setDark] = useState<boolean>(false);

  const { user,logout } = useUser();


const pathname = usePathname()


  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const  handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const  handleClick3 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
  };



  const handleAuthenticatedMyAds = () => {
    router.push("/my-divar?filter=my-ads");
  };
  const handleAuthenticatedMyNotes = () => {
    router.push("/my-divar?filter=my-notes");
  };
  
  const handleAuthenticatedSavedAds = () => {
    router.push("/my-divar?filter=my-saved-ads");
  };
  
  const handleAuthenticatedCreateAd = () => {
    router.push("/ads/create-ad");
  }; 
  const handleAuthenticatedMyChatForMyAds = () => {
    router.push("/my-chat-for-my-ads");
  };
  const handleAuthenticatedMyChat = () => {
    router.push("/my-chat");
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
    <nav className="z-50 dark:bg-dark-gray-50 bg-dark-gray shadow-[0_1px_6px_0_rgba(0,0,0,0.1),0_-8px_32px_-4px_rgba(0,0,0,0.05),0_16px_24px_-6px_rgba(0,0,0,0.05)] fixed bottom-0 left-0 right-0     flex justify-around items-center h-20 flex-row-reverse  lg:hidden">
                  <Link href="/ads"   className= {` flex py-2 px-4 flex-col justify-between gap-3 items-center   dark:text-dark-white-secondary  dark:hover:bg-dark-white-light-100   hover:bg-black-light-100  ${pathname === "/ads" ?"dark:bg-dark-white-light-100 bg-black-light-100 " : ""}`}>
             {pathname === "/ads" ?    <IoHome    className="text-[1.4rem] text-brand " /> : <IoHomeOutline    className="text-[1.4rem] text-black-secondary  dark:text-dark-white-secondary "  />}
             <span
    className={`text-base md:text-lg whitespace-nowrap ${
      pathname === "/ads"
        ? "text-brand"
        : "text-black-secondary dark:text-dark-white-secondary"
    }`}
  >آگهی ها</span>
      </Link>
      <Button
  onClick={handleClick}

  sx={{
    padding: '0.5rem 1rem',
    display: 'flex',
    gap: '0.5rem',
    flexDirection: 'column',
    alignItems: 'center',
 
  }}
  className={` dark:text-dark-white-secondary  dark:hover:bg-dark-white-light-100 hover:bg-black-light-100  ${(pathname === "/my-divar?filter=my-notes" || pathname === "/my-divar?filter=my-saved-ads") ? "dark:bg-dark-white-light-100 bg-black-light-100 ": ""}`}
  variant="text"
>
{(pathname === "/my-divar?filter=my-notes" || pathname === "/my-divar?filter=my-saved-ads") ? (
  <FaBookmark className="text-[1.4rem] text-brand" />
) : (
  <CiBookmark className="text-[1.4rem] text-black-secondary" />
)}        <span
    className={`text-base md:text-lg whitespace-nowrap ${
      (pathname === "/my-divar?filter=my-notes" || pathname === "/my-divar?filter=my-saved-ads")
        ? "text-brand"
        : "text-black-secondary dark:text-dark-white-secondary"
    }`}
  >   نشان ها</span>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}  slotProps={{
              paper: {
                className: "bg-white dark:bg-black text-black-primary dark:text-dark-white-primary min-w-[100px] "
              }
            }}
          >
            <UserModal onAuthenticated={handleAuthenticatedSavedAds}>
                <MenuItem sx={{ justifyContent: 'center' }} onClick={() => handleClose2()}>آگهی های ذخیره شده</MenuItem>
            </UserModal>
         
            <UserModal onAuthenticated={handleAuthenticatedMyNotes}>
                <MenuItem sx={{ justifyContent: 'center' }} onClick={() => handleClose2()}>آگهی های یادداشت شده</MenuItem>
            </UserModal>
        
          </Menu>
      
                   
    <UserModal onAuthenticated={handleAuthenticatedCreateAd}  >
      
      <span className={`flex py-2 px-4 cursor-pointer flex-col justify-between gap-3 items-center hover:bg-black-light-100    dark:text-dark-white-secondary  dark:hover:bg-dark-white-light-100   ${pathname === "/ads/create-ad" ?"dark:bg-dark-white-light-100 bg-black-light-100  " : ""}`}>

        
{     pathname === "/ads/create-ad" ?    <FaPlusCircle   className="group- text-[1.4rem] text-brand " />:
   <CiCirclePlus   className="text-[1.4rem] text-black-secondary  dark:text-dark-white-secondary " />
}      <span
    className={`text-base md:text-lg whitespace-nowrap ${
      pathname === "/ads/create-ad"
        ? "text-brand"
        : "text-black-secondary dark:text-dark-white-secondary"
    }`}
  >
       ثبت آگهی
        </span> 
        </span>
      
    </UserModal>
  
 <Button 

sx={{
  padding: '0.5rem 1rem',
  display: 'flex',
  gap: '0.5rem',
  flexDirection: 'column',
  alignItems: 'center',
  color:  'rgba(0, 0, 0, 0.56)',
}}
className={` dark:text-dark-white-secondary    dark:hover:bg-dark-white-light-100 hover:bg-black-light-100 ${(pathname === "/my-chat-for-my-ads" || pathname === "/my-chat")  ? "dark:bg-dark-white-light-100 bg-black-light-100 ": ""}`}

            variant="text"
            onClick={handleClick2}
    
          >
     {(pathname === "/my-chat-for-my-ads" || pathname === "/my-chat") ? (
  <BsChatFill className="text-[1.4rem] text-brand" />
) : (
  <BsChat style={{ fontSize: "1.25rem" }} />
)}
           <span
    className={`text-base md:text-lg whitespace-nowrap ${
      (pathname === "/my-chat-for-my-ads" || pathname === "/my-chat")
        ? "text-brand"
        : "text-black-secondary dark:text-dark-white-secondary"
    }`}
  >    چت من
            </span>
          </Button>
          <Menu
  anchorEl={anchorEl2}
  open={Boolean(anchorEl2)}
  onClose={handleClose2}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  transformOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}
  slotProps={{
    paper: {
      className: "bg-white dark:bg-black text-black-primary dark:text-dark-white-primary min-w-[100px] "
    }
  }}
>
                   <UserModal onAuthenticated={handleAuthenticatedMyChat}>
                   <MenuItem sx={{ justifyContent: 'center' }} onClick={() => handleClose2()}>چت های من</MenuItem>
                   </UserModal>
                   
                   <UserModal onAuthenticated={handleAuthenticatedMyChatForMyAds}>
                   <MenuItem sx={{ justifyContent: 'center' }} onClick={() => handleClose2()}>چت آگهی من</MenuItem>
                   </UserModal>

            
         </Menu>

     <Button
  onClick={handleClick3}

  sx={{
    padding: '0.5rem 1rem',
    display: 'flex',
    gap: '0.5rem',
    flexDirection: 'column',
    alignItems: 'center',
 
  }}
  className={` dark:text-dark-white-secondary  dark:hover:bg-dark-white-light-100 hover:bg-black-light-100   ${pathname === "/my-divar?filter=my-ads" ? "dark:bg-dark-white-light-100 bg-black-light-100 ": ""}`}
  
  variant="text"
>
          {pathname === "/my-divar?filter=my-ads" ?  <FaUser className="text-[1.4rem] text-brand"/> : <CiUser className="text-[1.4rem] text-black-secondary" /> 
        }
          
          <span
    className={`text-base md:text-lg whitespace-nowrap ${
      pathname === "/my-divar?filter=my-ads"
        ? "text-brand"
        : "text-black-secondary dark:text-dark-white-secondary"
    }`}
  >     دیوار من
            </span>
          </Button>
          <Menu
            anchorEl={anchorEl3}
            open={Boolean(anchorEl3)}
            onClose={handleClose3}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}  slotProps={{
              paper: {
                className: "bg-white dark:bg-black text-black-primary dark:text-dark-white-primary min-w-[100px] "
              }
            }}
          >
           
            <UserModal onAuthenticated={handleAuthenticatedMyAds}>
                <MenuItem sx={{ justifyContent: 'center' }} onClick={() => handleClose3()}>آگهی های من</MenuItem>
            </UserModal>
     <UserModal onAuthenticated={() => handleClose3()}>
                <MenuItem sx={{ justifyContent: 'center' }} onClick={() => logout()}>{user ? "خروج" : "ورود" }</MenuItem>
          
            </UserModal>
        
            <MenuItem sx={{ justifyContent: 'center', display:"flex" , gap:"0.75rem" }} onClick={() => setDark((prev) => !prev)}>
              <span>{dark ? "حالت روز" : "حالت شب "}</span>
              <span>{dark ? <FaSun color="white" /> : <FaMoon color="black" />}</span>
            </MenuItem>
          </Menu>
    </nav>
  )
}
