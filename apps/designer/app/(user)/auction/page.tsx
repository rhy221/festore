// app/auctions/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuctionsQuery } from '@/queries/useAuction';
import { ChartColumn, Clock, Eye } from 'lucide-react';

interface Auction {
  _id: string;
  title: string;
  description: string;
  images: string[];
  currentPrice: number;
  startingPrice: number;
  endTime: string;
  status: string;
  totalBids: number;
  viewCount: number;
}

export default function AuctionsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'ended'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'ending' | 'price'>('newest');

  const {data: auctions, isLoading: auctionsLoading, refetch: refechAuctions} = useAuctionsQuery(filter);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getTimeLeft = (endTime: string) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const distance = end - now;

    if (distance < 0) return 'Ended';

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const applyFilter = (filter: 'all' | 'active' | 'upcoming' | 'ended') => {
    setFilter(filter);
  }
  
  const sortedAuctions = [...(auctions || [])].sort((a, b) => {
    switch (sortBy) {
      case 'ending':
        return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
      case 'price':
        return b.currentPrice - a.currentPrice;
      default:
        return 0;
    }
  });
  
  return (
    <div className=" px-10 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Live Auctions</h1>
        <p className="text-gray-600">Discover amazing deals and bid on your favorite items</p>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex gap-2">
          <button
            onClick={() => applyFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => applyFilter('active')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'active'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => applyFilter('upcoming')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'upcoming'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => applyFilter('ended')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'ended'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Ended
          </button>
        </div>

        <div className="ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="ending">Ending Soon</option>
            <option value="price">Highest Price</option>
          </select>
        </div>
      </div>

      {/* Auction Grid */}
      {auctionsLoading || !auctions ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : !auctions  ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-semibold mb-2">No auctions found</h2>
          <p className="text-gray-600">Try changing your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedAuctions.map((auction) => (
            <Link
              key={auction._id}
              href={`/auction/${auction._id}`}
              className="group block"
            >
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  {auction.imageUrls.length > 0 ? (
                    <Image
                      src={auction.imageUrls[0]!}
                      alt={auction.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No image
                    </div>
                  )}
                  
                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    {auction.status === 'active' && (
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                        LIVE
                      </span>
                    )}
                    {auction.status === 'upcoming' && (
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                        UPCOMING
                      </span>
                    )}
                    {auction.status === 'ended' && (
                      <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                        ENDED
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600">
                    {auction.title}
                  </h3>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="text-sm text-gray-600">Current Bid</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(auction.currentPrice)}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    
                     <div className='flex gap-2'>
                      <ChartColumn />
                      <span> {auction.totalBids} bids</span>
                    </div>
                     <div className='flex gap-2'>
                      <Eye />
                      <span> {auction.viewCount} views</span>
                    </div>
                  </div>

                  {/* Time left */}
                  {auction.status === 'active' && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-red-600">
                        <Clock />
                      </span>
                      <span className="font-medium text-red-600">
                        {getTimeLeft(auction.endTime)} left
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}