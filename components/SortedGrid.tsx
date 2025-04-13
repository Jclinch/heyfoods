//components\SortedGrid.tsx
"use client";

import Image from "next/image";
import React from "react";

interface SortedGridProps {
  sortedItems: {
    id: string;
    image: string;
    name: string;
    tags: string;
    rating: number;
    reviews: number;
    discount: string;
    location: string;
    opensAt: string;
    closesAt: string;
    notice?: string;
  }[];
}

const SortedGrid: React.FC<SortedGridProps> = ({ sortedItems }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-6 w-full">
      {sortedItems.map((item) => (
        <div key={item.id}>
          <Image
            src={item.image}
            alt={item.name}
            width={400}
            height={160}
            className="w-full h-40 object-cover"
          />
          <div className="p-3">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-gray-500 text-sm">{item.tags}</p>
            <p className="text-yellow-500 text-sm font-medium">
              ⭐ {item.rating} ({item.reviews})
            </p>
            <p className="text-green-600 text-sm">{item.discount}</p>
            <p className="text-sm text-gray-600">{item.location}</p>
            <p className="text-sm text-gray-400">
              Opens: {item.opensAt} - Closes: {item.closesAt}
            </p>
            {item.notice && (
              <p className="text-sm text-red-600">{item.notice}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SortedGrid;
