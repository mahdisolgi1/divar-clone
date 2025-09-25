"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface FilterContextType {
  isExchangeOpen: boolean;
  setIsExchangeOpen: (value: boolean) => void;
  status: string;
  setStatus: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  isFilterModalOpen: boolean;
  setIsFilterModalOpen: (value: boolean) => void;
  
}

const defaultContextValue: FilterContextType = {
  isExchangeOpen: false,
  setIsExchangeOpen: () => {},
  status: "",
  setStatus: () => {},
  minPrice: "",
  setMinPrice: () => {},
  maxPrice: "",
  setMaxPrice: () => {},
  isFilterModalOpen: false,
  setIsFilterModalOpen: () => {},
  
};

const FilterContext = createContext<FilterContextType>(defaultContextValue);

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isExchangeOpen, setIsExchangeOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <FilterContext.Provider
      value={{
        isExchangeOpen,
        setIsExchangeOpen,
        status,
        setStatus,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        isFilterModalOpen,
        setIsFilterModalOpen
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};