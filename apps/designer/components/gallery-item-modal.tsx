'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { X, Heart, Bookmark, Share2, Download, Info, ShoppingCart, Link } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { useCategories, useFollowDesignerMutation, useLikeDesignMutation, useProduct } from '@/queries/useProduct';
import { useAddToCart } from '@/queries/useCart';
import { useOnScreen } from '@/hooks/useOnScreen';
import { ProductCommentTabs } from './Comment';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@workspace/ui/lib/utils';
import { VirtualTryOnModal } from './VirtualTryOn';
import { copyToClipboard, formatCurrency } from '@/lib/utils';
import { LikeListModal } from './LikeModal';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Skeleton } from '@workspace/ui/components/skeleton';

export function GalleryItemModal({ id }: { id: string }) {
  const [mainActionElement, setMainActionElement] = useState<HTMLButtonElement | null>(null);
  const isMainVisible = useOnScreen(mainActionElement);
const [isLikeListOpen, setIsLikeListOpen] = useState(false);
  const { data: design, isLoading: designLoading } = useProduct(id);
  const { data: categories } = useCategories();
  const authStore = useAuthStore();
  const router = useRouter();

  // 2. Tính toán slug dựa trên design.categoryId
  const categorySlug = useMemo(() => {
    if (!design || !categories) return "";
    
    const foundCategory = categories.find((cat: any) => {
        if (cat._id === design.categoryId) return true;
        return false;
    });

    return foundCategory ? foundCategory.slug : "";
  }, [design, categories]);

  const likeMutation = useLikeDesignMutation();
  const followMutation = useFollowDesignerMutation(id);
  const addToCartMutation = useAddToCart();
  const { execute } = useAuth(); 

  const handleLike = async () => {
    execute(async () => {
      if (likeMutation.isPending) return;
      try {
        await likeMutation.mutateAsync(id);
      } catch (err) {
        console.error('Like error:', err);
      }
    });
  };

  const handleFollow = async () => {
    execute(async () => {
      if (followMutation.isPending) return;
      try {
        await followMutation.mutateAsync(design?.designerId || "");
      } catch (err) {
        console.error('Follow error:', err);
      }
    });
  };

  const onAddToCart = async (productId: string) => {
    execute(async () => {
      if (addToCartMutation.isPending) return;
      try {
        await addToCartMutation.mutateAsync({ productId });
      } catch (err) {
        console.error('Add to cart error:', err);
      }
    });
  };

  useEffect(()=>{
    if(design?.type && design.type === "auction")
      router.replace(`/auction/detail/${id}`)
  },[design])

  if (designLoading || !design) return (
    <div className="text-white p-10">
    <GalleryItemSkeleton />
  </div>
  );
  

  return (
    // CHANGE 1: Sử dụng container và mx-auto để căn giữa, px-4 cho mobile
    <div className="w-full mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* --- LEFT & CENTER CONTENT (Chiếm 8/10 trên Desktop, 100% trên Mobile) --- */}
      <div className='grid grid-cols-1 lg:grid-cols-8 lg:col-span-10 gap-1'>
        
        {/* --- COL 1: Main Image --- */}
        <div className="lg:col-span-5 relative flex flex-col">
          <img
            src={design.imageUrls[0]}
            alt={design.title}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* --- COL 2: Product Info --- */}
        <div className="lg:col-span-3 h-full ">
          {/* CHANGE 2: Bỏ min-h-full, điều chỉnh padding và background */}
          <div className="flex flex-col min-h-full  gap-6 justify-between p-6 bg-zinc-900 rounded-xl">
            
            <div className="space-y-16">
              {/* Stats Badge */}
              <div className="flex justify-start gap-3 items-center">
                <Badge  
                  className="px-3 py-1.5 gap-2 bg-gray-700 text-white border border-white/10 hover:text-zinc-400 cursor-pointer"
                >
                  <Heart                   
                  onClick={handleLike}
 size={16} fill={design.isLiked ? "white" : "transparent"} />
                  <span 
           onClick={(e) => {
               setIsLikeListOpen(true);
            }}
            className="text-sm cursor-pointer hover:underline"
          >{design.likeCount.toLocaleString()}</span>
                </Badge>
                <p className="text-white/60 text-sm">
                  {design.viewCount.toLocaleString()} views
                </p>
              </div>

              {/* Title & Designer Info */}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {design.title}
                </h2>

                <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                  <Avatar className="w-10 h-10 md:w-12 md:h-12">
                    <AvatarImage src={design.designerProfile.avatarUrl} />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold">
                      {design.designerId.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm md:text-base line-clamp-1">
                      {design.designerProfile.name}
                    </p>
                  </div>
                  {authStore.user?.id !== design.designerId &&

                  <Button
                    onClick={handleFollow}
                    size="sm"
                    variant="secondary"
                    className="border-white/20 text-white hover:bg-white/10 text-xs md:text-sm h-8"
                  >
                    {design.isDesignerFollowed ? "Following" : "Follow"}
                  </Button>
                  }
                </div>
              </div>
            </div>

            {/* Main Action Section (Mobile & Desktop Inline) */}
            <div className="space-y-4 pt-4">
                <div className="flex flex-col gap-4">
                  {design.type === "fixed" && authStore.user?.id !== design.designerId && (
                  <div className='flex flex-col gap-4'>
                     <p className="text-white text-2xl font-bold">
                      {formatCurrency(design.price)}
                    </p>
                    <Button
                      ref={setMainActionElement}
                      onClick={() => onAddToCart(id)}
                      className="w-full bg-white text-black hover:bg-white/90 font-bold py-6 rounded-full text-base transition-transform active:scale-95"
                    >
                    ADD TO CART
                    </Button>
                  </div>
                 )}

                   <div className="pt-2">
                    <VirtualTryOnModal 
                      productImages={design.imageUrls} 
                      productTitle={design.title}
                      categorySlug={categorySlug}
                    />
                  </div>
                </div>
              
            </div>

          </div>
        </div>

        {/* --- Description & More Images --- */}
        {/* CHANGE 3: Responsive padding: px-0 trên mobile, tăng dần lên */}
        <div className="lg:col-span-8 bg-zinc-950 flex flex-col py-8 px-0 md:px-8 lg:px-20 gap-6">
          <p className="text-white/80 whitespace-pre-wrap text-sm md:text-base leading-relaxed">
            {design.description}
          </p>

          {/* Gallery Images Loop */}
          <div className="space-y-6">
            {design.imageUrls.map((image, idx) => (
              <div key={idx} className="relative">
                <img
                  src={image}
                  alt={`${design.title} - view ${idx + 1}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- Comments Section --- */}
        {/* CHANGE 4: Tương tự description, điều chỉnh padding */}
        <div className="lg:col-span-8 bg-zinc-900 flex flex-col py-8 px-4 md:px-8 lg:px-20 rounded-xl gap-4">
          <ProductCommentTabs
            productId={id}
            commentCount={design.commentCount}
            ratingCount={design.ratingCount}
            averageRating={design.averageRating}
            type={design.type}
          />
        </div>

      </div>

      {/* --- COL 3: Sticky Sidebar (Desktop Only) --- */}
      {/* CHANGE 5: hidden trên mobile/tablet, chỉ hiện (lg:block) trên màn hình lớn */}
      <div className="hidden lg:block relative lg:col-span-2">
        <div className="sticky top-24 z-10 flex flex-col items-center ml-4">
          
          {/* Sticky Cart Box */}
          {design.type === "fixed" && authStore.user?.id !== design.designerId && (
            <div
              className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out w-full flex justify-end",
                isMainVisible
                  ? "max-h-0 opacity-0 mb-0 pointer-events-none translate-y-4"
                  : "max-h-[200px] opacity-100 mb-8 translate-y-0"
              )}
            >
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl flex flex-col gap-3 w-full">
                <p className="text-white text-xl font-bold text-center">
                  $ {design.price.toFixed(2)}
                </p>
                <Button
                  onClick={() => onAddToCart(id)}
                  className="w-full bg-white text-black hover:bg-white/90 font-bold rounded-full"
                >
                  ADD TO CART
                </Button>
              </div>
            </div>
          )}

          {/* Sidebar Action Icons */}
          <div className="flex flex-col gap-6 items-center bg-zinc-900/50 p-4 rounded-full backdrop-blur-sm border border-white/5">
            {/* Like */}
            <div className="flex flex-col items-center gap-1 group cursor-pointer" onClick={handleLike}>
              <div className={cn(
                "p-3 rounded-full transition-all duration-200",
                design.isLiked 
                  ? "bg-red-500/20 text-red-500" 
                  : "bg-zinc-800 text-white group-hover:bg-zinc-700"
              )}>
                <Heart size={20} className={cn(design.isLiked && "fill-current")} />
              </div>
              <span className="text-[10px] text-white/60 uppercase font-bold">Like</span>
            </div>

            {/* Creator */}
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <Avatar className="w-10 h-10 border-2 border-transparent group-hover:border-white/50 transition-all">
                <AvatarImage src={design.designerProfile.avatarUrl} />
                <AvatarFallback className="bg-blue-600 text-white">{design.designerId.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-[10px] text-white/60 uppercase font-bold">Creator</span>
            </div>

            {/* Share */}
            <div className="flex flex-col items-center gap-1 group cursor-pointer" onClick={() => {copyToClipboard()}}>
              <div className="p-3 bg-zinc-800 text-white rounded-full group-hover:bg-zinc-700 transition-all">
                <Share2 size={20} />
              </div>
              <span className="text-[10px] text-white/60 uppercase font-bold">Share</span>
            </div>
          </div>

        </div>
      </div>
<LikeListModal 
        isOpen={isLikeListOpen} 
        onClose={() => setIsLikeListOpen(false)} 
        designId={id} 
      />
    </div>
  );
}

export function GalleryItemSkeleton() {
  return (
    <div className="w-full mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* --- LEFT & CENTER CONTENT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-8 lg:col-span-10 gap-1">
        
        {/* COL 1: Main Image Skeleton */}
        <div className="lg:col-span-5 relative flex flex-col">
          <Skeleton className="w-full aspect-[4/5] rounded-lg" />
        </div>

        {/* COL 2: Product Info Skeleton */}
        <div className="lg:col-span-3 h-full">
          <div className="flex flex-col min-h-full gap-6 p-6 bg-zinc-900/50 rounded-xl">
            <div className="space-y-16">
              {/* Stats Badge */}
              <div className="flex justify-start gap-3 items-center">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-5 w-16" />
              </div>

              {/* Title & Designer Info */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-2/3" />
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                  <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="space-y-4 pt-4">
              <div className="space-y-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-14 w-full rounded-full" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Description & More Images Skeleton */}
        <div className="lg:col-span-8 flex flex-col py-8 px-0 md:px-8 lg:px-20 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="space-y-6">
            <Skeleton className="w-full aspect-video rounded-lg" />
            <Skeleton className="w-full aspect-video rounded-lg" />
          </div>
        </div>

        {/* Comments Skeleton */}
        <div className="lg:col-span-8 bg-zinc-900/30 flex flex-col py-8 px-4 md:px-8 lg:px-20 rounded-xl gap-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <div className="space-y-4">
             <div className="flex gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-20 flex-1 rounded-lg" />
             </div>
          </div>
        </div>
      </div>

      {/* --- COL 3: Sticky Sidebar Skeleton (Desktop Only) --- */}
      <div className="hidden lg:block lg:col-span-2">
        <div className="sticky top-24 flex flex-col items-center ml-4 space-y-8">
          {/* Icons stack */}
          <div className="flex flex-col gap-6 items-center bg-zinc-900/50 p-4 rounded-full border border-white/5">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 'use client';

// // --- Imports ---
// import { useRef, useState } from 'react';
// import { X, Heart, Bookmark, Share2, Download, Info, ShoppingCart, Link } from 'lucide-react';

// // UI Components
// import { Button } from '@workspace/ui/components/button';
// import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
// import { Badge } from '@workspace/ui/components/badge';

// // Hooks & Queries
// import { useFollowDesignerMutation, useLikeDesignMutation, useProduct } from '@/queries/useProduct';
// import { useAddToCart } from '@/queries/useCart';
// import { useOnScreen } from '@/hooks/useOnScreen';
// import { ProductCommentTabs } from './Comment';
// import { useAuth } from '@/hooks/useAuth';
// import { cn } from '@workspace/ui/lib/utils';

// // --- Interfaces ---
// // (Giữ lại nếu bạn cần dùng ở nơi khác, nếu không có thể xóa GalleryItemModalProps)
// interface GalleryItem {
//   id: string;
//   title: string;
//   image: string;
//   creator: string;
//   likes: number;
//   views: number;
//   category: string;
// }

// interface GalleryItemModalProps {
//   item: GalleryItem;
//   onClose: () => void;
// }

// // --- Main Component ---
// export function GalleryItemModal({ id }: { id: string }) {
//   // 1. Setup State & Refs
//   const [mainActionElement, setMainActionElement] = useState<HTMLButtonElement | null>(null);
  
//   // Hook kiểm tra xem phần action chính có đang hiển thị trên màn hình không
//   // Dùng để toggle trạng thái hiển thị của thanh sidebar trôi nổi (sticky)
//   const isMainVisible = useOnScreen(mainActionElement);

//   // 2. Data & Mutations
//   const { data: design, isLoading: designLoading } = useProduct(id);
//   const likeMutation = useLikeDesignMutation();
//   const followMutation = useFollowDesignerMutation(id);
//   const addToCartMutation = useAddToCart();
//   const {execute} = useAuth();

//   // 3. Handlers
//   const handleLike = async () => {
//     execute( async () => {
//       if (likeMutation.isPending) return;
//     try {
//       const result = await likeMutation.mutateAsync(id);
//       console.log('Like result:', result);
//     } catch (err) {
//       console.error('Like error:', err);
//     }
//     })
    
//   };

//   const handleFollow = async () => {
//     execute( async() => {
//       if (followMutation.isPending) return;
//     try {
//       const result = await followMutation.mutateAsync(design?.designerId || "");
//       console.log('Follow result:', result);
//     } catch (err) {
//       console.error('Follow error:', err);
//     }
//     })
    
//   };

//   const onAddToCart = async (productId: string) => {

//     execute( async() => {
//      if (addToCartMutation.isPending) return;
//     try {
//       const result = await addToCartMutation.mutateAsync({ productId });
//       console.log('Add to cart result:', result);
//     } catch (err) {
//       console.error('Add to cart error:', err);
//     }
//     })
    
//   };

//   // 4. Render Loading / Error States
//   if (designLoading) return <>Loading ...</>;
//   if (!design) return <>Check your connection</>;

//   // 5. Main Render
//   return (
//     <div className="top-6 w-full max-w-screen mx-10 grid grid-cols-1 lg:grid-cols-10">
      

//       <div className='grid grid-cols-1 lg:grid-cols-8 lg:col-span-8'>
//         {/* --- COL 1: Main Image (Left Side) --- */}
//       <div className=" lg:col-span-5 relative flex flex-col origin-top">
//         <img
//           src={design.imageUrls[0]}
//           alt={design.title}
//           className="w-full h-auto object-cover"
//         />
//       </div>

//       {/* --- COL 2: Product Info (Right Side) --- */}
//       <div className="lg:col-span-3 h-full ">
//         <div className="flex flex-col min-h-full gap-6 justify-between px-8 bg-zinc-900">
          
//           <div className="space-y-24 mt-10">
//             {/* Stats Badge */}
//             <div className="flex justify-start gap-3">
//               <Badge
//               onClick={handleLike} 
//               className={`px-3 gap-2 bg-gray-700 text-white border border-white/10 hover:text-zinc-400
//               `}>
//                 <Heart fill={design.isLiked ? "white" : "transparent"}/>
//                 <p className="">
//                   {design.likeCount.toLocaleString()}
//                 </p>
//               </Badge>
//               <p className="text-white text-sm">
//                 {`${design.viewCount.toLocaleString()} views`}
//               </p>
//             </div>

//             {/* Title & Designer Info */}
//             <div className="space-y-4">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h2 className="text-2xl font-bold text-white mb-2">
//                     {design.title}
//                   </h2>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
//                 <Avatar className="w-12 h-12">
//                   <AvatarImage src={design.designerProfile.avatarUrl} />
//                   <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold">
//                     {design.designerId.charAt(0)}
//                   </AvatarFallback>
//                 </Avatar>
//                 <p className="text-white font-medium">{design.designerProfile.name}</p>
//                 <Button
//                   onClick={handleFollow}
//                   size="sm"
//                   variant={"secondary"}
//                   className="border-white/20 text-white hover:bg-white/10"
//                 >
//                   {design.isDesignerFollowed ? "Following" : "Follow"}
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Main Action Section (Price & Add to Cart) - Static Position */}
//           {/* Ref được gắn ở đây để detect scroll */}
//           <div className="space-y-4">
//             <div>
//               {design.type === "fixed" && (
//                 <div className="flex flex-col gap-4 mb-6">
//                   <p className="text-white text-2xl font-bold mb-4">
//                     $ {design.price.toFixed(2)}
//                   </p>
//                   <Button  ref={setMainActionElement}
//                     onClick={() => onAddToCart(id)}
//                     className="w-full bg-white text-black hover:bg-white/90 font-semibold py-6 rounded-full"
//                   >
//                     ADD TO CART
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
        
//       </div>
      
//        {/* --- Description & More Images Section --- */}
//       <div className="min-h-screen lg:col-span-8 bg-zinc-950 flex flex-col py-10 px-32 gap-4">
//         <p className="text-white whitespace-break-spaces">
//           {design.description}
//         </p>
        
//         {/* Gallery Images Loop */}
//         {design.imageUrls.map((image, idx) => (
//           <div key={idx} className="relative">
//             <img
//               src={image} // Đã sửa từ design.imageUrls[0] thành image hiện tại
//               alt={`${design.title} - view ${idx + 1}`}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       <div className="min-h-screen lg:col-span-8 bg-zinc-900 flex flex-col py-10 px-32 gap-4">
//         <ProductCommentTabs
//           productId={id}
//           commentCount={design.commentCount}
//           ratingCount={design.ratingCount}
//           averageRating={design.averageRating}
//           type={design.type}
//         />
//       </div>
      
//       </div>
      

//       {/* --- COL 3: Sticky Sidebar (Floating Actions) --- */}
//       <div className="relative lg:col-span-2 hidden lg:visible">
//         <div className="sticky top-20 z-10">
          
//           {/* 1. Xóa 'gap-8' ở đây để tránh khoảng trắng thừa khi box ẩn đi */}
//           <div className="flex flex-col ml-8">
            
//             {/* Sticky Cart Box */}
//             {design.type === "fixed" && (
//               <div
//                 className={`
//                   overflow-hidden transition-all duration-500 ease-in-out
//                   ${isMainVisible
//                     ? "max-h-0 opacity-0 mb-0 pointer-events-none translate-y-4" // Ẩn: Chiều cao = 0, Margin = 0 -> Button dưới trồi lên
//                     : "max-h-[200px] opacity-100 mb-8 translate-y-0"             // Hiện: Mở chiều cao, Thêm margin dưới -> Đẩy Button xuống
//                   }
//                 `}
//               >
//                 {/* Nội dung Box giữ nguyên, bọc trong wrapper animation */}
//                 <div className="p-4 bg-gray-950 border border-gray-800 rounded-xl shadow-2xl flex flex-col gap-3 items-end w-fit">
//                   <div className="flex flex-col gap-4 px-2">
//                     <p className="text-white text-2xl font-bold">
//                       $ {design.price.toFixed(2)}
//                     </p>
//                     <Button
//                       onClick={() => onAddToCart(id)}
//                       className="w-full bg-white text-black hover:bg-white/90 font-semibold rounded-full"
//                     >
//                       ADD TO CART
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Sidebar Icon Buttons (Like, Creator, Share) */}
//             {/* Phần này sẽ tự động trồi lên/sụt xuống theo box trên */}
//             <div className="flex flex-col w-fit items-center ml-2 gap-4">
              
//               {/* Like Button */}
//               <div className="flex flex-col items-center">
//                 <Button
//                   onClick={handleLike}
//                   className={`rounded-full w-10 h-auto aspect-square ${
//                     design.isLiked
//                      ? "bg-red-500/20 text-red-500 border-red-500/50 hover:bg-red-500/30" // Style khi đã Like
//                     : "bg-black/40 text-white hover:bg-black/60" // Style mặc định
//                   }`}
//                 >
//                   <Heart size={14} className={cn(design.isLiked && "fill-current")}/>
//                 </Button>
//                 <span className="text-white">Like</span>
//               </div>

//               {/* Creator Button */}
//               <div className="flex flex-col items-center">
//                 <Button size="icon-lg" className="rounded-full">
//                   <Avatar className="w-10 h-10">
//                     <AvatarImage src={design.designerProfile.avatarUrl} />
//                     <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold">
//                       {design.designerId.charAt(0)}
//                     </AvatarFallback>
//                   </Avatar>
//                 </Button>
//                 <span className="text-white">Creator</span>
//               </div>

//               {/* Share Button */}
//               <div className="flex flex-col items-center">
//                 <Button className="rounded-full w-10 aspect-square h-auto">
//                   <Share2 />
//                 </Button>
//                 <span className="text-white">Share</span>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>

     

//     </div>
//   );
// }



// // 'use client';

// // import { X, Heart, Bookmark, Share2, Download, Info, ShoppingCart, Link } from 'lucide-react';
// // import { Button } from '@workspace/ui/components/button';
// // import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
// // import { useRef, useState } from 'react';
// // import { useFollowDesignerMutation, useLikeDesignMutation, useProduct } from '@/queries/useProduct';
// // import { useAddToCart } from '@/queries/useCart';
// // import { Badge } from '@workspace/ui/components/badge';
// // import { useOnScreen } from '@/hooks/useOnScreen';

// // interface GalleryItem {
// //   id: string;
// //   title: string;
// //   image: string;
// //   creator: string;
// //   likes: number;
// //   views: number;
// //   category: string;
// // }

// // interface GalleryItemModalProps {
// //   item: GalleryItem;
// //   onClose: () => void;
// // }

// // export  function GalleryItemModal({id} : {id: string}) {
// //   const [isLiked, setIsLiked] = useState(false);
// //   const [isBookmarked, setIsBookmarked] = useState(false);
// //   // const [likeCount, setLikeCount] = useState(item.likes);

// // const [mainActionElement, setMainActionElement] = useState<HTMLDivElement | null>(null);
// // const isMainVisible = useOnScreen(mainActionElement);
// //   const likeMutation = useLikeDesignMutation(id);
// //   const followMutation = useFollowDesignerMutation();
// //   const addToCartMutation = useAddToCart();

// //   const {data: design, isLoading: designLoading} = useProduct(id);

// //   const handleLike = async () => {
// //     if(likeMutation.isPending) return;

// //     try{
// //       const result = await likeMutation.mutateAsync(id);
// //       console.log(result);
// //     }catch(err) {
// //       console.log(err);
// //     }
// //   };

// //   const handleFollow = async () => {
// //     if(likeMutation.isPending) return;

// //     try{
// //       const result = await followMutation.mutateAsync(design?.designerId || "");
// //       console.log(result);
// //     }catch(err) {
// //       console.log(err);
// //     }
// //   };

// //   const onAddToCart = async (id: string) => {
// //     if(addToCartMutation.isPending) return;
// //      try{
// //       const result = await addToCartMutation.mutateAsync({productId: id});
// //       console.log(result);
// //     }catch(err) {
// //       console.log(err);
// //     }
// //   }  

// //   if(designLoading)
// //     return (<>
// //     Loading ...</>)

// //   if(!design)
// //      return (<>
// //     Check your connection</>)

// //   return (
// //     // <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 overflow-auto">
// //     //   <button
// //     //     // onClick={onClose}
// //     //     className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
// //     //   >
// //     //     <X className="w-6 h-6" />
// //     //   </button>
    
// //       <div className=" top-6 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-10  " >
// //         <div className="lg:col-span-5 relative flex flex-col origin-top">
// //             {/* <div className=" w-full rounded-lg "> */}
// //               <img
// //                 src={design.imageUrls[0]}
// //                 alt={design.title}
// //                 className="w-full h-auto object-cover " 
// //               />
// //             {/* </div> */}
// //           </div>

// //         <div className='grid  lg:col-span-4 '>
// //         <div className="flex flex-col  gap-6 justify-between px-8 bg-zinc-900">
// //           <div className="space-y-24 mt-10">
// //             <div className='flex justify-start gap-3'>
// //               <Badge className=' px-3 gap-2 bg-gray-700'>
// //                 <Heart />
// //                  <p className="text-white">
// //                   {design.likeCount.toLocaleString()}
// //                 </p>
// //               </Badge>
// //               <p className="text-white text-sm">{`${design.viewCount.toLocaleString()} views`}</p>
             
// //             </div>
// //             <div className='space-y-4'>
// //               <div className="flex items-start justify-between">
// //               <div>
// //                 <h2 className="text-2xl font-bold text-white mb-2">
// //                   {design.title}
// //                 </h2>
// //                 {/* <p className="text-white/60">{design.categoryId}</p> */}
// //               </div>
// //             </div>

// //             <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
// //               <Avatar className="w-12 h-12">
// //                 <AvatarImage src={design.designerProfile.avatarUrl}/>
// //                 <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold">
// //                   {design.designerId.charAt(0)}
// //                 </AvatarFallback>
// //               </Avatar>
// //                 <p className="text-white font-medium">{design.designerProfile.name}</p>
// //               <Button
// //                 onClick={handleFollow}
// //                 size="sm"
// //                 className="border-white/20 text-white hover:bg-white/10"
// //               >
// //                 {design.isDesignerFollowed ? "Following" : "Follow"}
// //               </Button>
// //             </div>

// //             </div>
            
// //             {/* <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800"> */}
// //               {/* <div className="text-center">
// //                 <p className="text-2xl font-bold text-white">
// //                   {design.likeCount.toLocaleString()}
// //                 </p>
// //                 <p className="text-white/60 text-xs">Likes</p>
// //               </div>
// //               <div className="text-center">
// //                 <p className="text-2xl font-bold text-white">
// //                   {design.viewCount.toLocaleString()}
// //                 </p>
// //                 <p className="text-white/60 text-xs">Views</p>
// //               </div> */}
// //               {/* <div className="text-center">
// //                 <p className="text-2xl font-bold text-white">28</p>
// //                 <p className="text-white/60 text-xs">Downloads</p>
// //               </div> */}
// //             {/* </div> */}

// //             {/* <div className="flex gap-2 pt-4">
// //               <Button
// //                 onClick={handleLike}
// //                 className={`flex-1 flex items-center justify-center gap-2 py-2  transition-colors ${
// //                   design.isLiked
// //                     ? 'bg-red-500/20 text-red-500 border border-red-500/30'
// //                     : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
// //                 }`}
// //               >
// //                 <Heart className={`w-4 h-4 ${design.isLiked ? 'fill-current' : ''}`} />
// //                 Like
// //               </Button>

// //               <Button
// //                 onClick={() => setIsBookmarked(!isBookmarked)}
// //                 className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
// //                   isBookmarked
// //                     ? 'bg-cyan-500/20 text-cyan-500 border border-cyan-500/30'
// //                     : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
// //                 }`}
// //               >
// //                 <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
// //                 Save
// //               </Button>

// //               <Button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors">
// //                 <Share2 className="w-4 h-4" />
// //                 Share
// //               </Button>
// //             </div> */}

                 
// //             {/* <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-black font-semibold transition-colors">
// //               <Download className="w-4 h-4" />
// //               Download
// //             </button> */}

// //             {/* <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
// //               <div className="flex items-center justify-between">
// //                 <span className="text-white/60 text-sm">License</span>
// //                 <span className="text-white text-sm">Standard</span>
// //               </div>
// //               <div className="flex items-center justify-between">
// //                 <span className="text-white/60 text-sm">Resolution</span>
// //                 <span className="text-white text-sm">4K</span>
// //               </div>
// //               <div className="flex items-center justify-between">
// //                 <span className="text-white/60 text-sm">Format</span>
// //                 <span className="text-white text-sm">PNG</span>
// //               </div>
// //               <button className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400 text-sm pt-2 border-t border-white/10">
// //                 <Info className="w-4 h-4" />
// //                 More details
// //               </button>
// //             </div> */}
// //           </div>
// //           <div 
// // ref={setMainActionElement}          
// // className="space-y-4 " >
// //                    <div>
// //                     {design.type === "fixed" && (
// //                     <div className="flex flex-col  gap-4 mb-6">
// //                   <p className="text-white text-2xl font-bold mb-4">
// //                        $ {design.price.toFixed(2)}
// //                      </p> 
// //                   <Button 
// //                   onClick={() => {onAddToCart(id)}}
// //                   className="w-full bg-white text-black hover:bg-white/90 font-semibold py-6 rounded-full"
// //                     >
// //                     ADD TO CART
// //                   </Button>
// //                     </div> 
// //                     )}
                     

                      
// //                  </div>
// //         </div>
// //       </div>
      
// //         </div>
// //         <div className={`relative lg:col-span-1`}>

// //         <div className=' fixed top-20 right-10 z-10 '>

// //           <div className=' flex flex-col gap-8 top-0 left-0'>
// //             {design.type === "fixed" && (
// // <div
// //         className={`
// //            p-4
// //           bg-gray-950 border border-gray-800 rounded-xl shadow-2xl
// //           flex flex-col gap-3 items-end
// //           transition-all duration-300 ease-in-out transform

// //           ${isMainVisible
// //             ? "translate-y-10 opacity-0 pointer-events-none"
// //             : "translate-y-0 opacity-100"
// //           }
// //         `}
// //       >        

         
// //             <div className=" flex flex-col gap-4 px-2">
                   
// //                     <p className="text-white text-2xl font-bold ">
// //                        $ {design.price.toFixed(2)}
// //                      </p> 
                    
// //              <Button 
// //              onClick={() => {onAddToCart(id)}}
// //                   className="w-full bg-white text-black hover:bg-white/90 font-semibold  rounded-full"
// //                     >
// //                     ADD TO CART
// //                   </Button>
// //         </div>
         
        
// //       </div>
// //             )}
        
// //           <div className='flex flex-col w-fit items-center ml-2 gap-4 '>
// //             <div className='flex flex-col items-center '>
// //                 <Button 
// //                 onClick={handleLike}
// //                   className= {`rounded-full w-10 h-auto aspect-square ${
// //                   design.isLiked
// //                     ? 'bg-red-500/20 text-red-500 border border-red-500/30'
// //                     : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
// //                 }`}>
// //               <Heart  />
              
// //             </Button>
// //             <span className='text-white'>Like</span>
// //             </div>

// //              <div className='flex flex-col items-center'>
// //                 <Button size={"icon-lg"} className='rounded-full'>
// //              <Avatar className="w-10 h-10">
// //                 <AvatarImage src={design.designerProfile.avatarUrl}/>
// //                 <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold">
// //                   {design.designerId.charAt(0)}
// //                 </AvatarFallback>
// //               </Avatar>
              
// //             </Button>
// //             <span className='text-white'>Creator</span>
// //             </div>

// //             <div className='flex flex-col items-center'>
// //                 <Button className='rounded-full w-10 aspect-square h-auto'>
// //               <Share2 />
              
// //             </Button>
// //             <span className='text-white'>Share</span>
// //             </div>
            
            
// //           </div>
// //           </div>
          
           
// //         </div>
                        
// //           </div>
// //                     <div className='min-h-screen lg:col-span-9 bg-zinc-950 flex flex-col py-10 px-32 gap-4 '>
// //                       <p className='text-white whitespace-break-spaces '>
// //                         {design.description}
// //                       </p>
// //                       {design.imageUrls.map((image, idx) => (
// //                           <div key={idx} className="relative ">
// //             {/* <div className=" w-full rounded-lg "> */}
// //               <img
// //                 src={design.imageUrls[0]}
// //                 alt={design.title}
// //                 className="w-full h-auto object-cover " 
// //               />
// //             {/* </div> */}
// //           </div>
// //                       ))}
// //                     </div>

// //      </div>
// //   );
// // }
