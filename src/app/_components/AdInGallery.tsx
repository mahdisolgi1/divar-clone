"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { getAds } from "../_lib/data-service";
import { Ad } from "../_types/modalTypes";
import Link from "next/link";
import { formatPrice } from "../_utils/formatPrice";
import Spinner from "./Spinner";

const AdInGallery: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const fetchedAds = await getAds();
        if (Array.isArray(fetchedAds)) {
          setAds(fetchedAds);
        } else {
          console.error("Fetched data is not an array", fetchedAds);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center w-full items-center  col-start-2">
        <Spinner />
      </div>
    );
  }
  console.log(ads);
  return (
    <div>
      {ads.length === 0 ? (
        <p>No ads available.</p>
      ) : (
        ads.map((ad) => (
          <Link
            href={`/${ad.id}`}
            key={ad.id}
            className="flex cursor-pointer p-4 justify-between border border-spacing-1"
          >
            <div className="flex w-1/2 gap-1">
              {ad.img1 ? (
                <Image
                  width={600}
                  height={300}
                  className="w-5/6"
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

            <div className="flex flex-col justify-between">
              <h2 className="text-right text-black-primary text-base">
                {ad.title}
              </h2>
              <div className="flex flex-col">
                <span className="text-right text-black-secondary text-[0.875rem]">
                  {ad.status}
                </span>
                <span className="text-right text-black-secondary text-[0.875rem]">
                  {formatPrice(ad.price.toString())}
                </span>
                <span className="text-right text-black-primary text-[0.875rem]">
                  {ad.place}
                </span>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default AdInGallery;
