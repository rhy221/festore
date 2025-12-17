import api from "@/lib/http";

const BASE_URL = "/api/admin";

/* ===================== USER ===================== */

export interface User {
  _id: string;
  email: string;
  role: string[];
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  state: "active" | "blocked" | "pending" | string;
  fullName?: string;
  phone?: string;
  lockDate?: string;
  lockReason?: string;
  appealReason?: string;
  processingHistory?: Array<{
    id: number;
    processor: string;
    processDate: string;
    action: string;
    note: string;
  }>;
}

/* ===================== DESIGN ===================== */

export interface Design {
  _id: string;
  designerId: string;

  title: string;
  description: string;

  imageUrls?: string[];
  displayModelUrl?: string;

  categoryId?: string;
  style?: string;
  gender?: string;
  tags?: string[];

  type?: "fixed" | "auction";
  price?: number;

  purchaseCount?: number;
  totalEarning?: number;

  modelFiles?: {
    publicId: string;
    format: string;
    originalName: string;
    size: number;
  }[];

  status?: string;
  state?: string;

  totalBids?: number;
  viewCount?: number;
  likeCount?: number;

  averageRating?: number;
  ratingCount?: number;
  commentCount?: number;

  isDeleted?: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface UnlockRequest {
  id: string;
  name: string;
  reason: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

export const UsersAPI = {
  getUsers: async (query?: { name?: string; status?: string; type?: string }) => {
    const res = await api.get(`${BASE_URL}/users`, { params: query });
    return res.data;
  },

  getUserDetail: async (id: string) => {
    const res = await api.get(`${BASE_URL}/users/${id}`);
    return res.data;
  },

  getUserDesigns: async (id: string): Promise<Design[]> => {
    const res = await api.get(`${BASE_URL}/users/${id}/designs`);
    return Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data?.data)
      ? res.data.data
      : [];
  },

  blockUserAccount: async (id: string) => {
    const res = await api.patch(`${BASE_URL}/users/block/${id}`);
    return res.data;
  },

  unlockUser: async (id: string) => {
    const res = await api.patch(`${BASE_URL}/users/unlock/${id}`);
    return res.data;
  },

  deleteUser: async (id: string) => {
    const res = await api.delete(`${BASE_URL}/users/${id}`);
    return res.data;
  },

  getUnlockRequests: async (): Promise<UnlockRequest[]> => {
    const res = await api.get(`${BASE_URL}/unlock-requests`);
    return Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data?.data)
      ? res.data.data
      : [];
  },

  approveUnlockRequest: async (id: string) => {
    const res = await api.patch(`${BASE_URL}/unlock-requests/approve/${id}`);
    return res.data;
  },

  rejectUnlockRequest: async (id: string) => {
    const res = await api.patch(`${BASE_URL}/unlock-requests/reject/${id}`);
    return res.data;
  },
};

export const getUserStats = async () => {
  const res = await api.get(`${BASE_URL}/users/stats`);
  return res.data;
};
