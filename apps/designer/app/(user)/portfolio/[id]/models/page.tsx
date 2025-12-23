'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { ItemCard, DesignItem } from '@/components/portfolio/item-card'; // Import the new component
import { useLikeDesignMutation, useUserProducts } from '@/queries/useProduct';
import { cn } from '@workspace/ui/lib/utils';

// Import Shadcn Pagination
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@workspace/ui/components/pagination';

// Import Shadcn Select for Limit Control
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select";
import { use } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAddToCart } from '@/queries/useCart';

export default function ModelsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {id} = use(params);

  const likeMutation = useLikeDesignMutation();
  const addToCartMutation = useAddToCart();
  const { execute } = useAuth(); // Hook check login

  const handleLike = (id: string) => {
    // Wrap trong execute để bắt buộc user phải login mới được like
    execute(async () => {
      if (likeMutation.isPending) return;
      try {
        await likeMutation.mutateAsync(id);
        console.log('Liked:', id);
      } catch (err) {
        console.error('Like error:', err);
      }
    });
  };

   const onAddToCart = async (id: string) => {
    execute(async () => {
if(addToCartMutation.isPending) return;
    try {
      const result = await addToCartMutation.mutateAsync({productId: id});
    } catch(err)  {
      console.log(err);
    }
    })
    
  }

  // 1. Get Params from URL
  const currentType = searchParams.get('type') || '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentLimit = Number(searchParams.get('limit')) || 12; // Default 12 items

  // 2. Query Object for API
  const queryParams = {
    type: currentType, // API usually expects 'type', not 'currentType'
    page: currentPage,
    limit: currentLimit,
  }

  // 3. Fetch Data
  const { data, isLoading } = useUserProducts(id, queryParams);

  // --- Handlers ---

  // Handle Tab Change
  const handleTypeChange = (type: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (!type) newParams.delete('type');
    else newParams.set('type', type);
    
    newParams.set('page', '1'); // Reset to page 1
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  // Handle Page Change
  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    router.push(`${pathname}?${newParams.toString()}`);
  };

  // Handle Limit Change
  const handleLimitChange = (value: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('limit', value);
      newParams.set('page', '1'); // Reset to page 1 when changing limit
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  // Helper for tab styling
  const getTabClass = (type: string) => {
    const isActive = currentType === type;
    return cn(
      "px-6 py-2 rounded-full text-sm font-bold transition-all border border-transparent",
      isActive 
        ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)] scale-105" 
        : "bg-[#18181b] text-zinc-400 border-zinc-800 hover:bg-[#27272a] hover:text-white hover:border-zinc-600"
    );
  };

  

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-500 w-full">
      
      {/* --- Controls Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          
          {/* Sub Navigation (Tabs) */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button onClick={() => handleTypeChange('')} className={getTabClass('')}>
              All
            </button>
            <button onClick={() => handleTypeChange('fixed')} className={getTabClass('fixed')}>
              Store
            </button>
            <button onClick={() => handleTypeChange('gallery')} className={getTabClass('gallery')}>
              Gallery
            </button>
            <button onClick={() => handleTypeChange('auction')} className={getTabClass('auction')}>
              Auction
            </button>
          </div>

          {/* Limit Controller */}
          <div className="flex items-center gap-2">
             <span className="text-sm text-zinc-500 font-medium">Show:</span>
             <Select value={currentLimit.toString()} onValueChange={handleLimitChange}>
                <SelectTrigger className="w-[80px] h-9 bg-[#18181b] border-zinc-800 text-white rounded-full text-xs font-bold focus:ring-offset-0 focus:ring-white/20">
                    <SelectValue placeholder="12" />
                </SelectTrigger>
                <SelectContent className="bg-[#18181b] border-zinc-800 text-white min-w-[80px]">
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="48">48</SelectItem>
                    <SelectItem value="96">96</SelectItem>
                </SelectContent>
             </Select>
          </div>
      </div>

      {/* --- Content Area --- */}
      <div className="space-y-16 min-h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin text-white w-8 h-8" />
          </div>
        ) : (
          <>
            {/* Items Grid */}
            {data?.data?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
                {data.data.map((item: DesignItem) => (
                   <ItemCard key={item._id} data={item} onLike={handleLike} onAddToCart={onAddToCart}/>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-4 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-3xl">📦</div>
                <p className="font-medium">No designs found in this category.</p>
              </div>
            )}

            {/* --- Pagination --- */}
            {data?.meta?.totalPages > 1 && (
              <div className="mt-10 pb-10">
                <Pagination>
                  <PaginationContent>
                    
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => data.meta.hasPrevPage && handlePageChange(currentPage - 1)}
                        className={cn(
                          "cursor-pointer hover:bg-white/10 hover:text-white text-zinc-400 transition-colors", 
                          !data.meta.hasPrevPage && "pointer-events-none opacity-30"
                        )} 
                      />
                    </PaginationItem>

                    {/* Simple Page Numbers */}
                    {Array.from({ length: data.meta.totalPages }, (_, i) => i + 1).map((page) => {
                       // Logic to show generic ellipsis behavior
                       if (page === 1 || page === data.meta.totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                         return (
                            <PaginationItem key={page}>
                                <PaginationLink
                                onClick={() => handlePageChange(page)}
                                isActive={page === currentPage}
                                className={cn(
                                    "cursor-pointer hover:bg-white/10 hover:text-white text-zinc-400 w-9 h-9 transition-all",
                                    page === currentPage && "bg-white text-black hover:bg-white hover:text-black font-bold scale-110"
                                )}
                                >
                                {page}
                                </PaginationLink>
                            </PaginationItem>
                         )
                       }
                       if (page === currentPage - 2 || page === currentPage + 2) {
                           return <PaginationItem key={page}><PaginationEllipsis className="text-zinc-600" /></PaginationItem>
                       }
                       return null;
                    })}

                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => data.meta.hasNextPage && handlePageChange(currentPage + 1)}
                        className={cn(
                          "cursor-pointer hover:bg-white/10 hover:text-white text-zinc-400 transition-colors", 
                          !data.meta.hasNextPage && "pointer-events-none opacity-30"
                        )}
                      />
                    </PaginationItem>

                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}


// "use client"
// import React, { useState, useEffect } from 'react';
// import { User, Collection } from '@/components/portfolio/types';
// import { ProfileBanner } from '@/components/portfolio/profile-banner';
// import { ProfileTabs } from '@/components/portfolio/profile-tabs';
// import { Button } from '@workspace/ui/components/button';
// import { Input } from '@workspace/ui/components/input';
// import { ItemCard } from '@/components/portfolio/item-card';
// import { Share2, ChevronRight, MoreHorizontal } from 'lucide-react';

// // --- Mock Data ---

// const USER_EDIT: User = {
//   id: '1',
//   username: 'ghuy9366',
//   displayName: 'ghuy9366',
//   headline: '',
//   avatarUrl: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=400&h=400&q=80', // Chick/bird avatar
//   bannerUrl: '', // Empty
//   followers: 0,
//   following: 0,
//   itemsCount: 0,
// };

// const USER_VIEW: User = {
//   id: '2',
//   username: 'clo_training',
//   displayName: 'CLO Training',
//   headline: 'CLO Training Materials and CLO Library Assets',
//   avatarUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&q=80', // Abstract logo placeholder
//   bannerUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&h=400&q=80', // Wavy texture
//   followers: 2298,
//   following: 1,
//   itemsCount: 217
// };

// const MOCK_COLLECTIONS: Collection[] = [
//   {
//     id: 'c1',
//     title: "Beginner's Guide to CLO",
//     items: [
//       { id: '1', title: 'Dress Blue', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80', isFree: true, brandLogoUrl: 'CLO' },
//       { id: '2', title: 'Shirt White', imageUrl: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=500&q=80', isFree: true, brandLogoUrl: 'CLO' },
//       { id: '3', title: 'Polo Shirt', imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', isFree: true, brandLogoUrl: 'CLO' },
//       { id: '4', title: 'Empty Pattern', imageUrl: '', isFree: true, brandLogoUrl: 'CLO' },
//     ]
//   },
//   {
//     id: 'c2',
//     title: "Essentials",
//     items: [
//        { id: '5', title: 'T-Shirt Basic', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80', isFree: true, brandLogoUrl: 'CLO' },
//        { id: '6', title: 'Jeans Standard', imageUrl: 'https://images.unsplash.com/photo-1542272617-08f086302542?w=500&q=80', isFree: true, brandLogoUrl: 'CLO' },
//     ]
//   }
// ];


// export default function ProfilePage() {

//   return (
//     <div className="animate-in slide-in-from-bottom-2 duration-500">
               
//                 {/* Sub Navigation */}
//                 <div className="flex gap-3 mb-10">
//                     <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-white/10">
//                       All
//                     </button>
//                     <button className="bg-[#18181b] text-gray-400 px-5 py-2 rounded-full text-sm font-bold hover:bg-[#27272a] hover:text-white transition-all">
//                       Store
//                     </button>
//                     <button className="bg-[#18181b] text-gray-400 px-5 py-2 rounded-full text-sm font-bold hover:bg-[#27272a] hover:text-white transition-all">
//                       Gallery
//                     </button>
//                     <button className="bg-[#18181b] text-gray-400 px-5 py-2 rounded-full text-sm font-bold hover:bg-[#27272a] hover:text-white transition-all">
//                       Auction
//                     </button>
//                 </div>
//                 {/* Collections Grid */}
//                 <div className="space-y-16">
//                   {MOCK_COLLECTIONS.map((collection) => (
//                     <div key={collection.id} className="space-y-6">
//                        {/* Collection Header */}
//                        <div className="flex items-center gap-2 group cursor-pointer w-fit">
//                           <h2 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
//                             {collection.title}
//                           </h2>
//                           <ChevronRight className="text-white group-hover:text-primary transition-colors" size={24} />
//                        </div>
//                        {/* Items Grid */}
//                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                           {collection.items.map((item) => (
//                              <ItemCard key={item.id} item={item} />
//                           ))}
//                        </div>
//                     </div>
//                   ))}
//                 </div>
//              </div>
         
//   );
// };

