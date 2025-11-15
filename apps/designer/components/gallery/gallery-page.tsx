'use client';

import { useState } from 'react';
import { GalleryHeader } from './header';
import { GalleryFilters } from './gallery-filters';
import { GalleryGrid } from './gallery-grid';
import { GalleryItemModal } from './gallery-item-modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';

const mockGalleryItems = [
  {
    id: '1',
    title: 'Ethereal Garden Collection',
    image: 'https://images.pexels.com/photos/1820560/pexels-photo-1820560.jpeg',
    creator: 'Art Studio Co',
    likes: 2840,
    views: 15420,
    category: 'fashion',
  },
  {
    id: '2',
    title: 'Forest Spirit Dress',
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
    creator: 'Dream Weaver',
    likes: 5640,
    views: 28300,
    category: 'fashion',
  },
  {
    id: '3',
    title: 'Mystic Ensemble',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
    creator: 'Cosmic Design',
    likes: 4320,
    views: 19800,
    category: 'fashion',
  },
  {
    id: '4',
    title: 'Urban Minimalist',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
    creator: 'Modern Threads',
    likes: 3210,
    views: 12500,
    category: 'fashion',
  },
  {
    id: '5',
    title: 'Golden Hour Collection',
    image: 'https://images.pexels.com/photos/1539638/pexels-photo-1539638.jpeg',
    creator: 'Luxe Design',
    likes: 6780,
    views: 34200,
    category: 'fashion',
  },
  {
    id: '6',
    title: 'Elegant Evening Wear',
    image: 'https://images.pexels.com/photos/2739667/pexels-photo-2739667.jpeg',
    creator: 'Haute Mode',
    likes: 5120,
    views: 25600,
    category: 'fashion',
  },
  {
    id: '7',
    title: 'Street Style Edge',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
    creator: 'Urban Studio',
    likes: 4890,
    views: 22300,
    category: 'fashion',
  },
  {
    id: '8',
    title: 'Classic Silhouette',
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
    creator: 'Timeless Wear',
    likes: 3450,
    views: 16700,
    category: 'fashion',
  },
  {
    id: '9',
    title: 'Contemporary Fusion',
    image: 'https://images.pexels.com/photos/1820560/pexels-photo-1820560.jpeg',
    creator: 'Future Fashion',
    likes: 5670,
    views: 29100,
    category: 'fashion',
  },
  {
    id: '10',
    title: 'Bohemian Dreams',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
    creator: 'Free Spirit Co',
    likes: 4320,
    views: 20100,
    category: 'fashion',
  },
  {
    id: '11',
    title: 'Avant Garde Design',
    image: 'https://images.pexels.com/photos/1539638/pexels-photo-1539638.jpeg',
    creator: 'Experimental Lab',
    likes: 3890,
    views: 18400,
    category: 'fashion',
  },
  {
    id: '12',
    title: 'Vintage Inspired',
    image: 'https://images.pexels.com/photos/2739667/pexels-photo-2739667.jpeg',
    creator: 'Retro Revival',
    likes: 6210,
    views: 31500,
    category: 'fashion',
  },
];

export function GalleryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [creatorTab, setCreatorTab] = useState('gallery');

  const filteredItems = mockGalleryItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      {/* <GalleryHeader /> */}

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-8 mb-12">
          <h1 className="text-4xl font-bold text-white">GALLERY</h1>
          <button className="text-white/60 hover:text-white transition-colors text-lg border-b-2 border-transparent hover:border-white/60">
            CREATOR
          </button>
        </div>

        <GalleryFilters
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="mt-12">
          <GalleryGrid items={filteredItems} onItemClick={setSelectedItem} />
        </div>

        <div className="mt-12 flex justify-center">
          <button className="px-8 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors">
            Load More
          </button>
        </div>
      </main>

      {selectedItem && (
        <GalleryItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
