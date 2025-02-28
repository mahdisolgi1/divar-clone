import { useState } from "react";

const PhoneInput: React.FC = () => {
  const [phone, setPhone] = useState<string>("");

  const toPersianNumbers = (num: string): string => {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num.replace(/\d/g, (match) => persianNumbers[parseInt(match)]);
  };

  const formatPhoneNumber = (num: string): string => {
    const cleaned = num.replace(/\D/g, "");

    const match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return cleaned;
  };

  return (
    <div className="w-full me-auto text-right flex gap-1 flex-col">
      <h3 className="text-base text-black-primary pr-1">شماره تلفن</h3>
      <div className="relative">
        <input
          type="tel"
          value={phone}
          onChange={(e) => {
            const input = e.target.value;

            const cleaned = input.replace(/\D/g, "").slice(0, 11);
            setPhone(cleaned);
          }}
          className="bg-white border hover:border-black-dark-100 border-black-medium-100 w-full mx-auto rounded-lg px-2 py-2 text-black placeholder:text-right text-right pl-10 appearance-none no-spinner"
          placeholder="شماره تلفن"
        />
      </div>

      {phone && (
        <div className="flex justify-end gap-1">
          <span className="text-base text-black-primary text-right mt-1">
            {toPersianNumbers(formatPhoneNumber(phone))}
          </span>
          <span className="text-base text-black-primary text-right mt-1">
            :شماره تلفن
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

export default PhoneInput;
