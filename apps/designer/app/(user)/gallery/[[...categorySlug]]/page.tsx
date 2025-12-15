// app/gallery/[[...categorySlug]]/page.tsx
'use client';

import { Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useGetGalleryItems } from '@/queries/useProduct';
import { GalleryGrid } from '@/components/gallery/gallery-grid';
import { PaginationControl } from '@/components/store/pagination-control'; // Tái sử dụng từ Store
import { cn } from '@workspace/ui/lib/utils';
import { Skeleton } from '@workspace/ui/components/skeleton';

function GalleryGridContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  // 1. Chuẩn bị Params
  const currentPage = Number(searchParams.get("page")) || 1;
  const categorySlug = params?.categorySlug 
    ? (Array.isArray(params.categorySlug) ? params.categorySlug[0] : params.categorySlug)
    : '';

  const apiParams = {
    categorySlug,
    gender: searchParams.get("gender"),
    style: searchParams.get("style"),
    search: searchParams.get("search"),
    page: currentPage,
  };

  // 2. Fetch Data (Nhớ: useGetGalleryItems phải có placeholderData: keepPreviousData)
  const { data, isLoading, isFetching } = useGetGalleryItems(apiParams);

  // 3. Loading lần đầu (khi chưa có bất kỳ data nào)
  if (isLoading && !data) {
    return (
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
    );
  }

  if (!data) {
    return (
      <div className="text-white text-center py-20">
        Check your connection.
      </div>
    );
  }

  // 4. Render Grid & Pagination
  return (
    // Thêm hiệu ứng mờ khi đang fetch ngầm (isFetching)
    <div className={cn("mt-12 transition-opacity duration-300", isFetching ? "opacity-50" : "opacity-100")}>
      
      {/* Grid Content */}
      <div className="min-h-[400px]">
        {data.data.length > 0 ? (
           <GalleryGrid gallery={data} />
        ) : (
           <div className="text-center text-gray-500 py-20 text-lg">No items found.</div>
        )}
      </div>

      {/* Pagination Control - Tự động xử lý logic chuyển trang */}
      {data.meta && <PaginationControl meta={data.meta} />}
      
    </div>
  );
}

// 5. Export Default bọc trong Suspense
export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-white w-8 h-8" /></div>}>
      <GalleryGridContent />
    </Suspense>
  );
}