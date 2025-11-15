'use client';

import { Heart, ShoppingCart, Bell, User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { usePathname } from 'next/navigation';

export function GalleryHeader() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-cyan-500 font-bold text-xl tracking-wider">
              CONNECT
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/store"
              className={`transition-colors text-sm ${
                isActive('/store')
                  ? 'text-white font-medium border-b-2 border-white pb-1'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              STORE
            </Link>
            <Link
              href="/gallery"
              className={`transition-colors text-sm ${
                isActive('/gallery')
                  ? 'text-white font-medium border-b-2 border-white pb-1'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              GALLERY
            </Link>
            <Link href="/contest" className="text-white/70 hover:text-white transition-colors text-sm">
              CONTEST
            </Link>
            <Link href="/community" className="text-white/70 hover:text-white transition-colors text-sm">
              COMMUNITY
            </Link>
            <div className="relative group">
              <button className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1">
                APPS
                <span className="text-xs">↗</span>
              </button>
            </div>
            <Link href="/gamewear" className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1">
              GAMEWEAR
              <span className="text-xs">↗</span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-black font-medium"
            >
              UPLOAD
            </Button>

            <button className="p-2 text-white/70 hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>

            <button className="p-2 text-white/70 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="p-2 text-white/70 hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </button>

            <button className="p-2 text-white/70 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
