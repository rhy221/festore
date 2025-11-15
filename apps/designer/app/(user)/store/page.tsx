
'use client';

import { StorePage } from '@/components/store/store-page';


export default function StorePageRoute() {
  return (
      <StorePage />
  );
}



// 'use client';

// import { useState } from 'react';
// import { ProductModal } from './product-model';
// import { Button } from '@workspace/ui/components/button';
// import { Heart } from 'lucide-react';
// import { Badge } from '@workspace/ui/components/badge';
// import Link from 'next/link';
// import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar';
// import { useRouter } from 'next/navigation';

// const mockProducts = [
//   {
//     id: 1,
//     name: 'S9 Bomber Jacket',
//     price: 20.0,
//     image: 'https://images.pexels.com/photos/1661471/pexels-photo-1661471.jpeg',
//     designer: 'IMISSANAVI',
//   },
//   {
//     id: 2,
//     name: 'Male Winter Jacket',
//     price: 8.0,
//     image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg',
//     designer: '3dstitch',
//     curatorPick: true,
//     likes: 38,
//     bookmarks: 0,
//     views: 157,
//   },
// ];

// export default function ProductGallery() {
//   const [selectedProduct, setSelectedProduct] = useState<any>(null);
//     const router = useRouter();
//   return (
//     <>
//        <div className="relative">
        
//         <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1">
//           {mockProducts.map((product) => (
//             <Link               key={product.id}
//  href={"./detail/1"}>
//                    <div
//               key={product.id}
//               className="group cursor-pointer"
//               onClick={() => {
//                 // setSelectedProduct(product)
//                 // router.push("/detail/1");
//             }}
//             >
//               <div className="aspect-[5/6] bg-zinc-900 rounded-lg overflow-hidden mb-3 relative">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-full object-cover transition-transform group-hover:scale-105 absolute z-0"
//                 />
//                  <div className='w-full h-full absolute flex flex-col justify-between invisible  group-hover:visible z-1 p-4'>
//                     <div className='flex justify-end'>
//                         <Button size={"icon"} variant={"outline"} className='rounded-full'>
//                             <Heart />
//                         </Button>
//                     </div>
//                     <div className='flex flex-col items-center gap-4'>
//                         <h3 className="text-white font-medium text-2xl">{product.name}</h3>
//                          <Badge asChild>
//                             {/* <Link href="/" className='flex'>
//                                 <Avatar>
//                                     <AvatarImage />
//                                     <AvatarFallback>
//                                         Avatar
//                                     </AvatarFallback>
//                                 </Avatar>
//                                 <p className="text-xs text-white uppercase">
//                                  {product.designer}
//                                 </p>
//                             </Link> */}
                            
//                          </Badge>
                         
//                     </div>
//                 </div>
//               </div>
//               <div className="space-y-1">
               
//                 {/* <p className="text-foreground font-semibold">$ {product.price.toFixed(2)}</p> */}
//               </div>
//             </div>
//             </Link>
     
//           ))}
//         </div>
//       </div>

//       {selectedProduct && (
//         <ProductModal
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//         />
//       )}
        
//     </div>
//     </>
//   );
// }
