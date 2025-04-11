//components\FreeDrinks.tsx
'use client';
import React, { useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { sampleData } from '@/constant/sampleData';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const FreeDrinks = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 3;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

  type FreeDrinkItem = (typeof sampleData)[number] & { open: boolean };
  
  const [freeDrinks, setFreeDrinks] = React.useState<FreeDrinkItem[]>([]);

useEffect(() => {
  const currentTime = new Date();

  const filtered = sampleData
    .filter((item) => item.discount.toLowerCase().includes('free drink'))
    .map((item) => {
      const opensAt = new Date(`1970-01-01T${item.opensAt}`);
      const closesAt = new Date(`1970-01-01T${item.closesAt}`);
      const isOpen = currentTime >= opensAt && currentTime <= closesAt;
      return { ...item, open: isOpen };
    });

  setFreeDrinks(filtered);
}, []);


  return (
    <div className="w-full p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="font-bold">
          Free drinks for you! 🥂
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

      {/* Cards Section */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
        style={{ maxWidth: '100%' }} // This prevents horizontal overflow
      >
        {freeDrinks.map((item) => (
          <Card
            key={item.id}
            className="min-w-[350px] max-w-[300px] flex-shrink-0 relative overflow-hidden"
          >
            <div className="relative w-full h-32">
              <Image
                src={item.image}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className={`${!item.open && 'opacity-50'}`}
              />
              <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                {item.discount}
              </span>
              <span
                className={`absolute bottom-2 left-2 px-2 py-1 text-xs font-medium rounded ${
                  item.open ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {item.open ? 'Open Now' : 'Closed'}
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
        ))}
      </div>
    </div>
  );
};

export default FreeDrinks;
