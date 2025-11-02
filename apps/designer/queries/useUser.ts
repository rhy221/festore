import userAction from "@/api/user.api"
import { UserProfileResType } from "@/schema/user.schema"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useUserProfile = () => {
    return useQuery<UserProfileResType>({
        queryKey: ["userProfile"],
        queryFn: userAction.getMe,
    })
}

export const useUserProfileEditing = () => {
    return useMutation({
        mutationFn: userAction.getMe
    })
}