'use client';

import { ChevronDown, X } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';
import { useQueryClient } from '@tanstack/react-query';
import { CategoryType } from '@/schemas/product.schema';
import { useCategories } from '@/queries/useProduct';

interface StoreFiltersProps {
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  itemCount: number;
}


export function StoreFilters() {
  // const toggleFilter = (value: string) => {
  //   if (activeFilters.includes(value)) {
  //     onFilterChange(activeFilters.filter((f) => f !== value));
  //   } else {
  //     onFilterChange([...activeFilters, value]);
  //   }
  // };

  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data: categories } = useCategories();


  const currentCategorySlug = params?.categorySlug?.[0]; 

  const currentCategory = categories?.find(
    (c: any) => c.slug === currentCategorySlug
  );

  const availableStyles = currentCategory?.styles || [];

  const updateFilter = (key: string, value: string | null) => {
      

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const reset = () => {
    router.push(pathname, { scroll: false });
  }

  return (
    <div className="sticky top-16 z-30  backdrop-blur border-b border-zinc-800 py-4 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {/* {filterOptions.map((option) => (
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
            ))} */}

             

              {availableStyles.length > 0 && (

                <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40'>
            {searchParams.get("style") || "Style"}
            <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-zinc-800 text-white'>
            <DropdownMenuRadioGroup value={searchParams.get("style") || ""} onValueChange={(e) => {updateFilter("style", e)}}>
              <DropdownMenuRadioItem value=''>All</DropdownMenuRadioItem>
              {availableStyles.map((s) => (
                <DropdownMenuRadioItem key={s} value={s}>{s}</DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

              )}

          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40'>
            {searchParams.get("gender") || "Gender"}
            <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-zinc-800 text-white'>
            <DropdownMenuRadioGroup value={searchParams.get("gender") || ""} onValueChange={(e) => {updateFilter("gender", e)}}>
              <DropdownMenuRadioItem value=''>All</DropdownMenuRadioItem>
              {['Male', 'Female', 'Unisex'].map((g) => (
                <DropdownMenuRadioItem key={g} value={g}>{g}</DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40'>
            {searchParams.get("sortPrice") || "Price"}
            <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-zinc-800 text-white'>
            <DropdownMenuRadioGroup value={searchParams.get("sortPrice") || ""} onValueChange={(e) => {updateFilter("sortPrice", e)}}>
              <DropdownMenuRadioItem value=''>Default</DropdownMenuRadioItem>
              {['Lowest', 'Highest'].map((g) => (
                <DropdownMenuRadioItem key={g} value={g.toLowerCase()}>{g}</DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>


            <button 
            onClick={reset}
            className="px-3 py-1 rounded-full text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              RESET
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              {/* <span>{itemCount.toLocaleString()} Items</span> */}
            </div>

            {/* 2. GENDER FILTER */}
     
            {/* <select
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
            </select> */}
          </div>
        </div>
      </div>
    </div>
  );
}
