'use client';

import { useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { ChevronDown, ChevronUp, Loader2, MessageCircle, Reply, Send, Star, Trash2 } from 'lucide-react';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { RatingsSection } from './Rating';
import { useAuthStore } from '@/stores/authStore';
import { useCreateComment, useDeleteComment } from '@/queries/useComment';
import { useInfiniteQuery } from '@tanstack/react-query';
import { commentAction } from '@/api/comment.api';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Button } from '@workspace/ui/components/button';
import dayjs from 'dayjs';
import { formatToLocalInput } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';

interface ProductDetailTabsProps {
  productId: string;
  commentCount: number;
  ratingCount: number;
  averageRating: number;
  type: string,
}

export function ProductCommentTabs({
  productId,
  commentCount,
  ratingCount,
  averageRating,
  type,
}: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState('comments');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full bg-zinc-800 text-white">
        
        <TabsList className="w-full grid grid-cols-2 rounded-none bg-zinc-800 p-2 md:p-4 h-auto">
          <TabsTrigger 
            value="comments" 
            className="flex items-center justify-center gap-2 py-3 md:py-2 data-[state=active]:bg-zinc-700 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-zinc-400 text-sm md:text-base transition-all"
          >
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
            <span className="truncate">Comments ({commentCount})</span>
          </TabsTrigger>

          {type === "fixed" && (
            <TabsTrigger 
              value="ratings"
              className="flex items-center justify-center gap-2 py-3 md:py-2 data-[state=active]:bg-zinc-700 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-zinc-400 text-sm md:text-base transition-all"
            >
              <Star className="w-4 h-4 md:w-5 md:h-5" />
              <span className="truncate flex flex-col md:flex-row md:gap-1 items-center">
                <span>Reviews ({ratingCount})</span>
                <span className="hidden md:inline">-</span>
                <span className="font-bold text-yellow-400">{averageRating.toFixed(1)}⭐</span>
              </span>
            </TabsTrigger>
          )}
        </TabsList>

        <div className="p-2 md:p-4 bg-zinc-900 min-h-[200px]">
          <TabsContent value="comments" className="mt-0">
            <CommentsSection productId={productId} />
          </TabsContent>

          <TabsContent value="ratings" className="mt-0">
            <RatingsSection productId={productId} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

interface CommentsSectionProps {
  productId: string;
}

export function CommentsSection({ productId }: CommentsSectionProps) {
  const { isAuthenticated, user } = useAuthStore();
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<{ id: string; userName: string } | null>(null);
  
  const createCommentMutation = useCreateComment();
  const parentRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['comments', productId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => 
    commentAction.getProductComments(productId, pageParam, 20),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const allComments = data?.pages.flatMap(page => page.comments) || [];

  const rowVirtualizer = useVirtualizer({
    count: allComments.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    if (
      lastItem.index >= allComments.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allComments.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
          console.log(replyTo);

    createCommentMutation.mutate(
      {
        productId,
        content: commentText,
        parentId: replyTo?.id,
      },
      {
        onSuccess: () => {
          setCommentText('');
          setReplyTo(null);
        },
      }
    );
  };

  return (
    <div className="flex flex-col h-[600px]">
      {isAuthenticated && (
        <div className="p-4 border-b bg-zinc-800 text-white">
          {replyTo && (
            <div className="mb-2 text-sm bg-zinc-700 px-3 py-2 rounded-lg flex items-center justify-between">
              <span>
                Replying to <strong>@{replyTo.userName}</strong>
              </span>
              <button
                onClick={() => setReplyTo(null)}
                className="text-blue-600 hover:text-blue-800"
              >
                Cancel
              </button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex gap-2 ">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-700 placeholder-zinc-400"
              rows={3}
              placeholder={replyTo ? `Reply to @${replyTo.userName}...` : 'Write a comment...'}
              disabled={createCommentMutation.isPending}
            />
            <Button 
              type="submit" 
              disabled={createCommentMutation.isPending || !commentText.trim()}
              className="h-fit bg-blue-600 hover:bg-blue-700 text-white"
            >
              {createCommentMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      )}

      <div ref={parentRef} className="flex-1 overflow-auto p-4">
        {isLoading ? (
          <CommentsSkeleton />
        ) : allComments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No comments yet. Be the first to share your thoughts!
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
              const comment = allComments[virtualRow.index];
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
                  <CommentItem
                    comment={comment}
                    currentUserId={user?.id}
                    onReply={(id, userName) => setReplyTo({ id, userName })}
                  />
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


interface CommentItemProps {
  comment: any;
  currentUserId?: string;
  onReply: (commentId: string, userName: string) => void;
}

export function CommentItem({ comment, currentUserId, onReply }: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(true);
  const deleteCommentMutation = useDeleteComment();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      deleteCommentMutation.mutate(comment._id);
    }
  };

  const timeAgo = dayjs(formatToLocalInput(comment.createdAt)).format("DD-MM-YYYY");

  return (
    <div className="mb-4">
      <div className="flex items-start gap-3 p-3 rounded-lg transition-colors">
        <Avatar>
            <AvatarImage src={comment.user.avatarUrl}/>
            <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0'>
                {comment.user.name[0].toUpperCase()}
            </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-white">{comment.user.name}</span>
            <span className="text-xs text-gray-500">{timeAgo}</span>
            {comment.isEdited && (
              <span className="text-xs text-gray-400 italic">(edited)</span>
            )}
          </div>

          <p className="break-words whitespace-pre-wrap text-zinc-300">{comment.content}</p>

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => onReply(comment._id, comment.user.name)}
              className="text-sm text-zinc-400 hover:text-blue-500 flex items-center gap-1 transition-colors"
            >
              <Reply className="w-3 h-3" />
              Reply
            </button>

            {currentUserId === comment.userId && (
              <button
                onClick={handleDelete}
                className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                disabled={deleteCommentMutation.isPending}
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-12 mt-2 border-l-2 border-zinc-700 pl-4">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 mb-2 transition-colors"
          >
            {showReplies ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide {comment.replies.length} replies
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show {comment.replies.length} replies
              </>
            )}
          </button>

          {showReplies && comment.replies.map((reply: any) => (
            <div key={reply._id} className="mb-3">
              <div className="flex items-start gap-3 p-2 rounded-lg">
                <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.user.avatarUrl}/>
                    <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 text-xs text-white font-semibold'>
                        {comment.user.name[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-zinc-200">{reply.user.name}</span>
                    <span className="text-xs text-zinc-500">
                      {dayjs(formatToLocalInput(reply.createdAt)).format("DD-MM-YYYY")}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-300 break-words">{reply.content}</p>

                  {currentUserId === reply.userId && (
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this reply?')) {
                          deleteCommentMutation.mutate(reply._id);
                        }
                      }}
                      className="text-xs text-red-400 hover:text-red-500 mt-1 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CommentsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-start gap-3 p-3">
          <Skeleton className="w-10 h-10 rounded-full bg-zinc-700" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32 bg-zinc-700" />
            <Skeleton className="h-3 w-full bg-zinc-700" />
            <Skeleton className="h-3 w-3/4 bg-zinc-700" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-6 w-16 bg-zinc-700" />
              <Skeleton className="h-6 w-16 bg-zinc-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}