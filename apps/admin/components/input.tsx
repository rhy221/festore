"use client";
import { cn } from "@/lib/utils";
import React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full h-10 rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-base",
        "outline-none shadow-none transition-all duration-150",
        "focus:border-gray-400 focus:ring-4 focus:ring-gray-300/40",
        "placeholder:text-gray-400",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export { Input };
