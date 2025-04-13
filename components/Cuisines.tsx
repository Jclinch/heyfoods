import React from "react";
import HorizontalScroll from "./HorizontalScroll";
import Image from "next/image";

const images = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
  "/images/10.jpg",
  "/images/11.jpg",
  "/images/12.jpg",
  "/images/13.jpg",
  "/images/14.jpg",
];

const Cuisines: React.FC = () => {
  return (
    <div>
      <HorizontalScroll>
        {images.map((src, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg"
            style={{
              flex: "0 0 50%", // Mobile: 2 per row
              height: "120px", // Mobile image height
              marginRight: "16px",
            }}
          >
            {/* Desktop override */}
            <div
              className="hidden sm:block h-[120px]"
              style={{
                flex: "0 0 33.33%", // only 3 items per row
                aspectRatio: "3 / 1",
                marginRight: "2px", // Reduced margin to decrease spacing
              }}
            >
              <div className="relative h-full w-full rounded-lg overflow-hidden">
                <Image
                  src={src}
                  alt={`Cuisine ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
            </div>

            {/* Mobile only */}
            <div className="sm:hidden h-full w-full">
              <Image
                src={src}
                alt={`Cuisine ${index + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        ))}
      </HorizontalScroll>
    </div>
  );
};

export default Cuisines;
