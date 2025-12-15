'use client';

import { ChevronDown, Search, Sliders } from 'lucide-react';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';
import { useState } from 'react';
import { useCategories } from '@/queries/useProduct';
import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@workspace/ui/components/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu';

interface GalleryFiltersProps {
  // activeTab: string;
  // onTabChange: (tab: string) => void;
  // searchQuery: string;
  // onSearchChange: (query: string) => void;
  // sortBy: string;
  // onSortChange: (sort: string) => void;
  itemCount: number;
}

const tabs = ['All', "Curator's Pick", 'Contest Winners', 'Following', 'Popular'];

export function GalleryFilters(
//   {
//   itemCount
// }: GalleryFiltersProps
) {

    const params = useParams();
      const searchParams = useSearchParams();
      const pathname = usePathname();
      const router = useRouter();
      const { data: categories, isLoading: categoriesLoading } = useCategories();
    
    
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

if(categoriesLoading || !categories)
    return(<></>)
  return (
    <div className="space-y-6">
      <div className="flex gap-4 overflow-x-auto pb-2">
        <button
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors 
                  ${!params.categorySlug ? 
                  "bg-white text-black" : 
                  "bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40"}
                 
                    `
              }
              >
                <Link href={`/gallery`}>
                All</Link>
              </button>

          {categories.map(
            (category) => (
              <button
                key={category._id}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors 
                  ${params.categorySlug && params.categorySlug[0] === category.slug ? 
                  "bg-white text-black" : 
                  "bg-transparent text-white/70 hover:text-white border border-white/20 hover:border-white/40"}
                 
                    `
              }
              >
                <Link href={`/gallery/${category.slug}`}>
                {category.name}</Link>
              </button>
            )
          )}
      </div>

      <Collapsible>
          <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            type="text"
            placeholder="Search for Garments"
            defaultValue={searchParams.get("search") || ""}
onKeyDown={(e) => {
      if (e.key === 'Enter') {
  
        updateFilter('search', e.currentTarget.value);
      }
    }}            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-white/40 focus:border-cyan-500"
          />
        </div>

          <CollapsibleTrigger asChild>
           <button className="p-2 text-white/70 hover:text-white transition-colors border border-zinc-800 hover:border-white/40 rounded-lg">
          <Sliders className="w-5 h-5" />
        </button>
          </CollapsibleTrigger>
       
         

        {/* <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 text-white text-sm px-3 py-2 rounded-lg hover:border-white/40 focus:outline-none focus:border-cyan-500 cursor-pointer"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="trending">Trending</option>
          <option value="popular">Popular</option>
        </select> */}

        {/* <div className="text-white/60 text-sm whitespace-nowrap">
          {`${itemCount} Items`}
        </div> */}
      </div>

       <CollapsibleContent>
       <div className=" top-16 z-30 bg-black/95 backdrop-blur border-b border-zinc-800 py-4 text-white">
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
          </CollapsibleContent>
      </Collapsible>

      
    </div>
  );
}
