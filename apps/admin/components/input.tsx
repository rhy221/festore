"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { useRef } from "react";
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-7 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}
function TextArea({
  className,
  rows,
  ...props
}: React.ComponentProps<"textarea">) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };
  return (
    <textarea
      data-slot="textarea"
      rows={rows}
      ref={textareaRef}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent, transparent 24px, #000 24px, #000 25px)",
        backgroundSize: "100% 25px",
        lineHeight: "24px",
      }}
      onInput={handleInput}
      className={cn(
        "w-80 border-b-1 border-b-black rounded-none resize-none text-sm scroll-bar overflow-hidden",
        "focus-visible:ring/0 focus-visible:ring-[0px] focus:outline-0",
        className
      )}
    />
  );
}
export { Input, TextArea };
