'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@workspace/ui/components/pagination'; // Sửa lại đường dẫn import đúng với dự án của bạn
import { cn } from '@workspace/ui/lib/utils'; // Sửa lại đường dẫn utils

interface MetaProps {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
  lastPage: number;
}

interface PaginationControlProps {
  meta: MetaProps;
}

export function PaginationControl({ meta }: PaginationControlProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Lấy page hiện tại từ URL hoặc fallback về 1
  const currentPage = Number(searchParams.get("page")) || 1;

  // Hàm update URL
  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());

    // scroll: false quan trọng để không bị nhảy lên đầu trang khi chuyển page
    router.push(`?${params.toString()}`, { scroll: false }); 
  };

  // Nếu không có trang nào hoặc chỉ có 1 trang thì không hiện
  if (!meta || meta.lastPage < 1) return null;

  return (
    <div className="mt-16 flex justify-center pb-10">
      <Pagination>
        <PaginationContent>
          
          {/* Nút Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => meta.hasPrevPage && handlePageChange(currentPage - 1)}
              className={cn(
                "cursor-pointer text-white hover:text-white hover:bg-white/10 select-none transition-colors",
                !meta.hasPrevPage && "pointer-events-none opacity-50 text-gray-600"
              )}
            />
          </PaginationItem>

          {/* Logic hiển thị số trang */}
          {Array.from({ length: meta.lastPage }, (_, i) => i + 1).map((page) => {
            // Logic hiển thị: Trang đầu, trang cuối, và các trang xung quanh trang hiện tại
            if (
              page === 1 ||
              page === meta.lastPage ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                    className={cn(
                      "cursor-pointer select-none text-white hover:bg-white/10 hover:text-white border-none transition-colors",
                      page === currentPage && "bg-white text-black hover:bg-white hover:text-black font-bold"
                    )}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }

            // Hiển thị dấu ba chấm (...)
            if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis className="text-zinc-600" />
                </PaginationItem>
              );
            }

            return null;
          })}

          {/* Nút Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() => meta.hasNextPage && handlePageChange(currentPage + 1)}
              className={cn(
                "cursor-pointer text-white hover:text-white hover:bg-white/10 select-none transition-colors",
                !meta.hasNextPage && "pointer-events-none opacity-50 text-gray-600"
              )}
            />
          </PaginationItem>

        </PaginationContent>
      </Pagination>
    </div>
  );
}