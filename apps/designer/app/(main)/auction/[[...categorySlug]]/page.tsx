// // app/auctions/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useAuctionsQuery } from '@/queries/useAuction';
// import { ChartColumn, ChevronDown, Clock, Eye } from 'lucide-react';
// import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { useCategories } from '@/queries/useProduct';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
// import { Button } from '@workspace/ui/components/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';

// interface Auction {
//   _id: string;
//   title: string;
//   description: string;
//   images: string[];
//   currentPrice: number;
//   startingPrice: number;
//   endTime: string;
//   status: string;
//   totalBids: number;
//   viewCount: number;
// }

// export default function AuctionsPage() {
//   const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'ended'>('all');
//   const [sortBy, setSortBy] = useState<'newest' | 'ending' | 'price'>('newest');

//   const params = useParams();
//         const searchParams = useSearchParams();
//         const pathname = usePathname();
//         const router = useRouter();
//         const { data: categories, isLoading: categoriesLoading } = useCategories();
      
      
//         const currentCategorySlug = params?.categorySlug?.[0]; 
      
//         const currentCategory = categories?.find(
//           (c: any) => c.slug === currentCategorySlug
//         );
      
//         const availableStyles = currentCategory?.styles || [];
      
//         const updateFilter = (key: string, value: string | null) => {
            
      
//           const params = new URLSearchParams(searchParams.toString());
//           if (value) {
//             params.set(key, value);
//           } else {
//             params.delete(key);
//           }
//           router.push(`?${params.toString()}`, { scroll: false });
//         };
      
//         const reset = () => {
//           router.push(pathname, { scroll: false });
//         }

//   const apiParams = {
//      categorySlug: params.categorySlug ? params.categorySlug[0] : '', 
//      gender: searchParams.get("gender"),
//      style: searchParams.get("style"),
//      search: searchParams.get("search"),
//      page: searchParams.get("page") || '1',
//      status: searchParams.get("status") ,
//       sortBy: searchParams.get("sortBy"),
//    };

//   const {data: auctions, isLoading: auctionsLoading, refetch: refechAuctions} = useAuctionsQuery(apiParams);
  
  

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('vi-VN', {
//       style: 'currency',
//       currency: 'VND',
//     }).format(amount);
//   };

//   const getTimeLeft = (endTime: string) => {
//     const now = new Date().getTime();
//     const end = new Date(endTime).getTime();
//     const distance = end - now;

//     if (distance < 0) return 'Ended';

//     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

//     if (days > 0) return `${days}d ${hours}h`;
//     if (hours > 0) return `${hours}h ${minutes}m`;
//     return `${minutes}m`;
//   };

//   const applyFilter = (filter: 'all' | 'active' | 'upcoming' | 'ended') => {
//     setFilter(filter);
//   }
  
//   // const sortedAuctions = [...(auctions || [])].sort((a, b) => {
//   //   switch (sortBy) {
//   //     case 'ending':
//   //       return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
//   //     case 'price':
//   //       return b.currentPrice - a.currentPrice;
//   //     default:
//   //       return 0;
//   //   }
//   // });
  
//   return (
//     <div className=" px-10 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold mb-2">Live Auctions</h1>
//         <p className="text-gray-600">Discover amazing deals and bid on your favorite items</p>
//       </div>

//       {/* Filters and Sort */}
//       <div className="flex flex-wrap mb-8 justify-between items-center ">
//         <div className="flex gap-4 overflow-x-auto pb-2">
//           <button
//                       className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors 
//                         ${!params.categorySlug ? 
//                         "bg-white text-black" : 
//                         "bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40"}
                       
//                           `
//                     }
//                     >
//                       <Link href={`/auction`}>
//                       All</Link>
//                     </button>
      
//                 {categories && categories.map(
//                   (category) => (
//                     <button
//                       key={category._id}
//                       className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors 
//                         ${params.categorySlug && params.categorySlug[0] === category.slug ? 
//                         "bg-white text-black " : 
//                         "bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40"}
                       
//                           `
//                     }
//                     >
//                       <Link href={`/auction/${category.slug}`}>
//                       {category.name}</Link>
//                     </button>
//                   )
//                 )}
//           {/* <button
//             onClick={() => updateFilter('status', '')}
//             className={`px-4 py-2 rounded-full font-medium transition ${
//               !searchParams.get("status")
//                 ?  "bg-white text-black" : 
//                         "bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40"
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => updateFilter('status', 'active')}
//             className={`px-4 py-2 rounded-full font-medium transition ${
//               searchParams.get("status") === 'active'
//                 ?  "bg-white text-black" : 
//                         "bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40"
//             }`}
//           >
//             Active
//           </button>
//           <button
//             onClick={() => updateFilter('status', 'upcoming')}
//             className={`px-4 py-2 rounded-full font-medium transition ${
//               searchParams.get("status") === 'upcoming'
//                 ?  "bg-white text-black" : 
//                         "bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40"
//             }`}
//           >
//             Upcoming
//           </button>
//           <button
//             onClick={() => updateFilter('status', 'ended')}
//             className={`px-4 py-2 rounded-full font-medium transition ${
//               searchParams.get("status") === 'ended'
//                 ?  "bg-white text-black" : 
//                         "bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40"
//             }`}
//           >
//             Ended
//           </button> */}
//         </div>

//         <div className="flex gap-4 flex-wrap">
//           <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button className='bg-transparent hover:bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40 focus:ring-2 focus:ring-ring'>
//                         {searchParams.get("status") || "All"}
//                         <ChevronDown />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent className='bg-zinc-800 text-white'>
//                         <DropdownMenuRadioGroup value={searchParams.get("status") || ""} onValueChange={(e) => {updateFilter("status", e.toLocaleLowerCase())}}>
//                           <DropdownMenuRadioItem value=''>All</DropdownMenuRadioItem>
//                           {['Active', 'Upcoming', 'Ended'].map((g) => (
//                             <DropdownMenuRadioItem key={g} value={g}>{g}</DropdownMenuRadioItem>
//                           ))}
//                         </DropdownMenuRadioGroup>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//           <Select
//            value={searchParams.get("sortBy") || "newest"} 
//            onValueChange={(e) => {updateFilter("sortBy", e)}}
//           >
//             <SelectTrigger             
//             className="bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40 focus:ring-2 focus:ring-ring"
// >
//                 <SelectValue placeholder="Sort" />
//               </SelectTrigger>
//               <SelectContent>
               
//                   <SelectItem value="newest">Newest</SelectItem>
//                   <SelectItem value="ending">Ending</SelectItem>
//                   <SelectItem value="highestPrice">Highest Price</SelectItem>
//                   <SelectItem value="lowestPrice">Lowest Price</SelectItem>

//               </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* <div className="flex gap-4 overflow-x-auto pb-2">
              
//             </div> */}

//              <div className=" top-16 z-30 bg-black/95 backdrop-blur border-b border-zinc-800 py-4 text-white">
//                   <div className="container ">
//                     <div className="flex items-center justify-between gap-4 flex-wrap">
//                       <div className="flex items-center gap-2 flex-wrap">
                       
//                           {availableStyles.length > 0 && (
            
//                             <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button className='bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40'>
//                         {searchParams.get("style") || "Style"}
//                         <ChevronDown />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent className='bg-zinc-800 text-white'>
//                         <DropdownMenuRadioGroup value={searchParams.get("style") || ""} onValueChange={(e) => {updateFilter("style", e)}}>
//                           <DropdownMenuRadioItem value=''>All</DropdownMenuRadioItem>
//                           {availableStyles.map((s) => (
//                             <DropdownMenuRadioItem key={s} value={s}>{s}</DropdownMenuRadioItem>
//                           ))}
//                         </DropdownMenuRadioGroup>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
            
//                           )}
            
//                       <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button className='bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40'>
//                         {searchParams.get("gender") || "Gender"}
//                         <ChevronDown />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent className='bg-zinc-800 text-white'>
//                         <DropdownMenuRadioGroup value={searchParams.get("gender") || ""} onValueChange={(e) => {updateFilter("gender", e)}}>
//                           <DropdownMenuRadioItem value=''>All</DropdownMenuRadioItem>
//                           {['Male', 'Female', 'Unisex'].map((g) => (
//                             <DropdownMenuRadioItem key={g} value={g}>{g}</DropdownMenuRadioItem>
//                           ))}
//                         </DropdownMenuRadioGroup>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
            
            
//                         <button 
//                         onClick={reset}
//                         className="px-3 py-1 rounded-full text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
//                         >
//                           RESET
//                         </button>
//                       </div>
            
//                       <div className="flex items-center gap-4">
//                         <div className="flex items-center gap-2 text-white/60 text-sm">
//                           {/* <span>{itemCount.toLocaleString()} Items</span> */}
//                         </div>
            
//                         {/* 2. GENDER FILTER */}
                 
//                         {/* <select
//                           value={sortBy}
//                           onChange={(e) => onSortChange(e.target.value)}
//                           className="bg-transparent border border-white/20 text-white text-sm px-3 py-1 rounded-lg hover:border-white/40 focus:outline-none focus:border-cyan-500 cursor-pointer flex items-center gap-2"
//                         >
//                           <option value="featured">Featured</option>
//                           <option value="newest">Newest</option>
//                           <option value="trending">Trending</option>
//                           <option value="popular">Popular</option>
//                           <option value="price-low">Price: Low to High</option>
//                           <option value="price-high">Price: High to Low</option>
//                         </select> */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
      

//       {/* Auction Grid */}
//       {auctionsLoading || !auctions ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {[...Array(8)].map((_, i) => (
//             <div key={i} className="animate-pulse">
//               <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
//               <div className="h-4 bg-gray-200 rounded mb-2"></div>
//               <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//             </div>
//           ))}
//         </div>
//       ) : !auctions  ? (
//         <div className="text-center py-16">
//           <div className="text-6xl mb-4">📦</div>
//           <h2 className="text-2xl font-semibold mb-2">No auctions found</h2>
//           <p className="text-gray-600">Try changing your filters</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {auctions.data.map((auction) => (
//             <Link
//               key={auction._id}
//               href={`/auction/detail/${auction._id}`}
//               className="group block"
//             >
//               <div className="bg-secondary border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
//                 {/* Image */}
//                 <div className="relative aspect-square bg-gray-100 overflow-hidden">
//                   {auction.imageUrls.length > 0 ? (
//                     <Image
//                       src={auction.imageUrls[0]!}
//                       alt={auction.title}
//                       fill
//                       className="object-cover group-hover:scale-110 transition-transform duration-300"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center h-full text-gray-400">
//                       No image
//                     </div>
//                   )}
                  
//                   {/* Status badge */}
//                   <div className="absolute top-3 right-3">
//                     {auction.status === 'active' && (
//                       <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
//                         LIVE
//                       </span>
//                     )}
//                     {auction.status === 'upcoming' && (
//                       <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
//                         UPCOMING
//                       </span>
//                     )}
//                     {auction.status === 'ended' && (
//                       <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
//                         ENDED
//                       </span>
//                     )}
//                     {auction.status === 'cancelled' && (
//                       <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//                         CANCELLED
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Details */}
//                 <div className="p-4">
//                   <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-ring">
//                     {auction.title}
//                   </h3>

//                   {/* Price */}
//                   <div className="mb-3">
//                     <div className="text-sm text-gray-600">Current Bid</div>
//                     <div className="text-2xl font-bold ">
//                       {formatCurrency(auction.currentPrice)}
//                     </div>
//                   </div>

//                   {/* Stats */}
//                   <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    
//                      <div className='flex gap-2'>
//                       <ChartColumn />
//                       <span> {auction.totalBids} bids</span>
//                     </div>
//                      <div className='flex gap-2'>
//                       <Eye />
//                       <span> {auction.viewCount} views</span>
//                     </div>
//                   </div>

//                   {/* Time left */}
//                   {auction.status === 'active' && (
//                     <div className="flex items-center gap-2 text-sm">
//                       <span className="text-red-600">
//                         <Clock />
//                       </span>
//                       <span className="font-medium text-red-600">
//                         {getTimeLeft(auction.endTime)} left
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuctionsQuery } from '@/queries/useAuction';
import { ChartColumn, ChevronDown, Clock, Eye, Loader2 } from 'lucide-react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCategories } from '@/queries/useProduct';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { Button } from '@workspace/ui/components/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';

// Import Pagination
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@workspace/ui/components/pagination';
import { cn } from '@workspace/ui/lib/utils';
import { Skeleton } from '@workspace/ui/components/skeleton';

export default function AuctionsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data: categories } = useCategories();

  // 1. Params Setup
  const currentCategorySlug = params?.categorySlug?.[0];
  const currentPage = Number(searchParams.get("page")) || 1;

  const currentCategory = categories?.find(
    (c: any) => c.slug === currentCategorySlug
  );
  const availableStyles = currentCategory?.styles || [];

  const apiParams = {
    categorySlug: currentCategorySlug || '',
    gender: searchParams.get("gender"),
    style: searchParams.get("style"),
    search: searchParams.get("search"),
    page: currentPage,
    status: searchParams.get("status"),
    sortBy: searchParams.get("sortBy"),
  };

  // 2. Filter Handler
  const updateFilter = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    
    // Reset page về 1 khi đổi filter (trừ khi key là page)
    if (key !== 'page') {
        newParams.set('page', '1');
    }

    // Scroll lên đầu khi chuyển trang nếu là key page
    const scroll = key === 'page';
    router.push(`?${newParams.toString()}`, { scroll });
  };

  const reset = () => {
    router.push(pathname, { scroll: false });
  }

  // 3. Fetch Data
  const { data: auctions, isLoading: auctionsLoading } = useAuctionsQuery(apiParams);

  // Helper Functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getTimeLeft = (endTime: string) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const distance = end - now;
    if (distance < 0) return 'Ended';
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const { meta } = auctions || {};

  return (
    <div className="px-10 py-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Live Auctions</h1>
        <p className="text-gray-600">Discover amazing deals and bid on your favorite items</p>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap mb-8 justify-between items-center gap-4">
        {/* Left: Categories & Quick Filters */}
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          <Link 
            href="/auction"
            className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                !params.categorySlug ? "bg-white text-black" : "bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40"
            )}
          >
            All
          </Link>
          
          {categories?.map((category: any) => (
            <Link
              key={category._id}
              href={`/auction/${category.slug}`}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                currentCategorySlug === category.slug ? "bg-white text-black" : "bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40"
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Right: Dropdowns & Sort */}
        <div className="flex gap-4 flex-wrap items-center">
            {/* Styles Dropdown (if available) */}
            {availableStyles.length > 0 && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button className='bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40'>
                        {searchParams.get("style") || "Style"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-zinc-800 text-white border-zinc-700'>
                    <DropdownMenuRadioGroup value={searchParams.get("style") || ""} onValueChange={(e) => updateFilter("style", e)}>
                        <DropdownMenuRadioItem value=''>All</DropdownMenuRadioItem>
                        {availableStyles.map((s: string) => (
                        <DropdownMenuRadioItem key={s} value={s}>{s}</DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            {/* Gender Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className='bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40'>
                    {searchParams.get("gender") || "Gender"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-zinc-800 text-white border-zinc-700'>
                    <DropdownMenuRadioGroup value={searchParams.get("gender") || ""} onValueChange={(e) => updateFilter("gender", e)}>
                    <DropdownMenuRadioItem value=''>All</DropdownMenuRadioItem>
                    {['Male', 'Female', 'Unisex'].map((g) => (
                        <DropdownMenuRadioItem key={g} value={g}>{g}</DropdownMenuRadioItem>
                    ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className='bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40'>
                    {searchParams.get("status") ? searchParams.get("status")?.toUpperCase() : "Status"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-zinc-800 text-white border-zinc-700'>
                    <DropdownMenuRadioGroup value={searchParams.get("status") || ""} onValueChange={(e) => updateFilter("status", e)}>
                    <DropdownMenuRadioItem value=''>All</DropdownMenuRadioItem>
                    {['active', 'upcoming', 'ended'].map((s) => (
                        <DropdownMenuRadioItem key={s} value={s} className="capitalize">{s}</DropdownMenuRadioItem>
                    ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Select */}
            <Select value={searchParams.get("sortBy") || "newest"} onValueChange={(e) => updateFilter("sortBy", e)}>
                <SelectTrigger className="w-[140px] bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40">
                    <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className='bg-zinc-800 text-white border-zinc-700'>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="ending">Ending Soon</SelectItem>
                    <SelectItem value="highestPrice">Highest Price</SelectItem>
                    <SelectItem value="lowestPrice">Lowest Price</SelectItem>
                </SelectContent>
            </Select>

            {/* Reset Button */}
            {(searchParams.toString().length > 0 && searchParams.get("page") !== '1') && (
                <button onClick={reset} className="text-sm text-cyan-400 hover:text-cyan-300 font-medium underline decoration-dashed underline-offset-4">
                    Reset
                </button>
            )}
        </div>
      </div>

      {/* Loading State */}
      {auctionsLoading ? (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="flex flex-col space-y-4">
                    <Skeleton className="aspect-square w-full rounded-xl bg-zinc-800/50" />
                    
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-4/5 rounded-lg bg-zinc-800/50" />
                      <Skeleton className="h-4 w-2/3 rounded-lg bg-zinc-800/50" />
                    </div>
                  </div>
                ))}
              </div>
      ) : !auctions || auctions.data.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-white mb-2">No auctions found</h2>
          <p className="text-zinc-400">Try adjusting your filters or category.</p>
          <Button onClick={reset} variant="outline" className="mt-6">Clear all filters</Button>
        </div>
      ) : (
        <>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {auctions.data.map((auction: any) => (
                <Link
                key={auction._id}
                href={`/auction/detail/${auction._id}`}
                className="group block h-full"
                >
                <div className="h-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-300 flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-square bg-zinc-800 overflow-hidden">
                    {auction.imageUrls.length > 0 ? (
                        <Image
                        src={auction.imageUrls[0]}
                        alt={auction.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-zinc-600">No Image</div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                        <span className={cn(
                            "text-xs font-bold px-2 py-1 rounded shadow-sm",
                            auction.status === 'active' && "bg-green-500 text-white animate-pulse",
                            auction.status === 'upcoming' && "bg-blue-500 text-white",
                            auction.status === 'ended' && "bg-zinc-600 text-zinc-200",
                            auction.status === 'cancelled' && "bg-red-500 text-white"
                        )}>
                            {auction.status?.toUpperCase()}
                        </span>
                    </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg text-white mb-auto line-clamp-2 group-hover:text-cyan-400 transition-colors">
                        {auction.title}
                    </h3>

                    <div className="mt-4 pt-4 border-t border-zinc-800">
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <div className="text-xs text-zinc-500">Current Bid</div>
                                <div className="text-xl font-bold text-white">
                                    {formatCurrency(auction.currentPrice || auction.startingPrice)}
                                </div>
                            </div>
                            {auction.status === 'active' && (
                                <div className="text-right">
                                    <div className="text-xs text-red-400 flex items-center justify-end gap-1">
                                        <Clock size={12} /> Ends in
                                    </div>
                                    <div className="font-mono text-sm text-red-400 font-medium">
                                        {getTimeLeft(auction.endTime)}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-xs text-zinc-500">
                            <div className="flex items-center gap-1">
                                <ChartColumn size={14} /> {auction.totalBids || 0} bids
                            </div>
                            <div className="flex items-center gap-1">
                                <Eye size={14} /> {auction.viewCount || 0}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </Link>
            ))}
            </div>

            {/* Pagination */}
            {meta && meta.lastPage > 0 && (
                <div className="flex justify-center pb-10">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious 
                                    onClick={() => meta.hasPrevPage && updateFilter('page', (currentPage - 1).toString())}
                                    className={cn(
                                        "cursor-pointer text-white hover:text-white hover:bg-white/10 select-none", 
                                        !meta.hasPrevPage && "pointer-events-none opacity-50 text-gray-600"
                                    )} 
                                />
                            </PaginationItem>

                            {Array.from({ length: meta.lastPage }, (_, i) => i + 1).map((page) => {
                                if (page === 1 || page === meta.lastPage || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                    return (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                isActive={page === currentPage}
                                                onClick={() => updateFilter('page', page.toString())}
                                                className={cn(
                                                    "cursor-pointer select-none text-white hover:bg-white/10 hover:text-white border-none",
                                                    page === currentPage && "bg-white text-black hover:bg-white hover:text-black font-bold"
                                                )}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                }
                                if (page === currentPage - 2 || page === currentPage + 2) {
                                    return <PaginationItem key={page}><PaginationEllipsis className="text-zinc-600" /></PaginationItem>
                                }
                                return null;
                            })}

                            <PaginationItem>
                                <PaginationNext 
                                    onClick={() => meta.hasNextPage && updateFilter('page', (currentPage + 1).toString())}
                                    className={cn(
                                        "cursor-pointer text-white hover:text-white hover:bg-white/10 select-none", 
                                        !meta.hasNextPage && "pointer-events-none opacity-50 text-gray-600"
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
  );
}