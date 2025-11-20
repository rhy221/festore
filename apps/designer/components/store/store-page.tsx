'use client';

import { useState } from 'react';
import { GalleryHeader } from '@/components/gallery/header';
import { StoreHeader } from './store-header';
import { StoreFilters } from './store-filters';
import { StoreGrid, StoreItem } from './store-grid';
import { useGetStoreItems } from '@/queries/useProduct';
// import { useToast } from '@/hooks/use-toast';

const mockStoreItems: StoreItem[] = [
  {
    id: '1',
    title: 'S9 Bomber Jacket',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
    creator: 'TNNSMNN',
    creatorBadge: 'TNNSMNN',
    price: 20.0,
    views: 292,
    likes: 44,
    isFree: false,
    category: 'garment',
  },
  {
    id: '2',
    title: 'FV2 Princess-Line Single-Breasted Jacket',
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
    creator: 'CONNECT Official',
    creatorBadge: '한국섬유산업연합회',
    price: null,
    views: 206,
    likes: 9,
    isFree: true,
    category: 'garment',
  },
  {
    id: '3',
    title: 'KV Kids Down Vest (130CM)',
    image: 'https://images.pexels.com/photos/1820560/pexels-photo-1820560.jpeg',
    creator: 'CONNECT Official',
    creatorBadge: '한국섬유산업연합회',
    price: null,
    views: 184,
    likes: 21,
    isFree: true,
    category: 'garment',
  },
  {
    id: '4',
    title: 'MV2 Zip-Up Trucker Jacket',
    image: 'https://images.pexels.com/photos/1539638/pexels-photo-1539638.jpeg',
    creator: 'CONNECT Official',
    creatorBadge: '한국섬유산업연합회',
    price: null,
    views: 165,
    likes: 13,
    isFree: true,
    category: 'garment',
  },
  {
    id: '5',
    title: 'FV2 Layered Mini Skirt',
    image: 'https://images.pexels.com/photos/2739667/pexels-photo-2739667.jpeg',
    creator: 'CONNECT Official',
    creatorBadge: '한국섬유산업연합회',
    price: null,
    views: 160,
    likes: 16,
    isFree: true,
    category: 'garment',
  },
  {
    id: '6',
    title: 'MV2 Baker Pants',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    creator: 'CONNECT Official',
    creatorBadge: '한국섬유산업연합회',
    price: null,
    views: 136,
    likes: 11,
    isFree: true,
    category: 'garment',
  },
  {
    id: '7',
    title: 'Premium Fabric Pack',
    image: 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg',
    creator: 'CONNECT Official',
    creatorBadge: '한국섬유산업연합회',
    price: 15.0,
    views: 245,
    likes: 32,
    isFree: false,
    category: 'fabric',
  },
  {
    id: '8',
    title: 'Luxury Trim Collection',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    creator: 'CONNECT Official',
    creatorBadge: '한국섬유산업연합회',
    price: 8.0,
    views: 178,
    likes: 14,
    isFree: false,
    category: 'trim',
  },
  {
    id: '9',
    title: 'Avatar Bundle Set',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
    creator: 'Avatar Studio',
    creatorBadge: '한국섬유산업연합회',
    price: 25.0,
    views: 412,
    likes: 58,
    isFree: false,
    category: 'avatar',
  },
  {
    id: '10',
    title: 'Modern Scene Pack',
    image: 'https://images.pexels.com/photos/3962260/pexels-photo-3962260.jpeg',
    creator: 'Scene Creator',
    creatorBadge: '한국섬유산업연합회',
    price: 12.0,
    views: 189,
    likes: 22,
    isFree: false,
    category: 'scene',
  },
  {
    id: '11',
    title: 'Classic Blazer Template',
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
    creator: 'Design Team',
    creatorBadge: '한국섬유산업연합회',
    price: null,
    views: 267,
    likes: 35,
    isFree: true,
    category: 'garment',
  },
  {
    id: '12',
    title: 'Satin Texture Bundle',
    image: 'https://images.pexels.com/photos/1820560/pexels-photo-1820560.jpeg',
    creator: 'Texture Lab',
    creatorBadge: '한국섬유산업연합회',
    price: 18.0,
    views: 203,
    likes: 28,
    isFree: false,
    category: 'fabric',
  },
];

export function StorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
//   const { toast } = useToast();
  const {data: store, isLoading: storeLoading} = useGetStoreItems();

  const filteredItems = mockStoreItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (item: StoreItem) => {
    // toast({
    //   title: 'Added to Cart',
    //   description: `${item.title} has been added to your cart.`,
    // });
  };
if(storeLoading) 
    return (<>
    Loading ...</>)

  if(!store) 
    return (<>
    Check your connection</>)

  return (
    <div className="min-h-screen bg-black">
      {/* <GalleryHeader /> */}

      <StoreHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <StoreFilters
        activeFilters={activeFilters}
        onFilterChange={setActiveFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        itemCount={store.length}
      />

      <main className="container mx-auto px-4 py-12">
        <StoreGrid  store={store}/>

        <div className="mt-16 flex justify-center">
          <button className="px-8 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors">
            Load More Items
          </button>
        </div>
      </main>
    </div>
  );
}
