"use client";
import AdInGallery from "./AdInGallery";
import { Ad } from "../_types/modalTypes";
import { useEffect, useState } from "react";
import { getAdByUserID, getMyNotes, getMySavedAds } from "../_lib/data-service";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "../_context/UserContext";
import MyAd from "./MyAd";

const MyDivar: React.FC = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const { user } = useUser();
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        let data;
        switch (filter) {
          case "my-ads":
            data = await getAdByUserID(user.id);
            break;
          case "my-saved-ads":
            const savedAds = await getMySavedAds(user.id);
            data = savedAds?.map(saved => saved.ad);
            break;
          case "my-notes":
            const notes = await getMyNotes(user.id);
            data = notes?.map(note => note.adID);
            break;
          default:
            data = await getAdByUserID(user.id);
        }
        setAds(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter, user?.id]);

  let title = "";
  switch (filter) {
    case "my-ads":
      title = "آگهی‌های من";
      break;
    case "my-saved-ads":
      title = "آگهی‌های ذخیره شده";
      break;
    case "my-notes":
      title = "یادداشت‌های من";
      break;
    default:
      title = "آگهی‌های من";
  }
if (filter === "my-ads"){
  return (
    <section className="flex justify-center gap-12">
      <div>
        <h1 className="text-right text-black-secondary dark:text-dark-white-secondary mr-56 mb-4">
          {title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-auto">
          <MyAd ads={ads} loading={loading} setAds={setAds} />
        </div>
      </div>
    </section>
  );
};

  return (
    <section className="flex justify-center gap-12">
      <div>
        <h1 className="text-right text-black-secondary dark:text-dark-white-secondary mb-4">
          {title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-auto">
          <AdInGallery ads={ads} loading={loading} />
        </div>
      </div>
    </section>
  );
};

export default MyDivar;