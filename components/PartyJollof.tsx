// //components\PartyJollof.tsx
// 'use client';
// import React, { useRef } from 'react';
// import Image from 'next/image';
// import { sampleData } from '@/constant/sampleData';
// import { IconButton, Typography } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { Star } from 'lucide-react';

// const PartyJollof = () => {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: 'left' | 'right') => {
//     if (scrollRef.current) {
//       const scrollAmount = scrollRef.current.offsetWidth / 2;
//       scrollRef.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth',
//       });
//     }
//   };

//   const isCurrentlyOpen = (opensAt: string, closesAt: string): boolean => {
//     const now = new Date();

//     const [openHour, openMinute] = opensAt.split(':').map(Number);
//     const [closeHour, closeMinute] = closesAt.split(':').map(Number);

//     const openTime = new Date(now);
//     openTime.setHours(openHour, openMinute, 0, 0);

//     const closeTime = new Date(now);
//     closeTime.setHours(closeHour, closeMinute, 0, 0);

//     // If closesAt is earlier than opensAt, it means the business closes the next day
//     if (closeTime <= openTime) {
//       // Extend closeTime to next day
//       closeTime.setDate(closeTime.getDate() + 1);
//     }

//     return now >= openTime && now <= closeTime;
//   };

//   const riceData = sampleData.filter((item) =>
//     item.tags.toLowerCase().includes('rice')
//   );

//   return (
//     <div className="w-full p-4">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <Typography variant="h6" className="font-bold">
//           Party Jollof in IB
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

//       {/* Scrollable Cards */}
//       <div
//         ref={scrollRef}
//         className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
//         style={{ maxWidth: '100%' }} // This prevents horizontal overflow
//       >
        
//         {riceData.map((item) => (
//                     const isOpen = isCurrentlyOpen(item.opensAt, item.closesAt);
//                     <div className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded shadow">
//                       {isOpen ? (
//                       <span className="text-green-500">Open</span>
//                       ) : (
//                       <span className="text-red-500">Closed</span>
//                       )}
//                     </div>

//           <div
//             key={item.id}
//             className="min-w-[350px] max-w-[300px] flex-shrink-0 relative overflow-hidden"
//           >
            
//             <div className="relative w-full h-32">
//               <Image
//                 src={item.image}
//                 alt={item.name}
//                 layout="fill"
//                 objectFit="cover"
//                 className={`${item.notice ? 'opacity-50' : ''}`}
//               />
//             </div>
//             <div className="py-2">
//               <h3 className="text-sm font-semibold">{item.name}</h3>
//               <p className="text-xs text-gray-500">{item.tags}</p>
//               <div className="flex items-center text-xs text-gray-700 mt-1">
//                 <Star className="w-4 h-4 text-green-500" />
//                 <span className="ml-1 font-medium">{item.rating}</span>
//                 <span className="ml-2">{item.reviews}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PartyJollof;







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
        {riceData.map((item) => {
          const isOpen = isCurrentlyOpen(item.opensAt, item.closesAt);
          return (
            <div
              key={item.id}
              className="min-w-[350px] max-w-[300px] flex-shrink-0 relative overflow-hidden"
            >
              {/* Open/Closed Status */}
              <div className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded shadow">
                {isOpen ? (
                  <span className="text-green-500"></span>
                ) : (
                  <span className="text-red-500">Closed</span>
                )}
              </div>

              <div className="relative w-full h-32">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className={`${item.notice ? '' : ''}`}
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
          );
        })}
      </div>
    </div>
  );
};

export default PartyJollof;
