'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Spinner } from '@workspace/ui/components/spinner';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false); // Trạng thái sẵn sàng (đã nạp xong store)
  
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // 1. Kiểm tra xem quá trình Rehydration đã hoàn tất chưa
    const checkHydration = () => {
      if (useAuthStore.persist.hasHydrated()) {
        setIsReady(true);
      } else {
        // Nếu chưa xong, lắng nghe sự kiện hoàn tất Rehydration
        const unsub = useAuthStore.persist.onFinishHydration(() => {
          setIsReady(true);
        });
        return unsub;
      }
    };

    const unsubHydration = checkHydration();
    return () => {
      if (unsubHydration) unsubHydration();
    };
  }, []);

  useEffect(() => {
    // 2. CHỈ thực hiện logic chuyển hướng khi Rehydration đã SẴN SÀNG
    if (!isReady) return;

    if (!isAuthenticated) {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isReady, isAuthenticated, router, pathname]);

  // 3. Trong khi chờ nạp dữ liệu từ localStorage HOẶC khi chưa có quyền, hiện Spinner
  if (!isReady || !isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-2">
          <Spinner />
          {/* <p className="text-sm text-gray-400">Verifying session...</p> */}
        </div>
      </div>
    );
  }

  // 4. Khi đã nạp xong và đã login, render nội dung
  return <>{children}</>;
}