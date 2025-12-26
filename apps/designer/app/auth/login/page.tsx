import LoginForm from "@/components/auth/login-form";
import { Spinner } from "@workspace/ui/components/spinner";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default function LoginPage() {
   return (
    <div className="w-full max-w-xs">
      <Suspense fallback={
        <div className="flex justify-center p-4">
          <Spinner />
        </div>
      }>
        <LoginForm/>
      </Suspense>
    </div>
  );
}
