'use client';

import { X, Heart, Bookmark, Share2, Download, Info, ShoppingCart, Link } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
import { useRef, useState } from 'react';
import { useFollowDesignerMutation, useLikeDesignMutation, useProduct } from '@/queries/useProduct';
import { useAddToCart } from '@/queries/useCart';
import { Badge } from '@workspace/ui/components/badge';
import { useOnScreen } from '@/hooks/useOnScreen';

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  creator: string;
  likes: number;
  views: number;
  category: string;
}

interface GalleryItemModalProps {
  item: GalleryItem;
  onClose: () => void;
}

export  function GalleryItemModal({id} : {id: string}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  // const [likeCount, setLikeCount] = useState(item.likes);

const [mainActionElement, setMainActionElement] = useState<HTMLDivElement | null>(null);
const isMainVisible = useOnScreen(mainActionElement);
  const likeMutation = useLikeDesignMutation(id);
  const followMutation = useFollowDesignerMutation();
  const addToCartMutation = useAddToCart();

  const {data: design, isLoading: designLoading} = useProduct(id);

  const handleLike = async () => {
    if(likeMutation.isPending) return;

    try{
      const result = await likeMutation.mutateAsync(id);
      console.log(result);
    }catch(err) {
      console.log(err);
    }
  };

  const handleFollow = async () => {
    if(likeMutation.isPending) return;

    try{
      const result = await followMutation.mutateAsync(design?.designerId || "");
      console.log(result);
    }catch(err) {
      console.log(err);
    }
  };

  const onAddToCart = async (id: string) => {
    if(addToCartMutation.isPending) return;
     try{
      const result = await addToCartMutation.mutateAsync({productId: id});
      console.log(result);
    }catch(err) {
      console.log(err);
    }
  }  

  if(designLoading)
    return (<>
    Loading ...</>)

  if(!design)
     return (<>
    Check your connection</>)

  return (
    // <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 overflow-auto">
    //   <button
    //     // onClick={onClose}
    //     className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
    //   >
    //     <X className="w-6 h-6" />
    //   </button>
    
      <div className=" top-6 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-10  " >
        <div className="lg:col-span-5 relative flex flex-col origin-top">
            {/* <div className=" w-full rounded-lg "> */}
              <img
                src={design.imageUrls[0]}
                alt={design.title}
                className="w-full h-auto object-cover " 
              />
            {/* </div> */}
          </div>

        <div className='grid  lg:col-span-4 '>
        <div className="flex flex-col  gap-6 justify-between px-8 bg-zinc-900">
          <div className="space-y-24 mt-10">
            <div className='flex justify-start gap-3'>
              <Badge className=' px-3 gap-2 bg-gray-700'>
                <Heart />
                 <p className="text-white">
                  {design.likeCount.toLocaleString()}
                </p>
              </Badge>
              <p className="text-white text-sm">{`${design.viewCount.toLocaleString()} views`}</p>
             
            </div>
            <div className='space-y-4'>
              <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {design.title}
                </h2>
                {/* <p className="text-white/60">{design.categoryId}</p> */}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
              <Avatar className="w-12 h-12">
                <AvatarImage src={design.designerProfile.avatarUrl}/>
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold">
                  {design.designerId.charAt(0)}
                </AvatarFallback>
              </Avatar>
                <p className="text-white font-medium">{design.designerProfile.name}</p>
              <Button
                onClick={handleFollow}
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                {design.isDesignerFollowed ? "Following" : "Follow"}
              </Button>
            </div>

            </div>
            
            {/* <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800"> */}
              {/* <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {design.likeCount.toLocaleString()}
                </p>
                <p className="text-white/60 text-xs">Likes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {design.viewCount.toLocaleString()}
                </p>
                <p className="text-white/60 text-xs">Views</p>
              </div> */}
              {/* <div className="text-center">
                <p className="text-2xl font-bold text-white">28</p>
                <p className="text-white/60 text-xs">Downloads</p>
              </div> */}
            {/* </div> */}

            {/* <div className="flex gap-2 pt-4">
              <Button
                onClick={handleLike}
                className={`flex-1 flex items-center justify-center gap-2 py-2  transition-colors ${
                  design.isLiked
                    ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${design.isLiked ? 'fill-current' : ''}`} />
                Like
              </Button>

              <Button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'bg-cyan-500/20 text-cyan-500 border border-cyan-500/30'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                Save
              </Button>

              <Button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div> */}

                 
            {/* <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-black font-semibold transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button> */}

            {/* <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">License</span>
                <span className="text-white text-sm">Standard</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Resolution</span>
                <span className="text-white text-sm">4K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Format</span>
                <span className="text-white text-sm">PNG</span>
              </div>
              <button className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400 text-sm pt-2 border-t border-white/10">
                <Info className="w-4 h-4" />
                More details
              </button>
            </div> */}
          </div>
          <div 
ref={setMainActionElement}          
className="space-y-4 " >
                   <div>
                    {design.type === "fixed" && (
                    <div className="flex flex-col  gap-4 mb-6">
                  <p className="text-white text-2xl font-bold mb-4">
                       $ {design.price.toFixed(2)}
                     </p> 
                  <Button 
                  onClick={() => {onAddToCart(id)}}
                  className="w-full bg-white text-black hover:bg-white/90 font-semibold py-6 rounded-full"
                    >
                    ADD TO CART
                  </Button>
                    </div> 
                    )}
                     

                      
                 </div>
        </div>
      </div>
      
        </div>
        <div className={`relative lg:col-span-1`}>

        <div className=' fixed top-20 right-10 z-10 '>

          <div className=' flex flex-col gap-8 top-0 left-0'>
            {design.type === "fixed" && (
<div
        className={`
           p-4
          bg-gray-950 border border-gray-800 rounded-xl shadow-2xl
          flex flex-col gap-3 items-end
          transition-all duration-300 ease-in-out transform

          ${isMainVisible
            ? "translate-y-10 opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100"
          }
        `}
      >        

         
            <div className=" flex flex-col gap-4 px-2">
                   
                    <p className="text-white text-2xl font-bold ">
                       $ {design.price.toFixed(2)}
                     </p> 
                    
             <Button 
             onClick={() => {onAddToCart(id)}}
                  className="w-full bg-white text-black hover:bg-white/90 font-semibold  rounded-full"
                    >
                    ADD TO CART
                  </Button>
        </div>
         
        
      </div>
            )}
        
          <div className='flex flex-col w-fit items-center ml-2 gap-4 '>
            <div className='flex flex-col items-center '>
                <Button 
                onClick={handleLike}
                  className= {`rounded-full w-10 h-auto aspect-square ${
                  design.isLiked
                    ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}>
              <Heart  />
              
            </Button>
            <span className='text-white'>Like</span>
            </div>

             <div className='flex flex-col items-center'>
                <Button size={"icon-lg"} className='rounded-full'>
             <Avatar className="w-10 h-10">
                <AvatarImage src={design.designerProfile.avatarUrl}/>
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold">
                  {design.designerId.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
            </Button>
            <span className='text-white'>Creator</span>
            </div>

            <div className='flex flex-col items-center'>
                <Button className='rounded-full w-10 aspect-square h-auto'>
              <Share2 />
              
            </Button>
            <span className='text-white'>Share</span>
            </div>
            
            
          </div>
          </div>
          
           
        </div>
                        
          </div>
                    <div className='min-h-screen lg:col-span-9 bg-zinc-950 flex flex-col py-10 px-32 gap-4 '>
                      <p className='text-white whitespace-break-spaces '>
                        {design.description}
                      </p>
                      {design.imageUrls.map((image, idx) => (
                          <div key={idx} className="relative ">
            {/* <div className=" w-full rounded-lg "> */}
              <img
                src={design.imageUrls[0]}
                alt={design.title}
                className="w-full h-auto object-cover " 
              />
            {/* </div> */}
          </div>
                      ))}
                    </div>

     </div>
  );
}
