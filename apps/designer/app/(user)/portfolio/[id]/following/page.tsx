'use client';

import React, { use } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useUserFollowing } from '@/queries/useUser';
import { Loader2, Users } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// Import Pagination components...
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
} from '@workspace/ui/components/pagination';
import { cn } from '@workspace/ui/lib/utils';
import toast from 'react-hot-toast';
import { DesignerCard } from '@/components/portfolio/following/designer-card';
import { useFollowDesignerMutation } from '@/queries/useProduct';


export default function FollowingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    
    // Check nếu người xem là chủ sở hữu trang này
    const currentUser = useAuthStore((state) => state.user);
    const isOwner = currentUser?.id === id;
    const unfollowMutation = useFollowDesignerMutation();

    const currentPage = Number(searchParams.get('page')) || 1;

    // 1. Fetch Data
    const { data, isLoading } = useUserFollowing(id, { currentPage });

    
    const handleToggleFollow = async (targetId: string) => {
       
            if(unfollowMutation.isPending) return;
            try {
                await unfollowMutation.mutateAsync(targetId);
                queryClient.invalidateQueries({ queryKey: ['user-following'] });
            }
            catch(err) {
                console.error('Follow/Unfollow error:', err);
                toast.error('An error occurred. Please try again.');
            }
        
    }

    const handlePageChange = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', page.toString());
        router.push(`${pathname}?${newParams.toString()}`);
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
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Following <span className="text-zinc-500 text-sm font-normal">({data?.meta?.total || 0})</span>
                </h2>
            </div>

            <div className="space-y-8 min-h-[400px]">
                {data?.data?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.data.map((item: any) => (
                            <DesignerCard
                                key={item._id}
                                data={{
                                    userId: item.designerId, // ID của người được follow
                                    name: item.designerProfile?.name || "Unknown User",
                                    avatarUrl: item.designerProfile?.avatarUrl,
                                    bio: item.designerProfile?.bio,
                                    profession: item.designerProfile?.profession
                                }}
                                isOwner={isOwner}
                                onToggleFollow={handleToggleFollow}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-4 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-2xl">
                            <Users className="w-6 h-6 text-zinc-400" />
                        </div>
                        <p className="font-medium">Not following anyone yet.</p>
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
                            
                            <span className="text-sm text-zinc-500 px-4">
                                Page {currentPage} of {data.meta.totalPages}
                            </span>

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