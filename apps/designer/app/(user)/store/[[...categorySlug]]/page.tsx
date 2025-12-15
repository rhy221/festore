// app/store/[[...categorySlug]]/page.tsx
'use client';

import { Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useGetStoreItems } from '@/queries/useProduct';
import { StoreGrid } from '@/components/store/store-grid';
import { PaginationControl } from '@/components/store/pagination-control';
import { Skeleton } from '@workspace/ui/components/skeleton';

function StoreGridContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // Xử lý params
  const categorySlug = params?.categorySlug 
    ? (Array.isArray(params.categorySlug) ? params.categorySlug[0] : params.categorySlug)
    : '';

  const apiParams = {
    categorySlug,
    gender: searchParams.get("gender"),
    style: searchParams.get("style"),
    sortPrice: searchParams.get("sortPrice"),
    search: searchParams.get("search"),
    page: currentPage,
  };

  // React Query (Đã thêm placeholderData: keepPreviousData)
  const { data: store, isLoading, isFetching } = useGetStoreItems(apiParams);

  // Loading lần đầu tiên
  if (isLoading && !store) {
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

  if (!store) {
    return <div className="text-white text-center">Check connection</div>;
  }

  return (
    <div className={`transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
      <div className="min-h-[400px]">
        {store.data.length > 0 ? (
           <StoreGrid store={store} />
        ) : (
           <div className="text-center text-gray-500 py-20 text-lg">No items found.</div>
        )}
      </div>

      {/* Pagination component (đã tách logic updateQuery vào đây hoặc viết inline như cũ) */}
      <PaginationControl meta={store.meta} />
    </div>
  );
}

export default function StorePage() {
  return (
    // Suspense cho params
    <Suspense fallback={<div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-white" /></div>}>
      <StoreGridContent />
    </Suspense>
  );
}