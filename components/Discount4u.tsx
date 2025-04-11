//components\Discount4u.tsx
'use client';
import React, { useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { sampleData } from '@/constant/sampleData';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Discounts4U = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 3; // 3 cards per view
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const isCurrentlyOpen = (opensAt: string, closesAt: string): boolean => {
    const now = new Date();

    const [openHour, openMinute] = opensAt.split(':').map(Number);
    const [closeHour, closeMinute] = closesAt.split(':').map(Number);

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
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="font-black">
          Discounts 4 U! 🥰
        </Typography>
        <div className="flex items-center gap-2">
          <Typography variant="body1" className="font-medium">
            See all
          </Typography>
          <div className="flex gap-2">
            <IconButton
              size="small"
              onClick={() => scroll('left')}
              className="bg-gray-100 hover:bg-gray-200"
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => scroll('right')}
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
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar whitespace-nowrap"
        style={{ maxWidth: '100%' }}
      >
        {sampleData.map((item) => {
          const isOpen = isCurrentlyOpen(item.opensAt, item.closesAt);

          return (
            <div
              key={item.id}
              className="min-w-[350px] max-w-[300px] flex-shrink-0"
            >
              <Card className="relative overflow-hidden">
                <div className="relative w-full h-32">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className={`object-cover ${!isOpen ? 'opacity-50' : ''}`}
                  />
                  <span className="absolute top-2 left-2 text-white text-xs px-2 py-1 bg-[#000000cb] rounded-xl">
                    {item.discount}
                  </span>
                  <span
                    className={`absolute bottom-2 left-2 px-2 py-1 text-xs font-medium ${
                      isOpen ? '' : 'bg-red-500'
                    } text-white`}
                  >
                    {isOpen ? '' : 'Closed'}
                  </span>
                </div>

                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.tags}</p>
                  <div className="flex items-center text-xs text-gray-600 mt-1">
                    <Star className="w-4 h-4 text-green-500" />
                    <span className="ml-1">{item.rating}</span>
                    <span className="ml-1">{item.reviews}</span>
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
