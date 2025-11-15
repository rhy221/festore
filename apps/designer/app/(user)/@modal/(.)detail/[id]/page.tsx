'use client';

import { X, Heart, Bookmark, Share2, Info } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Avatar, AvatarFallback } from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { useState } from 'react';
import { Modal } from './modal';

interface ProductModalProps {
  product: any;
  onClose: () => void;
}

const product = 
  
  {
    id: 2,
    name: 'Male Winter Jacket',
    price: 8.0,
    image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg',
    designer: '3dstitch',
    curatorPick: true,
    likes: 38,
    bookmarks: 0,
    views: 157,
  }
;

export default function ProductModal() {
  const [licenseType, setLicenseType] = useState<'basic' | 'extended'>('basic');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    // <Modal>
      <div className=" fixed inset-0 flex flex-col items-center justify-start bg-black/90 z-50 pointer-events-auto overflow-auto ">
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>
        
      <div className="w-full max-w-4/5 h-full max-h-[100vh] flex mt-2">
        <div className='flex flex-1 flex-col'>
          <div className=' w-full h-full max-h-screen flex '>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain"
                />
              </div>

            </div>

            <div className="w-[400px] bg-zinc-950 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <Heart className={`w-5 h-5 ${product.likes ? 'fill-white text-white' : 'text-white'}`} />
                  <span className="text-white">{product.likes || 0}</span>
                  {/* <Bookmark className="w-5 h-5 text-white ml-2" /> */}
                  {/* <span className="text-white">{product.bookmarks || 0}</span> */}
                  <span className="text-white/60 ml-2">{product.views || 0} Views</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* {product.curatorPick && (
                  <Badge className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border-0">
                    Curator's Pick
                  </Badge>
                )} */}

                <div>
                  <h1 className="text-white text-3xl font-bold mb-4">
                    {product.name}
                  </h1>
                
                  <div className="flex items-center gap-3 mb-6">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-white text-black">
                        {product.designer.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium">{product.designer}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto border-white/20 text-white bg-zinc-700 hover:bg-white/10"
                    >
                      FOLLOW
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    {/* <p className="text-white text-4xl font-bold mb-4">
                      $ {product.price.toFixed(2)}
                    </p> */}

                    {/* <div className="flex items-center gap-4 mb-6">
                      <button
                        onClick={() => setLicenseType('basic')}
                        className={`flex items-center gap-2 ${
                          licenseType === 'basic' ? 'text-cyan-400' : 'text-white/60'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            licenseType === 'basic'
                              ? 'border-cyan-400'
                              : 'border-white/60'
                          }`}
                        >
                          {licenseType === 'basic' && (
                            <div className="w-2 h-2 rounded-full bg-cyan-400" />
                          )}
                        </div>
                        Basic
                      </button>
                    
                      <button
                        onClick={() => setLicenseType('extended')}
                        className={`flex items-center gap-2 ${
                          licenseType === 'extended' ? 'text-cyan-400' : 'text-white/60'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            licenseType === 'extended'
                              ? 'border-cyan-400'
                              : 'border-white/60'
                          }`}
                        >
                          {licenseType === 'extended' && (
                            <div className="w-2 h-2 rounded-full bg-cyan-400" />
                          )}
                        </div>
                        Extended
                      </button>
                    
                      <Info className="w-4 h-4 text-white/60" />
                    </div> */}
                  </div>
                    
                  {/* <Button className="w-full bg-white text-black hover:bg-white/90 font-semibold py-6 rounded-full">
                    ADD TO CART
                  </Button> */}
                </div>
              </div>
                  
             
            </div> 
                  
            </div>
            
            <div className='flex flex-col items-center w-full  bg-zinc-800 py-10 px-4 gap-4'>
        <div className='text-white'>
          <p>Description</p>
        </div>
        <div className="relative w-full h-full max-w-3xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="relative w-full h-full max-w-3xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="relative w-full h-full max-w-3xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="relative w-full h-full max-w-3xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain"
            />
          </div>
           <div className="border-t border-zinc-800 p-4 space-y-2">
                <div className="flex items-center justify-around">
                  <button className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-white text-black">
                        C
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">Creator</span>
                  </button>
                  
                  <button className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs">Share</span>
                  </button>
                  
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                      <Bookmark
                        className={`w-5 h-5 ${isBookmarked ? 'fill-white' : ''}`}
                      />
                    </div>
                    <span className="text-xs">Board</span>
                  </button>
                  
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
                    </div>
                    <span className="text-xs">Likes</span>
                  </button>
                </div>
              </div>
              
      </div>
              <div className='flex flex-col items-center w-full  bg-stone-200 py-10 px-4 gap-4'>

                <div>

                </div>
              </div>
        </div>
        
        <div className='flex flex-col w-40 bg-amber-300'></div>
      </div>

      
    </div>
    // </Modal>
  );
}
