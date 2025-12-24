'use client';

import { useEffect, useState } from 'react';
import { useAuctionBidsQuery, useAuctionQuery, usePlaceAuctionBidMutation } from '@/queries/useAuction';
import { io, Socket } from 'socket.io-client';
import { AuctionBidType, AuctionType } from '@/schema/auction.schema';
import { useParams } from 'next/navigation';
import { AuctionGallery } from '@/components/auction/auction-gallery';
import { AuctionDetails } from '@/components/auction/auction-details';
import { useQueryClient } from '@tanstack/react-query';
import envConfig from '@/config';
import { Skeleton } from '@workspace/ui/components/skeleton';


interface AuctionDetailClientProps {
  mockAuctionData: any;
}

export default function AuctionDetailClient({ mockAuctionData }: AuctionDetailClientProps) {
      const params = useParams();
    const auctionId = params.id as string;

  const [socket, setSocket] = useState<Socket | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [viewerCount, setViewerCount] = useState<number>(0);

  // React Query
  const { data: auction, isLoading: auctionLoading } = useAuctionQuery(auctionId);
  const placeBidMutation = usePlaceAuctionBidMutation();
  const queryClient = useQueryClient();

  // Update bidAmount whenever auction changes
  useEffect(() => {
    if (auction) {
      setBidAmount(auction.currentPrice + (auction.bidIncrement || 1));
    }
  }, [auction]);

  // WebSocket connection
  useEffect(() => {
    if (!auction) return;
    const newSocket = io(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auctions`);
    setSocket(newSocket);

    newSocket.emit('joinAuction', auctionId);

    newSocket.on('newBid', (bid: AuctionBidType) => {
      if(bid){
         queryClient.setQueryData(["auctionBids", auctionId], (oldData: AuctionBidType[]) => {
          if(!oldData)
            return oldData;
          return oldData = [ bid, ...oldData];
        })
      }
    });

    newSocket.on('viewerCount', (count: number) => {
      if(auction)
        setViewerCount(count)
    });

    newSocket.on('auctionEnded', (winner: any) => {
      if(auction) {
        queryClient.setQueryData(["auction", auctionId], (oldData: AuctionType) => {
          if(!oldData)
            return oldData;

          return oldData = {...oldData, status: "ended"};
        })
      }
        
    });

    newSocket.on('priceUpdate', ({ price }: { price: number }) => {
      // Cập nhật currentPrice
      if (auction) {
        console.log("Price update received:", price);
       queryClient.setQueryData(["auction", auctionId], (oldData: AuctionType) => {
          if(!oldData)
            return oldData;
          
          return oldData = {...oldData, currentPrice: price};
        })
      }
    });

    return () => {
      newSocket.emit('leaveAuction', auctionId);
      newSocket.close();
    };
  }, [auctionId, auction]);

  if(auctionLoading || !auction)
    return (<AuctionSkeleton />)
    return (
      <div className="min-h-screen ">
        {/* <AuctionHeader /> */}

        <main className="container mx-auto px-20 py-12">
            <AuctionDetails auctionId={auction._id} viewerCount={viewerCount} />
        </main>
      </div>
  );
}

function AuctionSkeleton() {
  return (
    <div className="bg-background min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        
        {/* Left Column: Gallery Skeleton */}
        <div className="space-y-4">
          {/* Main Image */}
          <Skeleton className="aspect-square w-full rounded-2xl" />
          {/* Thumbnails */}
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Right Column: Details Skeleton */}
        <div className="flex flex-col space-y-6 md:space-y-8">
          
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-4 w-24 md:w-32" />
              <Skeleton className="h-4 w-24 md:w-32" />
            </div>
            <Skeleton className="h-10 md:h-12 w-3/4 rounded-lg" />
            
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
              <Skeleton className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
              <Skeleton className="h-10 w-24 md:w-32 rounded-full" />
            </div>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 md:h-14 w-40 md:w-56" />
            <Skeleton className="h-7 w-12 rounded-md" />
          </div>

          {/* Highest Bidder Card */}
          <Skeleton className="h-24 w-full rounded-2xl" />

          {/* Timer Section */}
          <div className="p-6 bg-secondary/10 rounded-2xl border border-border/50 space-y-3">
            <Skeleton className="h-3 w-32 mx-auto sm:mx-0" />
            <div className="flex justify-center sm:justify-start gap-4">
               <Skeleton className="h-12 w-12 rounded-lg" />
               <Skeleton className="h-12 w-12 rounded-lg" />
               <Skeleton className="h-12 w-12 rounded-lg" />
               <Skeleton className="h-12 w-12 rounded-lg" />
            </div>
          </div>

          {/* Bidding Button */}
          <Skeleton className="h-14 md:h-16 w-full rounded-2xl" />

          {/* Tabs Section */}
          <div className="space-y-6">
            <Skeleton className="h-12 md:h-14 w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            {/* Creator Card */}
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
          
        </div>
      </div>
    </div>
  );
}



// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { io, Socket } from 'socket.io-client';
// import Image from 'next/image';
// import {
//   useAuctionBidsQuery,
//   useAuctionQuery,
//   usePlaceAuctionBidMutation,
// } from '@/queries/useAuction';
// import { AuctionBidType, AuctionType } from '@/schema/auction.schema';

// export default function AuctionPage() {
//   const params = useParams();
//   const auctionId = params.id as string;

//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [bidAmount, setBidAmount] = useState<number>(0);
//   const [timeLeft, setTimeLeft] = useState<string>('');
//   const [viewerCount, setViewerCount] = useState<number>(0);

//   // React Query
//   const { data: auction, isLoading: auctionLoading } = useAuctionQuery(auctionId);
//   const { data: bids, isLoading: bidsLoading, refetch: refetchBids } = useAuctionBidsQuery(auctionId);
//   const placeBidMutation = usePlaceAuctionBidMutation();

//   const [bidding, setBidding] = useState(false);

//   // Update bidAmount whenever auction changes
//   useEffect(() => {
//     if (auction) {
//       setBidAmount(auction.currentPrice + (auction.bidIncrement || 1));
//     }
//   }, [auction]);

//   // WebSocket connection
//   useEffect(() => {
//     if (!auction) return;
//     const newSocket = io('http://localhost:3003');
//     setSocket(newSocket);

//     newSocket.emit('joinAuction', auctionId);

//     newSocket.on('newBid', (bid: AuctionBidType) => {
//       refetchBids(); // cập nhật danh sách bids
//     });

//     newSocket.on('viewerCount', (count: number) => {
//       setViewerCount(count);
//     });

//     newSocket.on('auctionEnded', () => {
//       refetchBids();
//     });

//     newSocket.on('priceUpdate', ({ price }: { price: number }) => {
//       // Cập nhật currentPrice
//       if (auction) {
//         auction.currentPrice = price;
//         setBidAmount(price + (auction.bidIncrement || 1));
//       }
//     });

//     return () => {
//       newSocket.emit('leaveAuction', auctionId);
//       newSocket.close();
//     };
//   }, [auctionId, auction, refetchBids]);

//   // Countdown timer
//   useEffect(() => {
//     if (!auction) return;

//     const timer = setInterval(() => {
//       const now = new Date().getTime();
//       const end = new Date(auction.endTime).getTime();
//       const distance = end - now;

//       if (distance < 0) {
//         setTimeLeft('Auction ended');
//         clearInterval(timer);
//         return;
//       }

//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [auction]);

//   const handlePlaceBid = async () => {
//     if (!auction) return;
//     setBidding(true);

//     try {
//       await placeBidMutation.mutateAsync({ auctionId, body: {amount: bidAmount} });
//     } catch (error: any) {
//       alert(error?.message || 'Failed to place bid');
//     } finally {
//       setBidding(false);
//     }
//   };

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

//   const formatDate = (date: string) => new Date(date).toLocaleString('vi-VN');

//   if (auctionLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-xl">Loading...</div>
//       </div>
//     );
//   }

//   if (!auction) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-xl">Auction not found</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
// <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Left: Images */}
//         <div>
//           <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
//             {auction.images.length > 0 ? (
//               <Image
//                 src={auction.images[0]!}
//                 alt={auction.title}
//                 fill
//                 className="object-cover"
//               />
//             ) : (
//               <div className="flex items-center justify-center h-full text-gray-400">
//                 No image available
//               </div>
//             )}
//           </div>
          
//           {/* Thumbnail gallery */}
//           {auction.images.length > 1 && (
//             <div className="grid grid-cols-4 gap-2 mt-4">
//               {auction.images.slice(1, 5).map((img, idx) => (
//                 <div key={idx} className="relative aspect-square bg-gray-100 rounded overflow-hidden">
//                   <Image src={img} alt={`${auction.title} ${idx + 1}`} fill className="object-cover" />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Right: Auction details */}
//         <div>
//           <div className="mb-4">
//             <h1 className="text-3xl font-bold mb-2">{auction.title}</h1>
//             <div className="flex items-center gap-4 text-sm text-gray-600">
//               <span>👁️ {viewerCount} watching</span>
//               <span>📊 {auction.totalBids} bids</span>
//             </div>
//           </div>

//           {/* Current price */}
//           <div className="bg-blue-50 p-6 rounded-lg mb-6">
//             <div className="text-sm text-gray-600 mb-1">Current Bid</div>
//             <div className="text-4xl font-bold text-blue-600 mb-2">
//               {formatCurrency(auction.currentPrice)}
//             </div>
//             <div className="text-sm text-gray-600">
//               Starting bid: {formatCurrency(auction.startingPrice)}
//             </div>
//           </div>

//           {/* Time left */}
//           <div className="bg-red-50 p-4 rounded-lg mb-6">
//             <div className="text-sm text-gray-600 mb-1">Time Left</div>
//             <div className="text-2xl font-bold text-red-600">{timeLeft}</div>
//             <div className="text-sm text-gray-600 mt-1">
//               Ends: {formatDate(auction.endTime)}
//             </div>
//           </div>

//           {/* Bid form */}
//           {auction.status === 'active' && (
//             <div className="border-2 border-gray-200 p-6 rounded-lg mb-6">
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">
//                   Your Bid Amount
//                 </label>
//                 <input
//                   type="number"
//                   value={bidAmount}
//                   onChange={(e) => setBidAmount(Number(e.target.value))}
//                   min={auction.currentPrice + (auction.bidIncrement || 1)}
//                   step={auction.bidIncrement || 1}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <div className="text-sm text-gray-600 mt-1">
//                   Minimum bid: {formatCurrency(auction.currentPrice + (auction.bidIncrement || 1))}
//                 </div>
//               </div>

//               <button
//                 onClick={handlePlaceBid}
//                 disabled={bidding || bidAmount < auction.currentPrice + (auction.bidIncrement || 1)}
//                 className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
//               >
//                 {bidding ? 'Placing Bid...' : 'Place Bid'}
//               </button>
//             </div>
//           )}

//           {/* Description */}
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold mb-3">Description</h2>
//             <p className="text-gray-700 whitespace-pre-line">{auction.description}</p>
//           </div>
//         </div>
//       </div>

//       {/* Bid history */}
//       {!bidsLoading &&
//          <div className="mt-12">
//         <h2 className="text-2xl font-bold mb-6">Bid History</h2>
//         <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//           {bids!.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">
//               No bids yet. Be the first to bid!
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-200">
//               {bids!.map((bid) => (
//                 <div key={bid._id} className="p-4 flex justify-between items-center hover:bg-gray-50">
//                   <div>
//                     <div className="font-semibold">{bid.bidderProfile.name}</div>
//                     <div className="text-sm text-gray-600">{formatDate(bid.createdAt)}</div>
//                   </div>
//                   <div className="text-xl font-bold text-green-600">
//                     {formatCurrency(bid.amount)}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>  
//       }
     
//       </div>
//   );
// }
