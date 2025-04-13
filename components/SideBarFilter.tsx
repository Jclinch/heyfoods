// // components/SideBarFilter.tsx
"use client";
import { sampleData } from "@/backend/sampleData";
import Image from "next/image";
import React from "react";

const sortOptions = [
  { label: "Most Popular", value: "mostPopular" },
  { label: "Nearest", value: "nearest" },
  { label: "Highest Rated", value: "highestRated" },
  { label: "Newest", value: "newest" },
  { label: "Most Rated", value: "mostRated" },
];

interface SideBarFilterProps {
  selectedSort: string | null;
  // setSelectedSort: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedSort: (sort: string | null) => void;
}

const SideBarFilter: React.FC<SideBarFilterProps> = ({
  selectedSort,
  setSelectedSort,
}) => {
  const handleSortChange = (value: string) => {
    setSelectedSort(selectedSort === value ? null : value);
  };

  return (
    <div className="w-[120px] md:w-[256px] p-4 md:ml-[35px] mt-[60px] text-[8px] md:text-[24px] ">
      <h2 className="text-[8px] md:text-[24px] font-semibold">All Stores</h2>
      <p className="text-gray-500 mb-4 text-[10px] md:text-[24px]">
        ({sampleData.length} Stores)
      </p>

      <div className="mb-4">
        <h3 className="text-[20px] font-semibold flex items-center gap-1 mb-2">
          <span className="transform ">
            <Image
              src="/vectors/sort-desc.svg"
              alt="sort"
              width={30}
              height={30}
              className="w-4 h-4 md:w-auto md:h-auto"
            />
          </span>{" "}
          Sort
        </h3>
        <ul className="space-y-2">
          {sortOptions.map((option) => (
            <li key={option.value} className="flex items-center gap-2 mb-4">
              <input
                type="radio"
                id={option.value}
                name="sort"
                value={option.value}
                checked={selectedSort === option.value}
                onClick={() => handleSortChange(option.value)} // use onClick instead of onChange
                readOnly // suppresses React warning
                className="accent-black cursor-pointer"
              />

              <label
                htmlFor={option.value}
                className="text-[8px] md:text-[18px] text-base font-[500] cursor-pointer"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBarFilter;
