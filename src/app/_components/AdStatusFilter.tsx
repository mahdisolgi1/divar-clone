import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import StatusDropDown from "./StatusDropDown";
interface AdStatusFilterProps {
  isExchangeOpen: boolean;
  onIsExchangeOpen: (value: boolean) => void;
  onStatus: (status: string) => void;
  status: string;
}
const AdStatusFilter: React.FC<AdStatusFilterProps> = ({
  isExchangeOpen,
  onIsExchangeOpen,
  onStatus,
  status,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full border-b z-40 cursor-pointer  border-[#858585] dark:border-[#2c2c2c]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="text-black-primary p-4 text-right flex justify-end items-center gap-2 font-medium cursor-pointer"
      >
        {(Boolean(status) || isExchangeOpen) && (
          <span
            className="hover:bg-[rgba(166,38,38,0.08)] p-2 absolute left-2 top-1/5 rounded-full text-xs text-brand dark:text-dark-brand"
            onClick={() => {
              onIsExchangeOpen(false);
              onStatus("");
            }}
          >
            حذف
          </span>
        )}

        <span className="text-xs  text-black-primary dark:text-dark-white-primary">وضعیت آگهی</span>
        <MdKeyboardArrowDown
          className={`text-[0.875rem]  text-black-primary dark:text-dark-white-primary text-lg transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className=" pb-4 flex flex-col gap-4">
          <div className="flex flex-row-reverse justify-between items-center">
            <h3 className="text-base text-black-primary  pr-1">
              آماده برای معاوضه
            </h3>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={isExchangeOpen}
                onChange={() => onIsExchangeOpen(!isExchangeOpen)}
                className="sr-only peer"
              />

              <div className="w-12 h-6 bg-black-medium-200 dark:bg-dark-white-medium-100 rounded-full peer-checked:bg-brand transition-colors duration-300 relative">
                <div
                  className={`absolute top-1 right-1 w-4 h-4 bg-white dark:bg-dark-gray-750 rounded-full shadow-sm transition-transform duration-300 ${
                    isExchangeOpen ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </label>
          </div>

          <StatusDropDown onStatus={onStatus} status={status} />
        </div>
      </div>
    </div>
  );
};

export default AdStatusFilter;
