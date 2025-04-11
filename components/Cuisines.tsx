import React from 'react';
import HorizontalScroll from './HorizontalScroll';
import Image from 'next/image';

const images = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',
    '/images/8.jpg',
    '/images/9.jpg',
    '/images/10.jpg',
    '/images/11.jpg',
    '/images/12.jpg',
    '/images/13.jpg',
    '/images/14.jpg',
];

const Cuisines: React.FC = () => {
    return (
        <div>
            {/* <h2 className="text-2xl font-bold px-4 py-2">Cuisines</h2> */}
            <HorizontalScroll>
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="relative rounded-lg overflow-hidden"
                        style={{
                            flex: '0 0 33.33%', // only 3 items per row
                            aspectRatio: '3 / 1',
                            marginRight: '16px',
                        }}
                    >
                        <Image
                            src={src}
                            alt={`Cuisine ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                ))}
            </HorizontalScroll>
        </div>
    );
};

export default Cuisines;
