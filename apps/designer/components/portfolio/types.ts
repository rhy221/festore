export interface User {
  id: string;
  username: string;
  displayName: string;
  headline: string;
  avatarUrl: string;
  bannerUrl: string;
  followers: number;
  following: number;
  itemsCount: number;
}

export interface Item {
  id: string;
  title: string;
  imageUrl: string;
  brandLogoUrl: string; // e.g., CLO logo
  isFree: boolean;
  price?: number;
}

export interface Collection {
  id: string;
  title: string;
  items: Item[];
}