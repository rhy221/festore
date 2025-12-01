"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import TanstackProvider from "@/providers/tanstack-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <TanstackProvider>{children}</TanstackProvider>
    </NextThemesProvider>
  );
}
