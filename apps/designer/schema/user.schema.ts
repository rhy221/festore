
export type UserProfileResType = {
  userId: number;
  name: string;
  email: string;
  bio: string;
  status: string;
  // joinedAt?: string;
  avatarUrl: string;
  createdAt: string;
};

export type UserProfileEditingType = {
    name: string;
    bio: string;
    avatar: HTMLInputElement | null;
}