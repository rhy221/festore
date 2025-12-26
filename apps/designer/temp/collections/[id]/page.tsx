// 'use client';

// import { useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useCollection } from '@/hooks/useCollections';
// import { useMyProducts, useUpdateProduct } from '@/hooks/useProducts';
// import Navbar from '@/components/Navbar';
// import { ArrowLeft, Plus, X, Check } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';

// export default function CollectionDetailPage() {
//   const router = useRouter();
//   const params = useParams();
//   const collectionId = params.id as string;
  
//   const { data: collection, isLoading: collectionLoading } = useCollection(collectionId);
//   const { data: productsData, isLoading: productsLoading } = useMyProducts({ limit: 1000 });
//   const updateProductMutation = useUpdateProduct();

//   const [showAddModel, setShowAddModel] = useState(false);

//   // Filter products in this collection
//   const collectionProducts = productsData?.products?.filter(
//     (p: any) => p.collectionIds?.some((cId: any) => cId._id === collectionId)
//   ) || [];

//   // All products for adding
//   const allProducts = productsData?.products || [];

//   const handleToggleProduct = async (product: any) => {
//     const isInCollection = product.collectionIds?.some((cId: any) => cId._id === collectionId);
    
//     let newCollectionIds: string[];
//     if (isInCollection) {
//       // Remove from collection
//       newCollectionIds = product.collectionIds
//         .filter((cId: any) => cId._id !== collectionId)
//         .map((cId: any) => cId._id);
//     } else {
//       // Add to collection
//       newCollectionIds = [
//         ...(product.collectionIds?.map((cId: any) => cId._id) || []),
//         collectionId
//       ];
//     }

//     await updateProductMutation.mutateAsync({
//       id: product._id,
//       data: { collectionIds: newCollectionIds },
//     });
//   };

//   if (collectionLoading || productsLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="container mx-auto px-4 py-8 text-center">Đang tải...</div>
//       </div>
//     );
//   }

//   if (!collection) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="container mx-auto px-4 py-8 text-center">
//           Collection không tồn tại
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       <main className="container mx-auto px-4 py-8">
//         <Button
//           variant="outline"
//           onClick={() => router.back()}
//           className="mb-6"
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Quay lại
//         </Button>

//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h1 className="text-3xl font-bold mb-2">{collection.name}</h1>
//           <p className="text-gray-600 mb-4">{collection.description || 'Không có mô tả'}</p>
//           <div className="text-sm text-gray-500">
//             {collectionProducts.length} model trong collection
//           </div>
//         </div>

//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Quản lý Models</h2>
//           <Button onClick={() => setShowAddModel(!showAddModel)}>
//             {showAddModel ? 'Ẩn danh sách' : 'Quản lý Models'}
//           </Button>
//         </div>

//         {showAddModel && (
//           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <h3 className="font-semibold mb-4">Chọn models (có thể chọn nhiều):</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
//               {allProducts.map((product: any) => {
//                 const isInCollection = product.collectionIds?.some((cId: any) => cId._id === collectionId);
//                 const otherCollections = product.collectionIds?.filter((cId: any) => cId._id !== collectionId) || [];
                
//                 return (
//                   <div 
//                     key={product._id} 
//                     className={`border rounded-lg p-4 cursor-pointer transition-colors ${
//                       isInCollection ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'
//                     }`}
//                     onClick={() => handleToggleProduct(product)}
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="relative w-16 h-16 flex-shrink-0">
//                         <Image
//                           src={product.images?.[0] || '/placeholder-model.jpg'}
//                           alt={product.name}
//                           fill
//                           className="object-cover rounded"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="font-medium line-clamp-1">{product.name}</div>
//                         {otherCollections.length > 0 && (
//                           <div className="text-xs text-gray-500 line-clamp-1">
//                             +{otherCollections.length} collection khác
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex-shrink-0">
//                         {isInCollection ? (
//                           <Check className="h-5 w-5 text-blue-600" />
//                         ) : (
//                           <Plus className="h-5 w-5 text-gray-400" />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {collectionProducts.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-md p-12 text-center">
//             <p className="text-gray-500 mb-4">Collection này chưa có model nào</p>
//             <Button onClick={() => setShowAddModel(true)}>
//               <Plus className="mr-2 h-4 w-4" />
//               Thêm Model
//             </Button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {collectionProducts.map((product: any) => {
//               const otherCollections = product.collectionIds?.filter((cId: any) => cId._id !== collectionId) || [];
              
//               return (
//                 <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
//                   <div className="relative h-48 w-full">
//                     <Image
//                       src={product.images?.[0] || '/placeholder-model.jpg'}
//                       alt={product.name}
//                       fill
//                       className="object-cover"
//                     />
//                     <button
//                       onClick={() => handleToggleProduct(product)}
//                       className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                       disabled={updateProductMutation.isPending}
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>

//                   <div className="p-4">
//                     <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
//                     <div className="text-lg font-bold text-blue-600 mb-2">
//                       {product.price.toLocaleString('vi-VN')}đ
//                     </div>
//                     {otherCollections.length > 0 && (
//                       <div className="text-xs text-gray-500 mb-2">
//                         Trong {otherCollections.length} collection khác
//                       </div>
//                     )}
//                     <div className="flex justify-between text-sm text-gray-500">
//                       <span>{product.views} views</span>
//                       <span>{product.purchaseCount} sold</span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }