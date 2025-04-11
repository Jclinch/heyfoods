// //components\AllRestaurants.tsx
// // components/AllRestaurants.tsx

// 'use client';
// import React from 'react';
// import Image from 'next/image';
// import { sampleData } from '@/constant/sampleData';
// import { Star } from 'lucide-react';

// const AllRestaurants = () => {
//   const currentHour = new Date().getHours();

//   return (
//     <div className="px-6 py-4 ">
//       <h2 className="text-2xl font-extrabold mb-4">All Restaurants</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 ">
//         {sampleData.map((restaurant) => {
//           const opensAt = parseInt(restaurant.opensAt.split(':')[0], 10);
//           const closesAt = parseInt(restaurant.closesAt.split(':')[0], 10);
//           const isOpen = currentHour >= opensAt && currentHour < closesAt;

//           return (
//             <div
//               key={restaurant.id}
//               className={`rounded-xl  shadow-md overflow-hidden min-w-[15%] max-w-[33.33%] ${
//                 isOpen ? 'opacity-100' : 'opacity-50'
//               }`}
//             >
//               {/* Image + open/closed badge */}
//               <div className="relative h-40 w-full">
//                 <Image
//                   src={restaurant.image}
//                   alt={restaurant.name}
//                   fill
//                   className="object-cover"
//                 />
//                 <span
//                   className={`absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded text-white ${
//                     isOpen ? 'bg-green-600' : 'bg-red-500'
//                   }`}
//                 >
//                   {isOpen ? 'Open Now' : 'Closed'}
//                 </span>
//               </div>

//               {/* Info */}
//               <div className="p-3">
//                 <h3 className="font-bold text-base mb-1">{restaurant.name}</h3>
//                 <p className="text-sm text-gray-500 mb-2">{restaurant.tags}</p>

//                 <div className="flex items-center text-sm text-gray-700 mb-2">
//                   <Star className="w-4 h-4 text-green-500" />
//                   <span className="ml-1 font-semibold">{restaurant.rating}</span>
//                   <span className="ml-1">{restaurant.reviews}+ Ratings</span>
//                 </div>

//                 {restaurant.notice && (
//                   <div className="bg-gray-100 text-xs text-gray-800 rounded px-3 py-2">
//                     {restaurant.notice}
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AllRestaurants;









'use client';
import React from 'react';
import Image from 'next/image';
import { sampleData } from '@/constant/sampleData';
import { Star } from 'lucide-react';

const AllRestaurants = () => {
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
    <div className="px-4 py-4">
      <h2 className="text-2xl font-extrabold mb-4">All Restaurants</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6">
      {/* <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"> */}

        {sampleData.map((restaurant) => {
          const isOpen = isCurrentlyOpen(restaurant.opensAt, restaurant.closesAt);

          return (
            <div
              key={restaurant.id}
              className={`rounded-sm overflow-hidden ${
                isOpen ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {/* Image + open/closed badge */}
              <div className="relative h-30 w-full">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
                <span
                  className={`absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded text-white ${
                    isOpen ? '' : 'bg-red-500'
                  }`}
                >
                  {isOpen ? '' : 'Closed'}
                </span>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="font-bold text-base mb-1">{restaurant.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{restaurant.tags}</p>

                <div className="flex items-center text-sm text-gray-700 mb-2">
                  <Star className="w-4 h-4 text-green-500" />
                  <span className="ml-1 font-semibold">{restaurant.rating}</span>
                  <span className="ml-1">{restaurant.reviews}+ Ratings</span>
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
