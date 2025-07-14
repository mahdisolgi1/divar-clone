"use client"
import Image from "next/image";
import { FiMessageCircle, FiMenu as Hamburgerme } from "react-icons/fi";
import { Ad } from "../_types/modalTypes";
import Link from "next/link";
import { formatPrice } from "../_utils/formatPrice";
import Spinner from "./Spinner";
import PersianRelativeTime from "./PersianRelativeTime";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { deleteAd } from "../_lib/data-service";
import { useUser } from "../_context/UserContext";

interface MyAdProps {
  loading: boolean;
  ads: Ad[];
  setAds: React.Dispatch<React.SetStateAction<Ad[]>>;
}

const MyAd: React.FC<MyAdProps> = ({ loading, ads, setAds })  => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useUser();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleremove = async (id: number) => {
    if (!user?.id) return;
    try {
     await deleteAd(id, user.id);
  
      setAds(prevAds => prevAds.filter(ad => ad.id !== id));
    } catch (error) {
      console.error('Error removing ad:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-[350px] h-[170px] flex justify-center col-start-2 row-start-2 items-center mx-auto grid-cols-2 grid-rows-2 rounded-lg">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      {ads?.length === 0 ? (
        <div className="   col-start-2 row-start-2 text-nowrap flex flex-col items-center justify-center gap-2 ">
        <h4 className="text-right text-base  text-black-primary dark:text-dark-white-primary  ">
.نتیجه‌ای برای جستجوی شما پیدا نشد
</h4>
<span className="text-black-secondary dark:text-dark-white-secondary text-[0.875rem]">
  .پیشنهاد می‌کنیم که دسته و فیلترهای انتخابی خود را بازبینی کنید
</span>
        </div>
      ) : (
        ads?.map((ad) => (
          <Link
            href={`/ads/${ad?.id}`}
            key={ad?.id}
            className="flex relative cursor-pointer shadow-[0_0_0_1px_rgba(0,0,0,0.12)] p-4 w-[350px] h-[170px] justify-between  border-spacing-1 transition-shadow rounded-sm "
          >
        <span className="absolute top-5 right-5" onClick={handleClick}>
          <Hamburgerme color="black"  size={20}/>
          </span><Menu
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
            }}
          >
          
            <MenuItem onClick={() => handleremove(ad.id)}>remove </MenuItem>
            <Link href={`/my-divar/${ad.id}`}><MenuItem >edit</MenuItem></Link>
            </Menu>
            <div className="flex w-[160px] h-full gap-1">
              {ad.img1 ? (
                <Image
                  width={170}
                  height={180}
                  className="w-full h-full object-cover rounded-md"
                  src={ad.img1}
                  alt={ad.title}
                />
              ) : (
                <Image
                  width={170}
                  height={180}
                  className="w-full h-full object-cover rounded-md"
                  src="/images/emptyAdImg.png"
                  alt="Default image"
                />
              )}
              <FiMessageCircle
                size={25}
                className="self-end text-black-secondary dark:text-dark-white-secondary"
              />
            </div>

            <div className="flex flex-col justify-between pt-7 w-[calc(100%-180px)]">
              <h2 className="text-right text-black-primary dark:text-dark-white-primary text-base line-clamp-2">
                {ad.title}
              </h2>
              <div className="flex flex-col gap-2">
                <span className="text-right text-black-secondary dark:text-dark-white-secondary text-sm">
                  {ad.status}
                </span>
                <div className="flex justify-start items-center flex-row-reverse gap-1">
                  <span className="text-right text-black-secondary dark:text-dark-white-secondary text-sm">
                    {formatPrice(ad.price.toString())}
                  </span>
                  <span className="text-right text-black-secondary dark:text-dark-white-secondary text-sm">
                    تومان
                  </span>
                </div>
                <span className="text-right text-black-primary dark:text-dark-white-primary text-sm">
                  <PersianRelativeTime
                    createdAt={ad.created_at}
                    fontSize="text-sm"
                  />
                  {ad.place ? ` در ${ad.place.city}` : ''}
                </span>
              </div>
            </div>
          </Link>
        ))
      )}
    </>
  );
};

export default MyAd;
