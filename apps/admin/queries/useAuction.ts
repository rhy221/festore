import { auctionAction } from "@/api/home.api";
import { GetAuctionBidsResType, GetAuctionResType, GetAuctionsResType } from "@/schema/auction.schema";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useAuctionQuery = (auctionId: string) => {
    return useQuery<GetAuctionResType>({
        queryKey: ["auction"],
        queryFn: () => auctionAction.getAuction(auctionId),
    });
}

export const useAuctionsQuery = (filter: string) => {
    return useQuery<GetAuctionsResType>({
        queryKey: ["auctions", filter],
        queryFn: () => auctionAction.getAuctions(filter),
        gcTime: 0,
    });
}

export const useAuctionBidsQuery = (auctionId: string) => {
    return useQuery<GetAuctionBidsResType>({
        queryKey: ["auctionBids"],
        queryFn: () => auctionAction.getAuctionBids(auctionId),
    });
}

export const usePlaceAuctionBidMutation = () => {
    return useMutation({
        mutationFn: auctionAction.placeAuctionBid
    });
}