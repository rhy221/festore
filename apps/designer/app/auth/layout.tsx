/* eslint-disable @next/next/no-img-element */

import { Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Store className="size-4" />
            </div>
            StoreApp
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>
      </div>
      <div className="bg-blue-700 relative hidden lg:block">
          {/* <Image src="/logo.png" alt="logo" height={500} width={500} className="w-[80%] h-auto"/> */}
      </div>
    </div>
  );
}
