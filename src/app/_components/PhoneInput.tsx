import { ChangeEvent } from "react";

interface PhoneInputProps {
  phoneNumber: string;
  onPhoneChange: (phoneNumber: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  phoneNumber,
  onPhoneChange,
}) => {
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

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const cleaned = input.replace(/\D/g, "").slice(0, 11);
    onPhoneChange(cleaned);
  };

  return (
    <div className="w-full me-auto text-right flex gap-1 flex-col">
      <h3 className="text-base text-black-primary dark:text-dark-white-primary pr-1">شماره تلفن</h3>
      <div className="relative">
        <input
          type="tel"
          value={phoneNumber ?? ""}
          onChange={handlePhoneChange}
          className="bg-white border hover:border-black-dark-100 border-black-medium-100 dark:border-dark-white-medium-100 w-full mx-auto rounded-lg px-2 py-2 text-black placeholder:text-right text-right pl-10 appearance-none no-spinner"
          placeholder="شماره تلفن"
        />
      </div>

      {phoneNumber && (
        <div className="flex justify-end gap-1">
          <span className="text-base text-black-primary dark:text-dark-white-primary text-right mt-1">
            {toPersianNumbers(formatPhoneNumber(phoneNumber))}
          </span>
          <span className="text-base text-black-primary dark:text-dark-white-primary text-right mt-1">
            :شماره تلفن
          </span>
        </div>
      )}

    </div>
  );
};

export default PhoneInput;
