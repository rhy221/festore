'use client';

import { ChevronDown, X } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { useState } from 'react';

interface StoreFiltersProps {
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  itemCount: number;
}

const filterOptions = [
  { label: "Curator's Pick", value: 'curators_pick' },
  { label: 'Following', value: 'following' },
  { label: 'Fbx / Glft', value: 'fbx_glft' },
];

export function StoreFilters({
  activeFilters,
  onFilterChange,
  sortBy,
  onSortChange,
  itemCount,
}: StoreFiltersProps) {
  const toggleFilter = (value: string) => {
    if (activeFilters.includes(value)) {
      onFilterChange(activeFilters.filter((f) => f !== value));
    } else {
      onFilterChange([...activeFilters, value]);
    }
  };

  return (
    <div className="sticky top-16 z-30 bg-black/95 backdrop-blur border-b border-zinc-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleFilter(option.value)}
                className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-2 ${
                  activeFilters.includes(option.value)
                    ? 'bg-white/20 text-white border border-white/40'
                    : 'bg-transparent text-white/70 border border-white/20 hover:border-white/40 hover:text-white'
                }`}
              >
                {option.label}
                {activeFilters.includes(option.value) && (
                  <X className="w-3 h-3" />
                )}
              </button>
            ))}

            <button className="px-3 py-1 rounded-full text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
              RESET
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span>{itemCount.toLocaleString()} Items</span>
            </div>

            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent border border-white/20 text-white text-sm px-3 py-1 rounded-lg hover:border-white/40 focus:outline-none focus:border-cyan-500 cursor-pointer flex items-center gap-2"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="trending">Trending</option>
              <option value="popular">Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
