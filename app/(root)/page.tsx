//app\(root)\page.tsx
"use client";
import React from "react";
import Discounts4U from "@/components/Discount4u";
import FreeDrinks from "@/components/FreeDrinks";
import Grilled from "@/components/Grilled";
import PartyJollof from "@/components/PartyJollof";
import AllRestaurants from "@/components/AllRestaurants";
import SortedGrid from "@/components/SortedGrid";
import { useFilter } from "@/context/FilterContext";

type Restaurant = {
  id: string;
  name: string;
  image: string;
  tags: string;
  rating: number;
  reviews: string;
  location: string;
  discount?: string;
  opensAt?: string;
  closesAt?: string;
  notice?: string;
};

const Home: React.FC = () => {
  const { allItems, filteredItems, selectedSort, resetFilter } = useFilter();

  const parseReviews = (reviews: string): number => {
    const match = reviews.match(/(\d+)/);
    return match ? parseInt(match[0]) : 0;
  };

  const sortData = (data: Restaurant[]) => {
    const sorted = [...data];
    switch (selectedSort) {
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

  const isFiltered =
    filteredItems.length !== allItems.length || selectedSort !== null;
  const dataToShow = isFiltered ? filteredItems : allItems;

  const sortedItems = sortData(dataToShow).map((item) => ({
    ...item,
    reviews: parseReviews(item.reviews),
    discount: item.discount || "",
    opensAt: item.opensAt || "9:00 AM",
    closesAt: item.closesAt || "9:00 PM",
  }));

  return (
    <div className="fullpage flex w-full max-w-screen overflow-hidden transition-all duration-500 ease-in-out">
      <div className="w-full max-w-full overflow-x-hidden">
        <div className="mainpage p-4 space-y-4">
          {isFiltered ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                {sortedItems.length} Stores near you{" "}
                <button
                  onClick={resetFilter}
                  className="text-red-500 text-sm ml-2 underline"
                >
                  Reset
                </button>
              </h2>
              <SortedGrid sortedItems={sortedItems} />
            </>
          ) : (
            <>
              <div className=" w-full md:w-auto">
                <div className="mt-[10px] md:mt-[50px] ">
                  <Discounts4U />
                </div>
                <PartyJollof />
                <FreeDrinks />
                <Grilled />
                <AllRestaurants />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
