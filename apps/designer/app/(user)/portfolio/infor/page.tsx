"use client"
import React, { useState, useEffect } from 'react';
import { User, Collection } from '@/components/portfolio/types';
import { ProfileBanner } from '@/components/portfolio/profile-banner';
import { ProfileTabs } from '@/components/portfolio/profile-tabs';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { ItemCard } from '@/components/portfolio/item-card';
import { Share2, ChevronRight, MoreHorizontal } from 'lucide-react';

// --- Mock Data ---

const USER_EDIT: User = {
  id: '1',
  username: 'ghuy9366',
  displayName: 'ghuy9366',
  headline: '',
  avatarUrl: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=400&h=400&q=80', // Chick/bird avatar
  bannerUrl: '', // Empty
  followers: 0,
  following: 0,
  itemsCount: 0,
};

const USER_VIEW: User = {
  id: '2',
  username: 'clo_training',
  displayName: 'CLO Training',
  headline: 'CLO Training Materials and CLO Library Assets',
  avatarUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&q=80', // Abstract logo placeholder
  bannerUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&h=400&q=80', // Wavy texture
  followers: 2298,
  following: 1,
  itemsCount: 217
};

const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    title: "Beginner's Guide to CLO",
    items: [
      { id: '1', title: 'Dress Blue', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80', isFree: true, brandLogoUrl: 'CLO' },
      { id: '2', title: 'Shirt White', imageUrl: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=500&q=80', isFree: true, brandLogoUrl: 'CLO' },
      { id: '3', title: 'Polo Shirt', imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80', isFree: true, brandLogoUrl: 'CLO' },
      { id: '4', title: 'Empty Pattern', imageUrl: '', isFree: true, brandLogoUrl: 'CLO' },
    ]
  },
  {
    id: 'c2',
    title: "Essentials",
    items: [
       { id: '5', title: 'T-Shirt Basic', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80', isFree: true, brandLogoUrl: 'CLO' },
       { id: '6', title: 'Jeans Standard', imageUrl: 'https://images.unsplash.com/photo-1542272617-08f086302542?w=500&q=80', isFree: true, brandLogoUrl: 'CLO' },
    ]
  }
];

export default function ProfilePage() {
  // We toggle between 'EDIT' (User 1) and 'VIEW' (User 2) to simulate the two screenshots provided
  const [viewMode, setViewMode] = useState<'EDIT' | 'VIEW'>('EDIT');
  const [activeTab, setActiveTab] = useState('INFO');

  const currentUser = viewMode === 'EDIT' ? USER_EDIT : USER_VIEW;

  // Automatically switch tabs when view mode changes to better match the screenshots
  useEffect(() => {
    if (viewMode === 'EDIT') setActiveTab('INFO');
    else setActiveTab('COLLECTIONS');
  }, [viewMode]);

  return (
    <div className="min-h-screen px-20 py-12  bg-zinc-950 text-white selection:bg-primary selection:text-black">
      {/* Debug/Demo Controls */}
      <div className="fixed bottom-4 left-4 z-50 bg-black/70 p-2 rounded border border-gray-800 flex gap-2 backdrop-blur-sm">
        <button 
          onClick={() => setViewMode('EDIT')}
          className={`px-3 py-1 text-xs font-bold rounded ${viewMode === 'EDIT' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'}`}
        >
          Edit Profile Mode
        </button>
        <button 
          onClick={() => setViewMode('VIEW')}
          className={`px-3 py-1 text-xs font-bold rounded ${viewMode === 'VIEW' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'}`}
        >
          View Collection Mode
        </button>
      </div>

      <main className="container mx-auto px-4 lg:px-12 pt-8">
        
        {/* Profile Header Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          
          {/* Left: Avatar & Info */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
            <div className="flex flex-row lg:flex-col items-center lg:items-start gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-[#1a1a1a] ring-4 ring-[#0f0f10]">
                  <img 
                    src={currentUser.avatarUrl} 
                    alt={currentUser.displayName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {viewMode === 'EDIT' && (
                  <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-xs font-bold">EDIT</span>
                  </div>
                )}
              </div>

              {/* User Details */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">{currentUser.displayName}</h1>
                
                {currentUser.headline && (
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{currentUser.headline}</p>
                )}
                
                <div className="flex items-center gap-5 text-sm">
                  <div className="flex flex-col lg:flex-row lg:gap-1">
                    <span className="text-white font-bold">{currentUser.followers.toLocaleString()}</span>
                    <span className="text-gray-500">Follower</span>
                  </div>
                  <div className="flex flex-col lg:flex-row lg:gap-1">
                    <span className="text-white font-bold">{currentUser.following.toLocaleString()}</span>
                    <span className="text-gray-500">Following</span>
                  </div>
                  <div className="flex flex-col lg:flex-row lg:gap-1">
                    <span className="text-white font-bold">{currentUser.itemsCount.toLocaleString()}</span>
                    <span className="text-gray-500">Items</span>
                  </div>
                </div>
              </div>
            </div>

            {viewMode === 'VIEW' && (
               <Button className="w-full bg-[#3f3f46] hover:bg-[#52525b] text-white font-bold tracking-wider text-xs h-10 rounded-full border-none">
                 FOLLOW
               </Button>
            )}
          </div>

          {/* Right: Banner */}
          <div className="flex-1">
             <ProfileBanner user={currentUser} isEditable={viewMode === 'EDIT'} />
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="relative">
           <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
           <button className="absolute right-0 top-0 -mt-2 text-gray-500 hover:text-white p-2">
              <Share2 size={18} />
           </button>
        </div>

        {/* Tab Content Area */}
        <div className="min-h-[400px]">
          
          {/* INFO TAB (Edit Mode) */}
          {activeTab === 'INFO' && (
            <div className="w-full max-w-3xl animate-in slide-in-from-bottom-2 duration-500">
               <div className="space-y-10 py-4">
                  <Input 
                    //   label="Name" 
                      required 
                      defaultValue={currentUser.displayName}
                  />
                  
                  <Input 
                    //   label="Headline" 
                      required 
                      defaultValue={currentUser.headline} 
                      placeholder="Enter Your Headline"
                    //   error={!currentUser.headline ? "Enter Your Headline" : undefined}
                  />
                  
                  {/* <div className="pt-4">
                    <p className="text-xs text-gray-500 mb-4">Other settings would go here...</p>
                  </div> */}
                  <Button variant={"secondary"}>Save</Button>
               </div>
            </div>
          )}

          {/* COLLECTIONS TAB (View Mode) */}
          {activeTab === 'COLLECTIONS' && (
            <div className="animate-in slide-in-from-bottom-2 duration-500">
               
               {/* Sub Navigation */}
               <div className="flex gap-3 mb-10">
                   <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-white/10">
                     Collections
                   </button>
                   <button className="bg-[#18181b] text-gray-400 px-5 py-2 rounded-full text-sm font-bold hover:bg-[#27272a] hover:text-white transition-all">
                     All Items
                   </button>
               </div>

               {/* Collections Grid */}
               <div className="space-y-16">
                 {MOCK_COLLECTIONS.map((collection) => (
                   <div key={collection.id} className="space-y-6">
                      {/* Collection Header */}
                      <div className="flex items-center gap-2 group cursor-pointer w-fit">
                         <h2 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                           {collection.title}
                         </h2>
                         <ChevronRight className="text-white group-hover:text-primary transition-colors" size={24} />
                      </div>

                      {/* Items Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                         {collection.items.map((item) => (
                            <ItemCard key={item.id} item={item} />
                         ))}
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* Other Tabs Placeholders */}
          {['GAMEWEAR', 'BOARD', 'LIKES'].includes(activeTab) && (
             <div className="flex items-center justify-center h-64 text-gray-600 font-mono text-sm">
                NO CONTENT IN {activeTab}
             </div>
          )}

        </div>

      </main>
    </div>
  );
};
