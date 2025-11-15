
export type AuctionStatus  = 'upcoming' | 'active' |'ended' |'cancelled'
export type AuctionType = {
   _id: string;
  title: string;
  description: string;
  images: string[];
  currentPrice: number;
  startingPrice: number;
  bidIncrement: number;
  endTime: string;
  status: AuctionStatus;
  totalBids: number;
  sellerId: string;
  viewCount: number;
  currentViewerCount?: number;
  currentWinnerId?: string;
}

export type AuctionBidType = {
  _id: string;
  bidderProfile: {
    userId: string;
    name: string;
  };
  amount: number;
  createdAt: string;
}

export type PlaceBidType = {
    amount: number;
}

export type GetAuctionResType = AuctionType; 

export type GetAuctionsResType = AuctionType[];

export type GetAuctionBidsResType = AuctionBidType[];

export type PlaceAuctionBidBodyType = PlaceBidType;

export type PlaceAcutionBidResType = AuctionBidType;