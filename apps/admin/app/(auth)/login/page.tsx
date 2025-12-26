import { Suspense } from "react";
import LoginForm from "./login-form";
import { Spinner } from "@workspace/ui/components/spinner";

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
