// //context\FilterContext.tsx
// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { supabase } from "@/lib/supabaseClient";

// interface Restaurant {
//   id: string;
//   name: string;
//   image: string;
//   tags: string;
//   rating: number;
//   reviews: string;
//   discount: string;
//   location: string;
//   opensAt: string;
//   closesAt: string;
//   notice?: string;
// }

// interface FilterContextProps {
//   allItems: Restaurant[];
//   filteredItems: Restaurant[];
//   selectedSort: string | null;
//   setSelectedSort: React.Dispatch<React.SetStateAction<string | null>>;
//   handleFilterChange: (tags: string[]) => void;
//   resetFilter: () => void;
// }

// const FilterContext = createContext<FilterContextProps | undefined>(undefined);

// export const FilterProvider = ({ children }: { children: ReactNode }) => {
//   const [allItems, setAllItems] = useState<Restaurant[]>([]);
//   const [filteredItems, setFilteredItems] = useState<Restaurant[]>([]);
//   const [selectedSort, setSelectedSort] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       const { data, error } = await supabase.from("restaurants").select("*");
//       if (data && !error) {
//         setAllItems(data);
//         setFilteredItems(data);
//       }
//     };
//     fetchRestaurants();
//   }, []);

//   const handleFilterChange = (selectedTags: string[]) => {
//     if (selectedTags.length === 0) {
//       setFilteredItems(allItems);
//       return;
//     }

//     const filtered = allItems.filter((item) => {
//       const itemTags = item.tags
//         .split(",")
//         .map((tag) => tag.trim().toLowerCase().replace(/\s+/g, "-"));
//       return selectedTags.some((selected) => itemTags.includes(selected));
//     });

//     setFilteredItems(filtered);
//   };

//   const resetFilter = () => {
//     setFilteredItems(allItems);
//     setSelectedSort(null);
//   };

//   return (
//     <FilterContext.Provider
//       value={{
//         allItems,
//         filteredItems,
//         selectedSort,
//         setSelectedSort,
//         handleFilterChange,
//         resetFilter,
//       }}
//     >
//       {children}
//     </FilterContext.Provider>
//   );
// };

// export const useFilter = () => {
//   const context = useContext(FilterContext);
//   if (!context) {
//     throw new Error("useFilter must be used within a FilterProvider");
//   }
//   return context;
// };




// context/FilterContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabaseClient";

interface Restaurant {
  id: string;
  name: string;
  image: string;
  tags: string;
  rating: number;
  reviews: string;
  discount: string;
  location: string;
  opensAt: string;
  closesAt: string;
  notice?: string;
}

interface FilterContextProps {
  allItems: Restaurant[];
  filteredItems: Restaurant[];
  selectedSort: string | null;
  setSelectedSort: React.Dispatch<React.SetStateAction<string | null>>;
  handleFilterChange: (tags: string[]) => void;
  handleSearchFilter: (tagName: string) => void;
  resetFilter: () => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [allItems, setAllItems] = useState<Restaurant[]>([]);
  const [filteredItems, setFilteredItems] = useState<Restaurant[]>([]);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data, error } = await supabase.from("restaurants").select("*");
      if (data && !error) {
        setAllItems(data);
        setFilteredItems(data);
      }
    };
    fetchRestaurants();
  }, []);

  const normalize = (tag: string) =>
    tag.trim().toLowerCase().replace(/\s+/g, "-");

  const handleFilterChange = (selectedTags: string[]) => {
    if (selectedTags.length === 0) {
      setFilteredItems(allItems);
      return;
    }

    const filtered = allItems.filter((item) => {
      const itemTags = item.tags
        .split(",")
        .map((tag) => normalize(tag));
      return selectedTags.some((selected) => itemTags.includes(normalize(selected)));
    });

    setFilteredItems(filtered);
  };

  const handleSearchFilter = (tagName: string) => {
    const normalized = normalize(tagName);
    const filtered = allItems.filter((item) =>
      item.tags.split(",").map(normalize).includes(normalized)
    );
    setFilteredItems(filtered);
  };

  const resetFilter = () => {
    setFilteredItems(allItems);
    setSelectedSort(null);
  };

  return (
    <FilterContext.Provider
      value={{
        allItems,
        filteredItems,
        selectedSort,
        setSelectedSort,
        handleFilterChange,
        handleSearchFilter,
        resetFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
