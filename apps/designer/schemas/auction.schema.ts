import { DesignResType } from "./product.schema";

export type AuctionStatus  = 'upcoming' | 'active' |'ended' |'cancelled'
type DesignerProfile = {
  _id: string,
  name: string,
  email: string,
  avatarUrl: string,
}
export type AuctionType = DesignResType;

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