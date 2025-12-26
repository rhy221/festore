import { purchaseAction } from '@/api/purchase.api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

export const usePurchasedProducts = (params?: any) => {
  return useQuery({
    queryKey: ['purchasedProducts', params],
    queryFn: () => purchaseAction.getPurchasedProducts(params),
  });
};

export const useDownloadProduct = () => {
  return useMutation({
    mutationFn: purchaseAction.downloadProduct,
    onSuccess: async (data) => {
      // data.downloadUrl: Link raw từ Cloudinary (không có đuôi file)
      // data.fileName: Tên file đẹp bạn muốn user nhận (VD: "Sieuxe.glb")

      try {
        toast.loading('Downloading...');

        // 1. Fetch dữ liệu file về bộ nhớ trình duyệt
        const response = await fetch(data.downloadUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const blob = await response.blob();

        // 2. Tạo URL ảo
        const url = window.URL.createObjectURL(blob);
        
        // 3. Tạo thẻ a giả để kích hoạt download
        const link = document.createElement('a');
        link.href = url;
        
        // QUAN TRỌNG: Frontend tự quyết định tên file và đuôi file ở đây
        link.download = data.fileName; 
        
        document.body.appendChild(link);
        link.click();
        
        // 4. Dọn dẹp
        link.remove();
        window.URL.revokeObjectURL(url);
        
        toast.dismiss();
        toast.success('Download completed!');
      } catch (error) {
        toast.dismiss();
        toast.error('Download failed. Please try again.');
        console.error(error);
      }
    },
    onError: (err) => {
      toast.error('Failed to get download link');
    },
  });
};

export const useCheckPurchaseStatus = (productId: string) => {
  return useQuery({
    queryKey: ['purchaseStatus', productId],
    queryFn: () => purchaseAction.checkPurchaseStatus(productId),
    enabled: !!productId,
  });
};