
export type AuctionStatus  = 'upcoming' | 'active' |'ended' |'cancelled'
type DesignerProfile = {
  _id: string,
  name: string,
  email: string,
  avatarUrl: string,
}
export type AuctionType = {
   _id: string;
  title: string;
  description: string;
  imageUrls: string[];
  modelUrls?: string[];
  displayModelUrl?: string;
  currentPrice: number;
  startingPrice: number;
  bidIncrement: number;
  endTime: string;
  status: AuctionStatus;
  totalBids: number;
  designerId: string;
  designerProfile: DesignerProfile,
  viewCount: number;
  likeCount: number;
  currentViewerCount?: number;
  currentWinnerProfile?: DesignerProfile,
  currentWinnerId?: string;
  isLiked: boolean;
  isDesignerFollowed: boolean;
}

export type AuctionBidType = {
  _id: string;
  bidderProfile: {
    userId: string;
    name: string;
    avatarUrl: string;
  };
  amount: number;
  createdAt: string;
}

export type PlaceBidType = {
    amount: number;
}

export type GetAuctionResType = AuctionType; 

export type GetAuctionsResType ={
  data: AuctionType[],
  meta: any,
}

export type GetAuctionBidsResType = AuctionBidType[];

export type PlaceAuctionBidBodyType = PlaceBidType;

export type PlaceAcutionBidResType = AuctionBidType;