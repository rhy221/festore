import productsAction from "@/api/products.api"
import { CategoryType, CommentType, DesignResType, GetGalleryItemsResType, GetStoreItemsResType } from "@/schema/product.schema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"


export const useProducts = () =>{
    return useQuery<DesignResType[]>({
        queryKey: ["designs"],
        queryFn: productsAction.get,
        gcTime: 0,
    })
}

export const useProduct = (id: string) =>{
    return useQuery<DesignResType>({
        queryKey: ["design"],
        queryFn: () => productsAction.getOne(id),
    })
}

export const useComments = (id: string) =>{
    return useQuery<CommentType[]>({
        queryKey: ["comments"],
        queryFn: () => productsAction.getOneComments(id),
        gcTime: 0,
    })
}

export const useCategories = () =>{
    return useQuery<CategoryType[]>({
        queryKey: ["categories"],
        queryFn: productsAction.getCategories,
        gcTime: 0,
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
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['design'] });
    },
    })
}


export const useGetGalleryItems = () =>{
    return useQuery<GetGalleryItemsResType>({
        queryKey: ["gallery"],
        queryFn: productsAction.getGalleryItems,
        gcTime: 0,
    })
}

export const useGetStoreItems = () =>{
    return useQuery<GetStoreItemsResType>({
        queryKey: ["store"],
        queryFn: productsAction.getStoreItems,
        gcTime: 0,
    })
}

export const useLikeDesignMutation = (designId: string) => {
const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsAction.likeDesign,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['design'] });

      const prev = queryClient.getQueryData(['design']);

      // Optimistic update
      queryClient.setQueryData<DesignResType | undefined>(['design'], old => ({
        ...old!,
        isLiked: !old?.isLiked!,
        likeCount: old?.isLiked ? old.likeCount - 1 : old!.likeCount + 1,
      }));

      return { prev };
    },
    onError: (err, vars, context) => {
      // rollback
      queryClient.setQueryData(['design'], context?.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['design'] });
    },
  });
};


export const useFollowDesignerMutation = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsAction.followDesigner,
    onMutate: async () => {

        await queryClient.cancelQueries({ queryKey: ['design'] });

        const prev = queryClient.getQueryData(['design']);

        // Optimistic update
        queryClient.setQueryData<DesignResType | undefined>(['design'], old => ({
        ...old!,
        isDesignerFollowed: !old?.isDesignerFollowed!,
      }));

      return { prev };
    },
    onError: (err, vars, context) => {
      // rollback
      queryClient.setQueryData(['design'], context?.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['design'] });
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
