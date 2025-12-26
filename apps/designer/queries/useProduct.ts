import productsAction from "@/api/products.api"
import http from "@/lib/Http"
import { CategoryType, CommentType, DesignResType, GetGalleryItemsResType, GetStoreItemsResType } from "@/schema/product.schema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"


export const useProducts = () =>{
    return useQuery<DesignResType[]>({
        queryKey: ["designs"],
        queryFn: productsAction.get,
    })
}

export const useProduct = (id: string) =>{
    return useQuery<DesignResType>({
        queryKey: ["design", id],
        queryFn: () => productsAction.getOne(id),
    })
}

export const useComments = (id: string) =>{
    return useQuery<CommentType[]>({
        queryKey: ["comments"],
        queryFn: () => productsAction.getOneComments(id),
    })
}

export const useCategories = () =>{
    return useQuery<CategoryType[]>({
        queryKey: ["categories"],
        queryFn: productsAction.getCategories,
    })
}

export const useUploadProduct = () =>{
    
    return useMutation({
        mutationFn: productsAction.upload,
        
    })
}

export const useEditProduct = () =>{
      const queryClient = useQueryClient();
    return useMutation({
        mutationFn: productsAction.edit,
        onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['design', data._id] });
    },
    })
}


export const useGetGalleryItems = (params?: any) =>{
    return useQuery<GetGalleryItemsResType>({
        queryKey: ["gallery", params],
        queryFn: () => productsAction.getGalleryItems(params),
    })
}

export const useGetStoreItems = (params?: any) =>{
    return useQuery<GetStoreItemsResType>({
        queryKey: ["store", params],
        queryFn: () => productsAction.getStoreItems(params),
    })
}

export const useLikeDesignMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsAction.likeDesign(id),
    
    onMutate: async (id: string) => {
      // 1. Cancel TẤT CẢ các query bắt đầu bằng key ['gallery'] 
      // (bất kể params phía sau là gì)
      await queryClient.cancelQueries({ queryKey: ['gallery'] });
      await queryClient.cancelQueries({ queryKey: ['design', id] });

      // 2. Optimistic Update cho DANH SÁCH (Dùng setQueriesData thay vì setQueryData)
      // Hàm này sẽ chạy qua mọi cache khớp với key ['gallery', ...]
      queryClient.setQueriesData<GetGalleryItemsResType>(
        { queryKey: ['gallery'] }, 
        (old) => {
          if (!old || !old.data) return old;

          // Tìm xem item có nằm trong trang/danh sách này không
          const exists = old.data.find(item => item._id === id);
          if (!exists) return old; // Không có trong trang này thì bỏ qua

          return {
            ...old,
            data: old.data.map((item) => {
              if (item._id === id) {
                const isLikedNew = !item.isLiked;
                return {
                  ...item,
                  isLiked: isLikedNew,
                  likeCount: isLikedNew ? item.likeCount + 1 : item.likeCount - 1,
                };
              }
              return item;
            }),
          };
        }
      );

      // 3. Optimistic Update cho CHI TIẾT (nếu đang xem modal/detail)
      const prevDesign = queryClient.getQueryData(['design', id]);
      if (prevDesign) {
         queryClient.setQueryData<DesignResType | undefined>(['design', id], old => ({
        ...old!,
        isLiked: !old?.isLiked!,
        likeCount: old?.isLiked ? old.likeCount - 1 : old!.likeCount + 1,
      }));
      }

      // Trả về context để rollback (tạm thời ta bỏ qua logic rollback phức tạp của setQueriesData để code gọn, 
      // nhưng thực tế nên lưu lại snapshot của từng query)
      return { prevDesign };
    },

    onError: (err, id, context) => {
        // Rollback đơn giản: Invalidate lại để fetch mới cho chắc
        queryClient.invalidateQueries({ queryKey: ['gallery'] });
        if (context?.prevDesign) {
             queryClient.setQueryData(['design', id], context.prevDesign);
        }
    },

    onSettled: (data, error, id) => {
      // Fetch lại dữ liệu mới nhất từ server cho tất cả các list gallery
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      queryClient.invalidateQueries({ queryKey: ['design', id] });
    },
  });
};

export const useDesignerLikedModels = (userId: string, queryParams: any) => {
  return useQuery({
    queryKey: ['userLikes', userId, queryParams],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', queryParams.currentPage.toString());
      params.append('limit', (queryParams.limit || 12).toString());
      
      // Gọi API mới tạo
      const res = await http.get(`/products/user/${userId}/likes?`, { params });

      return res.data;
    },
    enabled: !!userId,
  });
};
// export const useLikeDesignMutation = (id: string) => {
// const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: productsAction.likeDesign,
//     onMutate: async () => {
//       await queryClient.cancelQueries({ queryKey: ['design',id] });

//       const prev = queryClient.getQueryData(['design',id]);

//       // Optimistic update
//       queryClient.setQueryData<DesignResType | undefined>(['design', id], old => ({
//         ...old!,
//         isLiked: !old?.isLiked!,
//         likeCount: old?.isLiked ? old.likeCount - 1 : old!.likeCount + 1,
//       }));

//       return { prev };
//     },
//     onError: (err, vars, context) => {
//       // rollback
//       queryClient.setQueryData(['design',id], context?.prev);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['design',id] });
//     },
//   });
// };


export const useFollowDesignerMutation = (designId?: string) => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsAction.followDesigner,
    onMutate: async (id) => {

      await queryClient.cancelQueries({ queryKey: ['design', designId] });

        const prev = queryClient.getQueryData(['design',designId]);

        if (prev) {
          queryClient.setQueryData<DesignResType | undefined>(['design',designId], old => ({
        ...old!,
        isDesignerFollowed: !old?.isDesignerFollowed!,
      }));
    }  
      return { prev };
    },
    onError: (err, id, context) => {
      // rollback
      queryClient.setQueryData(['design',designId], context?.prev);
    },
    onSettled: (id) => {
      queryClient.invalidateQueries({ queryKey: ['design', designId] });
    },
  });
};


// export const useProducts = (params?: any) => {
//   return useQuery({
//     queryKey: ['products', params],
//     queryFn: () => productApi.getProducts(params),
//   });
// };

export const useMyProducts = (params?: any) => {
  return useQuery({
    queryKey: ['myProducts', params],
    queryFn: () => productsAction.getMyProducts(params),
  });
};

export const useUserProducts = (userId: string, params?: any) => {
  return useQuery({
    queryKey: ['userProducts',userId, params],
    queryFn: () => productsAction.getUserProducts(userId, params),
  });
};

// export const useProduct = (id: string) => {
//   return useQuery({
//     queryKey: ['product', id],
//     queryFn: () => productApi.getProductById(id),
//     enabled: !!id,
//   });
// };

// export const useCreateProduct = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: productApi.createProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['myProducts'] });
//       toast.success('Product created successfully');
//     },
//     onError: () => {
//       toast.error('Failed to create product');
//     },
//   });
// };

// export const useUpdateProduct = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: any }) => 
//       productApi.updateProduct(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['myProducts'] });
//       queryClient.invalidateQueries({ queryKey: ['product'] });
//       toast.success('Product updated successfully');
//     },
//     onError: () => {
//       toast.error('Failed to update product');
//     },
//   });
// };

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productsAction.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
      toast.success('Product deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete product');
    },
  });
};

// export const useLikeProduct = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: productApi.likeProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['product'] });
//       queryClient.invalidateQueries({ queryKey: ['likedProducts'] });
//     },
//   });
// };

// export const useLikedProducts = () => {
//   return useQuery({
//     queryKey: ['likedProducts'],
//     queryFn: productApi.getLikedProducts,
//   });
// };

// export const useFollowSeller = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: productApi.followSeller,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['product'] });
//       queryClient.invalidateQueries({ queryKey: ['followedSellers'] });
//     },
//   });
// };

// export const useFollowedSellers = () => {
//   return useQuery({
//     queryKey: ['followedSellers'],
//     queryFn: productApi.getFollowedSellers,
//   });
// };

export const useMyCollections = () => {
  return useQuery({
    queryKey: ['myCollections'],
    queryFn: productsAction.getMyCollections,
  });
};

export const useCollection = (id: string) => {
  return useQuery({
    queryKey: ['collection', id],
    queryFn: () => productsAction.getCollectionById(id),
    enabled: !!id,
  });
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productsAction.createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myCollections'] });
      toast.success('Collection created successfully');
    },
    onError: () => {
      toast.error('Failed to create collection');
    },
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      productsAction.updateCollection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myCollections'] });
      toast.success('Collection updated successfully');
    },
    onError: () => {
      toast.error('Failed to update collection');
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productsAction.deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myCollections'] });
      toast.success('Collection deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete collection');
    },
  });
};
