import http from "@/lib/http";

export const commentAction = {
  createComment: async (data: { productId: string; content: string; parentId?: string }) => {
    console.log(data.productId);
    const response = await http.post('/comments', data);
    return response.data; 
  },

  updateComment: async (commentId: string, data: { content: string }) => {
    const response = await http.put(`/comments/${commentId}`, data);
    return response.data; 
  },
  
  deleteComment: async (commentId: string) => {
    const response = await http.delete(`/comments/${commentId}`);
    return response.data; 
  },
  
  getProductComments: async (productId: string, page?: number, limit?: number) => {
    const response = await http.get(`/comments/product/${productId}`, { params: { page, limit } });
    return response.data; 
  }
};