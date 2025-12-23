import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `
        w-full
        rounded-xl
        px-4 py-3
        text-base

        border border-gray-300
        bg-gray-50

        outline-none
        shadow-none
        resize-none

        transition-all duration-150

        focus:border-gray-400
        focus:ring-4 focus:ring-gray-300/40

        placeholder:text-gray-400

        disabled:opacity-50
        disabled:cursor-not-allowed
        `,
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
