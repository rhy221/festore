'use client';

import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useGetStoreItems } from '@/queries/useProduct';
import { useRouter } from 'next/navigation';
import { DesignResType, GetStoreItemsResType } from '@/schema/product.schema';
import { useAddToCart } from '@/queries/useCart';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';

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

export function StoreGrid({store} : {store: GetStoreItemsResType}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const router = useRouter();
  const addToCartMutation = useAddToCart();

  const onItemClick = (id: string) => {
    router.push(`/detail/${id}`);
  }
  
  const onAddToCart = async (id: string) => {
    if(addToCartMutation.isPending) return;
    try {
      const result = await addToCartMutation.mutateAsync({productId: id});
    } catch(err)  {
      console.log(err);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {store.data.map((item) => (
        <div
          key={item._id}
          className="group"
          onMouseEnter={() => setHoveredId(item._id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => {onItemClick(item._id)}}
        >
          <div className="relative bg-zinc-900 rounded-lg overflow-hidden cursor-pointer aspect-[3/4]">
            <Image
              src={item.imageUrls[0] || ""}
              width={200}
              height={250}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {hoveredId === item._id && (
              <>
                <div className="absolute inset-0 bg-black/40 transition-opacity" />
                {/* <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // onAddToCart(item);
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-full p-3 hover:bg-white/90 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button> */}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(item._id)
                  }}
                  className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full p-2 transition-colors"
                >
                  <ShoppingCart
                    className="w-4 h-4 fill-white text-white hover:fill-blue-400 hover:text-blue-400"
                  />
                </button>
              </>
            )}

            {/* {item.isFree && (
              <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-white text-xs font-medium">
                FREE
              </div>
            )} */}
          </div>

          <div className="mt-3 space-y-2">
            {/* <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex-shrink-0" />
              <p className="text-white/60 text-xs truncate">{item.creatorBadge}</p> 
            </div> */}

            <p className="text-zinc-500 font-semibold text-sm">{item.designerProfile.name}</p>

            <h3 className="text-white text-sm font-medium line-clamp-2">
              {item.title}
            </h3>

             {item.price !== null && (
              <p className="text-white font-semibold">
                {formatCurrency(item.price)}
              </p>
            )}

            

            <div className="flex items-center gap-3 text-white/50 text-xs">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {item.viewCount}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {item.likeCount}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
