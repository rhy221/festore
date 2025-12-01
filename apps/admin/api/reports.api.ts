import api from '@/lib/http';

const BASE_URL = '/api/admin';

export const ReportsAPI = {
  getReports: async (query: { type?: string; username?: string }) => {
    const response = await api.get(`${BASE_URL}/reports`, { params: query });
    return response.data;
  },

  rejectReport: async (id: string) => {
    const response = await api.patch(`${BASE_URL}/reports/reject/${id}`);
    return response.data;
  },

  warnUser: async (userId: string) => {
    const response = await api.patch(`${BASE_URL}/reports/warn/${userId}`);
    return response.data;
  },

  blockUser: async (userId: string) => {
    const response = await api.patch(`${BASE_URL}/reports/block/${userId}`);
    return response.data;
  },
};