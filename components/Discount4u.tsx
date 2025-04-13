//components\Discount4u.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Star } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Discounts4U = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [openStatus, setOpenStatus] = React.useState<Record<string, boolean>>(
    {}
  );
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
      if (!error && data) {
        setRestaurants(data);
        const status: Record<string, boolean> = {};
        data.forEach((item) => {
          status[item.id] = isCurrentlyOpen(item.opensAt, item.closesAt);
        });
        setOpenStatus(status);
      }
    };
    fetchRestaurants();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 3; // 3 cards per view
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

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
    <div className="p-4 mb-[10px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-[10px] md:mb-[40px] text-[8px] md:text-[26px]">
        <Typography
          variant="h4"
          className="font-black"
          style={{
            fontFamily: "Arial",
            fontWeight: 900,
            fontSize: "16px",
          }}
        >
          <span className="text-[13px] md:text-[26px]">Discounts 4 U! 🥰</span>
        </Typography>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 items-center justify-end"> {" "}  {/* This line moves the "see all" and arrow buttons to the right */}
            <Typography
              variant="body1"
              className="font-medium"
              style={{ fontFamily: "Arial", fontSize: "14px", fontWeight: 700 }}
            >
              <span className="text-[12px] md:text-[20px] ">See all</span>
            </Typography>
            <div className="flex gap-2 ">
              <IconButton
                size="small"
                onClick={() => scroll("left")}
                className="bg-gray-100 hover:bg-gray-200 p-0.5 md:p-2 border"
              >
                <ArrowBackIosNewIcon
                  fontSize="inherit"
                  className="text-[6px] md:text-[24px]"
                />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => scroll("right")}
                className="bg-gray-100 hover:bg-gray-200 p-0.5 md:p-2"
              >
                <ArrowForwardIosIcon
                  fontSize="inherit"
                  className="text-[6px] md:text-[24px]"
                />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar whitespace-nowrap"
        style={{ maxWidth: "100%" }}
      >
        {restaurants.map((item) => {
          const isOpen = openStatus[item.id];
          return (
        <div
          key={item.id}
          className="min-w-[200px] max-w-[200px] flex-shrink-0 sm:min-w-[350px] sm:max-w-[300px]"
        >
          <Card
            className="relative overflow-hidden"
            style={{ boxShadow: "none", border: "none" }}
          >
            <div className="relative h-[60px] md:w-full md:h-32">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className={`object-cover ${
              isOpen === false ? "opacity-50" : ""
            }`}
          />
          <span className="absolute top-1 left-1 text-white text-[10px] px-1 py-0.5 sm:top-2 sm:left-2 sm:text-xs sm:px-2 sm:py-1 bg-[#000000cb] rounded-xl">
            {item.discount}
          </span>
          {isOpen === false && (
            <span className="absolute bottom-1 left-1 px-1 py-0.5 text-[10px] font-medium bg-red-500 text-white sm:bottom-2 sm:left-2 sm:px-2 sm:py-1 sm:text-xs">
              Closed
            </span>
          )}
            </div>

            <CardContent className="p-2 md:p-3 ml-[-10px] md:ml-[-15px]">
          <h3 className="font-bold text-[14px] md:text-[20px]">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 md:text-md">
            {item.tags}
          </p>
          <div className="flex items-center text-xs text-gray-600 mt-1 md:text-md">
            <Star
              fill="#22c55e"
              className="w-3 h-3 md:w-4 md:h-4 text-green-500"
            />
            <span className="ml-1">{item.rating}</span>
            <span className="ml-2 text-black md:ml-3">
              {item.reviews}
            </span>
          </div>
            </CardContent>
          </Card>
        </div>
          );
        })}
      </div>
    </div>
  );
};

export default Discounts4U;
