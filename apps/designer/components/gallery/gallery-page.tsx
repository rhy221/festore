// 'use client';

// import { useState } from 'react';
// import { GalleryHeader } from './header';
// import { GalleryFilters } from './gallery-filters';
// import { GalleryGrid } from './gallery-grid';
// // import { GalleryItemModal } from './gallery-item-modal';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
// import { useGetGalleryItems } from '@/queries/useProduct';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';

// export function GalleryPage() {

  
//  const params = useParams();
//    const searchParams = useSearchParams();
//    const router = useRouter();
 
//    const apiParams = {
//      categorySlug: params.categorySlug ? params.categorySlug[0] : '', 
//      gender: searchParams.get("gender"),
//      style: searchParams.get("style"),
//      search: searchParams.get("search"),
//      page: searchParams.get("page") || '1',
//    };

//    const updateFilter = (key: string, value: string | null) => {
          
    
//         const params = new URLSearchParams(searchParams.toString());
//         if (value) {
//           params.set(key, value);
//         } else {
//           params.delete(key);
//         }
//         router.push(`?${params.toString()}`, { scroll: false });
//       };
      
// const {data: gallery, isLoading: galleryLoading} = useGetGalleryItems(apiParams);
  

//     if(galleryLoading) 
//     return (<>
//     Loading...
//     </>)
//   if(!gallery)
//     return(<>
//     Check your connection.
//     </>)
//   return (
//     <div className="min-h-screen bg-black px-8">
//       {/* <GalleryHeader /> */}

//       <main className="container mx-auto  py-8">
//         <div className="flex items-center justify-center gap-8 mb-12">
//           <h1 className="text-4xl font-bold text-white">GALLERY</h1>
//           {/* <button className="text-white/60 hover:text-white transition-colors text-lg border-b-2 border-transparent hover:border-white/60">
//             CREATOR
//           </button> */}
//         </div>

//         <GalleryFilters
//           itemCount={gallery.data.length}
//         />

//         <div className="mt-12">
//           <GalleryGrid gallery={gallery}/>
//         </div>

//         <div className="mt-12 flex justify-center">
//           <button className="px-8 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors">
//             Load More
//           </button>
//         </div>
//       </main>

//     </div>
//   );
// }


'use client';

import { GalleryFilters } from './gallery-filters';
import { GalleryGrid } from './gallery-grid';
import { useGetGalleryItems } from '@/queries/useProduct';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

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

export function GalleryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Chuẩn bị Params cho API
  const currentPage = Number(searchParams.get("page")) || 1;
  const apiParams = {
    categorySlug: params.categorySlug ? params.categorySlug[0] : '', 
    gender: searchParams.get("gender"),
    style: searchParams.get("style"),
    search: searchParams.get("search"),
    page: currentPage,
  };

  // 2. Hàm cập nhật URL (Dùng chung cho Filter và Pagination)
  const updateFilter = (key: string, value: string | null) => {
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

    router.push(`?${newParams.toString()}`, { scroll: true }); // Scroll lên đầu khi chuyển trang
  };

  // 3. Fetch Data
  const { data, isLoading: galleryLoading } = useGetGalleryItems(apiParams);

  if (galleryLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-white w-8 h-8" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Check your connection.
      </div>
    );
  }

  // 4. Lấy Metadata từ Response Backend
  // (Backend trả về { data: [], meta: { total, page, limit, lastPage, ... } })
  const { meta } = data; 

  return (
    <div className="min-h-screen bg-black px-8 pb-20">
      
      <main className="container mx-auto py-8">
        <div className="flex items-center justify-center gap-8 mb-12">
          <h1 className="text-4xl font-bold text-white tracking-wider">GALLERY</h1>
        </div>

        {/* Filters Component */}
        {/* Truyền updateFilter xuống GalleryFilters nếu cần */}
        <GalleryFilters
          
          // onFilterChange={updateFilter} // Ví dụ nếu GalleryFilters hỗ trợ callback này
        />

        {/* Grid Content */}
        <div className="mt-12 min-h-[400px]">
          {data.data.length > 0 ? (
             <GalleryGrid gallery={data} />
          ) : (
             <div className="text-center text-gray-500 py-20 text-lg">No items found.</div>
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
                    onClick={() => meta.hasPrevPage && updateFilter('page', (currentPage - 1).toString())}
                    className={cn(
                        "cursor-pointer text-white hover:text-white hover:bg-white/10 select-none", 
                        !meta.hasPrevPage && "pointer-events-none opacity-50 text-gray-600"
                    )} 
                  />
                </PaginationItem>

                {/* Page Numbers Logic */}
                {Array.from({ length: meta.lastPage }, (_, i) => i + 1).map((page) => {
                  // Logic hiển thị thu gọn (Ellipsis): Hiện trang đầu, trang cuối, và xung quanh trang hiện tại
                  if (
                    page === 1 || 
                    page === meta.lastPage || 
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
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
                  
                  // Render dấu ...
                  if (page === currentPage - 2 || page === currentPage + 2) {
                     return <PaginationItem key={page}><PaginationEllipsis className="text-gray-500" /></PaginationItem>
                  }
                  
                  return null;
                })}

                {/* Next Button */}
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

      </main>
    </div>
  );
}
