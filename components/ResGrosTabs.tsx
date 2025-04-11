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
    <div className=''>
    <div className="relative flex w-[520px] rounded-full p-1 ">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`absolute top-1 bottom-1 w-[250px] rounded-full bg-black z-0 ${
          activeTab === 'Restaurants' ? 'left-1' : 'left-[calc(100%-251px)]'
        }`}
      />
      <button
        className={`relative z-10 flex items-center justify-center flex-1 py-5 px-6 w-[250px] rounded-full transition-all duration-300 ${
          activeTab === 'Restaurants' ? 'text-white' : 'text-black'
        }`}
        onClick={() => onTabChange('Restaurants')}
      >
        <Restaurant
          sx={{ fontSize: 20, marginRight: 1 }}
          htmlColor={activeTab === 'Restaurants' ? 'white' : 'black'}
        />
        Restaurants
      </button>

      <button
        className={`relative z-10 flex items-center justify-center flex-1 py-5 px-6 w-[250px] rounded-full transition-all duration-300 ${
          activeTab === 'Grocery' ? 'text-white' : 'text-black'
        }`}
        onClick={() => onTabChange('Grocery')}
      >
        <ShoppingCart
          sx={{ fontSize: 20, marginRight: 1 }}
          htmlColor={activeTab === 'Grocery' ? 'white' : 'black'}
        />
        Grocery
      </button>
    </div>
    </div>
  );
};

export default ResGrosTabs;
