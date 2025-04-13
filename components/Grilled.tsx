// //components\Grilled.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Star } from "lucide-react";
import Image from "next/image";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { supabase } from "@/lib/supabaseClient";

interface GrilledItem {
  open: boolean;
  id: number;
  name: string;
  tags: string;
  rating: number;
  reviews: string;
  discount: string;
  image: string;
  location: string;
  opensAt: string;
  closesAt: string;
  notice?: string;
}

const Grilled = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [grilledContent, setGrilledContent] = useState<GrilledItem[]>([]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 3;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const isCurrentlyOpen = (opensAt: string, closesAt: string): boolean => {
    const now = new Date();
    if (!opensAt || !closesAt) return false;

    const [openHour, openMinute] = opensAt.split(":").map(Number);
    const [closeHour, closeMinute] = closesAt.split(":").map(Number);

    const openTime = new Date(now);
    openTime.setHours(openHour, openMinute, 0, 0);

    const closeTime = new Date(now);
    closeTime.setHours(closeHour, closeMinute, 0, 0);

    if (closeTime <= openTime) closeTime.setDate(closeTime.getDate() + 1);

    return now >= openTime && now <= closeTime;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("restaurants").select("*");

      if (!error && data) {
        const filtered = data.filter((item) => {
          const tags = item.tags?.toLowerCase() || "";
          return (
            tags.includes("grill") ||
            tags.includes("grilled") ||
            tags.includes("barbecue") ||
            tags.includes("meat")
          );
        });

        const withOpenStatus = filtered.map((item) => ({
          ...item,
          open: isCurrentlyOpen(item.opensAt, item.closesAt),
        }));

        setGrilledContent(withOpenStatus);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full p-4 mb-[10px] md:mb-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-[10px] md:mb-[40px]">
        <Typography
          variant="h4"
          className="font-black"
          style={{
            fontFamily: "Arial",
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          <span className="block md:hidden text-[13px] md:text-[26px]">
            Grills and Finger <br />
            Foods 🍪🍖
          </span>
          <span className="hidden md:block text-[13px] md:text-[26px]">
            Grills and Finger Foods 🍪🍖
          </span>
        </Typography>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 items-center justify-end">
            {" "}
            {/* This line moves the "see all" and arrow buttons to the right */}
            <Typography
              variant="body1"
              className="font-medium"
              style={{ fontFamily: "Arial", fontSize: "14px", fontWeight: 500 }}
            >
              <span className="text-[12px] md:text-[20px] ">See all</span>
            </Typography>
            <div className="flex gap-2">
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
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
        style={{ maxWidth: "100%" }}
      >
        {grilledContent.map((item) => (
          <Card
            key={item.id}
            className="min-w-[200px] max-w-[200px] flex-shrink-0 sm:min-w-[350px] sm:max-w-[300px]"
            style={{ boxShadow: "none", border: "none" }}
          >
            <div className="relative h-[60px] md:w-full md:h-32">
              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{ objectFit: "cover" }}
                className={`${!item.open && "opacity-50"}`}
              />
              <span className="absolute top-1 left-1 bg-[#000000cb] text-white text-[8px] px-2 py-1 rounded-xl">
                {item.discount}
              </span>
              {!item.open && (
                <span className="absolute bottom-1 left-1 px-2 py-1 text-[8px] font-medium bg-red-500 text-white rounded">
                  Closed
                </span>
              )}
            </div>
            <CardContent className="p-2 md:p-3 ml-[-10px] md:ml-[-15px]">
              <h3 className="font-bold text-[14px] md:text-[20px]">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 md:text-md">{item.tags}</p>
              <div className="flex items-center text-xs text-gray-600 mt-1 md:text-md">
                <Star
                  fill="#22c55e"
                  className="w-3 h-3 md:w-4 md:h-4 text-green-500"
                />
                <span className="ml-1">{item.rating}</span>
                <span className="ml-2 text-black md:ml-3">{item.reviews}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Grilled;
