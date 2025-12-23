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
      toast.success('Bình luận thành công!');
    },
    onError: () => {
      toast.error('Không thể bình luận');
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
      toast.success('Cập nhật bình luận thành công!');
    },
    onError: () => {
      toast.error('Không thể cập nhật bình luận');
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: commentAction.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast.success('Xóa bình luận thành công!');
    },
    onError: () => {
      toast.error('Không thể xóa bình luận');
    },
  });
};