import http from "@/libs/api-client";

export const ratingAction = {
  createRating: async (data: { productId: string; rating: number; review?: string }) => {
       const response = await http.post('/ratings', data);
       return response.data;
  },
  
  updateRating: async (productId: string, data: { rating?: number; review?: string }) => {
    const response = await http.put(`/ratings/${productId}`, data);
    return response.data;   
  },
  
  deleteRating: async (productId: string) => {
    const response = await http.delete(`/ratings/${productId}`);
    return response.data; 
  },
  
  getProductRatings: async (productId: string, page?: number, limit?: number) => {
    const response = await http.get(`/ratings/product/${productId}`, { params: { page, limit } });
    return response.data; 
  },
  
  getMyRating: async (productId: string) => {
    const response = await http.get(`/ratings/my-rating/${productId}`);
    return response.data; 
  },
};