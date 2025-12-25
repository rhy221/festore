"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers";
import { SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header/Header";
import TanstackProvider from "@/providers/tanstack-provider";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <TanstackProvider>

           <Providers>
          <SidebarProvider>
             <AppSidebar />
             <div className="w-full">
              
            <main className="relative">
              <div className="sticky top-0 left-0 z-50">
                <Header role="admin" name="ABC" />
             <SidebarTrigger />

              </div>
              {children}
            </main>
             </div>
              
          </SidebarProvider>
          
          </Providers>
        </TanstackProvider>
       
        <Toaster />
      </body>
    </html>
  );
}
