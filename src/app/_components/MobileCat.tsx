import Image from "next/image";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

const lightCategoriesImages= [
    {
      name: "املاک",
      img: "/mobile-cat/for-light-mode/real-estate.png",
    },
    {
      name: "وسایل نقلیه",
      img: "/mobile-cat/for-light-mode/vehicles.png",
    },
    {
      name: "کالای دیجیتال",
      img: "/mobile-cat/for-light-mode/electronic-devices.png",
    },
    {
      name: "خانه و آشپزخانه",
      img: "/mobile-cat/for-light-mode/home-kitchen.png",
    },
    {
      name: "خدمات",
      img: "/mobile-cat/for-light-mode/services.png",
    },
    {
      name: "وسایل شخصی",
      img: "/mobile-cat/for-light-mode/personal.png",
    },
    {
      name: "سرگرمی و فراغت",
      img: "/mobile-cat/for-light-mode/leisure-hobbies.png",
    },
    {
      name: "اجتماعی",
      img: "/mobile-cat/for-light-mode/community.png",
    },
    {
      name: "تجهیزات و صنعتی",
      img: "/mobile-cat/for-light-mode/tools-materials-equipment.png",
    },
    {
      name: "استخدام و کاریابی",
      img: "/mobile-cat/for-light-mode/jobs.png",
    },
  ];

const darkCategoriesImages= [
  {
      name: "املاک",
      img: "/mobile-cat/for-dark-mode/real-estate.png",
    },
    {
      name: "وسایل نقلیه",
      img: "/mobile-cat/for-dark-mode/vehicles.png",
    },
    {
      name: "کالای دیجیتال",
      img: "/mobile-cat/for-dark-mode/electronic-devices.png",
    },
    {
      name: "خانه و آشپزخانه",
      img: "/mobile-cat/for-dark-mode/home-kitchen.png",
    },
    {
      name: "خدمات",
      img: "/mobile-cat/for-dark-mode/services.png",
    },
    {
      name: "وسایل شخصی",
      img: "/mobile-cat/for-dark-mode/personal.png",
    },
    {
      name: "سرگرمی و فراغت",
      img: "/mobile-cat/for-dark-mode/leisure-hobbies.png",
    },
    {
      name: "اجتماعی",
      img: "/mobile-cat/for-dark-mode/community.png",
    },
    {
      name: "تجهیزات و صنعتی",
      img: "/mobile-cat/for-dark-mode/tools-materials-equipment.png",
    },
    {
      name: "استخدام و کاریابی",
      img: "/mobile-cat/for-dark-mode/jobs.png",
    },
  ];


  interface MobileCatProps {
    setIsFilterModalOpen: (value:boolean) => void;
  }
  
  const MobileCat: React.FC<MobileCatProps> = ({ setIsFilterModalOpen }) => {
  
  const router = useRouter();
  
const handleCategorySelect = (category: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set("category", category);
  url.searchParams.delete("subCategory1");
  url.searchParams.delete("subCategory2");
  router.push(url.toString());
  setIsFilterModalOpen(true)
};
  return (
    <>
<div className="grid w-full grid-cols-4 text-right justify-center content-center dark:hidden gap-4 md:hidden p-4">
    {lightCategoriesImages.slice(0, 9).map((cat, idx) => (
      <div onClick={()=>handleCategorySelect(cat.name)} key={idx} className="flex cursor-pointer flex-col items-center">
        <div className="w-16 h-16 relative mb-2">
          <Image src={cat.img} alt={cat.name} fill className="object-contain" />
        </div>
        <span className="text-xs  text-center text-black-secondary font-medium	 mt-1">{cat.name}</span>
      </div>
    ))}
  </div>
<div className="w-full grid-cols-4 text-right gap-4 hidden dark:grid  dark:md:hidden p-4">
    {darkCategoriesImages.slice(0, 9).map((cat, idx) => (
      <div onClick={()=>handleCategorySelect(cat.name)} key={idx} className="flex cursor-pointer flex-col items-center">
        <div className="w-16 h-16 relative mb-2">
          <Image src={cat.img} alt={cat.name} fill className="object-contain" />
        </div>
        <span className="text-xs  text-center text-dark-white-secondary font-medium	 mt-1">{cat.name}</span>
      </div>
    ))}
  </div>
    </>
  );
};

export default MobileCat;
