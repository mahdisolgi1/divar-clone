"use client";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { getProvinces } from "../_lib/data-service";
import { province } from "../_types/modalTypes";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { CiLocationOn } from "react-icons/ci";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
const ProvinceSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [provinces, setProvinces] = useState<province[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const province = searchParams.get("province") || "";
  const router = useRouter();

  useEffect(() => {
    if (province) {
      setSelectedProvince(province);
    }
  }, [province]);

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

  const handleProvinceSelect = (province: province) => {
    setSelectedProvince(province.province);
    const url = new URL(window.location.href);
    url.searchParams.set("province", province.province);
    router.push(url.toString());
    setIsOpen(false);
  };

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
          onClick={(e) => {
            e.stopPropagation();
            handleProvinceSelect(provinces[0]);
          }}
        />
      </Button>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md" dir="rtl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">انتخاب استان</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoMdClose size={24} />
              </button>
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="جستجوی استان..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              dir="rtl"
            />

            {/* Provinces List */}
            <div className="max-h-[400px] overflow-y-auto">
              <div className="flex flex-wrap gap-2">
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
                  filteredProvinces.map((province) => (
                    <button
                      key={province.id}
                      onClick={() => {
                        if (province.province !== selectedProvince) {
                          handleProvinceSelect(province);
                        } else handleRemoveProvince();
                      }}
                      className={`p-3 rounded-md transition-colors w-[calc(50%-0.25rem)] ${
                        selectedProvince === province.province
                          ? "bg-red-100 text-red-600"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {province.province}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProvinceSelector;
