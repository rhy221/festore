// app/dashboard/models/page.tsx (Updated for Design with Type-specific actions)
'use client';

import { useState, useMemo } from 'react';

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
  ColumnDef,
} from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash2, Search, Plus, X as XIcon, Ban } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { useDeleteProduct, useMyProducts } from '@/queries/useProduct';
import { useCancelAuction } from '@/queries/useAuction';

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
  collections?: Array<{ _id: string; name: string }>;
  isDeleted: boolean;
  deletedAt?: string;
}

export default function ManageModelsPage() {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [collectionFilter, setCollectionFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showDeleted, setShowDeleted] = useState(false);

  const { data: productsData, isLoading } = useMyProducts({
    page: 1,
    limit: 1000,
    includeDeleted: showDeleted,
  });

//   const { data: collections } = useMyCollections();
  const deleteMutation = useDeleteProduct();
  const cancelAuctionMutation = useCancelAuction();


  const onCancelAuction = async (id: string) => {
    if(cancelAuctionMutation.isPending) return;
    try {
        const result = await cancelAuctionMutation.mutateAsync(id);
        alert("Cancel your auction successfull");
    } catch(err) {
        console.error(err);
    }
  }

  const onDeleteProduct = async (id: string) => {
    if(deleteMutation.isPending) return;
    try {
        const result = await deleteMutation.mutateAsync(id);
    } catch(err) {
        console.error(err);
    }
  }

  const columns = useMemo<ColumnDef<DesignData>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="hover:bg-gray-100"
            >
              Tiêu đề
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('title')}</div>
        ),
      },
      {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => {
          const type = row.getValue('type') as string;
          const typeColors = {
            gallery: 'bg-purple-100 text-purple-800',
            fixed: 'bg-green-100 text-green-800',
            auction: 'bg-orange-100 text-orange-800',
          };
          const typeLabels = {
            gallery: 'Gallery',
            fixed: 'Fixed Price',
            auction: 'Auction',
          };
          return (
            <span className={`px-2 py-1 rounded-full text-xs ${typeColors[type as keyof typeof typeColors]}`}>
              {typeLabels[type as keyof typeof typeLabels]}
            </span>
          );
        },
      },
      {
        accessorKey: 'price',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="hover:bg-gray-100"
            >
              Giá
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const design = row.original;
          if (design.type === 'gallery') return <div className="text-gray-400">-</div>;
          if (design.type === 'fixed') {
            return <div className="font-semibold">{design.price?.toLocaleString('vi-VN')}đ</div>;
          }
          if (design.type === 'auction') {
            return (
              <div className="text-sm">
                <div className="font-semibold text-orange-600">
                  {design.currentPrice?.toLocaleString('vi-VN')}đ
                </div>
                <div className="text-xs text-gray-500">
                  Start: {design.startingPrice?.toLocaleString('vi-VN')}đ
                </div>
              </div>
            );
          }
        },
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        cell: ({ row }) => {
          const design = row.original;
          
          if (design.isDeleted) {
            return (
              <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                Đã xóa
              </span>
            );
          }

          if (design.type !== 'auction') {
            return <div className="text-gray-400">-</div>;
          }

          const status = design.status;
          const statusColors = {
            upcoming: 'bg-blue-100 text-blue-800',
            active: 'bg-green-100 text-green-800',
            ended: 'bg-gray-100 text-gray-800',
            cancelled: 'bg-red-100 text-red-800',
          };
          const statusLabels = {
            upcoming: 'Sắp diễn ra',
            active: 'Đang đấu giá',
            ended: 'Đã kết thúc',
            cancelled: 'Đã hủy',
          };
          
          return (
            <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status as keyof typeof statusColors]}`}>
              {statusLabels[status as keyof typeof statusLabels]}
            </span>
          );
        },
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="hover:bg-gray-100"
            >
              Ngày tạo
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div>{new Date(row.getValue('createdAt')).toLocaleDateString('vi-VN')}</div>
          );
        },
      },
      {
        accessorKey: 'viewCount',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="hover:bg-gray-100"
            >
              Lượt xem
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return <div className="text-center">{row.getValue('viewCount')}</div>;
        },
      },
      {
        accessorKey: 'purchaseCount',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="hover:bg-gray-100"
            >
              Đã bán
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const design = row.original;
          if (design.type === 'auction') {
            return <div className="text-center">{design.totalBids || 0} bids</div>;
          }
          return <div className="text-center">{row.getValue('purchaseCount')}</div>;
        },
      },
      {
        accessorKey: 'totalEarning',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="hover:bg-gray-100"
            >
              Doanh thu
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const earning = parseFloat(row.getValue('totalEarning'));
          return (
            <div className="font-semibold text-green-600">
              {earning.toLocaleString('vi-VN')}đ
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: 'Hành động',
        cell: ({ row }) => {
          const design = row.original;

        //   if (design.isDeleted) {
        //     return (
        //       <Button
        //         variant="outline"
        //         size="sm"
        //         onClick={() => {
        //           // Call restore API
        //           alert('Chức năng restore sẽ được thêm');
        //         }}
        //         className="text-green-600"
        //       >
        //         Khôi phục
        //       </Button>
        //     );
        //   }

          // Gallery & Fixed: Edit + Delete
          if (design.type === 'gallery' || design.type === 'fixed') {
            return (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/models/edit/${design._id}`)}
                  title="Chỉnh sửa"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (confirm('Bạn có chắc muốn xóa design này?')) {
                    onDeleteProduct(design._id);
                    }
                  }}
                  className="text-red-600 hover:text-red-700"
                  title="Xóa"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            );
          }

          // Auction: Depends on status
          if (design.type === 'auction') {
            if (design.status === 'upcoming') {
              // Upcoming: Edit, Delete, Cancel
              return (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/models/edit/${design._id}`)}
                    title="Chỉnh sửa"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm('Bạn có chắc muốn hủy đấu giá này?')) {
                        onCancelAuction(design._id);
                      }
                    }}
                    className="text-orange-600 hover:text-orange-700"
                    title="Hủy đấu giá"
                  >
                    <Ban className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm('Bạn có chắc muốn xóa design này?')) {
                        onDeleteProduct(design._id);
                      }
                    }}
                    className="text-red-600 hover:text-red-700"
                    title="Xóa"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            }

            if (design.status === 'active' || design.status === 'ended') {
              // Active/Ended: No actions
              return (
                <div className="text-sm text-gray-500 italic">
                  Không thể thao tác
                </div>
              );
            }

            if (design.status === 'cancelled') {
              // Cancelled: Only delete
              return (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (confirm('Bạn có chắc muốn xóa design này?')) {
                        onDeleteProduct(design._id);
                    }
                  }}
                  className="text-red-600 hover:text-red-700"
                  title="Xóa"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              );
            }
          }

          return null;
        },
      },
    ],
    [router, 
        deleteMutation, cancelAuctionMutation
    ]
  );

  const filteredData = useMemo(() => {
    if (!productsData?.products) return [];
    
    let filtered = productsData.products;
    
    if (collectionFilter !== 'all') {
      filtered = filtered.filter((p: DesignData) => 
        p.collections?.some(c => c._id === collectionFilter)
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter((p: DesignData) => p.type === typeFilter);
    }

    if (typeFilter === 'auction' && statusFilter !== 'all') {
      filtered = filtered.filter((p: DesignData) => p.status === statusFilter);
    }
    
    return filtered;
  }, [productsData, collectionFilter, typeFilter, statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 text-center">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Quản lý Designs</h1>
          {/* <Button onClick={() => router.push('/dashboard/models/create')}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm Design
          </Button> */}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm design..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Chọn type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả types</SelectItem>
                <SelectItem value="gallery">Gallery</SelectItem>
                <SelectItem value="fixed">Fixed Price</SelectItem>
                <SelectItem value="auction">Auction</SelectItem>
              </SelectContent>
            </Select>

            {typeFilter === 'auction' && (
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="upcoming">Sắp diễn ra</SelectItem>
                  <SelectItem value="active">Đang đấu giá</SelectItem>
                  <SelectItem value="ended">Đã kết thúc</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* <Select value={collectionFilter} onValueChange={setCollectionFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả collections</SelectItem>
                {collections?.map((collection: any) => (
                  <SelectItem key={collection._id} value={collection._id}>
                    {collection.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}

            <Button
              variant={showDeleted ? 'default' : 'outline'}
              onClick={() => setShowDeleted(!showDeleted)}
            >
              {showDeleted ? <XIcon className="mr-2 h-4 w-4" /> : null}
              {showDeleted ? 'Ẩn đã xóa' : 'Hiện đã xóa'}
            </Button>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow 
                      key={row.id}
                      className={row.original.isDeleted ? 'bg-red-50 opacity-60' : ''}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Không có design nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Hiển thị</span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-700">
                mỗi trang ({table.getFilteredRowModel().rows.length} kết quả)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Trước
              </Button>
              <span className="text-sm">
                Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Sau
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}