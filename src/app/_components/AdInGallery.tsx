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
      <div className="w-[350px] h-[170px] flex justify-center col-start-2 row-start-2 items-center mx-auto grid-cols-2 grid-rows-2 rounded-lg">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      {ads.length === 0 ? (
        <span className="text-right   col-start-2 row-start-2 w-[350px] h-[170px] text-black-secondary text-base ">
          نتیجه‌ای یافت نشد. دسته‌بندی یا فیلترها را تغییر دهید
        </span>
      ) : (
        ads.map((ad) => (
          <Link
            href={`/${ad.id}`}
            key={ad.id}
            className="flex cursor-pointer p-4 w-[350px] h-[170px] justify-between border border-spacing-1 hover:shadow-md transition-shadow rounded-lg"
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
              <FiMessageCircle size={15} color="black" className="self-end" />
            </div>

            <div className="flex flex-col justify-between w-[calc(100%-180px)]">
              <h2 className="text-right text-black-primary text-base line-clamp-2">
                {ad.title}
              </h2>
              <div className="flex flex-col gap-2">
                <span className="text-right text-black-secondary text-sm">
                  {ad.status}
                </span>
                <div className="flex justify-start items-center flex-row-reverse gap-1">
                  <span className="text-right text-black-secondary text-sm">
                    {formatPrice(ad.price.toString())}
                  </span>
                  <span className="text-right text-black-secondary text-sm">
                    تومان
                  </span>
                </div>
                <span className="text-right text-black-primary text-sm">
                  <PersianRelativeTime
                    createdAt={ad.created_at}
                    fontSize="text-sm"
                  />
                  {ad.place} در
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
