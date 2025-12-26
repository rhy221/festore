import z from "zod";

export type UserProfileResType = {
    userId: string;
    name: string;
    email: string
    avatarUrl: string;
    bannerUrl: string;
    bio: string;
    status: 'active' | 'banned';
    followerCount: number;
    followingCount: number;
    totalDesigns: number;
    totalSold: number;
    totalRevenue: number;
    likeCount: number;
    rating: number;
    createdAt: string;

    isFollowing?: boolean; 

};

export type UserProfileStaticsResType = {
  followerCount: number,
  followingCount: number,
  likeCount: number,
  rating: number,
  totalDesigns: number,
};

export type UserProfileEditingType = {
    name: string;
    bio: string;
    avatar: File | null;
}

export const updateUserInforSchema = z.object({
  name: z.string().min(1),
  bio: z.string().optional(),
})

export type UpdateUserInforType = z.TypeOf<typeof updateUserInforSchema>;