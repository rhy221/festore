"use client"

import RegisterForm from "@/app/auth/register/register-form";
import { useState } from "react";
import SendVerifyEmailForm from "./sendmail-form";

export default function RegisterPage() {
  const [isRegisted, setRegisted] = useState(false);

  return (
    <div className="w-full max-w-xl">
      {!isRegisted ? <RegisterForm onChangeRegisted={setRegisted} /> : <SendVerifyEmailForm />}
    </div>
  );
}
