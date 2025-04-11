// components\TagFilter.tsx

"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import BottomSheetModal from "./BottomSheetModal";

type Tag = {
  id: string;
  name: string;
  iconPath: string;
};

type Props = {
  tags: Tag[];
  onFilterChange: (selectedTags: string[]) => void;
};

const TagFilter = ({ tags, onFilterChange }: Props) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const toggleTag = (tagId: string) => {
    const updatedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId];

    setSelectedTags(updatedTags);
    onFilterChange(updatedTags);

    // Show modal only if at least one tag is selected
    if (updatedTags.length > 0) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  // Optional: watch for external changes to selectedTags (e.g., if reset is triggered elsewhere)
  useEffect(() => {
    if (selectedTags.length === 0) {
      setShowModal(false);
    }
  }, [selectedTags]);

  return (
    <div className="flex gap-4 px-4 py-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
      {tags.map((tag) => (
        <div
          key={tag.id}
          onClick={() => toggleTag(tag.id)}
          className={`cursor-pointer shrink-0 flex flex-col items-center transition-all p-2 rounded-lg min-w-max ${
            selectedTags.includes(tag.id)
              ? "border-2 border-red-500 bg-red-100"
              : "border border-transparent"
          }`}
        >
          <Image
            src={tag.iconPath}
            alt={tag.name}
            width={50}
            height={50}
            className="object-contain"
          />
          <span className="mt-2 text-sm font-semibold text-center">
            {tag.name}
          </span>
        </div>
      ))}

      {showModal && (
        <BottomSheetModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <h2 className="text-lg font-semibold mb-2">Filtered Items</h2>
          <p>
            {selectedTags.length} tag{selectedTags.length !== 1 ? "s" : ""}{" "}
            selected.
          </p>
          <button
            onClick={() => {
              setSelectedTags([]);
              onFilterChange([]); // Clear filters
              setShowModal(false);
            }}
            className="mt-4 bg-black text-white py-2 px-4 rounded"
          >
            Clear Filters
          </button>
        </BottomSheetModal>
      )}
    </div>
  );
};

export default TagFilter;
