import Image from "next/image";
import { FiMessageCircle } from "react-icons/fi";
import { Ad } from "../_types/modalTypes";
import Link from "next/link";
import { formatPrice } from "../_utils/formatPrice";
import Spinner from "./Spinner";

interface AdInGalleryProps {
  loading: boolean;
  ads: Ad[];
}

const AdInGallery: React.FC<AdInGalleryProps> = ({ loading, ads }) => {
  if (loading) {
    return (
      <div className="flex justify-center w-full items-center  col-start-2">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      {ads.length === 0 ? (
        <span className="text-right  w-96 col-start-2 text-black-secondary text-base ">
          نتیجه‌ای یافت نشد. دسته‌بندی یا فیلترها را تغییر دهید
        </span>
      ) : (
        ads.map((ad) => (
          <Link
            href={`/${ad.id}`}
            key={ad.id}
            className="flex cursor-pointer p-4 w-[19rem] h-40 justify-between border border-spacing-1"
          >
            <div className="flex w-1/2 gap-1">
              {ad.img1 ? (
                <Image
                  width={600}
                  height={300}
                  className="w-5/6 "
                  src={ad.img1}
                  alt={ad.title}
                />
              ) : (
                <Image
                  width={600}
                  height={300}
                  className="w-5/6"
                  src="/images/emptyAdImg.png"
                  alt="Default image"
                />
              )}

              <FiMessageCircle size={15} color="black" className="self-end" />
            </div>

            <div className="flex flex-col  justify-between">
              <h2 className="text-right text-black-primary text-base">
                {ad.title}
              </h2>
              <div className="flex flex-col">
                <span className="text-right text-black-secondary text-[0.875rem]">
                  {ad.status}
                </span>
                <div className="flex justify-center items-center flex-row-reverse gap-1">
                  <span className="text-right text-black-secondary text-[0.875rem] ">
                    {formatPrice(ad.price.toString())}
                  </span>
                  <span className="text-right text-black-secondary text-[0.875rem] ">
                    تومان
                  </span>
                </div>
                <span className="text-right text-black-primary text-[0.875rem]">
                  {ad.place}
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
