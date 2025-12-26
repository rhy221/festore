import userAction from "@/api/user.api"
import http from "@/libs/http"
import { UserProfileResType, UserProfileStaticsResType } from "@/schemas/user.schema"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useUserProfile = () => {
    return useQuery<UserProfileResType>({
        queryKey: ["userProfile"],
        queryFn: userAction.getMe,
    })
}

export const useUserProfileEditing = () => {
    return useMutation({
        mutationFn: userAction.updateMe
    })
}

export const useUserProfileStatics = () => {
    return useQuery<UserProfileStaticsResType>({
        queryKey: ["userProfileStatics"],
        queryFn: userAction.getStatics,
    })
}

export const useUserPortfolio = (userId: string) => {
    return useQuery<UserProfileResType>({
        queryKey: ["userPortfolio", userId],
        queryFn: () => userAction.getUserPortfolio(userId),
    })
}

export const useUserPortfolioEditing = () => {
    return useMutation({
        mutationFn: userAction.updateUserPortfolio
    })
}

export const useUserFollowing = (userId: string, queryParams: any) => {
  return useQuery({
    queryKey: ['user-following', userId, queryParams],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', queryParams.currentPage.toString());
      params.append('limit', '12');
      
      const res = await http.get(`products/user/${userId}/following`, { params });
      return res.data;
    },
    enabled: !!userId,
  });
};