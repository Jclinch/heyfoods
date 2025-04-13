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
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-[40px]">
        <Typography
          variant="h4"
          className="font-black"
          style={{ fontFamily: "Arial", fontSize: "26px", fontWeight: 700 }}
        >
          Grills and Finger Foods 🍪🍖
        </Typography>
        <div className="flex items-center gap-2">
          <Typography
            variant="body1"
            className="font-medium"
            style={{ fontFamily: "Arial", fontSize: "18px", fontWeight: 700 }}
          >
            See all
          </Typography>
          <div className="flex gap-2">
            <IconButton
              size="small"
              onClick={() => scroll("left")}
              className="bg-gray-100 hover:bg-gray-200"
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => scroll("right")}
              className="bg-gray-100 hover:bg-gray-200"
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
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
            className="min-w-[350px] max-w-[300px] flex-shrink-0 relative overflow-hidden"
          >
            <div className="relative w-full h-32">
              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{ objectFit: "cover" }}
                className={`${!item.open && "opacity-50"}`}
              />
              <span className="absolute top-2 left-2 bg-[#000000cb] text-white text-xs px-2 py-1 rounded-xl">
                {item.discount}
              </span>
              {!item.open && (
                <span className="absolute bottom-2 left-2 px-2 py-1 text-xs font-medium bg-red-500 text-white rounded">
                  Closed
                </span>
              )}
            </div>
            <CardContent className="p-3 ml-[-15px]">
              <h3 className="font-bold text-[20px]">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.tags}</p>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Star fill="#22c55e" className="w-4 h-4 text-green-500" />
                <span className="ml-1">{item.rating}</span>
                <span className="ml-3 text-black">{item.reviews}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Grilled;
