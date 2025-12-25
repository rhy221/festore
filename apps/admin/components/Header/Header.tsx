"use client";

import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  role?: "admin" | "user";
  name?: string;
}

export default function Header({ role = "admin", name = "ABC" }: HeaderProps) {
  return (
    <header
      className="
        flex h-16 md:h-20 w-full items-center
        bg-card/90 backdrop-blur-md border-b border-border
      "
    >
      <div className="flex w-full items-center justify-between px-4 md:px-6">
        <Link href='/' className='flex items-center gap-2 group shrink-0'>
                <Image 
                    src='/logo.svg' 
                    alt="logo" 
                    height={32} 
                    width={32}  
                    className='w-8 h-8 dark:invert transition-all'
                />
                <span className='text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-ring transition-colors'>
                    HHCLOSET
                </span>
            </Link>

      </div>
    </header>
  );
}
