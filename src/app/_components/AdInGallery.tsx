"use client"
import Image from "next/image";
import { FiMessageCircle } from "react-icons/fi";
import { Ad } from "../_types/modalTypes";
import Link from "next/link";
import { formatPrice } from "../_utils/formatPrice";
import Spinner from "./Spinner";
import PersianRelativeTime from "./PersianRelativeTime";

interface AdInGalleryProps {
  loading: boolean;
  ads: Ad[];
}

const AdInGallery: React.FC<AdInGalleryProps> = ({ loading, ads }) => {
  if (loading) {
    return (
      <div className="w-[350px] h-[170px] flex  justify-center col-start-2 row-start-2 items-center mx-auto grid-cols-2 grid-rows-2 rounded-lg">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      {ads?.length === 0 ? (
        
        <div className="  col-start-2 row-start-2 text-nowrap flex flex-col items-center justify-center gap-2 ">
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
            className="flex cursor-pointer  dark:border  dark:border-[#2c2c2c] shadow-[0_0_0_1px_rgba(0,0,0,0.12)] p-4 w-[350px] h-[170px] justify-between  dark:border-spacing-1 transition-shadow rounded-sm "
          >
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

            <div className="flex flex-col justify-between w-[calc(100%-180px)]">
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

export default AdInGallery;
