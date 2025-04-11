
// //components\Grilled.tsx
// 'use client';
// import React, { useRef } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import { Star } from 'lucide-react';
// import Image from 'next/image';
// import { sampleData } from '@/constant/sampleData';
// import { IconButton, Typography } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// const Grilled = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: 'left' | 'right') => {
//     if (scrollRef.current) {
//       const cardWidth = scrollRef.current.offsetWidth / 3;
//       scrollRef.current.scrollBy({
//         left: direction === 'left' ? -cardWidth : cardWidth,
//         behavior: 'smooth',
//       });
//     }
//   };

//   const grilledContent = sampleData.filter((item) => {
//     const tagsLower = item.tags.toLowerCase();
//     return (
//       tagsLower.includes('grill') ||
//       tagsLower.includes('grilled') ||
//       tagsLower.includes('barbecue') ||
//       tagsLower.includes('meat')
//     );
//   });

//   return (
//     <div className="w-full p-4">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <Typography variant="h6" className="font-bold">
//           Grills and Finger Foods 🍪🍖
//         </Typography>
//         <div className="flex items-center gap-2">
//           <Typography variant="body1" className="font-medium">
//             See all
//           </Typography>
//           <div className="flex gap-2">
//             <IconButton
//               size="small"
//               onClick={() => scroll('left')}
//               className="bg-gray-100 hover:bg-gray-200"
//             >
//               <ArrowBackIosNewIcon fontSize="small" />
//             </IconButton>
//             <IconButton
//               size="small"
//               onClick={() => scroll('right')}
//               className="bg-gray-100 hover:bg-gray-200"
//             >
//               <ArrowForwardIosIcon fontSize="small" />
//             </IconButton>
//           </div>
//         </div>
//       </div>

//       {/* Cards */}
//       <div
//         ref={scrollRef}
//         className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
//         style={{ maxWidth: '100%' }} // This prevents horizontal overflow
//       >
//         {grilledContent.map((item) => {
//           const currentTime = new Date();
//           const opensAt = item.opensAt
//             ? new Date(`1970-01-01T${item.opensAt}`)
//             : null;
//           const closesAt = item.closesAt
//             ? new Date(`1970-01-01T${item.closesAt}`)
//             : null;

//           const isOpen =
//             opensAt && closesAt
//               ? currentTime >= opensAt && currentTime <= closesAt
//               : false;

//           return (
//             <Card
//               key={item.id}
//               className="min-w-[350px] max-w-[300px] flex-shrink-0 relative overflow-hidden"
//             >
//               <div className="relative w-full h-32">
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   layout="fill"
//                   objectFit="cover"
//                   className={`${!isOpen && 'opacity-50'}`}
//                 />
//                 <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
//                   {item.discount}
//                 </span>
//                 <span
//                   className={`absolute bottom-2 left-2 px-2 py-1 text-xs font-medium rounded ${
//                     isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
//                   }`}
//                 >
//                   {isOpen ? 'Open Now' : 'Closed'}
//                 </span>
//               </div>
//               <CardContent className="p-3">
//                 <h3 className="font-semibold text-sm">{item.name}</h3>
//                 <p className="text-xs text-gray-500">{item.tags}</p>
//                 <div className="flex items-center text-xs text-gray-600 mt-1">
//                   <Star className="w-4 h-4 text-green-500" />
//                   <span className="ml-1">{item.rating}</span>
//                   <span className="ml-1">{item.reviews}</span>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Grilled;






// 'use client';
import React, { useRef, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { sampleData } from '@/constant/sampleData';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Grilled = () => {
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
  
  const [grilledContent, setGrilledContent] = useState<GrilledItem[]>([]);

  useEffect(() => {
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

    // Filter grilled content and add 'open' status
    const filteredContent = sampleData
      .filter((item) => {
        const tagsLower = item.tags.toLowerCase();
        return (
          tagsLower.includes('grill') ||
          tagsLower.includes('grilled') ||
          tagsLower.includes('barbecue') ||
          tagsLower.includes('meat')
        );
      })
      .map((item) => ({
        ...item,
        open: isCurrentlyOpen(item.opensAt, item.closesAt),
      }));

    setGrilledContent(filteredContent);
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="font-bold">
          Grills and Finger Foods 🍪🍖
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
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
        style={{ maxWidth: '100%' }} // This prevents horizontal overflow
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
                layout="fill"
                objectFit="cover"
                className={`${!item.open && 'opacity-50'}`}
              />
              <span className="absolute top-2 left-2 bg-[#000000cb] text-white text-xs px-2 py-1 rounded-xl">
                {item.discount}
              </span>
              <span
                className={`absolute bottom-2 left-2 px-2 py-1 text-xs font-medium rounded ${
                  item.open ? '' : 'bg-red-500 text-white'
                }`}
              >
                {item.open ? '' : 'Closed'}
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

export default Grilled;
