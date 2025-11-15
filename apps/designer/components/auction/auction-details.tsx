'use client';

import { Heart, Share2, MoreHorizontal, Eye, ChartColumn } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@workspace/ui/components/collapsible';
import { Avatar, AvatarFallback } from '@workspace/ui/components/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { AuctionCountdown } from './auction-countdown';
import { useEffect, useRef, useState } from 'react';
import { AuctionType } from '@/schema/auction.schema';
import { BidsHistory } from './auction-bids-history';
import { formatCurrency } from '@/lib/utils';
import { useAuctionQuery, usePlaceAuctionBidMutation } from '@/queries/useAuction';
import { AuctionGallery } from './auction-gallery';
import CountUp from '../CountUp';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from '@/schema/auth.schema';


interface AuctionDetailsProps {
  title: string;
  category: string;
  currentPrice: number;
  priceInUsd: number;
  highestBidder: {
    name: string;
    avatar: string;
    bid: number;
    bidInUsd: number;
    verified: boolean;
  };
  inStock: number;
  description: string;
  serviceFee: number;
  totalValue: number;
  endTime: Date;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
    role: string;
  };
}

export function AuctionDetails({auctionId, viewerCount} : {auctionId: string, viewerCount:number}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [bidding, setBidding] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  const {data: auction, isLoading: auctionLoading} = useAuctionQuery(auctionId);
  const previousPrice = useRef(0);
  const [isFirstLoad, setFirstLoad] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  useEffect(() => {
      if (auction) {
        setFirstLoad(false);
        const token = localStorage.getItem("accessToken");
        const userId = token ? jwtDecode<JwtPayload>(token).userId : "";
        if(userId === auction.sellerId)
          setIsSeller(true);
      
        setBidAmount(auction.currentPrice + (auction.bidIncrement || 1));
          previousPrice.current = auction.currentPrice;

      }
    }, [auction]);

  const placeBidMutation = usePlaceAuctionBidMutation();

    const handlePlaceBid = async () => {
    if (!auction) return;
    setBidding(true);

    try {
      await placeBidMutation.mutateAsync({ auctionId: auction._id, body: {amount: bidAmount} });
    } catch (error: any) {
      alert(error?.message || 'Failed to place bid');
    } finally {
      setBidding(false);
    }
  };

  if(auctionLoading || !auction)
    return (<>
          Loading...
    </>)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <AuctionGallery images={auction?.images} title={auction.title} />
    
                <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
             <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className='flex gap-2'>
                  <Eye />
                  <span> {viewerCount} watching</span>
              </div>
              <div className='flex gap-2'>
                  <ChartColumn />
                  <span> {auction.totalBids} bids</span>
              </div>
            </div>
          {/* <p className="text-sm text-zinc-500 font-medium mb-2">{category}</p> */}
          <h1 className="text-5xl font-bold text-zinc-900">{auction.title}</h1>
        </div>

        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`p-3 rounded-full transition-colors ${
            isLiked
              ? 'bg-red-100 text-red-600'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
          }`}
        >
          <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          {!isFirstLoad ? 
          (
              <CountUp
  from={previousPrice.current}
  to={auction.currentPrice}
  step={auction.bidIncrement}
  separator=","
  direction="up"
  duration={0.5}
  className="count-up-text text-4xl font-bold text-zinc-900"
/>
          ) : (
        <span className="text-4xl font-bold text-zinc-900">
            {auction.currentPrice.toFixed(3)}
          </span> 
          )}
          
        
          <div className="bg-lime-300 text-zinc-900 px-3 py-1 rounded-full font-bold text-sm">
            VND
          </div>
        </div>
        {/* <span className="text-lg text-zinc-600">
          ${priceInUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span> */}
      </div>

      <div className="bg-zinc-50 rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-bold">
              MR
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm text-zinc-600">Highest bid by</p>
            <p className="font-semibold text-zinc-900 flex items-center gap-1">
              {auction.currentWinnerId}
              {/* {highestBidder.verified && (
                <span className="text-blue-600">✓</span>
              )} */}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-zinc-900">
              {auction.currentPrice.toFixed(3)} VND
            </p>
            {/* <p className="text-xs text-zinc-600">
              ${highestBidder.bidInUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p> */}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-zinc-900">Auction Ending in</h3>
        <AuctionCountdown endTime={new Date(auction.endTime)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {auction.status === 'active' && !isSeller && (
          <Collapsible 
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-[350px] flex-col gap-2"
        >
            <CollapsibleTrigger asChild>
             <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full"
        >
          {/* Purchase now */}
                    Offer

        </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                
            <div className="border-2 border-gray-200 p-6 rounded-lg mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Your Bid Amount
                </label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  min={auction.currentPrice + (auction.bidIncrement || 1)}
                  step={auction.bidIncrement || 1}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="text-sm text-gray-600 mt-1">
                  Minimum bid: {formatCurrency(auction.currentPrice + (auction.bidIncrement || 1))}
                </div>
                <button
                onClick={handlePlaceBid}
                disabled={bidding || bidAmount < auction.currentPrice + (auction.bidIncrement || 1)}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {bidding ? 'Placing Bid...' : 'Place Bid'}
              </button>
              </div>
            </div>
            </CollapsibleContent>
        </Collapsible>
        )}
        
       
        {/* <Button
          variant="outline"
          size="lg"
          className="border-zinc-300 text-zinc-900 hover:bg-zinc-50 font-bold rounded-full"
        >
          Place a bid
        </Button> */}
      </div>
{/* 
      <div className="grid grid-cols-3 gap-4 py-4 border-y border-zinc-200">
        <div>
          <p className="text-xs text-zinc-600 font-medium uppercase">Service Fee</p>
          <p className="font-bold text-zinc-900 mt-1">{serviceFee}%</p>
        </div>
        <div>
          <p className="text-xs text-zinc-600 font-medium uppercase">Total Value</p>
          <p className="font-bold text-zinc-900 mt-1">
            {totalValue.toFixed(3)} ETH
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-600 font-medium uppercase">In Stock</p>
          <p className="font-bold text-zinc-900 mt-1">{inStock}</p>
        </div>
      </div> */}

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-100 rounded-lg p-1">
          <TabsTrigger value="info" className="rounded-md">
            Info
          </TabsTrigger>
          {/* <TabsTrigger value="owners" className="rounded-md">
            Owners
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-md">
            History
          </TabsTrigger> */}
          <TabsTrigger value="bids" className="rounded-md">
            Bids
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6 space-y-4">
          <p className="text-zinc-700 leading-relaxed">{auction.description}</p>

          <div className="bg-white border border-zinc-200 rounded-lg p-4 space-y-4">
            <h4 className="font-bold text-zinc-900">Creator</h4>
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-br from-pink-500 to-orange-500 text-white font-bold">
                  {auction.sellerId.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-zinc-900 flex items-center gap-1">
                  {auction.sellerId}
                  {/* {creator.verified && (
                    <span className="text-blue-600">✓</span>
                  )} */}
                </p>
                <p className="text-sm text-zinc-600">Creator</p>
              </div>
              <button className="ml-auto p-2 text-zinc-600 hover:text-zinc-900">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </TabsContent>

        {/* <TabsContent value="owners" className="mt-6">
          <p className="text-zinc-600 text-center py-8">No ownership information available</p>
        </TabsContent> */}

        {/* <TabsContent value="history" className="mt-6">
          <p className="text-zinc-600 text-center py-8">No transaction history available</p>
        </TabsContent> */}

        <TabsContent value="bids" className="mt-6">
          {/* <p className="text-zinc-600 text-center py-8">No bids placed yet</p> */}
            <BidsHistory auctionId={auction._id}/>
        </TabsContent>
      </Tabs>
    </div>
    </div>
    
  );
}
