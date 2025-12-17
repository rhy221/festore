import api from "@/lib/http";

export interface Category {
  id: string;
  name: string;
  slug: string;
  styles: string[];     
  isDeleted: boolean;
  productCount?: number;
}

export interface Product {
  id: string;
  name: string;
  imageUrl?: string;
  createdAt: string;
}

const BASE_URL = "/api/admin/categories";

export const CategoriesAPI = {
  getCategories: async (query: { name?: string }) => {
    const response = await api.get<Category[]>(BASE_URL, { params: query });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Category>(`${BASE_URL}/${id}`);
    return response.data;
  },

  getProducts: async (id: string, search?: string) => {
    const response = await api.get<Product[]>(`${BASE_URL}/${id}/products`, {
      params: { search },
    });
    return response.data;
  },

  createCategory: async (body: any) => {
    const response = await api.post<Category>(BASE_URL, body);
    return response.data;
  },

  updateCategory: async ({ id, body }: { id: string; body: any }) => {
    const response = await api.patch<Category>(`${BASE_URL}/${id}`, body);
    return response.data;
  },

  deleteCategory: async (id: string) => {
    const response = await api.delete(`${BASE_URL}/${id}`);
    return response.data;
  },
};
