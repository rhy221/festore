'use client';

import { isTokenExpired } from '@/lib/http';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  // Hàm này nhận vào một function (action) mà bạn muốn thực hiện nếu đã login
  const execute = (action: () => void) => {
    

    if (!authStore.isAuthenticated) {
      // Chưa login -> Redirect
      const currentPath = window.location.pathname;
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }

    // Đã login -> Chạy hành động mong muốn
    action();
  };

  return { execute };
};