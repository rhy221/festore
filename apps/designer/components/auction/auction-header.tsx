'use client';

import { Search, Upload, Menu } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';
import { Avatar, AvatarFallback } from '@workspace/ui/components/avatar';

export function AuctionHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center">
              <div className="text-white font-bold">O</div>
            </div>
            <span className="font-bold text-lg text-zinc-900">ONIEXMINT</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/discover" className="text-zinc-600 hover:text-zinc-900 text-sm font-medium">
              Discover
            </Link>
            <Link href="/resources" className="text-zinc-600 hover:text-zinc-900 text-sm font-medium">
              Resources
            </Link>
            <Link href="/how-it-works" className="text-zinc-600 hover:text-zinc-900 text-sm font-medium">
              How it works
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input
                type="text"
                placeholder="Search"
                className="pl-10 bg-zinc-100 border-0 text-zinc-900 placeholder:text-zinc-400 focus:bg-zinc-50"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-zinc-300 text-zinc-900 hover:bg-zinc-50"
            >
              Upload
            </Button>

            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
              <div className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium">
                <span className="text-blue-600">1.00461</span>
                <span className="text-blue-600">ETH</span>
              </div>

              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-pink-500 to-orange-500 text-white font-bold">
                  U
                </AvatarFallback>
              </Avatar>

              <button className="p-2 text-zinc-600 hover:text-zinc-900">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
