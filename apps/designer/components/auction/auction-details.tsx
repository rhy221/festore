// 'use client';

// import { Heart, Share2, MoreHorizontal, Eye, ChartColumn } from 'lucide-react';
// import { Button } from '@workspace/ui/components/button';
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@workspace/ui/components/collapsible';
// import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
// import { AuctionCountdown } from './auction-countdown';
// import { useEffect, useRef, useState } from 'react';
// import { AuctionType } from '@/schema/auction.schema';
// import { BidsHistory } from './auction-bids-history';
// import { formatCurrency } from '@/lib/utils';
// import { useAuctionQuery, usePlaceAuctionBidMutation } from '@/queries/useAuction';
// import { AuctionGallery } from './auction-gallery';
// import CountUp from '../CountUp';
// import { jwtDecode } from "jwt-decode";
// import { JwtPayload } from '@/schema/auth.schema';
// import { Spinner } from '@workspace/ui/components/spinner';
// import DisplayModelViewer from '../ModelViewer';
// import { useAuthStore } from '@/stores/authStore';


// interface AuctionDetailsProps {
//   title: string;
//   category: string;
//   currentPrice: number;
//   priceInUsd: number;
//   highestBidder: {
//     name: string;
//     avatar: string;
//     bid: number;
//     bidInUsd: number;
//     verified: boolean;
//   };
//   inStock: number;
//   description: string;
//   serviceFee: number;
//   totalValue: number;
//   endTime: Date;
//   creator: {
//     name: string;
//     avatar: string;
//     verified: boolean;
//     role: string;
//   };
// }

// export function AuctionDetails({auctionId, viewerCount} : {auctionId: string, viewerCount:number}) {
//   const [isLiked, setIsLiked] = useState(false);
//   const [isOpen, setIsOpen] = useState(false)
//   const [bidAmount, setBidAmount] = useState(0);
//   const {data: auction, isLoading: auctionLoading} = useAuctionQuery(auctionId);
//   const previousPrice = useRef(0);
//   const [isFirstLoad, setFirstLoad] = useState(true);
//   const [isSeller, setIsSeller] = useState(false);
//   const authStore = useAuthStore();
//   useEffect(() => {
//       if (auction) {
//         setFirstLoad(false);
        
//         if(authStore.user?.id === auction.designerId)
//           setIsSeller(true);
      
//         setBidAmount(auction.currentPrice + (auction.bidIncrement || 1));
//           previousPrice.current = auction.currentPrice;

//       }
//     }, [auction]);

//   const placeBidMutation = usePlaceAuctionBidMutation();

//     const handlePlaceBid = async () => {
//     if (!auction) return;

//     try {
//       await placeBidMutation.mutateAsync({ auctionId: auction._id, body: {amount: bidAmount} });
//     } catch (error: any) {
//       alert(error?.message || 'Failed to place bid');
//     } finally {
//     }
//   };

//   if(auctionLoading || !auction)
//     return (<>
//           Loading...
//     </>)

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//               <div>
//                   <AuctionGallery images={auction?.imageUrls} title={auction.title} />
//                   {/* {auction.displayModelUrl && 
//                   <div className='h-[800px] w-full bg-amber-200'>
//                     <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>

//                     </div>
//                   } */}
//               </div>
    
//                 <div className="space-y-6">
//       <div className="flex items-start justify-between">
//         <div>
//              <div className="flex items-center gap-4 text-sm ">
//               <div className='flex gap-2'>
//                   <Eye />
//                   <span> {viewerCount} watching</span>
//               </div>
//               {/* <div className='flex gap-2'>
//                   <ChartColumn />
//                   <span> {auction.totalBids} bids</span>
//               </div> */}
//             </div>
//           {/* <p className="text-sm text-zinc-500 font-medium mb-2">{category}</p> */}
//           <h1 className="text-3xl font-bold ">{auction.title}</h1>
//         </div>

//         <Button
//         size={"icon-lg"}
//           onClick={() => setIsLiked(!isLiked)}
//           className={`p-3 rounded-full transition-colors ${
//             isLiked
//               ? 'bg-red-100 text-red-600'
//               : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
//           }`}
//         >
//           <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
//         </Button>
//       </div>

//       <div className="flex items-center gap-4 flex-wrap">
//         <div className="flex items-center gap-2">
//           {!isFirstLoad ? 
//           (
//               <CountUp
//   from={previousPrice.current}
//   to={auction.currentPrice}
//   step={auction.bidIncrement}
//   separator=","
//   direction="up"
//   duration={0.5}
//   className="count-up-text text-4xl font-bold "
// />
//           ) : (
//         <span className="text-4xl font-bold ">
//             {auction.currentPrice.toFixed(3)}
//           </span> 
//           )}
          
        
//           <div className="bg-lime-300 text-zinc-900 px-3 py-1 rounded-full font-bold text-sm">
//             VND
//           </div>
//         </div>
//         {/* <span className="text-lg text-zinc-600">
//           ${priceInUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
//         </span> */}
//       </div>

      
//       <div className=" rounded-lg p-4 space-y-3">
//         {auction.currentWinnerId ? (
//              <div className="flex items-center gap-3">
//           <Avatar className="w-8 h-8">
//             <AvatarImage src={auction.currentWinnerProfile?.avatarUrl} />
//             <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-bold">
//               {auction.currentWinnerProfile?.name.charAt(0)}
//             </AvatarFallback>
//           </Avatar>
         
//           <div className="flex-1">
//             <p className="text-sm ">Highest bid by</p>
//             <p className="font-semibold flex items-center gap-1">
//               {auction.currentWinnerProfile?.name}
//               {/* {highestBidder.verified && (
//                 <span className="text-blue-600">✓</span>
//               )} */}
//             </p>
//           </div>
//           <div className="text-right">
//             <p className="font-bold text-zinc-900">
//               {auction.currentPrice.toFixed(3)} VND
//             </p>
//             {/* <p className="text-xs text-zinc-600">
//               ${highestBidder.bidInUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
//             </p> */}
//           </div>
//         </div>
//           ) : (<>
//           No one has bid yet
//           </>)}
       
//       </div>

//       <div className="space-y-4">
//         <h3 className="font-bold ">Auction Ending in</h3>
//         <AuctionCountdown endTime={new Date(auction.endTime)} />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         {auction.status === 'active' && !isSeller && (
//           <Collapsible 
//         open={isOpen}
//         onOpenChange={setIsOpen}
//         className="flex w-[350px] flex-col gap-2"
//         >
//             <CollapsibleTrigger asChild>
//              <Button
//           size="lg"
//           className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full"
//         >
//           {/* Purchase now */}
//                     Offer

//         </Button>
//             </CollapsibleTrigger>
//             <CollapsibleContent>
                
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
//                 <button
//                 onClick={handlePlaceBid}
//                 disabled={placeBidMutation.isPending || bidAmount < auction.currentPrice + (auction.bidIncrement || 1)}
//                 className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
//               >
//                 {placeBidMutation.isPending ? 
//                 (<Spinner/>) : 'Place Bid'}
//               </button>
//               </div>
//             </div>
//             </CollapsibleContent>
//         </Collapsible>
//         )}
        
       
//         {/* <Button
//           variant="outline"
//           size="lg"
//           className="border-zinc-300 text-zinc-900 hover:bg-zinc-50 font-bold rounded-full"
//         >
//           Place a bid
//         </Button> */}
//       </div>
// {/* 
//       <div className="grid grid-cols-3 gap-4 py-4 border-y border-zinc-200">
//         <div>
//           <p className="text-xs text-zinc-600 font-medium uppercase">Service Fee</p>
//           <p className="font-bold text-zinc-900 mt-1">{serviceFee}%</p>
//         </div>
//         <div>
//           <p className="text-xs text-zinc-600 font-medium uppercase">Total Value</p>
//           <p className="font-bold text-zinc-900 mt-1">
//             {totalValue.toFixed(3)} ETH
//           </p>
//         </div>
//         <div>
//           <p className="text-xs text-zinc-600 font-medium uppercase">In Stock</p>
//           <p className="font-bold text-zinc-900 mt-1">{inStock}</p>
//         </div>
//       </div> */}

//       <Tabs defaultValue="info" className="w-full">
//         <TabsList className="grid w-full grid-cols-2 bg-zinc-100 rounded-lg p-1">
//           <TabsTrigger value="info" className="rounded-md">
//             Info
//           </TabsTrigger>
//           {/* <TabsTrigger value="owners" className="rounded-md">
//             Owners
//           </TabsTrigger>
//           <TabsTrigger value="history" className="rounded-md">
//             History
//           </TabsTrigger> */}
//           <TabsTrigger value="bids" className="rounded-md">
//             Bids
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="info" className="mt-6 space-y-4">
//           <p className="text-zinc-700 leading-relaxed">{auction.description}</p>

//           <div className="bg-white border border-zinc-200 rounded-lg p-4 space-y-4">
//             <h4 className="font-bold text-zinc-900">Creator</h4>
//             <div className="flex items-center gap-3">
//               <Avatar className="w-12 h-12">
//                 <AvatarImage src={auction.designerProfile.avatarUrl}/>
//                 <AvatarFallback className="bg-gradient-to-br from-pink-500 to-orange-500 text-white font-bold">
//                   {auction.designerProfile.name.charAt(0)}
//                 </AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="font-semibold text-zinc-900 flex items-center gap-1">
//                   {auction.designerProfile.name}
//                   {/* {creator.verified && (
//                     <span className="text-blue-600">✓</span>
//                   )} */}
//                 </p>
//                 <p className="text-sm text-zinc-600">Creator</p>
//               </div>
//               <button className="ml-auto p-2 text-zinc-600 hover:text-zinc-900">
//                 <MoreHorizontal className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </TabsContent>

//         {/* <TabsContent value="owners" className="mt-6">
//           <p className="text-zinc-600 text-center py-8">No ownership information available</p>
//         </TabsContent> */}

//         {/* <TabsContent value="history" className="mt-6">
//           <p className="text-zinc-600 text-center py-8">No transaction history available</p>
//         </TabsContent> */}

//         <TabsContent value="bids" className="mt-6">
//           {/* <p className="text-zinc-600 text-center py-8">No bids placed yet</p> */}
//             <BidsHistory auctionId={auction._id}/>
//         </TabsContent>
//       </Tabs>
//     </div>
//     </div>
    
//   );
// }


'use client';

import { Heart, Share2, MoreHorizontal, Eye, ChartColumn } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@workspace/ui/components/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { AuctionCountdown } from './auction-countdown';
import { useEffect, useRef, useState } from 'react';
import { BidsHistory } from './auction-bids-history';
import { formatCurrency } from '@/lib/utils';
import { useAuctionQuery, usePlaceAuctionBidMutation } from '@/queries/useAuction';
import { AuctionGallery } from './auction-gallery';
import CountUp from '../CountUp';
import { Spinner } from '@workspace/ui/components/spinner';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@workspace/ui/lib/utils'; // Assuming you have this utility
import { useAuth } from '@/hooks/useAuth';
import { useFollowDesignerMutation, useLikeDesignMutation } from '@/queries/useProduct';
import Link from 'next/link';

export function AuctionDetails({auctionId, viewerCount} : {auctionId: string, viewerCount:number}) {
  const [isLiked, setIsLiked] = useState(false);
    const [isFolllowed, setIsFollowed] = useState(false);

  const [isOpen, setIsOpen] = useState(false)
  const [bidAmount, setBidAmount] = useState(0);
  const {data: auction, isLoading: auctionLoading} = useAuctionQuery(auctionId);
  const previousPrice = useRef(0);
  const [isFirstLoad, setFirstLoad] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const authStore = useAuthStore();
  const {execute} = useAuth();
      const likeMutation = useLikeDesignMutation();
        const followMutation = useFollowDesignerMutation();

  const handleLike = async (id: string) => {
      execute( async () => {
        if (likeMutation.isPending) return;
      try {
        setIsLiked(!isLiked);
        const result = await likeMutation.mutateAsync(id);
        console.log('Like result:', result);
      } catch (err) {
        console.error('Like error:', err);
      }
      })
      
    };

    const handleFollow = async () => {
    execute( async() => {
      if (followMutation.isPending) return;
    try {
            setIsFollowed(!isFolllowed);
      const result = await followMutation.mutateAsync(auction?.designerId || "");
      console.log('Follow result:', result);
    } catch (err) {
      console.error('Follow error:', err);
    }
    })
  }

  useEffect(() => {
      if (auction) {
        setFirstLoad(false);
        
        if(authStore.user?.id === auction.designerId)
          setIsSeller(true);
      
        setBidAmount(auction.currentPrice + (auction.bidIncrement || 1));
          previousPrice.current = auction.currentPrice;

        setIsLiked(auction.isLiked);
        setIsFollowed(auction.isDesignerFollowed);
      }
    }, [auction]);

  const placeBidMutation = usePlaceAuctionBidMutation();

    const handlePlaceBid = async () => {
    if (!auction) return;

    try {
      await placeBidMutation.mutateAsync({ auctionId: auction._id, body: {amount: bidAmount} });
    } catch (error: any) {
      alert(error?.message || 'Failed to place bid');
    } finally {
    }
  };

  if(auctionLoading || !auction)
    return (
        <div className="flex h-96 items-center justify-center text-muted-foreground">
            <Spinner className="w-8 h-8" />
        </div>
    )

  return (
    <div className="bg-background text-foreground min-h-screen p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Gallery */}
          <div>
              <AuctionGallery images={auction?.imageUrls} title={auction.title} />
          </div>
    
          {/* Right Column: Details */}
          <div className="space-y-8">
            
            {/* Header Section */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className='flex items-center gap-2'>
                        <Eye className="w-4 h-4" />
                        <span>{viewerCount} watching</span>
                    </div>
                  </div>
                  <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{auction.title}</h1>
              </div>
              <div className='flex gap-2 items-center'>
                <Button
                variant="ghost"
                size="icon"
                onClick={() => handleLike(auction._id)}
                className={cn(
                    "rounded-full h-12 w-12 border border-border bg-secondary/50 hover:bg-secondary transition-colors",
                    isLiked && "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
                )}
              >
                <Heart
                className={`w-4 h-4 ${
                  isLiked
                    ? 'fill-red-500 text-red-500'
                    : 'text-white'
                }`}
              />
              </Button>

              <Button
                onClick={() => handleFollow()}
                
              >
                {!isFolllowed ? 'Follow' : 'Following'}
              </Button>
                </div>
              
            </div>

            {/* Price Section */}
            <div className="flex items-end gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                {!isFirstLoad ? (
                    <CountUp
                        from={previousPrice.current}
                        to={auction.currentPrice}
                        step={auction.bidIncrement}
                        separator=","
                        direction="up"
                        duration={0.5}
                        className="text-5xl font-black text-foreground"
                    />
                ) : (
                    <span className="text-5xl font-black text-foreground">
                        {auction.currentPrice.toFixed(3)}
                    </span> 
                )}
                
                {/* Currency Badge - Using Primary Color from Theme */}
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-bold text-sm tracking-wide">
                  VND
                </div>
              </div>
            </div>

            {/* Highest Bidder Card */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              {auction.currentWinnerId ? (
                  <div className="flex items-center gap-4">
                    <Link href={`/portfolio/${auction.currentWinnerId}`}>
                    <Avatar className="w-10 h-10 border border-border">
                        <AvatarImage src={auction.currentWinnerProfile?.avatarUrl} />
                        <AvatarFallback className="bg-muted text-muted-foreground font-bold">
                        {auction.currentWinnerProfile?.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    </Link>
                    
                    
                    <div className="flex-1">
                        <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Highest Bidder</p>
                        <p className="font-semibold text-foreground flex items-center gap-1">
                        {auction.currentWinnerProfile?.name}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-foreground text-lg">
                        {auction.currentPrice.toFixed(3)} VND
                        </p>
                    </div>
                  </div>
              ) : (
                  <div className="text-muted-foreground text-center py-2 text-sm">
                    No bids yet. Be the first!
                  </div>
              )}
            </div>

            {/* Timer */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Auction Ending In</h3>
              <AuctionCountdown endTime={new Date(auction.endTime)} />
            </div>

            {/* Actions / Bidding Section */}
            <div className="space-y-4">
              {auction.status === 'active' && !isSeller && (
                <Collapsible 
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-full space-y-4"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                        size="lg"
                        className="w-full h-14 text-lg font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-[0_0_20px_-5px_var(--primary)]"
                    >
                        Place an Offer
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="bg-secondary/30 border border-border p-6 rounded-2xl space-y-4 animate-in slide-in-from-top-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Your Bid Amount
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(Number(e.target.value))}
                                    min={auction.currentPrice + (auction.bidIncrement || 1)}
                                    step={auction.bidIncrement || 1}
                                    className="w-full bg-background border border-input rounded-xl px-4 py-3 text-lg font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">VND</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Minimum bid: <span className="text-foreground font-medium">{formatCurrency(auction.currentPrice + (auction.bidIncrement || 1))}</span>
                            </p>
                        </div>

                        <Button
                            onClick={handlePlaceBid}
                            disabled={placeBidMutation.isPending || bidAmount < auction.currentPrice + (auction.bidIncrement || 1)}
                            className="w-full h-12 font-bold rounded-xl"
                            variant="secondary" 
                        >
                            {placeBidMutation.isPending ? <Spinner className="text-foreground" /> : 'Confirm Bid'}
                        </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>

            {/* Tabs Information */}
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="w-full bg-secondary p-1 rounded-xl">
                <TabsTrigger 
                    value="info" 
                    className="flex-1 rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger 
                    value="bids" 
                    className="flex-1 rounded-lg data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground"
                >
                  Bid History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-6 space-y-6">
                <p className="text-muted-foreground leading-relaxed text-base">
                    {auction.description}
                </p>

                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-4">
                    <Link href={`/portfolio/${auction.designerId}`}>
                    <Avatar className="w-14 h-14 border border-border">
                      <AvatarImage src={auction.designerProfile.avatarUrl}/>
                      <AvatarFallback className="bg-secondary text-foreground font-bold text-lg">
                        {auction.designerProfile.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    </Link>
                    
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Creator</p>
                      <p className="text-lg font-bold text-foreground">
                        {auction.designerProfile.name}
                      </p>
                    </div>
                    {/* <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button> */}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bids" className="mt-6">
                  <BidsHistory auctionId={auction._id}/>
              </TabsContent>
            </Tabs>
          </div>
      </div>
    </div>
  );
}