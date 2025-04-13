// components/SearchBarDropdown.tsx
"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useFilter } from "@/context/FilterContext";

const SearchBarDropdown = () => {
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const { handleSearchFilter } = useFilter();

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await supabase.from("tags").select("*").order("name");
      if (data) setTags(data);
    };
    fetchTags();
  }, []);

  const handleTagClick = (name: string) => {
    handleSearchFilter(name);
    setSearchOpen(false);
  };

  return (
    <div className="relative mx-auto w-[300px] mt-4">
      <input
        onClick={() => setSearchOpen(!searchOpen)}
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Search by tag..."
        readOnly
      />
      {searchOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white shadow rounded max-h-60 overflow-y-auto">
          {tags.map((tag) => (
            <div
              key={tag.id}
              onClick={() => handleTagClick(tag.name)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {tag.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBarDropdown;
