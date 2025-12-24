import { commentAction } from '@/api/comment.api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export const useProductComments = (productId: string, page?: number, limit?: number) => {
  return useQuery({
    queryKey: ['comments', productId, page, limit],
    queryFn: () => commentAction.getProductComments(productId, page, limit),
    enabled: !!productId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: commentAction.createComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.productId] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.productId] });
      toast.success('Comment posted successfully!');
    },
    onError: () => {
      toast.error('Failed to post comment');
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ commentId, data }: { commentId: string; data: any }) =>
      commentAction.updateComment(commentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast.success('Comment updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update comment');
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: commentAction.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast.success('Comment deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete comment');
    },
  });
};