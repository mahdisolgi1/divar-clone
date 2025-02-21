"use client";
import Image from "next/image";
import { FC, useState, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { getAds } from "../_lib/data-service";
import { useRouter } from "next/navigation";
interface AdProps {
  ad: {
    id: number;
    created_at: string;
    title: string;
    status: string;
    price: number;

    place: string;
    img1: string | null;
  };
}

const AdInGallery: FC = () => {
  const [ads, setAds] = useState<AdProps["ad"][]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const fetchedAds = await getAds();

        console.log("Fetched Ads:", fetchedAds);
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

  console.log(ads);
  const handleClick = (id: number) => {
    router.push(`/${id.toString()}`);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(ads);
  return (
    <div className="ads-gallery">
      {ads.length === 0 ? (
        <p>No ads available.</p>
      ) : (
        ads.map((ad) => (
          <div
            onClick={() => handleClick(ad.id)}
            key={ad.id}
            className="flex cursor-pointer p-4 justify-between border border-spacing-1"
          >
            <div className="flex w-1/2 gap-1">
              {ad.img1 && ad.img1.startsWith("http") ? (
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
                  {ad.price}
                </span>
                <span className="text-right text-black-primary text-[0.875rem]">
                  {ad.place}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdInGallery;
