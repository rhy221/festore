'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Spinner } from '@workspace/ui/components/spinner';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
    const auth = useAuthStore();

  useEffect(() => {
    

    if (!auth.isAuthenticated) {
      router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
    } else {
      
      setIsAuthorized(true);
    }
  }, [router, pathname]);


  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-2">
          <Spinner />
          {/* <p className="text-sm text-gray-400">Checking permission...</p> */}
        </div>
      </div>
    );
  }

  // 4. Nếu đã check xong và có token, render nội dung con
  return <>{children}</>;
}