'use client';

import { Search, Sliders } from 'lucide-react';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';
import { useState } from 'react';

interface GalleryFiltersProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  itemCount: number;
}

const tabs = ['All', "Curator's Pick", 'Contest Winners', 'Following', 'Popular'];

export function GalleryFilters({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  itemCount
}: GalleryFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="flex gap-4 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-white text-black'
                : 'bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            type="text"
            placeholder="Search for Garments"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-white/40 focus:border-cyan-500"
          />
        </div>

        <button className="p-2 text-white/70 hover:text-white transition-colors border border-zinc-800 hover:border-white/40 rounded-lg">
          <Sliders className="w-5 h-5" />
        </button>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 text-white text-sm px-3 py-2 rounded-lg hover:border-white/40 focus:outline-none focus:border-cyan-500 cursor-pointer"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="trending">Trending</option>
          <option value="popular">Popular</option>
        </select>

        <div className="text-white/60 text-sm whitespace-nowrap">
          {`${itemCount} Items`}
        </div>
      </div>
    </div>
  );
}
