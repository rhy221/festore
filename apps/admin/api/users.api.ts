import api from '@/lib/http';

const BASE_URL = '/api/admin';

export const UsersAPI = {
  getUsers: async (query: { name?: string; status?: string }) => {
    const response = await api.get(`${BASE_URL}/users`, { params: query });
    return response.data;
  },

  getUserDetail: async (id: string) => {
    const response = await api.get(`${BASE_URL}/users/${id}`);
    return response.data;
  },

  blockUserAccount: async (id: string) => {
    const response = await api.patch(`${BASE_URL}/users/block/${id}`);
    return response.data;
  },

  unlockUser: async (id: string) => {
    const response = await api.patch(`${BASE_URL}/users/unlock/${id}`);
    return response.data;
  },
};