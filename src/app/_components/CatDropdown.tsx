"use client";
import { useEffect, useRef, useState } from "react";
import { Category } from "../_types/modalTypes";
import { getCates } from "../_lib/data-service";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import Spinner from "./Spinner";

const CatDropdown: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCates();
        setCategories(data);
      } catch (err) {
        setError("Failed to load categories");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
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
    <div className="w-full me-auto text-right flex gap-1 flex-col ">
      <h3 className="text-base text-black-primary pr-1 ">دسته</h3>
      <div
        className="relative w-full mx-auto cursor-pointer "
        ref={dropdownRef}
      >
        <div
          className=" flex items-center w-full justify-between px-4 py-2 bg-white border hover:border-black-dark-100 border-black-medium-100 rounded-md cursor-pointer hover:bg-gray-50"
          onClick={toggleDropdown}
        >
          <span
            className={`arrow transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <FaChevronDown className="text-black-hint text-lg " />
          </span>
          <span className="text-black-primary text-base">
            {selectedCategory ? selectedCategory.category : "دسته"}
          </span>
        </div>

        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {categories.map((category) => (
              <li
                key={category.id}
                className="px-4 py-2 text-right text-black-secondary text-[0.875rem] hover:bg-black-light-200 cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <Link
                  href={`/create-Ad/${encodeURIComponent(category.category)}`}
                  className="block w-full h-full"
                >
                  {category.category}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>{" "}
    </div>
  );
};

export default CatDropdown;
