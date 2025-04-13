// //app\(root)\layout.tsx
"use client";
import React, { useState, useEffect } from "react";
import SideBarFilter from "@/components/SideBarFilter";
import TopBar from "@/components/TopBar";
import ResGrosTabs from "@/components/ResGrosTabs";
import Cuisines from "@/components/Cuisines";
import TagFilterPanel, { Tag } from "@/components/TagFilterPanel";
import { useFilter } from "@/context/FilterContext";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Restaurants" | "Grocery">(
    "Restaurants"
  );
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    filteredItems,
    setSelectedSort: setGlobalSort,
    handleFilterChange,
    resetFilter,
  } = useFilter();

  const handleTabChange = (tab: "Restaurants" | "Grocery") => setActiveTab(tab);

  const handleSortUpdate = (sort: string | null) => {
    setSelectedSort(sort);
    setGlobalSort(sort);
  };

  const handleTagFilterChange = (tags: string[]) => {
    setSelectedTags(tags);
    handleFilterChange(tags); // updates filteredItems from context
  };

  const handleReset = () => {
    resetFilter();
    setSelectedTags([]);
  };

  useEffect(() => {
    const fetchTags = async () => {
      const { data, error } = await supabase
        .from("tags")
        .select("*")
        .order("name");

      if (!error && data) {
        const transformed: Tag[] = data.map((tag) => ({
          id: tag.id,
          name: tag.name,
          iconPath: tag.icon_path,
        }));
        setTags(transformed);
      } else {
        console.error("Failed to fetch tags:", error);
      }
    };

    fetchTags();
  }, []);

  const isTagFiltered = selectedTags.length > 0;

  return (
    <div className="font-inter bg-white h-full w-full">
      <div className="border-b-1 border-gray-200">
        <TopBar />
      </div>

      <div className="flex items-center h-[50px] md:h-[100px] pl-[40px] border-b-1 border-gray-200 md:w-full">
        <ResGrosTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      <TagFilterPanel tags={tags} onFilterChange={handleTagFilterChange} />

      {isTagFiltered ? (
        <div className="filteredContent p-4 space-y-4 transition-opacity duration-500 ease-in-out opacity-100">
          <h2 className="text-xl font-semibold mb-4">
            {filteredItems.length} Stores near you{" "}
            <button
              onClick={handleReset}
              className="text-red-500 text-sm ml-2 underline"
            >
              Reset
            </button>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-6">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="rounded-lg p-3 hover:shadow-md transition"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  className="rounded mb-2"
                  width={300}
                  height={100}
                  style={{ objectFit: "cover" }}
                />
                <h3 className="font-bold text-sm">{item.name}</h3>
                <p className="text-xs text-gray-600">{item.tags}</p>
                <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                  ⭐ {item.rating}
                  <span className="text-gray-500">({item.reviews})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="fullpage">
          <Cuisines />
          <main className="flex h-full ">
            <div className="w-[23%] md:w-[18%] sm:w-[15%] min-w-[140px] md:min-w-[250px] p-4 sticky top-0 h-screen bg-white z-10 hidden md:block">
              <SideBarFilter
                selectedSort={selectedSort}
                setSelectedSort={handleSortUpdate}
              />
            </div>

            <div className="flex-grow p-4 overflow-y-auto">
              {React.cloneElement(children)}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
