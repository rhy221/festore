import http from "@/lib/http";
import { CategoryType, CommentType, DesignResType, EditProductType, GetGalleryItemsResType, GetStoreItemsResType, UploadDesignType, UploadProductType } from "@/schemas/product.schema";

// export type ProductKind = "selling" | "auction" | "bought";
// export type UserProduct = {
//   id: string;
//   name: string;
//   thumbUrl: string;
//   kind: ProductKind;
// };

// const MOCK_KEY = "fe_mock_user_products";
// const useMockEnv =
//   typeof process !== "undefined" && process.env.NEXT_PUBLIC_USE_MOCK === "true";

// function readMock(): UserProduct[] {
//   const initial: UserProduct[] = [
//     { id: "1", name: "Product 1", thumbUrl: "https://picsum.photos/seed/p1/600/400", kind: "selling" },
//     { id: "2", name: "Product 2", thumbUrl: "https://picsum.photos/seed/p2/600/400", kind: "auction" },
//     { id: "3", name: "Product 3", thumbUrl: "https://picsum.photos/seed/p3/600/400", kind: "bought" },
//   ];
//   if (typeof window === "undefined") return initial;
//   const raw = localStorage.getItem(MOCK_KEY);
//   if (!raw) {
//     localStorage.setItem(MOCK_KEY, JSON.stringify(initial));
//     return initial;
//   }
//   try {
//     const parsed = JSON.parse(raw);
//     if (!Array.isArray(parsed)) throw new Error("invalid");
//     // migrate legacy entries without kind to default "selling"
//     const normalized = parsed.map((p: any) => ({
//       id: String(p?.id ?? ""),
//       name: String(p?.name ?? ""),
//       thumbUrl: String(p?.thumbUrl ?? ""),
//       kind: (p?.kind === "selling" || p?.kind === "auction" || p?.kind === "bought") ? p.kind : "selling",
//     }));
//     return normalized as UserProduct[];
//   } catch {
//     localStorage.setItem(MOCK_KEY, JSON.stringify(initial));
//     return initial;
//   }
// }

// function writeMock(payload: UserProduct[]) {
//   if (typeof window === "undefined") return null;
//   localStorage.setItem(MOCK_KEY, JSON.stringify(payload ?? []));
//   return payload;
// }

const productsAction = {
  get: async () => {
    const response = await http.get<DesignResType[]>("/products");
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await http.get<DesignResType>(`/products/detail/${id}`);
    return response.data;
  },
  upload: async (body: FormData) => {
    const response = await http.post<DesignResType>(`/products/create`, body, {timeout: 90000});
    return response.data;
  },
  edit: async (body: {data: FormData, id: string}) => {
    const response = await http.post<DesignResType>(`/products/update/${body.id}`, body.data, {timeout: 90000});
    return response.data;
  },
  getGalleryItems: async (params?: any) => {
    const response = await http.get<GetGalleryItemsResType>('/products/gallery', {params});
    console.log(response.data);
    return response.data;
  },
  getStoreItems: async (params?: any) => {
    const response = await http.get<GetStoreItemsResType>('/products/store', {params});
    console.log(response.data);
    return response.data;
  },
  getOneComments: async (id: string) => {
    const response = await http.get<CommentType[]>(`/products/${id}/comments`);
    return response.data;
  },
  getCategories: async () => {
    const response = await http.get<CategoryType[]>("/products/categories");
    return response.data;
  },
  likeDesign: async (designId: string) => {
    const response = await http.post("/products/like", {designId});
    return response.data;
  },
  followDesigner: async (designerId: string) => {
    const response = await http.post("/products/follow-designer", {designerId});
    return response.data;
  },

  // getProducts: (params?: any) => 
  //   apiClient.get('/products', { params }).then(res => res.data),
  
  getMyProducts: async (params?: any) => {
    const response = await http.get(`/products/my-products`, { params });
    return response.data;
  },

  getUserProducts: async (userId: string, params?: any) => {
    const response = await http.get(`/products/user/${userId}`, { params });
    return response.data;
  },
  // getMyProducts: (params?: any) => 
  //   apiClient.get('/products/my-products', { params }).then(res => res.data),
  
  // getProductById: (id: string) => 
  //   apiClient.get(`/products/${id}`).then(res => res.data),
  
  // createProduct: (data: any) => 
  //   apiClient.post('/products', data).then(res => res.data),
  
  // updateProduct: (id: string, data: any) => 
  //   apiClient.put(`/products/${id}`, data).then(res => res.data),
  
  deleteProduct: async (id: string) => {
    const response = await http.delete(`/products/${id}`);
    return response.data;
  },
 
  
  // likeProduct: (productId: string) => 
  //   apiClient.post('/products/like', { productId }).then(res => res.data),
  
  // getLikedProducts: () => 
  //   apiClient.get('/products/liked/all').then(res => res.data),
  
  // followSeller: (sellerId: string) => 
  //   apiClient.post('/products/follow-seller', { sellerId }).then(res => res.data),
  
  // getFollowedSellers: () => 
  //   apiClient.get('/products/followed-sellers/all').then(res => res.data),

  getMyCollections: async () => {
    const response = await http.get('/collections/my-collections');
    return response.data;
  },

  getCollectionById: async (id: string) => {
    const response = await http.get(`/collections/${id}`);
    return response.data;
  },

  createCollection: async (data: any) => {
    const response = await http.post('/collections/my-collections', data);
    return response.data;
  },

  updateCollection: async (id: string, data: any) => {
    const response = await http.put(`/collections/${id}`, data);
    return response.data;
  },

  deleteCollection: async (id: string) => {
    const response = await http.get(`/collections/${id}`);
    return response.data;
  },

};
export default productsAction;
