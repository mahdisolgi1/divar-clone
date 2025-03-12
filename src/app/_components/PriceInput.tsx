import { formatPrice } from "../_utils/formatPrice";

interface PriceInputProps {
  price: number;
  onPriceChange: (price: number) => void;
}
const PriceInput: React.FC<PriceInputProps> = ({ price, onPriceChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onPriceChange(Number(value));
  };
  return (
    <div className="w-full me-auto text-right flex gap-1 z-50 flex-col">
      <h3 className="text-base text-black-primary pr-1">قیمت</h3>
      <div className="relative">
        <input
          type="number"
          value={price}
          onChange={handleChange}
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
            {formatPrice(price.toString())}
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
