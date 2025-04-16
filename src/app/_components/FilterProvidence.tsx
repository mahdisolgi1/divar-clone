"use client";
import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { getProvinces, getCitiesByProvince } from "../_lib/data-service";
import { place } from "../_types/modalTypes";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { CiLocationOn } from "react-icons/ci";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa";

const FilterProvidence: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [provinces, setProvinces] = useState<place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const province = searchParams.get("province") || "";
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (province) {
      setSelectedProvince(province);
    }
  }, [province]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        const uniqueProvinces = Array.from(new Set(data.map((p) => p.province)))
          .map((province) => data.find((p) => p.province === province));
        setProvinces(uniqueProvinces);
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
    const fetchCities = async () => {
      if (selectedProvince) {
        try {
          const citiesData = await getCitiesByProvince(selectedProvince);
          setCities(citiesData.map((item) => item.city));
        } catch (err) {
          console.error("Failed to load cities:", err);
        }
      } else {
        setCities([]);
      }
    };

    fetchCities();
  }, [selectedProvince]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


  const handleRemoveProvince = () => {
    setSelectedProvince(null);

    const url = new URL(window.location.href);
    url.searchParams.delete("province");
    router.push(url.toString());

    setIsOpen(false);
  };

  const filteredProvinces = provinces.filter((province) =>
    province.province.includes(searchTerm)
  );

  const filteredCities = cities.filter((city) =>
    city.includes(citySearchTerm)
  );

  return (
    <div className="relative">
      <Button
        sx={{
          color: "rgba(0, 0, 0, 0.56)",
          padding: "0.5rem 1rem",
        }}
        className="flex gap-2 px-4 py-2 hover:bg-black-light-100 rounded transition-colors transition-border duration-[360ms] ease-in-out hover:text-black-primary text-black-secondary items-center hover:bg-opacity-90"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-base font-medium whitespace-nowrap">
          {selectedProvince ? selectedProvince : "استان ها"}
        </span>

        <CiLocationOn
          className="text-lg"
          size={20}
        
        />
      </Button>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md" dir="rtl">
       <div className="shadow-[0_1px_2px_0_rgba(0,0,0,0.08)] flex flex-col gap-2 ">
             <div className="flex  justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-black-primary text-[1.125rem]">انتخاب شهر</h2>
             
        {selectedProvince &&      <span
            className="hover:bg-[rgba(166,38,38,0.08)] p-2   rounded-full text-xs cursor-pointer text-brand"
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.delete("province");
              url.searchParams.delete("city");
              router.push(url.toString());
              setSelectedProvince(null);
              setCitySearchTerm("");
              setSearchTerm("");
            }}
          >
       حذف همه
          </span>}
            
            </div>

            {/* Search Input */}
            {!selectedProvince && (
            <input
              type="text"
              placeholder="جستجوی استان..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md  mb-4"
              dir="rtl"
            />
              )}
              </div>

            {/* Provinces List */}
            {!selectedProvince && (
            <div className="max-h-[400px] overflow-y-auto">
                {loading ? (
                  <div className="w-full flex justify-center">
                    <Spinner />
                  </div>
                ) : error ? (
                  <div className="w-full text-red-600 text-center">{error}</div>
                ) : filteredProvinces.length === 0 ? (
                  <div className="w-full text-center text-gray-500 p-4">
                    استانی یافت نشد
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {filteredProvinces.map((province) => (
                    <button
                      key={province.id}
                      onClick={() => {
                        if (province.province !== selectedProvince) {
                            setSelectedProvince(province.province);
                        } else handleRemoveProvince();
                      }}
                        className={`p-3 rounded-md border-b-2 flex justify-between items-center border-black-light-100 transition-colors w-full text-base text-black-primary text-right ${
                        selectedProvince === province.province
                          ? "bg-red-100 text-red-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                       
                       <span className=""> {province.province}</span>
                        <span className="text-black-light-100 text-base">
                          <FaAngleLeft />
                        </span>
                    </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Cities List */}
            {selectedProvince && cities.length > 0 && (
              <div className="max-h-[400px] overflow-y-auto">
                {/* City Search Input */}
                <input
                  type="text"
                  placeholder="جستجوی شهر..."
                  value={citySearchTerm}
                  onChange={(e) => setCitySearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4 "
                  dir="rtl"
                />
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      const url = new URL(window.location.href);
                      url.searchParams.delete("city");
                      router.push(url.toString());
                      setIsOpen(false);
                    }}
                    className="p-3 rounded-md border-b-2 flex justify-between items-center border-black-light-100 transition-colors w-full text-base text-black-primary text-right"              >
                    همه شهرها
                  </button>
                  {filteredCities.map((city, index) => (
                    <button
                      key={`${city}-${index}`}
                      onClick={() => {
                    const url = new URL(window.location.href);
                    url.searchParams.set("city", city);
                    router.push(url.toString());
                        setIsOpen(false);
                  }}
                      className="p-3 rounded-md border-b-2 flex justify-between items-center border-black-light-100 transition-colors w-full text-base text-black-primary text-right ">
                      {city || 'نامشخص'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
     
    </div>
  );
};

export default FilterProvidence;
