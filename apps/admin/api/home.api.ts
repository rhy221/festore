import api from '@/lib/http';

const BASE_URL = '/api/admin';

export const HomeAPI = {
  getDashboardStats: async () => {
    const response = await api.get(`${BASE_URL}/stats`);
    return response.data;
  },

  getTemplatesPerWeek: async () => {
    const response = await api.get(`${BASE_URL}/stats/templates-week`);
    return response.data;
  },

  getUsersDaily: async () => {
    const response = await api.get(`${BASE_URL}/stats/users-daily`);
    return response.data;
  },
};