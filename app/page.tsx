//app\page.tsx
"use client";
import Discounts4U from "@/components/Discount4u";
import FreeDrinks from "@/components/FreeDrinks";
import Grilled from "@/components/Grilled";
import PartyJollof from "@/components/PartyJollof";
import ResGrosTabs from "@/components/ResGrosTabs";
import TagFilter from "@/components/TagFilter";
import TopBar from "@/components/TopBar";
import React, { useState, useEffect } from "react";
import { sampleData } from "@/constant/sampleData";
import Cuisines from "@/components/Cuisines";
import SideBarFilter from "@/components/SideBarFilter";
import FilteredGrid from "@/components/FilteredGrid";
import AllRestaurants from "@/components/AllRestaurants";

const Home = () => {
  const [allItems] = useState(sampleData);
  const [filteredItems, setFilteredItems] = useState(allItems);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const [tags] = useState([
    { id: "rice", name: "Rice", iconPath: "/vectors/rice.jpg" },
    { id: "chicken", name: "Chicken", iconPath: "/vectors/chicken.jpg" },
    { id: "shawarma", name: "Shawarma", iconPath: "/vectors/shawarma.jpg" },
    { id: "juice", name: "Juice", iconPath: "/vectors/juice.png" },
    { id: "goat-meat", name: "Goat Meat", iconPath: "/vectors/goat-meat.png" },
    { id: "amala", name: "Amala", iconPath: "/vectors/amala.png" },
    { id: "fastfood", name: "Fastfood", iconPath: "/vectors/fastfood.png" },
    { id: "soup-bowl", name: "Soup Bowl", iconPath: "/vectors/soup-bowl.png" },
    { id: "sandwich", name: "Sandwich", iconPath: "/vectors/sandwich.png" },
    { id: "grills", name: "Grills", iconPath: "/vectors/BBQ.jpg" },
    { id: "ice-cream", name: "Ice Cream", iconPath: "/vectors/ice-cream.png" },
    { id: "pizza", name: "Pizza", iconPath: "/vectors/placeholder.png" },
    { id: "burgers", name: "Burgers", iconPath: "/vectors/placeholder.png" },
    { id: "pasta", name: "Pasta", iconPath: "/vectors/placeholder.png" },
    { id: "salad", name: "Salad", iconPath: "/vectors/placeholder.png" },
    { id: "desserts", name: "Desserts", iconPath: "/vectors/placeholder.png" },
    { id: "seafood", name: "Seafood", iconPath: "/vectors/placeholder.png" },
    {
      id: "beverages",
      name: "Beverages",
      iconPath: "/vectors/placeholder.png",
    },
    { id: "snacks", name: "Snacks", iconPath: "/vectors/placeholder.png" },
    { id: "soups", name: "Soups", iconPath: "/vectors/placeholder.png" },
  ]);

  const parseReviews = (reviews: string): number => {
    const match = reviews.match(/(\d+)/);
    return match ? parseInt(match[0]) : 0;
  };

  const sortData = (sortType: string | null) => {
    const sorted = [...sampleData];
    switch (sortType) {
      case "mostPopular":
      case "mostRated":
        return sorted.sort(
          (a, b) => parseReviews(b.reviews) - parseReviews(a.reviews)
        );
      case "nearest":
        return sorted.sort((a, b) => a.location.localeCompare(b.location));
      case "highestRated":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "newest":
        return sorted.sort(
          (a, b) => parseReviews(a.reviews) - parseReviews(b.reviews)
        );
      default:
        return sorted;
    }
  };

  const handleFilterChange = (selectedTags: string[]) => {
    if (selectedTags.length === 0) {
      setFilteredItems(allItems);
      return;
    }

    const filtered = allItems.filter((item) =>
      item.tags.split(",").some((tag) => selectedTags.includes(tag.trim()))
    );
    setFilteredItems(filtered);
  };

  const [activeTab, setActiveTab] = useState<"Restaurants" | "Grocery">(
    "Restaurants"
  );
  const handleTabChange = (tab: "Restaurants" | "Grocery") => setActiveTab(tab);

  const [showCart, setShowCart] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowCart(true);
      } else {
        setShowCart(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="border-b-1 border-gray-200">
        <TopBar />
      </div>

      <div className="flex items-center h-[100px] pl-[40px] border-b-1 border-gray-200 w-full">
        <ResGrosTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      <div>
        <TagFilter tags={tags} onFilterChange={handleFilterChange} />
      </div>

      <Cuisines />

      <div className="fullpage flex w-full max-w-screen overflow-hidden">
        {/* Sidebar on the left */}
        <div className="w-1/4 min-w-[250px] p-4 border-r border-gray-200">
          <SideBarFilter
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </div>

        {/* Main content area */}
        <div className="w-3/4 max-w-full overflow-x-hidden">
          {selectedSort !== null ? (
            <FilteredGrid filteredItems={sortData(selectedSort).slice(0, 20)} />
          ) : (
            <div className="mainpage p-4 space-y-4">
              <Discounts4U />
              <PartyJollof />
              <FreeDrinks />
              <Grilled />
              <AllRestaurants />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
