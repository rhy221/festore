import { orderAction } from '@/api/order.api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: orderAction.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Order successful!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Cannot order');
    },
  });
};

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: orderAction.getOrders,
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderAction.getOrderById(id),
    enabled: !!id,
  });
};