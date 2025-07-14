import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoClose } from "react-icons/io5"; // Import close icon
import { formatPrice } from "../_utils/formatPrice";

interface PriceFilterProps {
  minPrice: string;
  maxPrice: string;
  onMinPrice: (value: string) => void;
  onMaxPrice: (value: string) => void;
}
export const convertToStandardNumerals = (value: string): string => {
  const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
  return value
    .split("")
    .map((char) => {
      const index = persianNumbers.indexOf(char);
      return index !== -1 ? index.toString() : char;
    })
    .join("")
    .replace(/[٬,]/g, "");
};

const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  onMinPrice,
  onMaxPrice,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = convertToStandardNumerals(e.target.value);
    onMinPrice(rawValue);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = convertToStandardNumerals(e.target.value);
    onMaxPrice(rawValue);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];
    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <div className="w-full  border-y  border-[#858585] dark:border-[#2c2c2c]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="text-black-primary dark:text-dark-white-primary relative p-4 text-right flex justify-end items-center gap-2 font-medium cursor-pointer"
      >
        {(minPrice || maxPrice) && (
          <span
            className="hover:bg-[rgba(166,38,38,0.08)] p-2 absolute left-2 top-1/5 rounded-full text-xs text-brand"
            onClick={() => {
              onMaxPrice("");
              onMinPrice("");
            }}
          >
            حذف
          </span>
        )}
        <span className="text-xs text-black-primary dark:text-dark-white-primary">قیمت</span>
        <MdKeyboardArrowDown
          className={`text-[0.875rem] text-lg  text-black-primary dark:text-dark-white-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className=" pb-4 flex flex-col gap-4 items-end">
          <div className="relative w-full">
            <input
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="حداقل قیمت"
              className="bg-[#f0f0f1] border focus:outline-none text-black-primary dark:text-dark-white-primary  dark:bg-dark-white-light-200  hover:border-black-dark-100 border-black-medium-100 dark:border-dark-white-medium-100 w-full rounded-lg px-2 py-2 text-black placeholder:text-right text-right pl-10 pr-8 appearance-none no-spinner"
              value={formatPrice(minPrice)}
              onChange={handleMinPriceChange}
            />

            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black-hint dark:text-dark-white-hint">
              تومان
            </span>

            {minPrice && (
              <IoClose
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black-secondary dark:text-dark-white-secondary cursor-pointer hover:text-black-primary dark:text-dark-white-primary"
                size={18}
                onClick={() => onMinPrice("")}
              />
            )}
          </div>

          <div className="relative w-full">
            <input
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="حداکثر قیمت"
              className="bg-[#f0f0f1] border  focus:outline-none  text-black-primary dark:text-dark-white-primary dark:bg-dark-white-light-200  hover:border-black-dark-100 border-black-medium-100 dark:border-dark-white-medium-100 w-full rounded-lg px-2 py-2 text-black placeholder:text-right text-right pl-10 pr-8 appearance-none no-spinner"
              value={formatPrice(maxPrice)}
              onChange={handleMaxPriceChange}
            />

            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black-hint dark:text-dark-white-hint">
              تومان
            </span>

            {maxPrice && (
              <IoClose
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black-secondary dark:text-dark-white-secondary cursor-pointer hover:text-black-primary dark:text-dark-white-primary"
                size={18}
                onClick={() => onMaxPrice("")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
