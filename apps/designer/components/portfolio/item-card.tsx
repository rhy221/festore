
// import React from 'react';
// import { Item } from './types';
// import { Badge } from '@workspace/ui/components/badge';

// interface ItemCardProps {
//   item: Item;
// }

// export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
//   return (
//     <div className="group relative flex flex-col bg-black rounded-sm overflow-hidden cursor-pointer">
//       {/* Image Aspect Ratio 4:5 approx */}
//       <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#151515]">
//         {item.imageUrl ? (
//           <img 
//             src={item.imageUrl} 
//             alt={item.title} 
//             className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
//           />
//         ) : (
//            /* Placeholder for items without image (like the black box in screenshot) */
//           <div className="w-full h-full flex items-end justify-center p-4 bg-[#050505]">
//               <div className="w-full h-1/6 bg-white/5 rounded"></div>
//           </div>
//         )}

//         {/* Top Overlays */}
//         <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
//           {item.isFree && (
//             <Badge>Free</Badge>
//           )}
          
//           {/* Brand Logo (CLO) */}
//           {item.brandLogoUrl && (
//              <span className="text-white/60 font-mono text-[10px] tracking-widest font-bold drop-shadow-md">
//                  {item.brandLogoUrl}
//              </span>
//           )}
//         </div>

//         {/* Hover Overlay Gradient */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       </div>

//       {/* Item Info - Only visible on hover or always visible depending on style. 
//           In screenshot, titles are not clearly visible outside, but likely appear on interaction or below.
//           We will put it below to be safe, or overlay at bottom. Screenshot suggests clean look.
//       */}
//       <div className="absolute bottom-0 left-0 w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform translate-y-2 group-hover:translate-y-0">
//         <h3 className="text-white font-medium text-sm truncate">{item.title}</h3>
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Eye, Gavel, Clock } from 'lucide-react';
import { Badge } from '@workspace/ui/components/badge';
import { cn } from '@workspace/ui/lib/utils';
import { Button } from '@workspace/ui/components/button';
import { useAuth } from '@/hooks/useAuth';
import { useLikeDesignMutation } from '@/queries/useProduct';
import { on } from 'events';
import { formatCurrency } from '@/lib/utils';

// Interface based on your Mongoose Schema
export interface DesignItem {
  _id: string;
  title: string;
  imageUrls: string[];
  type: 'fixed' | 'auction' | 'gallery';
  
  // Store specific
  price?: number;
  
  // Auction specific
  status?: 'upcoming' | 'active' | 'ended' | 'cancelled';
  currentPrice?: number;
  startingPrice?: number;
  endTime?: string;

  // Stats
  viewCount?: number;
  likeCount?: number;
  
  // Designer (Populated)
  designerProfile?: {
    name: string;
    avatarUrl: string;
  };

  isLiked?: boolean;
}

interface ItemCardProps {
  data: DesignItem;
  className?: string;
  onLike?: (id: string) => void; 
  onAddToCart?: (id: string) => void;
}

export function ItemCard({ data, className, onLike, onAddToCart }: ItemCardProps) {
const { _id, title, imageUrls, isLiked, likeCount, viewCount, type, status, price, currentPrice, startingPrice, designerProfile } = data;  const mainImage = imageUrls?.[0] || '/placeholder-image.jpg'; // Fallback image

  const [localLike, setLocalLike] = useState(false);
 useEffect(() => {
    setLocalLike(isLiked || false);
  }, [isLiked]);


  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Ngăn chặn chuyển trang khi bấm Like
    e.stopPropagation();
if (onLike) {
      onLike(_id);
      setLocalLike(!localLike);
    }  };

    const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Ngăn chặn chuyển trang khi bấm Like
    e.stopPropagation();
if (onAddToCart) {
      onAddToCart(_id);
    }  };

  // --- Helper: Render Auction Status ---
  const renderAuctionBadge = () => {
    if (type !== 'auction' || !status) return null;

    const statusConfig = {
      upcoming: { label: 'Upcoming', color: 'bg-blue-500/90 hover:bg-blue-600/90', icon: Clock },
      active: { label: 'Live Auction', color: 'bg-green-500/90 hover:bg-green-600/90 animate-pulse', icon: Gavel },
      ended: { label: 'Ended', color: 'bg-zinc-600/90 hover:bg-zinc-700/90', icon: null },
      cancelled: { label: 'Cancelled', color: 'bg-red-500/90 hover:bg-red-600/90', icon: null },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={cn("absolute top-3 left-3 z-20 border-0 px-3 py-1.5 backdrop-blur-md shadow-lg", config.color)}>
        {Icon && <Icon size={14} className="mr-1.5" />}
        <span className="font-semibold tracking-wide uppercase text-[10px]">{config.label}</span>
      </Badge>
    );
  };

  // --- Helper: Render Price Tag (Store & Auction) ---
  const renderPriceTag = () => {
    // Store: Simple Price Pill
    if (type === 'fixed') {
      return (
        <div className="absolute top-3 left-3 z-20 bg-zinc-800/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
          <span className="font-bold text-sm">{formatCurrency(price || 0)}</span>
        </div>
      );
    }
    
    // Auction: Current Bid
    if (type === 'auction' && (status === 'active' || status === 'ended')) {
       const displayPrice = currentPrice || startingPrice || 0;
       return (
        <div className="absolute bottom-16 left-3 z-20 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 ">
           <span className="text-[10px] text-zinc-300 uppercase">Current Bid</span>
           <span className="font-bold text-sm">{formatCurrency(displayPrice)}</span>
        </div>
       );
    }
    
    return null;
  };

  return (
    <div className={cn("group relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/50 shadow-sm hover:shadow-md transition-all duration-300", className)}>
        
        {/* --- Link Wrapper --- */}
        <Link href={type !== "auction" ? `/detail/${_id}` : `/auction/detail/${_id}`} className="block h-full w-full">
            
            {/* Image */}
            <div className="relative h-full w-full">
                <Image
                    src={mainImage}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            </div>

            {/* --- Badges & Tags --- */}
            {renderAuctionBadge()}
            {renderPriceTag()}

        </Link>

        {/* --- Top Right Actions --- */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300  group-hover:translate-x-0">
             {/* Add to Cart (Store Only) */}
             {type === 'fixed' && (
                <button
                  onClick={handleAddToCartClick}
                  className=" bg-white/10 hover:bg-white/20 backdrop-blur rounded-full p-2 transition-colors"
                >
                  <ShoppingCart
                    className="w-4 h-4 fill-white text-white hover:fill-blue-400 hover:text-blue-400"
                  />
                </button>
             )}
             {/* Like Button (All Types) */}
            {/* LIKE BUTTON */}
             <Button 
                size="icon" 
                variant="ghost" 
                onClick={handleLikeClick}
                className={cn(
                  "h-9 w-9 rounded-full backdrop-blur-sm border border-white/10 transition-colors",
                  localLike 
                    ? "bg-red-500/20 text-red-500 border-red-500/50 hover:bg-red-500/30" // Style khi đã Like
                    : "bg-black/40 text-white hover:bg-black/60" // Style mặc định
                )}
             >
                <Heart size={16} className={cn(localLike && "fill-current")} />
             </Button>
        </div>

        {/* --- Bottom Content --- */}
        <div className="absolute bottom-0 left-0 w-full p-4 z-20">
            <h3 className="text-white font-bold leading-tight truncate drop-shadow-md mb-1">{title}</h3>
            
            <div className="flex items-center justify-between text-zinc-300 text-xs">
                {/* Designer Info */}
                {/* <div className="flex items-center gap-2">
                     <div className="w-5 h-5 rounded-full bg-zinc-700 overflow-hidden relative border border-white/20"> */}
                        {/* Placeholder for avatar if missing */}
                        {/* {data.designerProfile?.avatarUrl ? (
                             <Image src={data.designerProfile.avatarUrl} alt="avatar" fill className="object-cover"/>
                        ) : (
                             <div className="w-full h-full bg-indigo-500" />
                        )} */}
                     {/* </div>
                     <span className="truncate max-w-[80px] hover:text-white transition-colors">
                        {data.designerProfile?.name || 'Unknown'}
                     </span>
                </div> */}

                {/* Stats */}
                <div className="flex items-center gap-3 opacity-80">
                    <div className="flex items-center gap-1">
                        <Eye size={12} /> {data.viewCount || 0}
                    </div>
                    <div className="flex items-center gap-1">
                        <Heart size={12} /> {data.likeCount || 0}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
