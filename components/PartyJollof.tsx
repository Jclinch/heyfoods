//components\PartyJollof.tsx
'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { sampleData } from '@/constant/sampleData';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Star } from 'lucide-react';

const PartyJollof = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth / 2;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const riceData = sampleData.filter((item) =>
    item.tags.toLowerCase().includes('rice')
  );

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="font-bold">
          Party Jollof in IB
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

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
        style={{ maxWidth: '100%' }} // This prevents horizontal overflow
      >
        {riceData.map((item) => (
          <div
            key={item.id}
            className="min-w-[350px] max-w-[300px] flex-shrink-0 relative overflow-hidden"
          >
            <div className="relative w-full h-32">
              <Image
                src={item.image}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className={`${item.notice ? 'opacity-50' : ''}`}
              />
            </div>
            <div className="py-2">
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <p className="text-xs text-gray-500">{item.tags}</p>
              <div className="flex items-center text-xs text-gray-700 mt-1">
                <Star className="w-4 h-4 text-green-500" />
                <span className="ml-1 font-medium">{item.rating}</span>
                <span className="ml-2">{item.reviews}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartyJollof;
