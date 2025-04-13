// //components\AllRestaurants.tsx
"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Star } from "lucide-react";
import { Typography } from "@mui/material";

const AllRestaurants = () => {
 interface Restaurant {
    id: string;
    name: string;
    image: string;
    tags: string;
    rating: number;
    reviews: string;
    discount: string;
    opensAt: string;
    closesAt: string;
    notice?: string;
  }

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data, error } = await supabase.from("restaurants").select("*");
      if (!error) setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  const isCurrentlyOpen = (opensAt: string, closesAt: string): boolean => {
    const now = new Date();
    if (!opensAt || !closesAt) {
      return false;
    }

    const [openHour, openMinute] = opensAt.split(":").map(Number);
    const [closeHour, closeMinute] = closesAt.split(":").map(Number);

    const openTime = new Date(now);
    openTime.setHours(openHour, openMinute, 0, 0);

    const closeTime = new Date(now);
    closeTime.setHours(closeHour, closeMinute, 0, 0);

    // If closesAt is earlier than opensAt, it means the business closes the next day
    if (closeTime <= openTime) {
      // Extend closeTime to next day
      closeTime.setDate(closeTime.getDate() + 1);
    }

    return now >= openTime && now <= closeTime;
  };

  return (
    <div className="px-4 py-4 ">
      <Typography
        variant="h4"
        className="font-black "
        style={{ fontFamily: "Arial", fontSize: "26px", fontWeight: 700, marginBottom: "40px" }}
      >
        {" "}
        All Restaurants
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6">
        {/* <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"> */}

        {restaurants.map((restaurant) => {
          const isOpen = isCurrentlyOpen(
            restaurant.opensAt,
            restaurant.closesAt
          );

          return (
            <div
              key={restaurant.id}
              className={`rounded-sm overflow-hidden ${
                isOpen ? "opacity-100" : "opacity-50"
              }`}
            >
              {/* Image + open/closed badge */}
              <div className="relative h-30 w-full">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <span
                  className={`absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded text-white ${
                    isOpen ? "" : "bg-red-500"
                  }`}
                >
                  {isOpen ? "" : "Closed"}
                </span>
              </div>

              {/* Info */}
              <div className="p-3 ml-[-10px]">
                <h3 className="font-bold text-[20px] ">{restaurant.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{restaurant.tags}</p>
                <div className="flex items-center text-sm text-gray-700 mb-2">
                  <Star fill="#22c55e" className="w-4 h-4 text-green-500" />
                  <span className="ml-1 font-semibold">
                    {restaurant.rating}
                  </span>
                  <span className="ml-3 text-black">
                    {restaurant.reviews}
                  </span>
                </div>
                {restaurant.notice && (
                  <div className="bg-gray-100 text-xs text-gray-800 rounded px-3 py-2">
                    {restaurant.notice}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllRestaurants;
