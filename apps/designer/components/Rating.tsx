// components/RatingsSection.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Star, Loader2, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@workspace/ui/components/dialog';
import { Button } from '@workspace/ui/components/button';
import { useCreateRating, useMyRating, useUpdateRating } from '@/queries/useRating';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { formatToLocalInput } from '@/Lib/utils';
import { ratingAction } from '@/api/rating.api';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { cn } from '@workspace/ui/lib/utils';

interface RatingsSectionProps {
  productId: string;
}

export function RatingsSection({ productId }: RatingsSectionProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['ratings', productId],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => 
    ratingAction.getProductRatings(productId, pageParam, 20),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const allRatings = data?.pages.flatMap(page => page.ratings) || [];

  // Calculate rating distribution
  const ratingStats = allRatings.reduce((acc, rating) => {
    acc[rating.rating] = (acc[rating.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const totalRatings = allRatings.length;
  const averageRating = totalRatings > 0
    ? allRatings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
    : 0;

  // Virtual list
  const rowVirtualizer = useVirtualizer({
    count: allRatings.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120,
    overscan: 5,
  });

  // Infinite scroll
  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    if (
      lastItem.index >= allRatings.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRatings.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  return (
    <div className="flex flex-col h-[600px] bg-zinc-800">
      {/* Rating Summary */}
      {/* <div className="p-6 border-b bg-gradient-to-r ">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-yellow-600 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">{totalRatings} đánh giá</div>
          </div>

          <div className="flex-1 ">
            <RatingDistribution stats={ratingStats} total={totalRatings} />
          </div>
        </div>
      </div> */}

      {/* Ratings List */}
      <div ref={parentRef} className="flex-1 overflow-auto p-4">
        {isLoading ? (
          <RatingsSkeleton />
        ) : allRatings.length === 0 ? (
          <div className="text-center py-12 bg-zinc-800 text-zinc-400">
            No rating yet
          </div>
        ) : (
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const rating = allRatings[virtualRow.index];
              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <RatingItem rating={rating} />
                </div>
              );
            })}
          </div>
        )}

        {isFetchingNextPage && (
          <div className="py-4 text-center">
            <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
}

// components/RatingDistribution.tsx
interface RatingDistributionProps {
  stats: Record<number, number>;
  total: number;
}

export  function RatingDistribution({ stats, total }: RatingDistributionProps) {
  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = stats[star] || 0;
        const percentage = total > 0 ? (count / total) * 100 : 0;

        return (
          <div key={star} className="flex items-center gap-2">
            <span className="text-sm font-medium w-8">{star} ⭐</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 w-12 text-right">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}

interface RatingItemProps {
  rating: any;
}

export  function RatingItem({ rating }: RatingItemProps) {
  const timeAgo = dayjs(formatToLocalInput(rating.createdAt)).format("DD-MM-YYYY");

  return (
    <div className="border-b pb-4 mb-4 last:border-b-0">
      <div className="flex items-start gap-3">
       <Avatar>
            <AvatarImage src={rating.user.avatarUrl}/>
            <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0'>
                {rating.user.name[0].toUpperCase()}
            </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className='flex items-center gap-2 mb-1'>
              <div className="font-bold text-white">{rating.user.name}</div>
              <div className="text-xs text-gray-500">{timeAgo}</div>
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= rating.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {rating.review && (
            <p className="text-white text-sm whitespace-pre-wrap break-words">
              {rating.review}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// components/RatingsSkeleton.tsx
function RatingsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-start gap-3 pb-4 border-b">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
}

// export function RatingModal({ open, onClose, productId, productName }: RatingModalProps) {
//   const { data: existingRating, isLoading } = useMyRating(productId);
//   const createRatingMutation = useCreateRating();
//   const updateRatingMutation = useUpdateRating();

//   const [rating, setRating] = useState(5);
//   const [review, setReview] = useState('');
//   const [hasEdited, setHasEdited] = useState(false);

//   useEffect(() => {
//     if (existingRating) {
//       setRating(existingRating.rating);
//       setReview(existingRating.review || '');
//       // Check if already edited (you might want to track this in backend)
//       setHasEdited(existingRating?.hasBeenEdited || false); // Set based on backend data
//     }
//   }, [existingRating]);

//   const handleSubmit = async () => {
//     if (existingRating) {
//       if (hasEdited) {
//         toast.error('Bạn chỉ có thể chỉnh sửa đánh giá 1 lần');
//         return;
//       }
      
//       await updateRatingMutation.mutateAsync(
//         { productId, data: { rating, review } },
//         {
//           onSuccess: () => {
//             setHasEdited(true);
//             toast.success('Cập nhật đánh giá thành công! Bạn không thể chỉnh sửa lại.');
//             setTimeout(onClose, 1500);
//           },
//         }
//       );
//     } else {
//       await createRatingMutation.mutateAsync(
//         { productId, rating, review },
//         {
//           onSuccess: () => {
//             onClose();
//           },
//         }
//       );
//     }
//   };

//   const isPending = createRatingMutation.isPending || updateRatingMutation.isPending;

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>
//             {existingRating ? 'Chỉnh sửa đánh giá' : 'Đánh giá sản phẩm'}
//           </DialogTitle>
//         </DialogHeader>

//         {isLoading ? (
//           <div className="flex justify-center py-8">
//             <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div>
//               <h3 className="font-medium text-gray-900 mb-2">{productName}</h3>
//               {existingRating && hasEdited && (
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//                   <p className="text-sm text-yellow-800">
//                     ⚠️ Bạn đã chỉnh sửa đánh giá này rồi. Bạn không thể chỉnh sửa lại nữa.
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Star Rating */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Xếp hạng của bạn:</label>
//               <div className="flex gap-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     type="button"
//                     onClick={() => !hasEdited && setRating(star)}
//                     disabled={hasEdited}
//                     className={`focus:outline-none transition-transform hover:scale-110 ${
//                       hasEdited ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
//                     }`}
//                   >
//                     <Star
//                       className={`w-10 h-10 ${
//                         star <= rating
//                           ? 'fill-yellow-400 text-yellow-400'
//                           : 'text-gray-300'
//                       }`}
//                     />
//                   </button>
//                 ))}
//               </div>
//               <p className="text-sm text-gray-600 mt-2">
//                 {rating === 1 && 'Rất tệ'}
//                 {rating === 2 && 'Tệ'}
//                 {rating === 3 && 'Trung bình'}
//                 {rating === 4 && 'Tốt'}
//                 {rating === 5 && 'Xuất sắc'}
//               </p>
//             </div>

//             {/* Review Text */}
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Nhận xét của bạn (tuỳ chọn):
//               </label>
//               <textarea
//                 value={review}
//                 onChange={(e) => !hasEdited && setReview(e.target.value)}
//                 disabled={hasEdited}
//                 className={`w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   hasEdited ? 'bg-gray-50 cursor-not-allowed' : ''
//                 }`}
//                 rows={4}
//                 placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 {existingRating && !hasEdited && '⚠️ Lưu ý: Bạn chỉ có thể chỉnh sửa 1 lần duy nhất'}
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-2 pt-4">
//               <Button
//                 onClick={handleSubmit}
//                 disabled={isPending || hasEdited}
//                 className="flex-1"
//               >
//                 {isPending ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Đang xử lý...
//                   </>
//                 ) : existingRating ? (
//                   'Cập nhật đánh giá'
//                 ) : (
//                   'Gửi đánh giá'
//                 )}
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={onClose}
//                 disabled={isPending}
//               >
//                 Đóng
//               </Button>
//             </div>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }
interface RatingModalProps {
  open: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
}

export function RatingModal({ open, onClose, productId, productName }: RatingModalProps) {
  const { data: existingRating, isLoading } = useMyRating(productId);
  const createRatingMutation = useCreateRating();
  const updateRatingMutation = useUpdateRating();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [hasEdited, setHasEdited] = useState(false);

  useEffect(() => {
    if (existingRating) {
      setRating(existingRating.rating);
      setReview(existingRating.review || '');
      setHasEdited(existingRating?.hasBeenEdited || false);
    } else {
      // Reset defaults when opening for a new rating
      setRating(5);
      setReview('');
      setHasEdited(false);
    }
  }, [existingRating, open]); // Added open to reset/sync state when modal opens

  const handleSubmit = async () => {
    if (existingRating) {
      if (hasEdited) {
        toast.error('You can only edit your review once.');
        return;
      }
      
      await updateRatingMutation.mutateAsync(
        { productId, data: { rating, review } },
        {
          onSuccess: () => {
            setHasEdited(true);
            toast.success('Review updated successfully! You cannot edit it again.');
            setTimeout(onClose, 1500);
          },
        }
      );
    } else {
      await createRatingMutation.mutateAsync(
        { productId, rating, review },
        {
          onSuccess: () => {
            toast.success('Review submitted successfully!');
            onClose();
          },
        }
      );
    }
  };

  const isPending = createRatingMutation.isPending || updateRatingMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>
            {existingRating ? 'Edit Review' : 'Rate Product'}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-white/70" />
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg text-white mb-2">{productName}</h3>
              {existingRating && hasEdited && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-500">
                    ⚠️ You have already edited this review. It cannot be edited again.
                  </p>
                </div>
              )}
            </div>

            {/* Star Rating */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <span className="text-sm font-medium text-zinc-400">Your Rating</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => !hasEdited && setRating(star)}
                    disabled={hasEdited}
                    className={cn(
                      "focus:outline-none transition-all duration-200 hover:scale-110",
                      hasEdited ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    )}
                  >
                    <Star
                      className={cn(
                        "w-8 h-8 transition-colors",
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                          : "text-zinc-600 hover:text-zinc-500"
                      )}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm font-medium text-zinc-300 h-5">
                {rating === 1 && 'Very Poor'}
                {rating === 2 && 'Poor'}
                {rating === 3 && 'Average'}
                {rating === 4 && 'Good'}
                {rating === 5 && 'Excellent'}
              </p>
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-300">
                Your Review (optional)
              </label>
              <textarea
                value={review}
                onChange={(e) => !hasEdited && setReview(e.target.value)}
                disabled={hasEdited}
                className={cn(
                  "w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 resize-none",
                  "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all",
                  "text-white placeholder:text-zinc-600",
                  hasEdited && "opacity-50 cursor-not-allowed"
                )}
                rows={4}
                placeholder="Share your experience with this product..."
              />
              <p className="text-xs text-zinc-500 mt-2">
                {existingRating && !hasEdited && '⚠️ Note: You can only edit your review once.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isPending}
                className="flex-1 bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isPending || hasEdited}
                className="flex-1 bg-white text-black hover:bg-zinc-200"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : existingRating ? (
                  'Update Review'
                ) : (
                  'Submit Review'
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
interface RatingStatusProps {
  productId: string;
}

export  function RatingStatus({ productId }: RatingStatusProps) {
  const { data: myRating, isLoading } = useMyRating(productId);

  if (isLoading) {
    return <Skeleton className="w-32 h-10" />;
  }

  if (!myRating) {
    return (
      <div className="flex items-center justify-center p-4">
        <MessageSquare className=" text-gray-400" />
        <span className="text-xs text-gray-500 text-center">Not rating</span>
      </div>
    );
  }

  return (

    <div className="flex items-center justify-center p-4">
        <MessageSquare className=" text-gray-400" />
        <span className="text-xs text-gray-500 text-center">Rated</span>
      </div>
    // <div className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg min-w-[120px] border border-green-200">
    //   <CheckCircle2 className="w-6 h-6 text-green-600 mb-2" />
    //   <div className="flex mb-1">
    //     {[1, 2, 3, 4, 5].map((star) => (
    //       <Star
    //         key={star}
    //         className={`w-4 h-4 ${
    //           star <= myRating.rating
    //             ? 'fill-yellow-400 text-yellow-400'
    //             : 'text-gray-300'
    //         }`}
    //       />
    //     ))}
    //   </div>
    //   <span className="text-xs text-green-700 font-medium">Đã đánh giá</span>
    //   {myRating.review && (
    //     <span className="text-xs text-gray-500 mt-1">Có nhận xét</span>
    //   )}
    // </div>
  );
}