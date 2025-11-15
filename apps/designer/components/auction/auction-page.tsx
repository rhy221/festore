'use client';

import { AuctionHeader } from './auction-header';
import { AuctionGallery } from './auction-gallery';
import { AuctionDetails } from './auction-details';
import { useEffect, useState } from 'react';
import { useAuctionBidsQuery, useAuctionQuery, usePlaceAuctionBidMutation } from '@/queries/useAuction';
import { io, Socket } from 'socket.io-client';
import { AuctionBidType } from '@/schema/auction.schema';
import { useParams } from 'next/navigation';


interface AuctionDetailClientProps {
  mockAuctionData: any;
}

export function AuctionDetailClient({ mockAuctionData }: AuctionDetailClientProps) {
      const params = useParams();
    const auctionId = params.id as string;

  const [socket, setSocket] = useState<Socket | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [viewerCount, setViewerCount] = useState<number>(0);

  // React Query
  const { data: auction, isLoading: auctionLoading } = useAuctionQuery(auctionId);
  const { data: bids, isLoading: bidsLoading, refetch: refetchBids } = useAuctionBidsQuery(auctionId);
  const placeBidMutation = usePlaceAuctionBidMutation();

  const [bidding, setBidding] = useState(false);

  // Update bidAmount whenever auction changes
  useEffect(() => {
    if (auction) {
      setBidAmount(auction.currentPrice + (auction.bidIncrement || 1));
    }
  }, [auction]);

  // WebSocket connection
  useEffect(() => {
    if (!auction) return;
    const newSocket = io('http://localhost:3003');
    setSocket(newSocket);

    newSocket.emit('joinAuction', auctionId);

    newSocket.on('newBid', (bid: AuctionBidType) => {
      refetchBids(); // cập nhật danh sách bids
    });

    newSocket.on('viewerCount', (count: number) => {
      setViewerCount(count);
    });

    newSocket.on('auctionEnded', () => {
      refetchBids();
    });

    newSocket.on('priceUpdate', ({ price }: { price: number }) => {
      // Cập nhật currentPrice
      if (auction) {
        auction.currentPrice = price;
        setBidAmount(price + (auction.bidIncrement || 1));
      }
    });

    return () => {
      newSocket.emit('leaveAuction', auctionId);
      newSocket.close();
    };
  }, [auctionId, auction, refetchBids]);

  // Countdown timer
  useEffect(() => {
    if (!auction) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(auction.endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft('Auction ended');
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [auction]);

  const handlePlaceBid = async () => {
    if (!auction) return;
    setBidding(true);

    try {
      await placeBidMutation.mutateAsync({ auctionId, body: {amount: bidAmount} });
    } catch (error: any) {
      alert(error?.message || 'Failed to place bid');
    } finally {
      setBidding(false);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  const formatDate = (date: string) => new Date(date).toLocaleString('vi-VN');

  if (auctionLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Auction not found</div>
      </div>
    );
  }

    if(auctionLoading)
        return(<> Loading...
        </>)
    return (
      <div className="min-h-screen bg-white">
        {/* <AuctionHeader /> */}

        <main className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AuctionGallery images={mockAuctionData.images} title={mockAuctionData.title} />

            {/* <AuctionDetails auction={auction}/> */}
          </div>
        </main>
      </div>
  );
}
