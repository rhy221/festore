'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Bookmark, Eye } from 'lucide-react';
import { useGetGalleryItems } from '@/queries/useProduct';
import { useRouter } from 'next/navigation';
import { DesignResType } from '@/schema/product.schema';

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

export function GalleryGrid({gallery}: {gallery: DesignResType[]}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  // const {data: gallery, isLoading: galleryLoading} = useGetGalleryItems();
  
  const router = useRouter();
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

  const onItemClick = (id: string) => {
    router.push(`/detail/${id}`)
  }

  // if(galleryLoading) 
  //   return (<>
  //   Loading...
  //   </>)
  // if(!gallery)
  //   return(<>
  //   Check your connection.
  //   </>)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[300px]">
      {gallery.map((item) => (
        <div
          key={item._id}
          className="relative group cursor-pointer rounded-lg overflow-hidden bg-zinc-900"
          onMouseEnter={() => setHoveredId(item._id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onItemClick(item._id)}
        >
          <img
            src={item.imageUrls[0]}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              <p className="text-white font-semibold line-clamp-2">
                {item.title}
              </p>
              <p className="text-white/70 text-sm">{item._id}</p>
              <div className="flex items-center gap-4 text-white/60 text-xs pt-2">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {item.likeCount}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {item.viewCount}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => toggleLike(item._id, e)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  likedItems.has(item._id)
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
