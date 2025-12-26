'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Bookmark, Eye } from 'lucide-react';
import { useGetGalleryItems, useLikeDesignMutation } from '@/queries/useProduct';
import { useRouter, useSearchParams } from 'next/navigation';
import { DesignResType, GetGalleryItemsResType } from '@/schema/product.schema';
import { useAuth } from '@/hooks/useAuth';

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

export function GalleryGrid({gallery}: {gallery: GetGalleryItemsResType}) {

    const searchParams = useSearchParams();
    
    const updateFilter = (key: string, value: string | null) => {
          
    
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
        router.push(`?${params.toString()}`, { scroll: false });
      };

  
  const router = useRouter();

    const likeMutation = useLikeDesignMutation();
   const {execute} = useAuth();
  
    // 3. Handlers
    const handleLike = async (id: string) => {
      execute( async () => {
        if (likeMutation.isPending) return;
      try {
        const result = await likeMutation.mutateAsync(id);
        console.log('Like result:', result);
      } catch (err) {
        console.error('Like error:', err);
      }
      })
      
    };

  const onItemClick = (id: string) => {
    router.push(`/detail/${id}`)
  }

  if(!gallery)
    return(<>
    Check your connection
    </>)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 auto-rows-[300px]">
      {gallery.data.map((item) => (
        <div
          key={item._id}
          className="relative group cursor-pointer rounded-lg overflow-hidden bg-zinc-900"
          
          onClick={() => onItemClick(item._id)}
        >
          <Image
            src={item.imageUrls[0] || ""}
            width={200}
            height={250}
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
              onClick={(e) => {
                e.stopPropagation();
                handleLike(item._id);
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  item.isLiked
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
