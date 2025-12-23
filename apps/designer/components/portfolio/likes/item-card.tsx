'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { Button } from '@workspace/ui/components/button';
import { DesignItem } from '../item-card';
import { set } from 'date-fns';

interface MinimalItemCardProps {
  data: DesignItem;
  onLike?: (id: string) => void;
}

export function MinimalItemCard({ data, onLike }: MinimalItemCardProps) {
  const { _id, title, imageUrls, isLiked, type } = data;
  const mainImage = imageUrls?.[0] || '/placeholder.png';
const [localLike, setLocalLike] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onLike) {
        onLike(_id);
        setLocalLike(!localLike);
    }
        
  };

  useEffect(() => {
    setLocalLike(isLiked || false);
  }, [isLiked]);

  return (
    <div className="group relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all">
        <Link href={type !== "auction" ? `/detail/${_id}` : `/auction/detail/${_id}`} className="block h-full w-full">
        {/* Image */}
        <div className="relative h-full w-full">
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient tối nhẹ ở dưới để làm nổi text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />
        </div>
      </Link>

      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300  group-hover:translate-x-0">
{/* Like Button */}
        <Button
          size="icon"
          variant="ghost"
          onClick={handleLikeClick}
          className={cn(
            "h-8 w-8 rounded-full transition-colors shrink-0",
            localLike
              ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
              : "bg-white/10 text-white hover:bg-white/20"
          )}
        >
          <Heart size={14} className={cn(isLiked && "fill-current")} />
        </Button>
      </div>

      {/* Title & Like Button Row (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full p-3 z-20 flex items-center justify-between gap-2">
        
        {/* Title */}
        <h3 className="text-white font-medium text-sm truncate flex-1" title={title}>
          {title}
        </h3>

        
      </div>
    </div>
  );
}