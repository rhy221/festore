'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    
    const auth = useAuthStore();

    if (!auth.isAuthenticated) {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
    } else {
      // Nếu có token (ở đây kiểm tra sơ bộ), cho phép hiển thị
      // Nếu muốn kỹ hơn, bạn có thể decode token để check hạn sử dụng tại đây
      setIsAuthorized(true);
    }
  }, [router, pathname]);

  // 3. Hiển thị màn hình Loading trong lúc đợi check localStorage
  // Điều này cực kỳ quan trọng để tránh "nháy" nội dung bảo mật
  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-2">
          {/* Spinner đơn giản */}
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-white"></div>
          <p className="text-sm text-gray-400">Checking permission...</p>
        </div>
      </div>
    );
  }

  // 4. Nếu đã check xong và có token, render nội dung con
  return <>{children}</>;
}