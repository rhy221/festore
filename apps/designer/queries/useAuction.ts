import { auctionAction } from "@/api/auction.api";
import { GetAuctionBidsResType, GetAuctionResType, GetAuctionsResType } from "@/schema/auction.schema";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useAuctionQuery = (auctionId: string) => {
    return useQuery<GetAuctionResType>({
        queryKey: ["auction", auctionId],
        queryFn: () => auctionAction.getAuction(auctionId),
    });
}

export const useAuctionsQuery = (filter: any) => {
    return useQuery<GetAuctionsResType>({
        queryKey: ["auctions", filter],
        queryFn: () => auctionAction.getAuctions(filter),
        gcTime: 0,
    });
}

export const useAuctionBidsQuery = (auctionId: string) => {
    return useQuery<GetAuctionBidsResType>({
        queryKey: ["auctionBids", auctionId],
        queryFn: () => auctionAction.getAuctionBids(auctionId),
    });
}

export const usePlaceAuctionBidMutation = () => {
    return useMutation({
        mutationFn: auctionAction.placeAuctionBid
    });
}

export const useUploadAuction = () => {
    return useMutation({
        mutationFn: auctionAction.uploadAuction
    });
}

export const useCancelAuction = () => {
    return useMutation({
        mutationFn: auctionAction.cancelAuction
    });
}