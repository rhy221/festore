"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers";
import { SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header/Header";
import TanstackProvider from "@/providers/tanstack-provider";
import AuthGuard from "@/components/AuthGuard";

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
    <div >
    
            <AuthGuard>
                <SidebarProvider>
             <AppSidebar />
             
              
            <main className="w-full">
              <div className="sticky top-0 left-0 z-10">
                <Header role="admin" name="ABC" />
                <SidebarTrigger />
              </div>
              {children}
            </main>
              
          </SidebarProvider>
            </AuthGuard>
          
       
        <Toaster />
      
    </div>
  );
}
