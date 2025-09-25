import CatDropdown from "./CatDropdown";

const AdCat: React.FC = () => {
  return (
    <div className="flex justify-center items-end gap-5 w-full max-w-[600px] mx-auto flex-col">
      <h2 className="text-2xl font-medium text-black-primary dark:text-dark-white-primary">ثبت آگهی</h2>
      <span className="text-[1.125rem] text-black-primary dark:text-dark-white-primary">دستهٔ آگهی</span>

      <CatDropdown />
    </div>
  );
};

export default AdCat;
