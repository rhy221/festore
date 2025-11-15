import { formatCurrency, formatDate } from "@/lib/utils";
import { useAuctionBidsQuery } from "@/queries/useAuction";
import { AuctionBidType } from "@/schema/auction.schema";


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
                <div key={bid._id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    {/* <div className="font-semibold">{bid.bidderProfile.name}</div> */}
                    <div className="text-sm text-gray-600">{formatDate(bid.createdAt)}</div>
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