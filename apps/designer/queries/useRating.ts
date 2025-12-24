import { ratingAction } from '@/api/rating.api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export const useProductRatings = (productId: string, page?: number, limit?: number) => {
  return useQuery({
    queryKey: ['ratings', productId, page, limit],
    queryFn: () => ratingAction.getProductRatings(productId, page, limit),
    enabled: !!productId,
  });
};

export const useMyRating = (productId: string) => {
  return useQuery({
    queryKey: ['myRating', productId],
    queryFn: () => ratingAction.getMyRating(productId),
    enabled: !!productId,
  });
};

export const useCreateRating = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ratingAction.createRating,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ratings', variables.productId] });
      queryClient.invalidateQueries({ queryKey: ['myRating', variables.productId] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.productId] });
      toast.success('Rating submitted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to submit rating');
    },
  });
};

export const useUpdateRating = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: any }) =>
      ratingAction.updateRating(productId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ratings', variables.productId] });
      queryClient.invalidateQueries({ queryKey: ['myRating', variables.productId] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.productId] });
      toast.success('Rating updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update rating');
    },
  });
};

export const useDeleteRating = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ratingAction.deleteRating,
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: ['ratings', productId] });
      queryClient.invalidateQueries({ queryKey: ['myRating', productId] });
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      toast.success('Rating deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete rating');
    },
  });
};