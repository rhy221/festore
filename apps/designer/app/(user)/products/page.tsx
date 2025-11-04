"use client";
import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Switch } from "@workspace/ui/components/switch";
import { MoreHorizontal, Package, Plus } from "lucide-react";
import { useProducts } from "@/queries/useProduct";
import { DesignResType } from "@/schema/product.schema";
import { useRouter } from "next/navigation";
import { Skeleton } from "@workspace/ui/components/skeleton";

// Types
interface Designer {
  id: string;
  name: string;
  email: string;
}

interface AuctionDetails {
  startingPrice: number;
  bidIncrement: number;
  startTime: string;
  endTime: string;
  currentPrice?: number;
  totalBids?: number;
  isActive: boolean;
}

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
//   material: string;
//   images: string[];
//   mainImage: string;
//   designerId: string;
//   designer: Designer;
//   status: "available" | "direct-sale" | "auction";
//   salePrice?: number;
//   auctionDetails?: AuctionDetails;
//   isPublic: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// Helper function
const getSaleTypeDisplay = (status: DesignResType["type"]): string => {
  switch (status) {
    case "fixed":
      return "Bán trực tiếp";
    case "auction":
      return "Bán đấu giá";
    default:
      return "Bán trực tiếp";
  }
};

const getSaleTypeColor = (status: DesignResType["type"]): string => {
  switch (status) {
    case "fixed":
      return "text-red-600";
    case "auction":
      return "text-orange-600";
    default:
      return "text-red-600";
  }
};

export default function ProductListScreen() {
  // const [products, setProducts] = useState<Product[]>([
  //   {
  //     id: "prod_001",
  //     name: "Giày thể thao",
  //     description: "Giày thể thao nam chất lượng cao",
  //     category: "Giày dép",
  //     material: "Da thật, cao su",
  //     images: ["/images/shoe.png", "/images/shoe_2.png"],
  //     mainImage: "/images/shoe.png",
  //     designerId: "designer_001",
  //     designer: {
  //       id: "designer_001",
  //       name: "Nhà thiết kế A",
  //       email: "designer_a@example.com",
  //     },
  //     status: "available",
  //     isPublic: true,
  //     createdAt: "2024-01-15T10:00:00Z",
  //     updatedAt: "2024-01-15T10:00:00Z",
  //   },
  //   {
  //     id: "prod_002",
  //     name: "Giày thể thao 2",
  //     description: "Mẫu giày thể thao phong cách",
  //     category: "Giày dép",
  //     material: "Vải, cao su",
  //     images: ["/images/shoe2.png"],
  //     mainImage: "/images/shoe2.png",
  //     designerId: "designer_001",
  //     designer: {
  //       id: "designer_001",
  //       name: "Nhà thiết kế A",
  //       email: "designer_a@example.com",
  //     },
  //     status: "available",
  //     isPublic: false,
  //     createdAt: "2024-01-16T10:00:00Z",
  //     updatedAt: "2024-01-16T10:00:00Z",
  //   },
  //   {
  //     id: "prod_003",
  //     name: "Áo thun Premium",
  //     description: "Áo thun chất lượng cao cấp",
  //     category: "Quần áo",
  //     material: "Cotton 100%",
  //     images: ["/images/tshirt.png"],
  //     mainImage: "/images/tshirt.png",
  //     designerId: "designer_001",
  //     designer: {
  //       id: "designer_001",
  //       name: "Nhà thiết kế A",
  //       email: "designer_a@example.com",
  //     },
  //     status: "direct-sale",
  //     salePrice: 250000,
  //     isPublic: true,
  //     createdAt: "2024-01-17T10:00:00Z",
  //     updatedAt: "2024-01-17T10:00:00Z",
  //   },
  //   {
  //     id: "prod_004",
  //     name: "Quần jean cao cấp",
  //     description: "Quần jean chất lượng cao",
  //     category: "Quần áo",
  //     material: "Denim",
  //     images: ["/images/jeans.png"],
  //     mainImage: "/images/jeans.png",
  //     designerId: "designer_001",
  //     designer: {
  //       id: "designer_001",
  //       name: "Nhà thiết kế A",
  //       email: "designer_a@example.com",
  //     },
  //     status: "auction",
  //     auctionDetails: {
  //       startingPrice: 500000,
  //       bidIncrement: 50000,
  //       startTime: "2024-01-20T09:00:00Z",
  //       endTime: "2024-01-22T18:00:00Z",
  //       currentPrice: 650000,
  //       totalBids: 12,
  //       isActive: true,
  //     },
  //     isPublic: false,
  //     createdAt: "2024-01-18T10:00:00Z",
  //     updatedAt: "2024-01-18T10:00:00Z",
  //   },
  // ]);

  const query = useProducts();
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Handler functions
  const handleTogglePrivacy = (productId: string) => {
    // setProducts((prevProducts) =>
    //   prevProducts.map((product) =>
    //     product.id === productId
    //       ? { ...product, isPublic: !product.isPublic }
    //       : product
    //   )
    // );
  };

  const handleSalesTypeClick = (productId: string) => {
    console.log("Open sales type modal for:", productId);
    // TODO: Open SalesTypeModal
  };

  const handleAction = (action: "view" | "edit" | "delete", productId: string) => {
    if(action === "view") {
      router.push(`products/${productId}/detail`)
    }
    // TODO: Implement actions
  };

  // Define columns
  const columns: ColumnDef<DesignResType>[] = [
    {
      accessorKey: "name",
      header: "Mẫu",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
              <img className="w-6 h-6 text-gray-400" src={product.imagesUrl[0]} alt="img"/>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">{product.title}</span>
              {/* <span className="text-xs text-gray-500">{product.category}</span> */}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Hình thức bán",
      cell: ({ row }) => {
        const product = row.original;
        // const isAvailable = product.status === "available";
        
        return (
          <div className="flex justify-center">
            <span
              // onClick={() => isAvailable && handleSalesTypeClick(product.id)}
              // className={`text-sm font-medium ${
              //   isAvailable ? "cursor-pointer hover:underline" : "cursor-default"
              // } ${getSaleTypeColor(product.status)}`}
            >
              {getSaleTypeDisplay(product.type)}
            </span>
          </div>
        );
      },
    },
    // {
    //   accessorKey: "isPublic",
    //   header: "Trạng thái",
    //   cell: ({ row }) => {
    //     const product = row.original;
    //     return (
    //       <div className="flex items-center justify-center gap-2">
    //         <span
    //           className={`text-xs font-medium ${
    //             product.isPublic ? "text-green-600" : "text-gray-500"
    //           }`}
    //         >
    //           {product.isPublic ? "Công khai" : "Riêng tư"}
    //         </span>
    //         <Switch
    //           checked={product.isPublic}
    //           onCheckedChange={() => handleTogglePrivacy(product.id)}
    //           className="data-[state=checked]:bg-green-600"
    //         />
    //       </div>
    //     );
    //   },
    // },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Mở menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleAction("view", product._id)}
                >
                  Xem chi tiết
                </DropdownMenuItem>
                {/* <DropdownMenuItem
                  onClick={() => handleAction("edit", product._id)}
                >
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAction("delete", product._id)}
                  className="text-red-600"
                >
                  Xóa
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
  // Initialize table
  
    
  const table = useReactTable({
    data: query.data!,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="container mx-auto px-8 py-8 pt-24">
        {query.isLoading ? 
       (<TableSkeleton />):(
        <>
        {/* Header */}
      <div className="flex justify-between items-center mb-8 mt-4">
        <h1 className="text-3xl font-bold text-gray-800">Danh sách mẫu</h1>
        <Button
          onClick={() => (window.location.href = "/products/upload")}
          className="bg-[#000080] hover:bg-[#000066]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm mẫu
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center font-semibold">
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
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50"
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
                  className="h-64 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Package className="w-12 h-12 mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">
                      Chưa có mẫu thiết kế nào
                    </p>
                    <p className="text-sm mb-4">
                      Thêm mẫu thiết kế đầu tiên của bạn
                    </p>
                    <Button
                      onClick={() => (window.location.href = "/products/upload")}
                      className="bg-[#000080] hover:bg-[#000066]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm mẫu
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Hiển thị {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              query.data?.length!
            )}{" "}
            trong tổng số {query.data?.length} mẫu
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Trang trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Trang sau
            </Button>
          </div>
        </div>
      )}
        </>
       ) }
      
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="w-full">
      {/* HEADER SKELETON */}
      <div className="flex justify-between items-center mb-8 mt-4">
        <Skeleton className="h-9 w-48" /> {/* Title */}
        <Skeleton className="h-10 w-28" /> {/* Button */}
      </div>

      {/* TABLE SKELETON */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow className="bg-gray-50">
              {Array.from({ length: 5 }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-6 w-full" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: 5 }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}