'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDesignerLikedModels, useLikeDesignMutation } from '@/queries/useProduct';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { DesignItem } from '@/components/portfolio/item-card';

// Shadcn Pagination imports...
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@workspace/ui/components/pagination';
import { cn } from '@workspace/ui/lib/utils';
import { MinimalItemCard } from '@/components/portfolio/likes/item-card';
import { use } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function LikedModelsPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { execute } = useAuth();
  const likeMutation = useLikeDesignMutation();
    const queryClient = useQueryClient();


  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = 12;

  // Fetch Data
  const { data, isLoading } = useDesignerLikedModels(id, {
    currentPage,
    limit,
  });

  // Handle Pagination
  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    router.push(`${pathname}?${newParams.toString()}`);
  };

  // Handle Like Action
  const handleLike = (designId: string) => {
    execute(async () => {
      if (likeMutation.isPending) return;
      await likeMutation.mutateAsync(designId);
    queryClient.invalidateQueries({ queryKey: ['userLikes'] });

    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin text-white w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-500 w-full py-6">
      
      {/* Title Section (Optional) */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Liked Models</h2>
      </div>

      {/* Grid Content */}
      <div className="space-y-12 min-h-[400px]">
        {data?.data?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {data.data.map((item: any) => (
              <MinimalItemCard
                key={item._id}
                data={item as DesignItem}
                onLike={handleLike}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-4 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-2xl">❤️</div>
            <p className="font-medium">No liked designs yet.</p>
          </div>
        )}

        {/* Pagination */}
        {data?.meta?.totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => data.meta.hasPrevPage && handlePageChange(currentPage - 1)}
                  className={cn(
                    "cursor-pointer hover:bg-white/10 hover:text-white text-zinc-400",
                    !data.meta.hasPrevPage && "pointer-events-none opacity-30"
                  )}
                />
              </PaginationItem>
              
              <PaginationItem>
                 <span className="text-sm text-zinc-500 px-4">
                    Page {currentPage} of {data.meta.totalPages}
                 </span>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => data.meta.hasNextPage && handlePageChange(currentPage + 1)}
                  className={cn(
                    "cursor-pointer hover:bg-white/10 hover:text-white text-zinc-400",
                    !data.meta.hasNextPage && "pointer-events-none opacity-30"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}