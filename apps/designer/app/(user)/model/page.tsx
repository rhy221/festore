// // app/dashboard/models/page.tsx
// 'use client';

// import { useState, useMemo } from 'react';
// import { useMyProducts, useDeleteProduct } from '@/hooks/useProducts';
// import { useMyCollections } from '@/hooks/useCollections';
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
// import { ArrowUpDown, Pencil, Trash2, Search, Plus } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// interface ModelData {
//   _id: string;
//   name: string;
//   price: number;
//   createdAt: string;
//   views: number;
//   totalEarning: number;
//   purchaseCount: number;
//   collectionId?: { _id: string; name: string };
//   status: string;
// }

// export default function ManageModelsPage() {
//   const router = useRouter();
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [globalFilter, setGlobalFilter] = useState('');
//   const [pageSize, setPageSize] = useState(10);
//   const [collectionFilter, setCollectionFilter] = useState<string>('all');
//   const [statusFilter, setStatusFilter] = useState<string>('all');

//   const { data: productsData, isLoading } = useMyProducts({
//     page: 1,
//     limit: 1000, // Get all for client-side filtering/sorting
//   });

//   const { data: collections } = useMyCollections();
//   const deleteMutation = useDeleteProduct();

//   const columns = useMemo<ColumnDef<ModelData>[]>(
//     () => [
//       {
//         accessorKey: 'name',
//         header: ({ column }) => {
//           return (
//             <Button
//               variant="ghost"
//               onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//               className="hover:bg-gray-100"
//             >
//               Tên Model
//               <ArrowUpDown className="ml-2 h-4 w-4" />
//             </Button>
//           );
//         },
//         cell: ({ row }) => (
//           <div className="font-medium">{row.getValue('name')}</div>
//         ),
//       },
//       {
//         accessorKey: 'collectionId',
//         header: 'Collection',
//         cell: ({ row }) => {
//           const collection = row.original.collectionId;
//           return <div>{collection?.name || '-'}</div>;
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
//           const price = parseFloat(row.getValue('price'));
//           return <div className="font-semibold">{price.toLocaleString('vi-VN')}đ</div>;
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
//               Ngày thêm
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
//         accessorKey: 'views',
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
//           return <div className="text-center">{row.getValue('views')}</div>;
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
//         accessorKey: 'status',
//         header: 'Trạng thái',
//         cell: ({ row }) => {
//           const status = row.getValue('status') as string;
//           const statusColors = {
//             published: 'bg-green-100 text-green-800',
//             draft: 'bg-yellow-100 text-yellow-800',
//             archived: 'bg-gray-100 text-gray-800',
//           };
//           const statusLabels = {
//             published: 'Đã xuất bản',
//             draft: 'Nháp',
//             archived: 'Đã lưu trữ',
//           };
//           return (
//             <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status as keyof typeof statusColors]}`}>
//               {statusLabels[status as keyof typeof statusLabels]}
//             </span>
//           );
//         },
//       },
//       {
//         id: 'actions',
//         header: 'Hành động',
//         cell: ({ row }) => {
//           return (
//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => router.push(`/dashboard/models/edit/${row.original._id}`)}
//               >
//                 <Pencil className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => {
//                   if (confirm('Bạn có chắc muốn xóa model này?')) {
//                     deleteMutation.mutate(row.original._id);
//                   }
//                 }}
//                 className="text-red-600 hover:text-red-700"
//               >
//                 <Trash2 className="h-4 w-4" />
//               </Button>
//             </div>
//           );
//         },
//       },
//     ],
//     [router, deleteMutation]
//   );

//   // Filter data based on collection and status
//   const filteredData = useMemo(() => {
//     if (!productsData?.products) return [];
    
//     let filtered = productsData.products;
    
//     if (collectionFilter !== 'all') {
//       filtered = filtered.filter((p: ModelData) => p.collectionId?._id === collectionFilter);
//     }
    
//     if (statusFilter !== 'all') {
//       filtered = filtered.filter((p: ModelData) => p.status === statusFilter);
//     }
    
//     return filtered;
//   }, [productsData, collectionFilter, statusFilter]);

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
//         <Navbar />
//         <div className="container mx-auto px-4 py-8 text-center">Đang tải...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       <main className="container mx-auto px-4 py-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Quản lý Models</h1>
//           <Button onClick={() => router.push('/dashboard/models/create')}>
//             <Plus className="mr-2 h-4 w-4" />
//             Thêm Model
//           </Button>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           {/* Filters */}
//           <div className="flex gap-4 mb-6 flex-wrap">
//             <div className="flex-1 min-w-[200px]">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Tìm kiếm model..."
//                   value={globalFilter}
//                   onChange={(e) => setGlobalFilter(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>

//             <Select value={collectionFilter} onValueChange={setCollectionFilter}>
//               <SelectTrigger className="w-[200px]">
//                 <SelectValue placeholder="Chọn collection" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Tất cả collections</SelectItem>
//                 {collections?.map((collection: any) => (
//                   <SelectItem key={collection._id} value={collection._id}>
//                     {collection.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-[200px]">
//                 <SelectValue placeholder="Chọn trạng thái" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Tất cả trạng thái</SelectItem>
//                 <SelectItem value="published">Đã xuất bản</SelectItem>
//                 <SelectItem value="draft">Nháp</SelectItem>
//                 <SelectItem value="archived">Đã lưu trữ</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Table */}
//           <div className="rounded-md border">
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
//                     <TableRow key={row.id}>
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
//                       Không có model nào.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Pagination */}
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