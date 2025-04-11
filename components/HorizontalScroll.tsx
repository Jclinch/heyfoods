// components/HorizontalScroll.tsx
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

const HorizontalScroll: React.FC<Props> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll(-250)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
      >
        <ChevronLeft size={20} />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap px-8 scroll-smooth"
      >
        {children}
      </div>
      <button
        onClick={() => scroll(250)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default HorizontalScroll;
