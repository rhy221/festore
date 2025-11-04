"use client";

import { isTokenExpired } from "@/lib/http";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("accessToken");
      router.replace("/auth/login");
    } else {
      router.replace("/dashboard");
    }
  }, [router]);

  return null; // or a loading spinner
}