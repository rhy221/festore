'use client';

import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export interface StoreItem {
  id: string;
  title: string;
  image: string;
  creator: string;
  creatorBadge: string;
  price: number | null;
  views: number;
  likes: number;
  isFree: boolean;
  category: string;
}

interface StoreGridProps {
  items: StoreItem[];
  onAddToCart: (item: StoreItem) => void;
}

export function StoreGrid({ items, onAddToCart }: StoreGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="group"
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="relative bg-zinc-900 rounded-lg overflow-hidden cursor-pointer aspect-[3/4]">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {hoveredId === item.id && (
              <>
                <div className="absolute inset-0 bg-black/40 transition-opacity" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(item);
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-full p-3 hover:bg-white/90 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>

                <button
                  onClick={(e) => toggleLike(item.id, e)}
                  className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full p-2 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedItems.has(item.id)
                        ? 'fill-white text-white'
                        : 'text-white'
                    }`}
                  />
                </button>
              </>
            )}

            {item.isFree && (
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-white text-xs font-medium">
                FREE
              </div>
            )}
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex-shrink-0" />
              <p className="text-white/60 text-xs truncate">{item.creatorBadge}</p>
            </div>

            <h3 className="text-white text-sm font-medium line-clamp-2">
              {item.title}
            </h3>

            {!item.isFree && item.price !== null && (
              <p className="text-white font-semibold text-sm">
                ${item.price.toFixed(2)}
              </p>
            )}

            {item.isFree && (
              <p className="text-white font-semibold text-sm">FREE</p>
            )}

            <div className="flex items-center gap-3 text-white/50 text-xs">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {item.views}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {item.likes}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
