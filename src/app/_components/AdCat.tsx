import { FC } from "react";
import CatDropdown from "./CatDropdown";

const AdCat: FC = () => {
  return (
    <div className="flex justify-center items-end gap-5 w-full max-w-[600px] mx-auto flex-col">
      <h2 className="text-xl font-medium text-gray">ثبت آگهی</h2>
      <span className="text-[1.125rem] text-black-primary">دستهٔ آگهی</span>

      <CatDropdown />
    </div>
  );
};

export default AdCat;
