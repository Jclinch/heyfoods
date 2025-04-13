//components\ResGrosTabs.tsx
'use client';
import React from 'react';
import { Restaurant, ShoppingCart } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface ResGrosTabsProps {
  activeTab: 'Restaurants' | 'Grocery';
  onTabChange: (tab: 'Restaurants' | 'Grocery') => void;
}

const ResGrosTabs: React.FC<ResGrosTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="">
      <div className="relative flex w-[520px] max-sm:w-[300px] rounded-full p-1 max-sm:p-[2px]">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`absolute top-1 bottom-1 w-[250px] max-sm:w-[146px] rounded-full bg-black z-0 ${
            activeTab === 'Restaurants' ? 'left-1' : 'left-[calc(100%-251px)] max-sm:left-[calc(100%-147px)]'
          }`}
        />
        <button
          className={`relative z-10 flex items-center justify-center flex-1 py-5 px-6 max-sm:py-2 max-sm:px-3 w-[250px] max-sm:w-[146px] rounded-full transition-all duration-300 ${
            activeTab === 'Restaurants' ? 'text-white' : 'text-black'
          }`}
          onClick={() => onTabChange('Restaurants')}
          style={{
            fontFamily: 'Arial',
            fontWeight: 600,
            fontSize: 'inherit',
          }}
        >
          <Restaurant
            sx={{
              fontSize: { xs: 16, sm: 20 },
              marginRight: 1,
            }}
            htmlColor={activeTab === 'Restaurants' ? 'white' : 'black'}
          />
          <span className="max-sm:text-sm">Restaurants</span>
        </button>

        <button
          className={`relative z-10 flex items-center justify-center flex-1 py-5 px-6 max-sm:py-2 max-sm:px-3 w-[250px] max-sm:w-[146px] rounded-full transition-all duration-300 ${
            activeTab === 'Grocery' ? 'text-white' : 'text-black'
          }`}
          onClick={() => onTabChange('Grocery')}
          style={{
            fontFamily: 'Arial',
            fontWeight: 600,
            fontSize: 'inherit',
          }}
        >
          <ShoppingCart
            sx={{
              fontSize: { xs: 16, sm: 20 },
              marginRight: 1,
            }}
            htmlColor={activeTab === 'Grocery' ? 'white' : 'black'}
          />
          <span className="max-sm:text-sm">Grocery</span>
        </button>
      </div>
    </div>
  );
};

export default ResGrosTabs;
