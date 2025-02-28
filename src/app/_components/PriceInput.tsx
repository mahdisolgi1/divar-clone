import { useState } from "react";

const PriceInput: React.FC = () => {
  const [price, setPrice] = useState<string>("");

  const formatPrice = (num: string): string => {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    let persianNum = "";
    for (let i = 0; i < num.length; i++) {
      const char = num[i];
      if (/\d/.test(char)) {
        persianNum += persianNumbers[parseInt(char)];
      } else {
        persianNum += char;
      }
    }

    let withSeparators = "";
    let count = 0;
    for (let i = persianNum.length - 1; i >= 0; i--) {
      withSeparators = persianNum[i] + withSeparators;
      count++;
      if (count % 3 === 0 && i !== 0) {
        withSeparators = "٬" + withSeparators;
      }
    }

    return withSeparators;
  };

  return (
    <div className="w-full me-auto text-right flex gap-1 flex-col">
      <h3 className="text-base text-black-primary pr-1">قیمت</h3>
      <div className="relative">
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="bg-white border hover:border-black-dark-100 border-black-medium-100 w-full mx-auto rounded-lg px-2 py-2 text-black placeholder:text-right text-right pl-10 appearance-none no-spinner"
          placeholder="قیمت"
        />

        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black-hint">
          تومان
        </span>
      </div>

      {price && (
        <div className="flex justify-end gap-1">
          <span className="text-base text-black-primary text-right mt-1">
            تومان
          </span>
          <span className="text-base text-black-primary text-right mt-1">
            {formatPrice(price)}
          </span>
        </div>
      )}

      <style jsx>{`
        .no-spinner::-webkit-inner-spin-button,
        .no-spinner::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-spinner {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default PriceInput;
