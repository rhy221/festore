import http from "@/Lib/http";

export const orderAction = {

  createOrder: async (data: { paymentMethod: string }) => {
    const response = await http.post('/orders/checkout', data);
    return response.data;
  },

   getOrders: async () => {
    const response = await http.get('/orders');
    return response.data;

  },

   getOrderById: async (id: string) => {
    const response = await http.get(`/orders/${id}`);
    return response.data;

  }
    
  
  
};