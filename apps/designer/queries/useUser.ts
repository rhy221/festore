import userAction from "@/api/user.api"
import http from "@/lib/http"
import { UserProfileResType, UserProfileStaticsResType } from "@/schemas/user.schema"
import { useAuthStore } from "@/stores/authStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { da } from "date-fns/locale"
import toast from "react-hot-toast"

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
    const updateUser = useAuthStore((state) => state.updateUser);
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userAction.updateUserPortfolio,
        onSuccess: (data) => {
      if (data) {
        updateUser({id: data.userId, name: data.name, email: data.email, avatarUrl: data.avatarUrl});
      }

      queryClient.invalidateQueries({ queryKey: ['userPortfolio'] });

      toast.success("Profile updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update profile");
    }
        
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