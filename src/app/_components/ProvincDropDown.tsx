"use client";
import { useEffect, useState, useRef } from "react";
import { place } from "../_types/modalTypes";
import { getPlace, getCitiesByProvince } from "../_lib/data-service";
import { FaChevronDown } from "react-icons/fa";
import LeafletMap from "./LocationGetterLeafnet";
import Spinner from "./Spinner";

interface ProvinceDropDownProps {
  onPosition: (position: [number, number]) => void;
  onPlaceID: (id: number) => void;
  
}

const ProvinceDropDown: React.FC<ProvinceDropDownProps> = ({
  onPosition,
  
  onPlaceID,
}) => {
  const [provinces, setProvinces] = useState<{ province: string }[]>([]);
  const [cities, setCities] = useState<{ city: string, id: number, cityLongitude: number, cityLatitude: number }[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<{ province: string } | null>(null);
  const [selectedCity, setSelectedCity] = useState<{ city: string, id: number, cityLongitude: number, cityLatitude: number } | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCityOpen, setIsCityOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getPlace();
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

  const fetchCities = async (province: string) => {
    try {
      const data = await getCitiesByProvince(province);
      setCities(data);
    } catch (err) {
      setError("Failed to load cities");
      console.error(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsCityOpen(false);
      }
    };

    if (isOpen || isCityOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isCityOpen]);

  const handleProvinceSelect = async (province: { province: string }) => {
    setSelectedProvince(province);
    setSelectedCity(null);
    setIsOpen(false);
    await fetchCities(province.province);
    setIsCityOpen(true);
  };

  const handleCitySelect = async (city: { city: string, id: number, cityLongitude: number, cityLatitude: number }) => {
    setSelectedCity(city);
    setIsCityOpen(false);
    onPlaceID(city.id);
  };

  if (loading) {
    return (
      <div className="flex justify-center w-full items-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full me-auto text-right flex gap-1 flex-col">
      <h3 className="text-base text-black-primary dark:text-dark-white-primary pr-1">استان</h3>
      <div className="relative w-full mx-auto cursor-pointer" ref={dropdownRef}>
        <div
          className="flex items-center w-full justify-between px-4 py-2 bg-white border hover:border-black-dark-100 border-black-medium-100 dark:border-dark-white-medium-100 rounded-md cursor-pointer  hover:bg-gray-50 dark:hover:bg-dark-gray-50"
          onClick={() => setIsOpen(true)}
        >
          <span className={`arrow transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
            <FaChevronDown className="text-black-hint dark:text-dark-white-hint text-lg" />
          </span>
          <span className="text-black-primary dark:text-dark-white-primary text-base">
            {selectedProvince ? selectedProvince.province : "استان"}
          </span>
        </div>

        {isOpen && (
          <ul className="absolute z-40 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {provinces.map((province) => (
              <li
                key={province.province}
                className="px-4 py-2 text-right text-black-secondary dark:text-dark-white-secondary text-[0.875rem] hover:bg-black-light-200 dark:hover:bg-dark-white-light-200  cursor-pointer"
                onClick={() => handleProvinceSelect(province)}
              >
                {province.province}
              </li>
            ))}
          </ul>
        )}

        {isCityOpen && selectedProvince && (
          <ul className="absolute z-40 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {cities.map((city) => (
              <li
                key={city.id}
                className="px-4 py-2 text-right text-black-secondary dark:text-dark-white-secondary text-[0.875rem] hover:bg-black-light-200 dark:hover:bg-dark-white-light-200  cursor-pointer"
                onClick={() => handleCitySelect(city)}
              >
                {city.city}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedCity && (
        <LeafletMap
          onPosition={onPosition}
          selectedCity={[
            selectedCity.cityLatitude,
            selectedCity.cityLongitude,
          ]}        />
      )}
    </div>
  );
};

export default ProvinceDropDown;
