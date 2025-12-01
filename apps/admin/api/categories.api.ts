import api from '@/lib/http';

const BASE_URL = '/api/admin';

export const CategoriesAPI = {
  getCategories: async (query: { name?: string }) => {
    const response = await api.get(`${BASE_URL}/categories`, { params: query });
    return response.data;
  },

  createCategory: async (body: any) => {
    const response = await api.post(`${BASE_URL}/categories`, body);
    return response.data;
  },

  updateCategory: async ({ id, body }: { id: string; body: any }) => {
    const response = await api.patch(`${BASE_URL}/categories/${id}`, body);
    return response.data;
  },

  deleteCategory: async (id: string) => {
    const response = await api.patch(`${BASE_URL}/categories/delete/${id}`);
    return response.data;
  },
};