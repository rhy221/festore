"use client"

import RegisterForm from "@/components/auth/register-form";
import { useState } from "react";
import SendVerifyEmailForm from "../../../components/auth/sendmail-form";

export default function RegisterPage() {
  const [isRegisted, setRegisted] = useState(false);

  return (
    <div className="w-full max-w-xs">
      {!isRegisted ? <RegisterForm onChangeRegisted={setRegisted} /> : <SendVerifyEmailForm />}
    </div>
  );
}
