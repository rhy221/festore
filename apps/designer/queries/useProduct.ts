import productsAction from "@/api/products.api"
import { CategoryType, CommentType, DesignResType, GetGalleryItemsResType, GetStoreItemsResType } from "@/schema/product.schema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


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
