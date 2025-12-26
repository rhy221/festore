import { formatCurrency, formatDate } from "@/lib/utils";
import { useAuctionBidsQuery } from "@/queries/useAuction";
import { AuctionBidType } from "@/schema/auction.schema";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import Link from "next/link";


export function BidsHistory({auctionId}: {auctionId: string} ) {
    const { data: bids, isLoading: bidsLoading} = useAuctionBidsQuery(auctionId);
    
    if(bidsLoading)
        return(<>
        Loading...
        </>)
    return(
    <>
            {bids!.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No bids yet. Be the first to bid!
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {bids!.map((bid) => (
                <div key={bid._id} className="p-4 flex justify-between items-center hover:bg-zinc-800">
                  <div className="flex items-center gap-4">
                    <Link href={`/portfolio/${bid.bidderProfile.userId}`}>
                    <Avatar className="w-10 h-10 border border-border">
                        <AvatarImage src={bid.bidderProfile?.avatarUrl} />
                        <AvatarFallback className="bg-muted text-muted-foreground font-bold">
                        {bid.bidderProfile?.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    </Link>
                     <div>
                    <div className="font-semibold">{bid.bidderProfile.name}</div>
                    <div className="text-sm text-gray-600">{formatDate(bid.createdAt)}</div>
                  </div>
                     </div>
                 
                  <div className="text-xl font-bold text-green-600">
                    {formatCurrency(bid.amount)}
                  </div>
                </div>
              ))}
            </div>
          )} 

    </>)
}