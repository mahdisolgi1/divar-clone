import { useEffect, useState, useRef } from "react";
import { province } from "../_types/modalTypes";
import { getProvinces } from "../_lib/data-service";
import { FaChevronDown } from "react-icons/fa";
import LeafletMap from "./LocationGetterLeafnet";
import Spinner from "./Spinner";
interface ProvinceDropDownProps {
  onProvince: (province: string) => void;
  onPosition: (position: [number, number]) => void;
}

const ProvinceDropDown: React.FC<ProvinceDropDownProps> = ({
  onPosition,
  onProvince,
}) => {
  const [provinces, setProvinces] = useState<province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<province | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (err) {
        setError("Failed to load provinces");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleProvinceSelect = (province: province) => {
    setSelectedProvince(province);
    onProvince(province.province);
    console.log(selectedProvince);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center w-full items-center  ">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full me-auto text-right flex gap-1 flex-col">
      <h3 className="text-base text-black-primary pr-1">استان</h3>
      <div
        className="z-[1000] relative w-full mx-auto cursor-pointer"
        ref={dropdownRef}
      >
        <div
          className="flex items-center w-full justify-between px-4 py-2 bg-white border hover:border-black-dark-100 border-black-medium-100 rounded-md cursor-pointer hover:bg-gray-50"
          onClick={toggleDropdown}
        >
          <span
            className={`arrow transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <FaChevronDown className="text-black-hint text-lg" />
          </span>
          <span className="text-black-primary text-base">
            {selectedProvince ? selectedProvince.province : "استان"}
          </span>
        </div>

        {isOpen && (
          <ul className="absolute z-[500] mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {provinces.map((province) => (
              <li
                key={province.id}
                className="px-4 py-2 text-right text-black-secondary text-[0.875rem] hover:bg-black-light-200 cursor-pointer hover:bg-gray-100"
                onClick={() => handleProvinceSelect(province)}
              >
                {province.province}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedProvince && (
        <LeafletMap
          onPosition={onPosition}
          selectedProvince={[
            selectedProvince.longitude,
            selectedProvince.latitude,
          ]}
        />
      )}
    </div>
  );
};

export default ProvinceDropDown;
