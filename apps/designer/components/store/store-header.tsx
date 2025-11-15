'use client';

import { Search } from 'lucide-react';
import { Input } from '@workspace/ui/components/input';

interface StoreHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function StoreHeader({ searchQuery, onSearchChange }: StoreHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-black via-black to-black/80 py-16 space-y-8">
      <div className="container mx-auto px-4 space-y-6">
        <div>
          <h1 className="text-5xl font-bold text-white mb-2">
            Share your ideas.
          </h1>
          <h2 className="text-5xl font-bold text-white">
            Empower your design.
          </h2>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {['All', 'Garment', 'Fabric', 'Trim', 'Avatar', 'Scene'].map(
            (category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === 'All'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40'
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>

        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            type="text"
            placeholder="Find the items you're looking for"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 py-3 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-white/40 rounded-full focus:border-cyan-500 focus:ring-0"
          />
        </div>
      </div>
    </div>
  );
}
