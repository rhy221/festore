
import React from 'react';
import { Item } from './types';
import { Badge } from '@workspace/ui/components/badge';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="group relative flex flex-col bg-black rounded-sm overflow-hidden cursor-pointer">
      {/* Image Aspect Ratio 4:5 approx */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#151515]">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
        ) : (
           /* Placeholder for items without image (like the black box in screenshot) */
          <div className="w-full h-full flex items-end justify-center p-4 bg-[#050505]">
              <div className="w-full h-1/6 bg-white/5 rounded"></div>
          </div>
        )}

        {/* Top Overlays */}
        <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
          {item.isFree && (
            <Badge>Free</Badge>
          )}
          
          {/* Brand Logo (CLO) */}
          {item.brandLogoUrl && (
             <span className="text-white/60 font-mono text-[10px] tracking-widest font-bold drop-shadow-md">
                 {item.brandLogoUrl}
             </span>
          )}
        </div>

        {/* Hover Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Item Info - Only visible on hover or always visible depending on style. 
          In screenshot, titles are not clearly visible outside, but likely appear on interaction or below.
          We will put it below to be safe, or overlay at bottom. Screenshot suggests clean look.
      */}
      <div className="absolute bottom-0 left-0 w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform translate-y-2 group-hover:translate-y-0">
        <h3 className="text-white font-medium text-sm truncate">{item.title}</h3>
      </div>
    </div>
  );
};
