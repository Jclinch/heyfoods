// // components/SideBarFilter.tsx
// "use client";
// import React from "react";

// const sortOptions = [
//   { label: "Most Popular", value: "mostPopular" },
//   { label: "Nearest", value: "nearest" },
//   { label: "Highest Rated", value: "highestRated" },
//   { label: "Newest", value: "newest" },
//   { label: "Most Rated", value: "mostRated" },
// ];

// interface SideBarFilterProps {
//   selectedSort: string | null;
//   setSelectedSort: React.Dispatch<React.SetStateAction<string | null>>;
// }

// const SideBarFilter: React.FC<SideBarFilterProps> = ({
//   selectedSort,
//   setSelectedSort,
// }) => {
//   const handleSortChange = (value: string) => {
//     setSelectedSort((prev) => (prev === value ? null : value));
//   };

//   return (
//     <div className="w-64 p-4 border-r border-gray-200">
//       <h2 className="text-lg font-semibold">All Stores</h2>
//       <p className="text-gray-500 mb-4">(636 Stores)</p>

//       <div className="mb-4">
//         <h3 className="text-md font-semibold flex items-center gap-1 mb-2">
//           <span className="transform rotate-180">⇅</span> Sort
//         </h3>
//         <ul className="space-y-2">
//           {sortOptions.map((option) => (
//             <li key={option.value} className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 id={option.value}
//                 name="sort"
//                 value={option.value}
//                 checked={selectedSort === option.value}
//                 onChange={() => handleSortChange(option.value)}
//                 className="accent-black cursor-pointer"
//               />
//               <label htmlFor={option.value} className="text-sm">
//                 {option.label}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SideBarFilter;





"use client";
import React from "react";

const sortOptions = [
  { label: "Most Popular", value: "mostPopular" },
  { label: "Nearest", value: "nearest" },
  { label: "Highest Rated", value: "highestRated" },
  { label: "Newest", value: "newest" },
  { label: "Most Rated", value: "mostRated" },
];

interface SideBarFilterProps {
  selectedSort: string | null;
  setSelectedSort: React.Dispatch<React.SetStateAction<string | null>>;
}

const SideBarFilter: React.FC<SideBarFilterProps> = ({
  selectedSort,
  setSelectedSort,
}) => {
  const handleSortChange = (value: string) => {
    setSelectedSort((prev) => (prev === value ? null : value));
  };
    

  return (
    <div className="w-64 p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold">All Stores</h2>
      <p className="text-gray-500 mb-4">(636 Stores)</p>

      <div className="mb-4">
        <h3 className="text-md font-semibold flex items-center gap-1 mb-2">
          <span className="transform rotate-180">⇅</span> Sort
        </h3>
        <ul className="space-y-2">
          {sortOptions.map((option) => (
            <li key={option.value} className="flex items-center gap-2">
              <input
  type="radio"
  id={option.value}
  name="sort"
  value={option.value}
  checked={selectedSort === option.value}
  onClick={() => handleSortChange(option.value)} // 👈 use onClick instead of onChange
  readOnly // 👈 suppresses React warning
  className="accent-black cursor-pointer"
/>

              <label htmlFor={option.value} className="text-sm">
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBarFilter;
