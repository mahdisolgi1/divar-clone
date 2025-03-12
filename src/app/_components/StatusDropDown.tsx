import { useEffect, useState, useRef } from "react";
import { status } from "../_types/modalTypes";
import { getStatuses } from "../_lib/data-service";
import { FaChevronDown } from "react-icons/fa";
import Spinner from "./Spinner";
interface StatusDropDownProps {
  onStatus: (status: string) => void;
}

const StatusDropDown: React.FC<StatusDropDownProps> = ({ onStatus }) => {
  const [statuses, setStatus] = useState<status[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<status | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getStatuses();
        setStatus(data);
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

  const handleProvinceSelect = (status: status) => {
    setSelectedStatus(status);
    onStatus(status.status);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center w-full items-center  ">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full me-auto text-right flex gap-1 flex-col">
      <h3 className="text-base text-black-primary  pr-1">وضیعت</h3>
      <div className="relative w-full mx-auto cursor-pointer" ref={dropdownRef}>
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
            {selectedStatus ? selectedStatus.status : "انتخاب"}
          </span>
        </div>

        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {statuses.map((status) => (
              <li
                key={status.id}
                className="px-4 py-2 text-right text-black-secondary text-[0.875rem] hover:bg-black-light-200 cursor-pointer hover:bg-gray-100"
                onClick={() => handleProvinceSelect(status)}
              >
                {status.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StatusDropDown;
