import api from "@/lib/http";

const BASE_URL = "/api/admin"; 

export interface User {
  id: number;
  fullName: string;
  role: string;
  email: string;
  phone: string;
  status: string;
  lockDate: string;
  lockReason: string;
  appealReason: string;
  processingHistory: Array<{
    id: number;
    processor: string;
    processDate: string;
    action: string;
    note: string;
  }>;
}

export interface UnlockRequest {
  id: number;
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

  getUserDetail: async (id: number) => {
    const res = await api.get(`${BASE_URL}/users/${id}`);
    return res.data;
  },

  blockUserAccount: async (id: number) => {
    const res = await api.patch(`${BASE_URL}/users/block/${id}`);
    return res.data;
  },

  unlockUser: async (id: number) => {
    const res = await api.patch(`${BASE_URL}/users/unlock/${id}`);
    return res.data;
  },

  deleteUser: async (id: number) => {
    const res = await api.delete(`${BASE_URL}/users/${id}`);
    return res.data;
  },

  getUnlockRequests: async (): Promise<UnlockRequest[]> => {
    try {
      const res = await api.get(`${BASE_URL}/unlock-requests`);
      if (Array.isArray(res.data)) return res.data;
      if (Array.isArray(res.data?.data)) return res.data.data;
      console.warn("Unexpected unlock requests response:", res.data);
      return [];
    } catch (err) {
      console.error("Error fetching unlock requests:", err);
      return [];
    }
  },

  approveUnlockRequest: async (id: number) => {
    try {
      const res = await api.patch(`${BASE_URL}/unlock-requests/approve/${id}`);
      return res.data;
    } catch (err) {
      console.error("Error approving unlock request:", err);
      throw err;
    }
  },

  rejectUnlockRequest: async (id: number) => {
    try {
      const res = await api.patch(`${BASE_URL}/unlock-requests/reject/${id}`);
      return res.data;
    } catch (err) {
      console.error("Error rejecting unlock request:", err);
      throw err;
    }
  },
};

export const getUserStats = async () => {
  const res = await api.get(`${BASE_URL}/users/stats`);
  return res.data;
};
