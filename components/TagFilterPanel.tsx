// // components/TagFilterPanel.tsx
"use client";
import Image from "next/image";
import React, { useState } from "react";

export type Tag = {
  id: string;
  name: string;
  iconPath: string;
};

type Props = {
  tags: Tag[];
  onFilterChange: (selectedTags: string[]) => void;
};

const TagFilterPanel = ({ tags, onFilterChange }: Props) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tagName: string) => {
    let updatedTags: string[];

    if (selectedTags.includes(tagName)) {
      updatedTags = selectedTags.filter((name) => name !== tagName);
    } else {
      updatedTags = [...selectedTags, tagName];
    }

    setSelectedTags(updatedTags);
    onFilterChange(updatedTags);
  };

  const resetTags = () => {
    setSelectedTags([]);
    onFilterChange([]);
  };

  return (
    <div className="flex gap-1 py-6 overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-gray-200 transition-all duration-300 ease-in-out">
      {tags?.map((tag) => (
        <div
          key={tag.id}
          onClick={() => handleTagClick(tag.id)}
          className={`cursor-pointer text-center 
            min-w-[90px] sm:min-w-[130px] 
            ml-3 sm:ml-[50px] 
            p-1 sm:p-2 
            transition-all duration-300 ease-in-out rounded-md flex flex-col items-center justify-center
            ${
              selectedTags.includes(tag.id)
                ? "bg-gray-200 text-black font-bold border border-gray-200"
                : "hover:bg-gray-100"
            }
          `}
        >
          <Image
            src={tag.iconPath}
            alt={tag.name}
            width={30} // smaller icon on mobile
            height={30}
            className="object-contain mb-1 sm:w-[40px] sm:h-[40px]"
          />
          <span className="text-xs sm:text-sm font-bold">{tag.name}</span>
        </div>
      ))}

      {selectedTags.length > 0 && (
        <button
          onClick={resetTags}
          className="text-red-500 font-semibold ml-4 underline text-sm sm:text-base"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default TagFilterPanel;
