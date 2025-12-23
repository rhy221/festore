// // app/dashboard/models/page.tsx (Updated for Design with Type-specific actions)
// 'use client';

// import { useState, useMemo } from 'react';

// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   getFilteredRowModel,
//   flexRender,
//   SortingState,
//   ColumnDef,
// } from '@tanstack/react-table';
// import { ArrowUpDown, Pencil, Trash2, Search, Plus, X as XIcon, Ban } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
// import { Button } from '@workspace/ui/components/button';
// import { Input } from '@workspace/ui/components/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
// import { useDeleteProduct, useMyProducts } from '@/queries/useProduct';
// import { useCancelAuction } from '@/queries/useAuction';

// interface DesignData {
//   _id: string;
//   title: string;
//   type: 'fixed' | 'auction' | 'gallery';
//   price?: number;
//   startingPrice?: number;
//   currentPrice?: number;
//   status?: 'upcoming' | 'active' | 'ended' | 'cancelled';
//   createdAt: string;
//   viewCount: number;
//   totalEarning: number;
//   purchaseCount: number;
//   totalBids?: number;
//   collections?: Array<{ _id: string; name: string }>;
//   isDeleted: boolean;
//   deletedAt?: string;
// }

// export default function ManageModelsPage() {
//   const router = useRouter();
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [globalFilter, setGlobalFilter] = useState('');
//   const [pageSize, setPageSize] = useState(10);
//   const [collectionFilter, setCollectionFilter] = useState<string>('all');
//   const [typeFilter, setTypeFilter] = useState<string>('all');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [showDeleted, setShowDeleted] = useState(false);

//   const { data: productsData, isLoading } = useMyProducts({
//     page: 1,
//     limit: 1000,
//     includeDeleted: showDeleted,
//   });

// //   const { data: collections } = useMyCollections();
//   const deleteMutation = useDeleteProduct();
//   const cancelAuctionMutation = useCancelAuction();


//   const onCancelAuction = async (id: string) => {
//     if(cancelAuctionMutation.isPending) return;
//     try {
//         const result = await cancelAuctionMutation.mutateAsync(id);
//         alert("Cancel your auction successfull");
//     } catch(err) {
//         console.error(err);
//     }
//   }

//   const onDeleteProduct = async (id: string) => {
//     if(deleteMutation.isPending) return;
//     try {
//         const result = await deleteMutation.mutateAsync(id);
//     } catch(err) {
//         console.error(err);
//     }
//   }

//   const columns = useMemo<ColumnDef<DesignData>[]>(
//     () => [
//       {
//         accessorKey: 'title',
//         header: ({ column }) => {
//           return (
//             <Button
//               variant="ghost"
//               onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//               className="hover:bg-gray-100"
//             >
//               Tiêu đề
//               <ArrowUpDown className="ml-2 h-4 w-4" />
//             </Button>
//           );
//         },
//         cell: ({ row }) => (
//           <div className="font-medium">{row.getValue('title')}</div>
//         ),
//       },
//       {
//         accessorKey: 'type',
//         header: 'Type',
//         cell: ({ row }) => {
//           const type = row.getValue('type') as string;
//           const typeColors = {
//             gallery: 'bg-purple-100 text-purple-800',
//             fixed: 'bg-green-100 text-green-800',
//             auction: 'bg-orange-100 text-orange-800',
//           };
//           const typeLabels = {
//             gallery: 'Gallery',
//             fixed: 'Store',
//             auction: 'Auction',
//           };
//           return (
//             <span className={`px-2 py-1 rounded-full text-xs ${typeColors[type as keyof typeof typeColors]}`}>
//               {typeLabels[type as keyof typeof typeLabels]}
//             </span>
//           );
//         },
//       },
//       {
//         accessorKey: 'price',
//         header: ({ column }) => {
//           return (
//             <Button
//               variant="ghost"
//               onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//               className="hover:bg-gray-100"
//             >
//               Giá
//               <ArrowUpDown className="ml-2 h-4 w-4" />
//             </Button>
//           );
//         },
//         cell: ({ row }) => {
//           const design = row.original;
//           if (design.type === 'gallery') return <div className="text-gray-400">-</div>;
//           if (design.type === 'fixed') {
//             return <div className="font-semibold">{design.price?.toLocaleString('vi-VN')}đ</div>;
//           }
//           if (design.type === 'auction') {
//             return (
//               <div className="text-sm">
//                 <div className="font-semibold text-orange-600">
//                   {design.currentPrice?.toLocaleString('vi-VN')}đ
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   Start: {design.startingPrice?.toLocaleString('vi-VN')}đ
//                 </div>
//               </div>
//             );
//           }
//         },
//       },
//       {
//         accessorKey: 'status',
//         header: 'Trạng thái',
//         cell: ({ row }) => {
//           const design = row.original;
          
//           if (design.isDeleted) {
//             return (
//               <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
//                 Đã xóa
//               </span>
//             );
//           }

//           if (design.type !== 'auction') {
//             return <div className="text-gray-400">-</div>;
//           }

//           const status = design.status;
//           const statusColors = {
//             upcoming: 'bg-blue-100 text-blue-800',
//             active: 'bg-green-100 text-green-800',
//             ended: 'bg-gray-100 text-gray-800',
//             cancelled: 'bg-red-100 text-red-800',
//           };
//           const statusLabels = {
//             upcoming: 'Sắp diễn ra',
//             active: 'Đang đấu giá',
//             ended: 'Đã kết thúc',
//             cancelled: 'Đã hủy',
//           };
          
//           return (
//             <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status as keyof typeof statusColors]}`}>
//               {statusLabels[status as keyof typeof statusLabels]}
//             </span>
//           );
//         },
//       },
//       {
//         accessorKey: 'createdAt',
//         header: ({ column }) => {
//           return (
//             <Button
//               variant="ghost"
//               onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//               className="hover:bg-gray-100"
//             >
//               Ngày tạo
//               <ArrowUpDown className="ml-2 h-4 w-4" />
//             </Button>
//           );
//         },
//         cell: ({ row }) => {
//           return (
//             <div>{new Date(row.getValue('createdAt')).toLocaleDateString('vi-VN')}</div>
//           );
//         },
//       },
//       {
//         accessorKey: 'viewCount',
//         header: ({ column }) => {
//           return (
//             <Button
//               variant="ghost"
//               onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//               className="hover:bg-gray-100"
//             >
//               Lượt xem
//               <ArrowUpDown className="ml-2 h-4 w-4" />
//             </Button>
//           );
//         },
//         cell: ({ row }) => {
//           return <div className="text-center">{row.getValue('viewCount')}</div>;
//         },
//       },
//       {
//         accessorKey: 'purchaseCount',
//         header: ({ column }) => {
//           return (
//             <Button
//               variant="ghost"
//               onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//               className="hover:bg-gray-100"
//             >
//               Đã bán
//               <ArrowUpDown className="ml-2 h-4 w-4" />
//             </Button>
//           );
//         },
//         cell: ({ row }) => {
//           const design = row.original;
//           if (design.type === 'auction') {
//             return <div className="text-center">{design.totalBids || 0} bids</div>;
//           }
//           return <div className="text-center">{row.getValue('purchaseCount')}</div>;
//         },
//       },
//       {
//         accessorKey: 'totalEarning',
//         header: ({ column }) => {
//           return (
//             <Button
//               variant="ghost"
//               onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//               className="hover:bg-gray-100"
//             >
//               Doanh thu
//               <ArrowUpDown className="ml-2 h-4 w-4" />
//             </Button>
//           );
//         },
//         cell: ({ row }) => {
//           const earning = parseFloat(row.getValue('totalEarning'));
//           return (
//             <div className="font-semibold text-green-600">
//               {earning.toLocaleString('vi-VN')}đ
//             </div>
//           );
//         },
//       },
//       {
//         id: 'actions',
//         header: 'Hành động',
//         cell: ({ row }) => {
//           const design = row.original;

//         //   if (design.isDeleted) {
//         //     return (
//         //       <Button
//         //         variant="outline"
//         //         size="sm"
//         //         onClick={() => {
//         //           // Call restore API
//         //           alert('Chức năng restore sẽ được thêm');
//         //         }}
//         //         className="text-green-600"
//         //       >
//         //         Khôi phục
//         //       </Button>
//         //     );
//         //   }

//           // Gallery & Fixed: Edit + Delete
//           if (design.type === 'gallery' || design.type === 'fixed') {
//             return (
//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => router.push(`/models/edit/${design._id}`)}
//                   title="Chỉnh sửa"
//                 >
//                   <Pencil className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => {
//                     if (confirm('Bạn có chắc muốn xóa design này?')) {
//                     onDeleteProduct(design._id);
//                     }
//                   }}
//                   className="text-red-600 hover:text-red-700"
//                   title="Xóa"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             );
//           }

//           // Auction: Depends on status
//           if (design.type === 'auction') {
//             if (design.status === 'upcoming') {
//               // Upcoming: Edit, Delete, Cancel
//               return (
//                 <div className="flex gap-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => router.push(`/models/edit/${design._id}`)}
//                     title="Chỉnh sửa"
//                   >
//                     <Pencil className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => {
//                       if (confirm('Bạn có chắc muốn hủy đấu giá này?')) {
//                         onCancelAuction(design._id);
//                       }
//                     }}
//                     className="text-orange-600 hover:text-orange-700"
//                     title="Hủy đấu giá"
//                   >
//                     <Ban className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => {
//                       if (confirm('Bạn có chắc muốn xóa design này?')) {
//                         onDeleteProduct(design._id);
//                       }
//                     }}
//                     className="text-red-600 hover:text-red-700"
//                     title="Xóa"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               );
//             }

//             if (design.status === 'active' || design.status === 'ended') {
//               // Active/Ended: No actions
//               return (
//                 <div className="text-sm text-gray-500 italic">
//                   Không thể thao tác
//                 </div>
//               );
//             }

//             if (design.status === 'cancelled') {
//               // Cancelled: Only delete
//               return (
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => {
//                     if (confirm('Bạn có chắc muốn xóa design này?')) {
//                         onDeleteProduct(design._id);
//                     }
//                   }}
//                   className="text-red-600 hover:text-red-700"
//                   title="Xóa"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               );
//             }
//           }

//           return null;
//         },
//       },
//     ],
//     [router, 
//         deleteMutation, cancelAuctionMutation
//     ]
//   );

//   const filteredData = useMemo(() => {
//     if (!productsData?.products) return [];
    
//     let filtered = productsData.products;
    
//     if (collectionFilter !== 'all') {
//       filtered = filtered.filter((p: DesignData) => 
//         p.collections?.some(c => c._id === collectionFilter)
//       );
//     }

//     if (typeFilter !== 'all') {
//       filtered = filtered.filter((p: DesignData) => p.type === typeFilter);
//     }

//     if (typeFilter === 'auction' && statusFilter !== 'all') {
//       filtered = filtered.filter((p: DesignData) => p.status === statusFilter);
//     }
    
//     return filtered;
//   }, [productsData, collectionFilter, typeFilter, statusFilter]);

//   const table = useReactTable({
//     data: filteredData,
//     columns,
//     state: {
//       sorting,
//       globalFilter,
//       pagination: {
//         pageIndex: 0,
//         pageSize,
//       },
//     },
//     onSortingChange: setSorting,
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="container mx-auto px-4 py-8 text-center">Đang tải...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen ">
      
//       <main className="container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Quản lý Designs</h1>
//           {/* <Button onClick={() => router.push('/dashboard/models/create')}>
//             <Plus className="mr-2 h-4 w-4" />
//             Thêm Design
//           </Button> */}
//         </div>

//         <div className="bg-secondary rounded-lg shadow-md p-6">
//           <div className="flex gap-4 mb-6 flex-wrap">
//             <div className="flex-1 min-w-[200px]">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 " />
//                 <Input
//                   placeholder="Tìm kiếm design..."
//                   value={globalFilter}
//                   onChange={(e) => setGlobalFilter(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>

//             <Select value={typeFilter} onValueChange={setTypeFilter}>
//               <SelectTrigger className="w-[150px]">
//                 <SelectValue placeholder="Chọn type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Tất cả types</SelectItem>
//                 <SelectItem value="gallery">Gallery</SelectItem>
//                 <SelectItem value="fixed">Store</SelectItem>
//                 <SelectItem value="auction">Auction</SelectItem>
//               </SelectContent>
//             </Select>

//             {typeFilter === 'auction' && (
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-[150px]">
//                   <SelectValue placeholder="Trạng thái" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Tất cả</SelectItem>
//                   <SelectItem value="upcoming">Sắp diễn ra</SelectItem>
//                   <SelectItem value="active">Đang đấu giá</SelectItem>
//                   <SelectItem value="ended">Đã kết thúc</SelectItem>
//                   <SelectItem value="cancelled">Đã hủy</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}

//             {/* <Select value={collectionFilter} onValueChange={setCollectionFilter}>
//               <SelectTrigger className="w-[200px]">
//                 <SelectValue placeholder="Collection" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Tất cả collections</SelectItem>
//                 {collections?.map((collection: any) => (
//                   <SelectItem key={collection._id} value={collection._id}>
//                     {collection.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select> */}

//             {/* <Button
//               variant={showDeleted ? 'default' : 'outline'}
//               onClick={() => setShowDeleted(!showDeleted)}
//             >
//               {showDeleted ? <XIcon className="mr-2 h-4 w-4" /> : null}
//               {showDeleted ? 'Ẩn đã xóa' : 'Hiện đã xóa'}
//             </Button> */}
//           </div>

//           <div className="rounded-md border overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <TableRow key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => (
//                       <TableHead key={header.id}>
//                         {header.isPlaceholder
//                           ? null
//                           : flexRender(
//                               header.column.columnDef.header,
//                               header.getContext()
//                             )}
//                       </TableHead>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableHeader>
//               <TableBody>
//                 {table.getRowModel().rows?.length ? (
//                   table.getRowModel().rows.map((row) => (
//                     <TableRow 
//                       key={row.id}
//                       className={row.original.isDeleted ? 'bg-red-50 opacity-60' : ''}
//                     >
//                       {row.getVisibleCells().map((cell) => (
//                         <TableCell key={cell.id}>
//                           {flexRender(
//                             cell.column.columnDef.cell,
//                             cell.getContext()
//                           )}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell
//                       colSpan={columns.length}
//                       className="h-24 text-center"
//                     >
//                       Không có design nào.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>

//           <div className="flex items-center justify-between mt-4">
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-700">Hiển thị</span>
//               <Select
//                 value={pageSize.toString()}
//                 onValueChange={(value) => {
//                   setPageSize(Number(value));
//                   table.setPageSize(Number(value));
//                 }}
//               >
//                 <SelectTrigger className="w-[70px]">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="5">5</SelectItem>
//                   <SelectItem value="10">10</SelectItem>
//                   <SelectItem value="20">20</SelectItem>
//                   <SelectItem value="50">50</SelectItem>
//                   <SelectItem value="100">100</SelectItem>
//                 </SelectContent>
//               </Select>
//               <span className="text-sm text-gray-700">
//                 mỗi trang ({table.getFilteredRowModel().rows.length} kết quả)
//               </span>
//             </div>

//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => table.previousPage()}
//                 disabled={!table.getCanPreviousPage()}
//               >
//                 Trước
//               </Button>
//               <span className="text-sm">
//                 Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
//               </span>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => table.nextPage()}
//                 disabled={!table.getCanNextPage()}
//               >
//                 Sau
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


// 'use client';

// import { useState, useMemo } from 'react';
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   getFilteredRowModel,
//   flexRender,
//   SortingState,
//   ColumnDef,
// } from '@tanstack/react-table';
// import { ArrowUpDown, Pencil, Trash2, Search, Ban } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
// import { Button } from '@workspace/ui/components/button';
// import { Input } from '@workspace/ui/components/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
// import { useDeleteProduct, useMyProducts } from '@/queries/useProduct';
// import { useCancelAuction } from '@/queries/useAuction';
// import { cn } from '@workspace/ui/lib/utils';

// // ... (Giữ nguyên interface DesignData)
// interface DesignData {
//   _id: string;
//   title: string;
//   type: 'fixed' | 'auction' | 'gallery';
//   price?: number;
//   startingPrice?: number;
//   currentPrice?: number;
//   status?: 'upcoming' | 'active' | 'ended' | 'cancelled';
//   createdAt: string;
//   viewCount: number;
//   totalEarning: number;
//   purchaseCount: number;
//   totalBids?: number;
//   collections?: Array<{ _id: string; name: string }>;
//   isDeleted: boolean;
//   deletedAt?: string;
// }

// export default function ManageModelsPage() {
//   const router = useRouter();
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [globalFilter, setGlobalFilter] = useState('');
//   const [pageSize, setPageSize] = useState(10);
//   // const [collectionFilter, setCollectionFilter] = useState<string>('all'); // Tạm comment theo code cũ
//   const [typeFilter, setTypeFilter] = useState<string>('all');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [showDeleted, setShowDeleted] = useState(false);

//   const { data: productsData, isLoading } = useMyProducts({
//     page: 1,
//     limit: 1000,
//     includeDeleted: showDeleted,
//   });

//   const deleteMutation = useDeleteProduct();
//   const cancelAuctionMutation = useCancelAuction();

//   // ... (Giữ nguyên các hàm handler onCancelAuction, onDeleteProduct)
//   const onCancelAuction = async (id: string) => {
//     if(cancelAuctionMutation.isPending) return;
//     try {
//         await cancelAuctionMutation.mutateAsync(id);
//         // Có thể thêm toast notification ở đây thay vì alert
//     } catch(err) {
//         console.error(err);
//     }
//   }

//   const onDeleteProduct = async (id: string) => {
//     if(deleteMutation.isPending) return;
//     try {
//         await deleteMutation.mutateAsync(id);
//     } catch(err) {
//         console.error(err);
//     }
//   }

//   const columns = useMemo<ColumnDef<DesignData>[]>(
//     () => [
//       {
//         accessorKey: 'title',
//         header: ({ column }) => {
//           return (
//             <Button
//               variant="ghost"
//               onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//               className="hover:bg-accent hover:text-accent-foreground px-2"
//             >
//               Title
//               <ArrowUpDown className="ml-2 h-4 w-4" />
//             </Button>
//           );
//         },
//         cell: ({ row }) => (
//           <div className="font-medium text-foreground truncate max-w-[200px]" title={row.getValue('title')}>
//             {row.getValue('title')}
//           </div>
//         ),
//       },
//       {
//         accessorKey: 'type',
//         header: 'Type',
//         cell: ({ row }) => {
//           const type = row.getValue('type') as string;
//           // DARK MODE COLORS: Dùng màu text sáng trên nền tối mờ (opacity) + border
//           const typeStyles = {
//             gallery: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
//             fixed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
//             auction: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
//           };
//           const typeLabels = {
//             gallery: 'Gallery',
//             fixed: 'Store',
//             auction: 'Auction',
//           };
          
//           return (
//             <span className={cn(
//                 "px-2.5 py-1 rounded-md text-xs font-medium border",
//                 typeStyles[type as keyof typeof typeStyles]
//             )}>
//               {typeLabels[type as keyof typeof typeLabels]}
//             </span>
//           );
//         },
//       },
//       {
//         accessorKey: 'price',
//         header: ({ column }) => {
//           return (
//             <Button
//               variant="ghost"
//               onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//               className="hover:bg-accent hover:text-accent-foreground px-2"
//             >
//               Price
//               <ArrowUpDown className="ml-2 h-4 w-4" />
//             </Button>
//           );
//         },
//         cell: ({ row }) => {
//           const design = row.original;
//           if (design.type === 'gallery') return <div className="text-muted-foreground">-</div>;
//           if (design.type === 'fixed') {
//             return <div className="font-semibold text-emerald-400">${design.price?.toLocaleString()}</div>;
//           }
//           if (design.type === 'auction') {
//             return (
//               <div className="flex flex-col">
//                 <span className="font-semibold text-orange-400">
//                   ${design.currentPrice?.toLocaleString() || design.startingPrice?.toLocaleString()}
//                 </span>
//                 <span className="text-[10px] text-muted-foreground">
//                   Start: ${design.startingPrice?.toLocaleString()}
//                 </span>
//               </div>
//             );
//           }
//         },
//       },
//       {
//         accessorKey: 'status',
//         header: 'Status',
//         cell: ({ row }) => {
//           const design = row.original;
          
//           if (design.isDeleted) {
//             return (
//               <span className="px-2 py-0.5 rounded-full text-xs bg-destructive/10 text-destructive border border-destructive/20">
//                 Deleted
//               </span>
//             );
//           }

//           if (design.type !== 'auction') {
//             return <div className="text-muted-foreground">-</div>;
//           }

//           const status = design.status;
//           // DARK MODE STATUS COLORS
//           const statusStyles = {
//             upcoming: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
//             active: 'bg-green-500/10 text-green-400 border-green-500/20 animate-pulse', // Thêm hiệu ứng pulse cho active
//             ended: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
//             cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
//           };
//           const statusLabels = {
//             upcoming: 'Upcoming',
//             active: 'Live',
//             ended: 'Ended',
//             cancelled: 'Cancelled',
//           };
          
//           return (
//             <span className={cn(
//                 "px-2.5 py-1 rounded-full text-xs font-medium border",
//                 statusStyles[status as keyof typeof statusStyles]
//             )}>
//               {statusLabels[status as keyof typeof statusLabels]}
//             </span>
//           );
//         },
//       },
//       {
//         accessorKey: 'viewCount',
//         header: 'Views',
//         cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue('viewCount')}</div>,
//       },
//       {
//         accessorKey: 'purchaseCount',
//         header: 'Sales/Bids',
//         cell: ({ row }) => {
//           const design = row.original;
//           if (design.type === 'auction') {
//             return <div className="text-center text-orange-300">{design.totalBids || 0} bids</div>;
//           }
//           return <div className="text-center text-muted-foreground">{row.getValue('purchaseCount')}</div>;
//         },
//       },
//       {
//         accessorKey: 'totalEarning',
//         header: 'Revenue',
//         cell: ({ row }) => {
//           const earning = parseFloat(row.getValue('totalEarning'));
//           return (
//             <div className="font-semibold text-emerald-400">
//               ${earning.toLocaleString()}
//             </div>
//           );
//         },
//       },
//       {
//         id: 'actions',
//         header: 'Actions',
//         cell: ({ row }) => {
//           const design = row.original;

//           const ActionButton = ({ onClick, icon: Icon, className, title }: any) => (
//             <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={onClick}
//                 title={title}
//                 className={cn("h-8 w-8 hover:bg-accent", className)}
//             >
//                 <Icon className="h-4 w-4" />
//             </Button>
//           );

//           // Gallery & Fixed
//           if (design.type === 'gallery' || design.type === 'fixed') {
//             return (
//               <div className="flex gap-1">
//                 <ActionButton 
//                     onClick={() => router.push(`/models/edit/${design._id}`)}
//                     icon={Pencil}
//                     className="text-blue-400 hover:text-blue-300"
//                     title="Edit"
//                 />
//                 <ActionButton 
//                     onClick={() => { if (confirm('Delete this design?')) onDeleteProduct(design._id); }}
//                     icon={Trash2}
//                     className="text-destructive hover:text-red-400"
//                     title="Delete"
//                 />
//               </div>
//             );
//           }

//           // Auction
//           if (design.type === 'auction') {
//             if (design.status === 'upcoming') {
//               return (
//                 <div className="flex gap-1">
//                   <ActionButton 
//                     onClick={() => router.push(`/models/edit/${design._id}`)}
//                     icon={Pencil}
//                     className="text-blue-400 hover:text-blue-300"
//                   />
//                   <ActionButton 
//                     onClick={() => { if (confirm('Cancel auction?')) onCancelAuction(design._id); }}
//                     icon={Ban}
//                     className="text-orange-400 hover:text-orange-300"
//                     title="Cancel Auction"
//                   />
//                   <ActionButton 
//                     onClick={() => { if (confirm('Delete this design?')) onDeleteProduct(design._id); }}
//                     icon={Trash2}
//                     className="text-destructive hover:text-red-400"
//                   />
//                 </div>
//               );
//             }
//             if (design.status === 'cancelled') {
//               return (
//                 <ActionButton 
//                     onClick={() => { if (confirm('Delete this design?')) onDeleteProduct(design._id); }}
//                     icon={Trash2}
//                     className="text-destructive hover:text-red-400"
//                 />
//               );
//             }
//             return <span className="text-xs text-muted-foreground italic">Locked</span>;
//           }
//           return null;
//         },
//       },
//     ],
//     [router, deleteMutation, cancelAuctionMutation]
//   );

//   const filteredData = useMemo(() => {
//     if (!productsData?.products) return [];
    
//     let filtered = productsData.products;
    
//     // if (collectionFilter !== 'all') { ... }

//     if (typeFilter !== 'all') {
//       filtered = filtered.filter((p: DesignData) => p.type === typeFilter);
//     }

//     if (typeFilter === 'auction' && statusFilter !== 'all') {
//       filtered = filtered.filter((p: DesignData) => p.status === statusFilter);
//     }
    
//     return filtered;
//   }, [productsData, typeFilter, statusFilter]);

//   const table = useReactTable({
//     data: filteredData,
//     columns,
//     state: { sorting, globalFilter, pagination: { pageIndex: 0, pageSize } },
//     onSortingChange: setSorting,
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-muted-foreground animate-pulse">Loading designs...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground space-y-8 p-8">
      
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//             <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage Designs</h1>
//             <p className="text-muted-foreground mt-1">Monitor and manage your store, gallery, and auctions.</p>
//         </div>
//       </div>

//       {/* Filter & Table Container */}
//       <div className="bg-card border border-border rounded-xl shadow-sm p-6 space-y-6">
        
//         {/* Filters Toolbar */}
//         <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
//           <div className="flex flex-1 gap-4 w-full md:w-auto">
//             {/* Search */}
//             <div className="relative w-full md:w-[300px]">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search designs..."
//                 value={globalFilter}
//                 onChange={(e) => setGlobalFilter(e.target.value)}
//                 className="pl-9 bg-background border-input"
//               />
//             </div>

//             {/* Type Filter */}
//             <Select value={typeFilter} onValueChange={setTypeFilter}>
//               <SelectTrigger className="w-[140px] bg-background border-input">
//                 <SelectValue placeholder="Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Types</SelectItem>
//                 <SelectItem value="gallery">Gallery</SelectItem>
//                 <SelectItem value="fixed">Store</SelectItem>
//                 <SelectItem value="auction">Auction</SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Status Filter (Conditional) */}
//             {typeFilter === 'auction' && (
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-[140px] bg-background border-input animate-in fade-in zoom-in-95 duration-200">
//                   <SelectValue placeholder="Status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="upcoming">Upcoming</SelectItem>
//                   <SelectItem value="active">Live</SelectItem>
//                   <SelectItem value="ended">Ended</SelectItem>
//                   <SelectItem value="cancelled">Cancelled</SelectItem>
//                 </SelectContent>
//               </Select>
//             )}
//           </div>
          
//           {/* Page Size Selector (Optional placement) */}
//           <div className="flex items-center gap-2">
//              <span className="text-sm text-muted-foreground hidden md:inline">Show</span>
//              <Select value={pageSize.toString()} onValueChange={(val) => { setPageSize(Number(val)); table.setPageSize(Number(val)); }}>
//                 <SelectTrigger className="w-[70px] bg-background border-input h-9">
//                     <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                     <SelectItem value="5">5</SelectItem>
//                     <SelectItem value="10">10</SelectItem>
//                     <SelectItem value="20">20</SelectItem>
//                     <SelectItem value="50">50</SelectItem>
//                 </SelectContent>
//              </Select>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="rounded-md border border-border overflow-hidden">
//           <Table>
//             <TableHeader className="bg-muted/50">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id} className="hover:bg-muted/50 border-border">
//                   {headerGroup.headers.map((header) => (
//                     <TableHead key={header.id} className="text-muted-foreground font-semibold">
//                       {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <TableRow 
//                     key={row.id} 
//                     className={cn(
//                         "border-border hover:bg-muted/30 transition-colors",
//                         row.original.isDeleted && "opacity-50 bg-destructive/5"
//                     )}
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id} className="py-3">
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
//                     No results found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Pagination Controls */}
//         <div className="flex items-center justify-between pt-2">
//           <span className="text-sm text-muted-foreground">
//             Showing {table.getFilteredRowModel().rows.length} results
//           </span>
//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//               className="bg-background hover:bg-accent border-input"
//             >
//               Previous
//             </Button>
//             <span className="text-sm text-foreground font-medium">
//                 Page {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
//             </span>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//               className="bg-background hover:bg-accent border-input"
//             >
//               Next
//             </Button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
  PaginationState,
  ColumnDef,
} from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash2, Search, Ban, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation'; // 1. Import hooks
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { useDeleteProduct, useMyProducts } from '@/queries/useProduct';
import { useCancelAuction } from '@/queries/useAuction';
import { cn } from '@workspace/ui/lib/utils';
import { formatCurrency } from '@/lib/utils';

// Interface (Giữ nguyên)
interface DesignData {
  _id: string;
  title: string;
  type: 'fixed' | 'auction' | 'gallery';
  price?: number;
  startingPrice?: number;
  currentPrice?: number;
  status?: 'upcoming' | 'active' | 'ended' | 'cancelled';
  createdAt: string;
  viewCount: number;
  totalEarning: number;
  purchaseCount: number;
  totalBids?: number;
  isDeleted: boolean;
}

export default function ManageModelsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- 1. LẤY PARAMS TỪ URL ---
  const pageParam = searchParams.get('page');
  const limitParam = searchParams.get('limit');
  const searchParam = searchParams.get('search') || '';
  const typeParam = searchParams.get('type') || 'all';
  const statusParam = searchParams.get('status') || 'all';
  const sortByParam = searchParams.get('sortBy') || 'createdAt';
  const sortOrderParam = searchParams.get('sortOrder') || 'desc';

  // --- 2. STATE LOCAL ---
  const [globalFilter, setGlobalFilter] = useState(searchParam); // Input search text

  // Tanstack Table States (Sync với URL)
  const pagination: PaginationState = useMemo(() => ({
    pageIndex: (pageParam ? Number(pageParam) : 1) - 1, // URL là 1-based, Table là 0-based
    pageSize: limitParam ? Number(limitParam) : 10,
  }), [pageParam, limitParam]);

  const sorting: SortingState = useMemo(() => ([{
    id: sortByParam,
    desc: sortOrderParam === 'desc',
  }]), [sortByParam, sortOrderParam]);

  // Sync globalFilter khi URL thay đổi (VD: User back/forward)
  useEffect(() => {
    setGlobalFilter(searchParam);
  }, [searchParam]);

  // --- 3. HELPER UPDATE URL ---
  const updateUrl = (newParams: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === '' || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  // --- 4. HANDLERS ---
  const handleSearch = () => {
    updateUrl({ search: globalFilter, page: 1 }); // Reset về trang 1 khi search
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleTypeChange = (val: string) => {
    updateUrl({ type: val, page: 1 });
  };

  const handleStatusChange = (val: string) => {
    updateUrl({ status: val, page: 1 });
  };

  // --- 5. QUERY PARAMS FOR API HOOK ---
  const apiQueryParams = useMemo(() => ({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: searchParam, // Dùng search từ URL
    type: typeParam,
    status: statusParam,
    sortBy: sorting[0]?.id,
    sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
  }), [pagination, searchParam, typeParam, statusParam, sorting]);

  // --- 6. FETCH DATA ---
  const { data: apiResponse, isLoading, isFetching } = useMyProducts(apiQueryParams);
  
  const tableData = apiResponse?.data || [];
  const pageCount = apiResponse?.meta?.totalPages || 0;
  const totalRows = apiResponse?.meta?.total || 0;

  const deleteMutation = useDeleteProduct();
  const cancelAuctionMutation = useCancelAuction();

  // Handlers actions (giữ nguyên)
  const onCancelAuction = async (id: string) => {
    if(cancelAuctionMutation.isPending) return;
    try { await cancelAuctionMutation.mutateAsync(id); } catch(err) { console.error(err); }
  }

  const onDeleteProduct = async (id: string) => {
    if(deleteMutation.isPending) return;
    try { await deleteMutation.mutateAsync(id); } catch(err) { console.error(err); }
  }

  // --- COLUMNS DEFINITION ---
  const columns = useMemo<ColumnDef<DesignData>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="px-0 hover:bg-transparent">
              Title <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium truncate max-w-[200px]" title={row.getValue('title')}>{row.getValue('title')}</div>,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        enableSorting: false,
         cell: ({ row }) => {
          const type = row.getValue('type') as string;
          // DARK MODE COLORS: Dùng màu text sáng trên nền tối mờ (opacity) + border
          const typeStyles = {
            gallery: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            fixed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            auction: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
          };
          const typeLabels = {
            gallery: 'Gallery',
            fixed: 'Store',
            auction: 'Auction',
          };
          
          return (
            <span className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium border",
                typeStyles[type as keyof typeof typeStyles]
            )}>
              {typeLabels[type as keyof typeof typeLabels]}
            </span>
          );
        },
      },
      {
        accessorKey: 'price',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="px-0 hover:bg-transparent">
              Price <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const d = row.original;
            if(d.type === 'fixed') return <span className="text-emerald-400 font-semibold">${d.price?.toLocaleString()}</span>
            if(d.type === 'auction') return <span className="text-orange-400 font-semibold">${(d.currentPrice || d.startingPrice)?.toLocaleString()}</span>
            return <span className="text-muted-foreground">-</span>
        }
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: false,
        cell: ({ row }) => {
            const s = row.original.status;
            if(row.original.type !== "auction" || !s) return <span className="text-muted-foreground">-</span>;
            const styles: any = {
                upcoming: 'text-blue-400', active: 'text-green-400 animate-pulse', ended: 'text-zinc-400', cancelled: 'text-red-400'
            }
            return <span className={cn("text-xs font-medium capitalize", styles[s])}>{s}</span>
        }
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="px-0 hover:bg-transparent">
              Date <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <span className="text-muted-foreground text-sm">{new Date(row.getValue('createdAt')).toLocaleDateString('vi-VN')}</span>
      },
     {
        accessorKey: 'viewCount',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="px-0 hover:bg-transparent w-full justify-center">
              Views <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue('viewCount')}</div>,
      },
      {
        accessorKey: 'purchaseCount',
        header: 'Sales/Bids',
        cell: ({ row }) => {
          const design = row.original;
          if (design.type === 'auction') {
            return <div className="text-center text-orange-300">{design.totalBids || 0} bids</div>;
          }
          return <div className="text-center text-muted-foreground">{row.getValue('purchaseCount')}</div>;
        },
      },
      {
        accessorKey: 'totalEarning',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="px-0 hover:bg-transparent">
              Rev <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-emerald-400 font-medium">{ formatCurrency(Number(row.getValue('totalEarning')))}</div>
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const design = row.original;

          const ActionButton = ({ onClick, icon: Icon, className, title }: any) => (
            <Button
                variant="ghost"
                size="icon"
                onClick={onClick}
                title={title}
                className={cn("h-8 w-8 hover:bg-accent", className)}
            >
                <Icon className="h-4 w-4" />
            </Button>
          );

          // Gallery & Fixed
          if (design.type === 'gallery' || design.type === 'fixed') {
            return (
              <div className="flex gap-1">
                <ActionButton 
                    onClick={() => router.push(`/models/edit/${design._id}`)}
                    icon={Pencil}
                    className="text-blue-400 hover:text-blue-300"
                    title="Edit"
                />
                <ActionButton 
                    onClick={() => { if (confirm('Delete this design?')) onDeleteProduct(design._id); }}
                    icon={Trash2}
                    className="text-destructive hover:text-red-400"
                    title="Delete"
                />
              </div>
            );
          }

          // Auction
          if (design.type === 'auction') {
            if (design.status === 'upcoming') {
              return (
                <div className="flex gap-1">
                  <ActionButton 
                    onClick={() => router.push(`/models/edit/${design._id}`)}
                    icon={Pencil}
                    className="text-blue-400 hover:text-blue-300"
                  />
                  <ActionButton 
                    onClick={() => { if (confirm('Cancel auction?')) onCancelAuction(design._id); }}
                    icon={Ban}
                    className="text-orange-400 hover:text-orange-300"
                    title="Cancel Auction"
                  />
                  <ActionButton 
                    onClick={() => { if (confirm('Delete this design?')) onDeleteProduct(design._id); }}
                    icon={Trash2}
                    className="text-destructive hover:text-red-400"
                  />
                </div>
              );
            }
            if (design.status === 'cancelled') {
              return (
                <ActionButton 
                    onClick={() => { if (confirm('Delete this design?')) onDeleteProduct(design._id); }}
                    icon={Trash2}
                    className="text-destructive hover:text-red-400"
                />
              );
            }
            return <span className="text-xs text-muted-foreground italic">Locked</span>;
          }
          return null;
        },
      },
    ],
    [router, deleteMutation, cancelAuctionMutation]
  );
     

  // --- 7. TABLE CONFIGURATION ---
  const table = useReactTable({
    data: tableData,
    columns,
    pageCount: pageCount,
    state: {
      sorting,
      pagination,
    },
    manualPagination: true,
    manualSorting: true,
    // Override Handlers để update URL thay vì update state nội bộ
    onSortingChange: (updaterOrValue) => {
        const newSorting = typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue;
        updateUrl({
            sortBy: newSorting[0]?.id,
            sortOrder: newSorting[0]?.desc ? 'desc' : 'asc'
        });
    },
    onPaginationChange: (updaterOrValue) => {
        const newPagination = typeof updaterOrValue === 'function' ? updaterOrValue(pagination) : updaterOrValue;
        updateUrl({
            page: newPagination.pageIndex + 1,
            limit: newPagination.pageSize
        });
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-background text-foreground space-y-8 p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold tracking-tight">Manage Designs</h1>

      <div className="bg-card border border-border rounded-xl shadow-sm p-6 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-1 gap-4">
                <div className="relative max-w-sm w-full">
                    <Input 
                        placeholder="Search..." 
                        value={globalFilter} 
                        onChange={e => setGlobalFilter(e.target.value)} 
                        onKeyDown={handleKeyDown} // Search on Enter
                        className="bg-background pr-8" 
                    />
                    <Search 
                        onClick={handleSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" 
                    />
                </div>
                
                <Select value={typeParam} onValueChange={handleTypeChange}>
                    <SelectTrigger className="w-[140px] bg-background"><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="fixed">Store</SelectItem>
                        <SelectItem value="auction">Auction</SelectItem>
                        <SelectItem value="gallery">Gallery</SelectItem>
                    </SelectContent>
                </Select>
                
                {typeParam === 'auction' && (
                    <Select value={statusParam} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-[140px] bg-background"><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="active">Live</SelectItem>
                            <SelectItem value="ended">Ended</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* Page Size Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:inline">Show</span>
              <Select 
                value={pagination.pageSize.toString()} 
                onValueChange={(val) => updateUrl({ limit: val, page: 1 })}
              >
                 <SelectTrigger className="w-[70px] bg-background border-input h-9">
                     <SelectValue />
                 </SelectTrigger>
                 <SelectContent>
                     <SelectItem value="5">5</SelectItem>
                     <SelectItem value="10">10</SelectItem>
                     <SelectItem value="20">20</SelectItem>
                     <SelectItem value="50">50</SelectItem>
                 </SelectContent>
              </Select>
            </div>
        </div>

        {/* Table Content */}
        <div className="rounded-md border border-border overflow-hidden relative min-h-[300px]">
            {/* Loading Overlay */}
            {isFetching && (
                <div className="absolute inset-0 bg-background/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
                    <Loader2 className="animate-spin text-primary w-8 h-8" />
                </div>
            )}
            
            <Table>
                <TableHeader className="bg-muted/40">
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id} className="border-border hover:bg-transparent">
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">Loading Data...</TableCell></TableRow>
                    ) : table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id} className="border-border hover:bg-muted/20">
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id} className="py-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow><TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">No designs found.</TableCell></TableRow>
                    )}
                </TableBody>
            </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Showing {tableData.length} of {totalRows} results</span>
            <div className="flex gap-2">
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => table.previousPage()} 
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => table.nextPage()} 
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}