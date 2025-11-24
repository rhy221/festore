import { cartAction } from '@/api/cart.api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { toast } from 'react-hot-toast';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: cartAction.getCart,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId}: {productId: string}) => 
      cartAction.addToCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Added to cart');
    },
    onError: (error: AxiosError) => {
      toast.error(error.message || 'Cannot add to cart');
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: cartAction.removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Removed from cart');
    },
    onError: (error: AxiosError) => {
      toast.error('cannot remove from cart');
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: cartAction.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    //   toast.success('Removed from cart');
    },
    // onError: () => {
    //   toast.error('cannot remove from cart');
    // },
  });
};

// export const useUpdateCartItem = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) => 
//       cartAction.updateCartItem(productId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['cart'] });
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message || 'Không thể cập nhật giỏ hàng');
//     },
//   });
// };