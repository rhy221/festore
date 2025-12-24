import { Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@workspace/ui/components/card";
import Squares from "@/components/Squares";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 1. Dùng min-h-screen thay vì h-screen để tránh bị cắt nội dung trên điện thoại khi bàn phím hiện lên
    <div className="min-h-screen bg-blue-950 relative flex items-center justify-center p-4 md:p-10">
      
      {/* Background lớp dưới cùng */}
      <div className="absolute inset-0 z-0">
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction='diagonal' 
          borderColor='rgba(255,255,255,0.1)' // Chỉnh mờ biên để text dễ đọc hơn
          hoverFillColor='#222'
        />
      </div>

      {/* 2. Container nội dung: 1 cột trên mobile, 2 cột trên lg (desktop) */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* SIDE 1: Logo & Tagline (Hiện lên trên đầu khi ở mobile) */}
        <div className="flex flex-col gap-6 items-center text-center lg:text-left lg:items-start order-1 lg:order-2">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Link href={"/"}>
            <Image 
              src="/logo.svg" 
              alt="logo" 
              height={100} 
              width={100} 
              className="w-20 md:w-24 aspect-square drop-shadow-2xl"
            />
            </Link>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-montserrat leading-tight">
              Join us to explore the <span className="text-blue-400">new trend</span> of fashion.
              <br className="hidden md:block" /> 
              <span className="text-2xl md:text-3xl opacity-80">DIGITAL</span>
            </h2>
          </div>
        </div>

        {/* SIDE 2: Form (Card) */}
        <div className="flex justify-center items-center order-2 lg:order-1 w-full">
        <Card className="flex items-center justify-center place-self-center backdrop-blur shadow-2xl pointer-events-auto">
            {/* Chỉnh padding linh hoạt: p-6 cho mobile, p-10 cho desktop */}
            <CardContent className="p-10 md:p-16">
              {children}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}