'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Bookmark, Eye } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  creator: string;
  likes: number;
  views: number;
  category: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
}

export function GalleryGrid({ items, onItemClick }: GalleryGridProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[300px]">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative group cursor-pointer rounded-lg overflow-hidden bg-zinc-900"
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onItemClick(item)}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              <p className="text-white font-semibold line-clamp-2">
                {item.title}
              </p>
              <p className="text-white/70 text-sm">{item.creator}</p>
              <div className="flex items-center gap-4 text-white/60 text-xs pt-2">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {item.likes}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {item.views}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => toggleLike(item.id, e)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  likedItems.has(item.id)
                    ? 'fill-red-500 text-red-500'
                    : 'text-white'
                }`}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
