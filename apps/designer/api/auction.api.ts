import http from "@/lib/Http";
import { AuctionType, GetAuctionBidsResType, GetAuctionResType, GetAuctionsResType, PlaceAcutionBidResType, PlaceAuctionBidBodyType } from "@/schemas/auction.schema";


export const auctionAction = {
    getAuction: async (auctionId: string) => {
        const response = await http.get<GetAuctionResType>(`http://localhost:3003/auctions/${auctionId}`);
        console.log(response.data);
        return response.data;
    },

    getAuctions: async (filter?: string) => {
        
        
        const response = await http.get<GetAuctionsResType>(`http://localhost:3003/auctions`, {params: filter});
        console.log(response.data);
        return response.data;
    },

    getAuctionBids: async (auctionId: string) => {
        const response = await http.get<GetAuctionBidsResType>(`http://localhost:3003/auctions/${auctionId}/bids`);
        return response.data;
    },
    
    placeAuctionBid: async ({auctionId, body}: {auctionId: string, body: PlaceAuctionBidBodyType}) => {
        const response = await http.post<PlaceAcutionBidResType>(`http://localhost:3003/auctions/${auctionId}/bid`, body);
        return response.data;
    },

    uploadAuction: async () => {
        const response = await http.post<AuctionType>(`http://localhost:3003/auctions`);
        return response.data
    },

     cancelAuction: async (id: string) => {
        const response = await http.post<AuctionType>(`http://localhost:3003/auctions/${id}/cancel`);
        return response.data
    }
}