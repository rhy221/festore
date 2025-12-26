import { Suspense } from "react";
import ChangePasswordForm from "./change-password-form";
import { Spinner } from "@workspace/ui/components/spinner";

export const dynamic = 'force-dynamic';

export default function ChangePasswordPage() {
  return (
    <div className="w-full max-w-xs">
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