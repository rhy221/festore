/* eslint-disable @next/next/no-img-element */

import { Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PixelBlast from "@/components/PixelBlast"
import { Card, CardContent } from "@workspace/ui/components/card";
import Squares from "@/components/Squares";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen bg-blue-950 relative">
      {/* <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Store className="size-4" />
            </div>
            StoreApp
          </Link>
        </div>
       
      </div> */}
      
    <Squares 
speed={0.5} 
squareSize={40}
direction='diagonal' 
borderColor='#fff'
hoverFillColor='#222'
/>
      <div className="grid h-full w-full lg:grid-cols-2 absolute inset-0 z-1 pointer-events-none">
        <Card className="flex items-center justify-center p-20 place-self-center pointer-events-auto">
          <CardContent>
            {children}
          </CardContent>
          
        </Card>
        <div className="flex flex-col gap-4 place-self-center items-center text-center">
        <Image src={"/logo.svg"} alt="logo" height={200} width={200} className="w-24 aspect-square "/>
        <h2 className="text-2xl font-bold text-white font-montserrat">Join us to explore the new trend of fashion. <br />DIGITAL</h2>
      </div>

      </div>

      
       
     
          {/* <Image src="/logo.png" alt="logo" height={500} width={500} className="w-[80%] h-auto"/> */}
      
    </div>
  );
}
