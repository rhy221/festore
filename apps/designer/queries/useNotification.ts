import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query'; // Nếu dùng React Query
import toast from 'react-hot-toast';
import envConfig from '@/config';


export const useNotificationSocket = (userId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const socket = io(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/notifications`);

    // Join room theo userId để nhận thông báo riêng
    socket.emit('joinRoom', userId); 

    // Lắng nghe sự kiện 'newNotification' từ Backend
    socket.on('newNotification', (newNoti) => {
      // 1. Hiển thị Toast popup nhỏ
      // toast(newNoti.title + '\n' + newNoti.message );

      // 2. Refresh lại danh sách noti (Invalidate Query)
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, queryClient]);
};