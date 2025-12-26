// apps/designer/app/auth/changepassword/page.tsx
import { Suspense } from "react";
import ChangePasswordForm from "../../../components/auth/change-password-form";
import { Spinner } from "@workspace/ui/components/spinner";

// Ép buộc trang này luôn render động để tránh lỗi Prerender
export const dynamic = 'force-dynamic';

export default function ChangePasswordPage() {
  return (
    <div className="w-full max-w-xs">
      {/* BẮT BUỘC: Phải bọc Suspense quanh component sử dụng useSearchParams */}
      <Suspense fallback={
        <div className="flex justify-center p-4">
          <Spinner />
        </div>
      }>
        <ChangePasswordForm/>
      </Suspense>
    </div>
  );
}