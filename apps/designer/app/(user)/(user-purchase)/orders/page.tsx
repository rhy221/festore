'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  Loader2, 
  Search, 
  Package,
  ShoppingBag,
  RotateCcw,
} from 'lucide-react';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@workspace/ui/components/accordion';
// Import Pagination Components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@workspace/ui/components/pagination';

import { formatCurrency } from '@/lib/utils'; 
import http from '@/lib/http'; 
import { cn } from '@workspace/ui/lib/utils';
import Link from 'next/link';

// --- INTERFACES ---
interface OrderItem {
  productId: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface Order {
  _id: string;
  createdAt: string; 
  totalAmount: number;
  items: OrderItem[];
}

interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function OrderHistoryPage() {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Data State
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<MetaData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset về trang 1 khi search thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  // --- FETCH DATA ---
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      
      if (debouncedSearch) {
        queryParams.append('search', debouncedSearch);
      }
      
      // Thêm params phân trang
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', '10'); // Số lượng item mỗi trang

      const res = await http.get('/orders/my-orders', { params: queryParams });
      
      // Xử lý dữ liệu trả về từ Backend (Giả sử format chuẩn: { data: [], meta: {} })
      // Nếu backend trả về mảng trực tiếp thì cần điều chỉnh lại logic này
      const responseData = res.data;

      if (responseData.data && Array.isArray(responseData.data)) {
        setOrders(responseData.data);
        if (responseData.meta) {
          setMeta(responseData.meta);
        }
      } else if (Array.isArray(responseData)) {
        // Fallback nếu backend chưa hỗ trợ phân trang chuẩn
        setOrders(responseData); 
      }
      
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi search hoặc page thay đổi
  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, currentPage]);

  // Handler chuyển trang
  const handlePageChange = (page: number) => {
    if (page < 1 || page > meta.totalPages) return;
    setCurrentPage(page);
    // Scroll lên đầu bảng khi chuyển trang (optional)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container py-6 space-y-8 font-sans min-h-screen">
      <div className="space-y-8">
        {/* --- HEADER --- */}
        <div className="flex items-center gap-4 border-b border-border pb-6">
          <div className="p-3 bg-primary/10 rounded-full">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
            <p className="text-muted-foreground text-sm">Track and manage your purchase history</p>
          </div>
        </div>
        
        {/* --- CONTROLS --- */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by Order ID or Product Name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-full bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-ring transition-all"
            />
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
            className="text-muted-foreground hover:text-foreground rounded-full px-3"
            disabled={!searchQuery}
          >
            <RotateCcw className="h-4 w-4 mr-1" /> Reset
          </Button>
        </div>

        {/* --- TABLE HEADER --- */}
        <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 pb-2 border-b border-border">
            <div className="col-span-4">Order ID</div>
            <div className="col-span-4">Date</div>
            <div className="col-span-2 text-right">Total</div>
            <div className="col-span-2 text-right">Items</div>
        </div>

        {/* --- ORDERS LIST --- */}
        <div className="min-h-[300px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground space-y-4 border border-dashed border-border rounded-xl bg-muted/10">
               <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-2">
                  <Package className="h-8 w-8 opacity-50" />
               </div>
               <div className="text-center">
                 <p className="font-medium text-foreground">No orders found</p>
                 <p className="text-sm">Try adjusting your search or make your first purchase!</p>
               </div>
            </div>
          ) : (
            <div className="space-y-6">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {orders.map((order) => (
                  <AccordionItem 
                    key={order._id} 
                    value={order._id} 
                    className="border border-border rounded-lg bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <AccordionTrigger className="hover:no-underline px-6 py-4 hover:bg-muted/30">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full items-center text-sm">
                        
                        {/* Order ID */}
                        <div className="col-span-1 md:col-span-4 flex flex-col md:block text-left">
                          <span className="md:hidden text-xs text-muted-foreground font-semibold mb-1">Order ID</span>
                          <span className="font-mono font-medium text-foreground">#{order._id.slice(-8).toUpperCase()}</span>
                        </div>

                        {/* Date */}
                        <div className="col-span-1 md:col-span-4 flex flex-col md:block text-left">
                          <span className="md:hidden text-xs text-muted-foreground font-semibold mb-1">Date</span>
                          <span className="text-muted-foreground">
                            {format(new Date(order.createdAt), "MMM dd, yyyy • HH:mm")}
                          </span>
                        </div>

                        {/* Total */}
                        <div className="col-span-1 md:col-span-2 text-left md:text-right">
                          <span className="md:hidden text-xs text-muted-foreground font-semibold mr-2">Total:</span>
                          <span className="font-bold text-foreground text-base">
                            {formatCurrency(order.totalAmount)}
                          </span>
                        </div>

                        {/* Item Count */}
                        <div className="col-span-1 md:col-span-2 text-left md:text-right text-xs text-muted-foreground">
                          {order.items.length} product(s)
                        </div>
                      </div>
                    </AccordionTrigger>

                    {/* Details */}
                    <AccordionContent className="bg-muted/30 px-6 border-t border-border">
                      <div className="py-4 space-y-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Order Items</p>
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 bg-background rounded-lg border border-border/50 hover:border-border transition-colors">
                            <div className="h-16 w-16 rounded-md bg-muted overflow-hidden shrink-0 border border-border">
                            <Link href={`/detail/${item.productId}`}>
                            <img 
                                  src={item.imageUrl || '/placeholder.png'} 
                                  alt={item.title} 
                                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                               />
                            </Link>

                               
                            </div>

                            <Link href={`/detail/${item.productId}`} className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-foreground truncate">{item.title}</h4>
                              {/* <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                <span className="bg-muted px-2 py-0.5 rounded">Qty: {item.quantity}</span>
                              </div> */}
                            </Link>

                            <div className="text-right">
                              <div className="font-medium text-foreground">
                                {formatCurrency(item.price)}
                              </div>
                              {item.quantity > 1 && (
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {formatCurrency(item.price / item.quantity)} / ea
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* --- PAGINATION --- */}
              {meta.totalPages > 0 && (
                <div className="flex justify-center pt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(currentPage - 1)}
                          className={cn("cursor-pointer", currentPage === 1 && "pointer-events-none opacity-50")}
                        />
                      </PaginationItem>
                      
                      {/* Logic hiển thị số trang */}
                      {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((page) => {
                         // Hiển thị trang đầu, trang cuối, và trang hiện tại +/- 1
                         if (
                            page === 1 || 
                            page === meta.totalPages || 
                            (page >= currentPage - 1 && page <= currentPage + 1)
                         ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink 
                                  isActive={page === currentPage}
                                  onClick={() => handlePageChange(page)}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            )
                         }
                         
                         // Hiển thị dấu ...
                         if (page === currentPage - 2 || page === currentPage + 2) {
                            return <PaginationItem key={page}><PaginationEllipsis /></PaginationItem>
                         }
                         return null;
                      })}

                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(currentPage + 1)}
                          className={cn("cursor-pointer", currentPage === meta.totalPages && "pointer-events-none opacity-50")}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}