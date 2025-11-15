'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';

interface AuctionGalleryProps {
  images: string[];
  title: string;
}

export function AuctionGallery({ images, title }: AuctionGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl aspect-square overflow-hidden flex items-center justify-center">
        <img
          src={images[activeIndex]}
          alt={`${title} - ${activeIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-zinc-900" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-zinc-900" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-16 rounded-lg overflow-hidden transition-opacity ${
                activeIndex === index ? 'opacity-100' : 'opacity-50 hover:opacity-75'
              }`}
            >
              <img
                src={images[index]}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
