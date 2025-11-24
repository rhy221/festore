import userAction from "@/api/user.api"
import { UserProfileResType, UserProfileStaticsResType } from "@/schema/user.schema"
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