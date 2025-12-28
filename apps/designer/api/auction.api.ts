import https from "../apiclient.ts";
import { AuctionType, GetAuctionBidsResType, GetAuctionResType, GetAuctionsResType, PlaceAcutionBidResType, PlaceAuctionBidBodyType } from "@/schemas/auction.schema";


export const auctionAction = {
    getAuction: async (auctionId: string) => {
        const response = await https.get<GetAuctionResType>(`/auctions/${auctionId}`);
        console.log(response.data);
        return response.data;
    },

    getAuctions: async (filter?: string) => {
        
        
        const response = await https.get<GetAuctionsResType>(`/auctions`, {params: filter});
        console.log(response.data);
        return response.data;
    },

    getAuctionBids: async (auctionId: string) => {
        const response = await https.get<GetAuctionBidsResType>(`/auctions/${auctionId}/bids`);
        return response.data;
    },
    
    placeAuctionBid: async ({auctionId, body}: {auctionId: string, body: PlaceAuctionBidBodyType}) => {
        const response = await https.post<PlaceAcutionBidResType>(`/auctions/${auctionId}/bid`, body);
        return response.data;
    },

    uploadAuction: async () => {
        const response = await https.post<AuctionType>(`/auctions`);
        return response.data
    },

     cancelAuction: async (id: string) => {
        const response = await https.post<AuctionType>(`/auctions/${id}/cancel`);
        return response.data
    }
}