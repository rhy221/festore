// // app/dashboard/collections/page.tsx (Updated for multiple collections)
// 'use client';

// import { useState } from 'react';
// import { Plus, Trash2, Folder, Edit2, Package } from 'lucide-react';
// import { Button } from '@workspace/ui/components/button';
// import { Input } from '@workspace/ui/components/input';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog';
// import { useRouter } from 'next/navigation';

// export default function CollectionsPage() {
//   const router = useRouter();
//   const [createOpen, setCreateOpen] = useState(false);
//   const [editingCollection, setEditingCollection] = useState<any>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     coverImage: '',
//   });

//   // const { data: collections, isLoading } = useMyCollections();
//   // const { data: productsData } = useMyProducts({ limit: 1000 });
//   // const createMutation = useCreateCollection();
//   // const updateMutation = useUpdateCollection();
//   // const deleteMutation = useDeleteCollection();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (editingCollection) {
//       // await updateMutation.mutateAsync({ id: editingCollection._id, data: formData });
//       setEditingCollection(null);
//     } else {
//       // await createMutation.mutateAsync(formData);
//     }
//     setFormData({ name: '', description: '', coverImage: '' });
//     setCreateOpen(false);
//   };

//   const handleEdit = (collection: any) => {
//     setEditingCollection(collection);
//     setFormData({
//       name: collection.name,
//       description: collection.description || '',
//       coverImage: collection.coverImage || '',
//     });
//     setCreateOpen(true);
//   };

//   const handleDelete = (id: string) => {
//     if (confirm('Bạn có chắc muốn xóa collection này? Collection sẽ bị xóa khỏi tất cả các model.')) {
//       // deleteMutation.mutate(id);
//     }
//   };

//   const handleCloseDialog = () => {
//     setCreateOpen(false);
//     setEditingCollection(null);
//     setFormData({ name: '', description: '', coverImage: '' });
//   };

//   const getCollectionProductCount = (collectionId: string) => {
//     // if (!productsData?.products) return 0;
//     // return productsData.products.filter((p: any) => 
//     //   p.collectionIds?.some((cId: any) => cId._id === collectionId)
//     // ).length;
//   };

//   // if (isLoading) {
//   //   return (
//   //     <div className="min-h-screen bg-gray-50">
//   //       <div className="container mx-auto px-4 py-8 text-center">Đang tải...</div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       <main className="container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Quản lý Collections</h1>
          
//           <Dialog open={createOpen} onOpenChange={setCreateOpen}>
//             <DialogTrigger asChild>
//               <Button onClick={() => {
//                 setEditingCollection(null);
//                 setFormData({ name: '', description: '', coverImage: '' });
//               }}>
//                 <Plus className="mr-2 h-4 w-4" />
//                 Tạo Collection
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>
//                   {editingCollection ? 'Chỉnh sửa Collection' : 'Tạo Collection mới'}
//                 </DialogTitle>
//               </DialogHeader>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Tên Collection *</label>
//                   <Input
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     required
//                     placeholder="Nhập tên collection"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Mô tả</label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     className="w-full border rounded-lg p-2"
//                     rows={3}
//                     placeholder="Mô tả về collection"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">URL Ảnh bìa</label>
//                   <Input
//                     value={formData.coverImage}
//                     onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
//                     placeholder="https://..."
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   <Button 
//                     type="submit" 
//                     disabled={createMutation.isPending || updateMutation.isPending} 
//                     className="flex-1"
//                   >
//                     {editingCollection ? 'Cập nhật' : 'Tạo Collection'}
//                   </Button>
//                   <Button type="button" variant="outline" onClick={handleCloseDialog}>
//                     Hủy
//                   </Button>
//                 </div>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </div>

//         {!collections || collections.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-md p-12 text-center">
//             <Folder className="w-16 h-16 mx-auto text-gray-400 mb-4" />
//             <p className="text-gray-500 text-lg mb-4">Chưa có collection nào</p>
//             <Button onClick={() => setCreateOpen(true)}>
//               <Plus className="mr-2 h-4 w-4" />
//               Tạo Collection đầu tiên
//             </Button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {collections.map((collection: any) => {
//               const productCount = getCollectionProductCount(collection._id);
              
//               return (
//                 <div 
//                   key={collection._id} 
//                   className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
//                 >
//                   <div 
//                     className="relative h-40 w-full bg-gradient-to-br from-blue-500 to-purple-600"
//                     onClick={() => router.push(`/dashboard/collections/${collection._id}`)}
//                   >
//                     {collection.coverImage ? (
//                       <img
//                         src={collection.coverImage}
//                         alt={collection.name}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="flex items-center justify-center h-full">
//                         <Folder className="w-16 h-16 text-white opacity-50" />
//                       </div>
//                     )}
//                   </div>

//                   <div className="p-4">
//                     <h3 className="font-semibold text-lg mb-2 line-clamp-1">{collection.name}</h3>
//                     <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                       {collection.description || 'Không có mô tả'}
//                     </p>

//                     <div className="flex items-center justify-between mb-3">
//                       <div className="flex items-center gap-1 text-sm text-gray-500">
//                         <Package className="w-4 h-4" />
//                         <span>{productCount} model</span>
//                       </div>
//                       <span className="text-xs text-gray-400">
//                         {new Date(collection.createdAt).toLocaleDateString('vi-VN')}
//                       </span>
//                     </div>

//                     <div className="flex gap-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="flex-1"
//                         onClick={() => router.push(`/dashboard/collections/${collection._id}`)}
//                       >
//                         Xem models
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleEdit(collection)}
//                       >
//                         <Edit2 className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleDelete(collection._id)}
//                         className="text-red-600 hover:text-red-700"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
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

