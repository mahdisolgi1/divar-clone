"use client";
import ProvinceSelector from "./_components/ProvinceSelector";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const savedProvince = localStorage.getItem("selectedProvince");
    if (savedProvince) {
      router.push(`/ads?province=${savedProvince}`);
    }
  }, [router]);

  return (
    <div className="mt-28">
      <ProvinceSelector />
    </div>
  );
};

export default Page;
