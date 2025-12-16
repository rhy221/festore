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
};

export const getUserStats = async () => {
  const res = await api.get(`${BASE_URL}/users/stats`);
  return res.data;
};