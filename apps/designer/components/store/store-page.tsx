// 'use client';

// import { useEffect, useState } from 'react';
// import { GalleryHeader } from '@/components/gallery/header';
// import { StoreHeader } from './store-header';
// import { StoreFilters } from './store-filters';
// import { StoreGrid, StoreItem } from './store-grid';
// import { useGetStoreItems } from '@/queries/useProduct';
// import { QueryProps } from '@/app/(user)/store/[[...categorySlug]]/page';
// import { useParams, useSearchParams } from 'next/navigation';

// export function StorePage() {
  
//   const params = useParams();
//   const searchParams = useSearchParams();

//   const apiParams = {
//     categorySlug: params.categorySlug ? params.categorySlug[0] : '', 
//     gender: searchParams.get("gender"),
//     style: searchParams.get("style"),
//     sortPrice: searchParams.get("sortPrice"),
//     search: searchParams.get("search"),
//     page: searchParams.get("page") || '1',
//   };

//   const {data: store, isLoading: storeLoading} = useGetStoreItems(apiParams);

// if(storeLoading) 
//     return (<>
//     Loading ...</>)

//   if(!store) 
//     return (<>
//     Check your connection</>)

//   return (
//     <div className="min-h-screen bg-black px-8">
      
//             <StoreHeader />
//       <StoreFilters
        
//       />

//       <main className="container mx-auto py-12">
//         <StoreGrid  store={store}/>

//         <div className="mt-16 flex justify-center">
//           <button className="px-8 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors">
//             Load More Items
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation'; // Thêm useRouter
import { Loader2 } from 'lucide-react'; // Thêm icon loading
import { StoreHeader } from './store-header';
import { StoreFilters } from './store-filters';
import { StoreGrid, StoreItem } from './store-grid';
import { useGetStoreItems } from '@/queries/useProduct';

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
import { cn } from '@workspace/ui/lib/utils';

export function StorePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // 1. Lấy page từ URL
  const currentPage = Number(searchParams.get("page")) || 1;

  const apiParams = {
    categorySlug: params.categorySlug ? params.categorySlug[0] : '', 
    gender: searchParams.get("gender"),
    style: searchParams.get("style"),
    sortPrice: searchParams.get("sortPrice"),
    search: searchParams.get("search"),
    page: currentPage,
  };

  // 2. Hàm cập nhật URL (Dùng chung cho Filter và Pagination)
  const updateQuery = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    // Nếu thay đổi filter (không phải page), reset về trang 1
    if (key !== 'page') {
        newParams.set('page', '1');
    }

    router.push(`?${newParams.toString()}`, { scroll: true });
  };

  // 3. Fetch Data
  const { data: store, isLoading: storeLoading } = useGetStoreItems(apiParams);

  if (storeLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-white w-8 h-8" />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Check your connection
      </div>
    );
  }

  // 4. Lấy Metadata từ Response Backend
  const { meta } = store;

  return (
    <div className="min-h-screen bg-black px-8 pb-20">
      
      <StoreHeader />
      
      {/* Bạn có thể truyền hàm updateQuery vào StoreFilters nếu muốn filter hoạt động */}
      <StoreFilters 
         // onFilterChange={updateQuery} 
      />

      <main className="container mx-auto py-12">
        {/* Grid Content */}
        <div className="min-h-[400px]">
            {store.data.length > 0 ? (
                <StoreGrid store={store} />
            ) : (
                <div className="text-center text-gray-500 py-20 text-lg">No items found in Store.</div>
            )}
        </div>

        {/* --- Pagination Controls --- */}
        {meta && meta.lastPage > 0 && (
          <div className="mt-16">
            <Pagination>
              <PaginationContent>
                
                {/* Previous Button */}
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => meta.hasPrevPage && updateQuery('page', (currentPage - 1).toString())}
                    className={cn(
                        "cursor-pointer text-white hover:text-white hover:bg-white/10 select-none", 
                        !meta.hasPrevPage && "pointer-events-none opacity-50 text-gray-600"
                    )} 
                  />
                </PaginationItem>

                {/* Page Numbers Logic */}
                {Array.from({ length: meta.lastPage }, (_, i) => i + 1).map((page) => {
                  // Logic hiển thị thu gọn (Ellipsis)
                  if (
                    page === 1 || 
                    page === meta.lastPage || 
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => updateQuery('page', page.toString())}
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
                  
                  // Render dấu ...
                  if (page === currentPage - 2 || page === currentPage + 2) {
                     return <PaginationItem key={page}><PaginationEllipsis className="text-gray-500" /></PaginationItem>
                  }
                  
                  return null;
                })}

                {/* Next Button */}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => meta.hasNextPage && updateQuery('page', (currentPage + 1).toString())}
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
      </main>
    </div>
  );
}