'use client';

import { Download, Search } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Input } from '@workspace/ui/components/input';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { useState } from 'react';
import Link from 'next/link';
import { useDownloadProduct, usePurchasedProducts } from '@/queries/usePurchase';

interface PurchaseItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  formats: string[];
  lastUpdated: string;
  views: number;
}

export default function PurchasesPage() {
  // --- Dữ liệu mẫu (đã comment) ---
  // const [purchases] = useState<PurchaseItem[]>([
  //   {
  //     id: '1',
  //     title: 'RENDER BÁSICO - CURSO BÁSICO DE CLO EN ESPAÑOL',
  //     category: 'Free Item',
  //     description: 'CLO Training',
  //     image: 'https://images.pexels.com/photos/1820560/pexels-photo-1820560.jpeg',
  //     tags: [],
  //     formats: ['zpj', 'fbx', 'glft'],
  //     lastUpdated: 'Aug 1, 2025 3:39 PM',
  //     views: 156,
  //   },
  // ]);

  // --- State & Hooks ---
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const { data: purchases, isLoading: loadingPurchases } = usePurchasedProducts();
  const  downloadMutation = useDownloadProduct();

  const categories = ['All', 'Garment', 'Fabric', 'Trim', 'Avatar', 'Scene'];

  // --- Logic Filter (đã comment) ---
  // const filteredPurchases = purchases.filter((item) => {
  //   const matchesSearch =
  //     item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     item.description.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesCategory =
  //     activeCategory === 'All' || item.category.includes(activeCategory);
  //   return matchesSearch && matchesCategory;
  // });

  // --- Handlers ---
  const toggleItemSelect = (id: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const onDownload = async (productId: string) => {
    if(downloadMutation.isPending) return;
    try {
      const result = await downloadMutation.mutateAsync(productId);
    } catch(err) {
      console.error(err);
    }
  }
  const toggleSelectAll = () => {
    // if (selectedItems.size === filteredPurchases.length) {
    //   setSelectedItems(new Set());
    // } else {
    //   setSelectedItems(new Set(filteredPurchases.map((item) => item.id)));
    // }
  };

  // --- Render Loading ---
  if (loadingPurchases || !purchases) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white/60">
        Loading...
      </div>
    );
  }

  // --- Render Main Content ---
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-cyan-400 text-lg">
            CONNECT
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-white/70 text-sm">
            <a href="/store" className="hover:text-white transition-colors">
              Store
            </a>
            <a href="/gallery" className="hover:text-white transition-colors">
              Gallery
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contest
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Community
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-white/70 hover:text-white text-sm font-medium">
              UPLOAD
            </button>
          </div>
        </div>
      </header> 
      */}

      <main className="container mx-auto">
        <div className="mt-8 space-y-6">
          
          {/* Filter Bar */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative ml-auto flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                type="text"
                placeholder="Search for Items"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-white/40 focus:border-zinc-700"
              />
            </div>
          </div>

          <div className="text-white/60 text-sm mb-6">
            1 - {purchases.length} of {purchases.length} Items
          </div>

          {/* Product List */}
          <div className="space-y-4">
            {/* Select All Row (Header) */}
            <div className="bg-zinc-900 rounded-lg p-4 flex items-center gap-4 border border-zinc-800">
              {/* <Checkbox
                checked={selectedItems.size === filteredPurchases.length}
                onCheckedChange={toggleSelectAll}
                className="w-5 h-5"
              /> 
              */}
              <span className="text-white/70 text-sm">
                {selectedItems.size > 0
                  ? `${selectedItems.size} selected`
                  : 'Select All'}
              </span>
            </div>

            {/* Items Map */}
            {purchases.map((item) => (
              <div
                key={item.product._id}
                className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-zinc-700 transition-colors flex justify-between items-center"
              >
                <div className="flex items-start gap-6">
                  {/* <Checkbox
                    checked={selectedItems.has(item.id)}
                    onCheckedChange={() => toggleItemSelect(item.id)}
                    className="w-5 h-5 mt-2"
                  /> 
                  */}

                  {/* Image */}
                  <Link href={`/detail/${item.product._id}`}>
                    <img
                      src={item.product.imageUrls[0]}
                      alt={item.product.title}
                      className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    {/* <p className="text-cyan-400 text-xs font-medium mb-2">
                      {item.category}
                    </p> 
                    */}
                    
                    <p className="text-white/60 mb-4">
                      {item.product.designerName}
                    </p>

                    <Link href={`/detail/${item.product._id}`}>
                      <h3 className="text-white text-lg font-bold mb-2">
                        {item.product.title}
                      </h3>
                    </Link>

                    {/* Formats & Stats (Commented out) */}
                    {/* <div className="flex items-center gap-4 flex-wrap mb-4">
                      {item.formats.map((format) => (
                        <span
                          key={format}
                          className="px-3 py-1 bg-zinc-800 text-white text-xs rounded-full"
                        >
                          {format}
                        </span>
                      ))}
                    </div> 
                    */}

                    {/* <div className="flex items-center gap-4 text-white/50 text-xs">
                      <span>{item.lastUpdated} Updated</span>
                      <span>{item.views} Views</span>
                    </div> 
                    */}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  onClick={() => {onDownload(item.product._id);}}
                  className="flex-shrink-0 bg-white text-black hover:bg-white/90 rounded-full font-bold px-8">
                  <Download className="w-4 h-4 mr-2" />
                  DOWNLOAD
                </Button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button className="p-2 text-white/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
              &lt;
            </button>
            <div className="px-4 py-2 bg-cyan-600 text-white rounded-full font-bold w-10 h-10 flex items-center justify-center">
              1
            </div>
            <button className="p-2 text-white/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
              &gt;
            </button>
          </div>
        </div>

        {/* Other Tabs (Commented out) */}
        {/* <TabsContent value="mycart" className="mt-8">
          <div className="text-center py-12">
            <p className="text-white/50 text-lg">No items in cart</p>
          </div>
        </TabsContent>

        <TabsContent value="invoice" className="mt-8">
          <div className="text-center py-12">
            <p className="text-white/50 text-lg">No invoices yet</p>
          </div>
        </TabsContent> 
        */}
      </main>
    </div>
  );
}