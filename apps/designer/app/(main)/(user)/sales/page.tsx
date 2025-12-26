// "use client"
// import React, { useState } from 'react';
// import { Search, Calendar, ChevronDown, Info, Smile } from 'lucide-react';

// export default function SalesPage() {
//   const [activeTab, setActiveTab] = useState<'ORDER' | 'PAYOUT' | 'INFO'>('ORDER');

//   return (
//     <div className="min-h-screen bg-[#0f0f10] text-white container mx-auto px-40 py-12 ">
//       {/* Main Tabs */}
//       <div className="flex gap-8 mb-10">
//         {['ORDER', 'PAYOUT', 'INFO'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab as any)}
//             className={`text-xl font-bold tracking-wider transition-colors ${
//               activeTab === tab ? 'text-white' : 'text-gray-600 hover:text-gray-400'
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {activeTab === 'ORDER' && <OrderTab />}
//       {activeTab === 'PAYOUT' && <PayoutTab />}
//       {activeTab === 'INFO' && <div className="text-gray-500 p-8 text-center">Info Content Placeholder</div>}
//     </div>
//   );
// };

// const OrderTab: React.FC = () => {
//   return (
//     <div className="animate-in fade-in duration-500 space-y-8">
//       {/* Filter Section */}
//       <div className="bg-[#121212] border border-gray-800/50 rounded p-6 space-y-6">
//         {/* Row 1: Keyword */}
//         <div className="space-y-2">
//           <label className="text-xs text-gray-400 font-bold">Keyword</label>
//           <div className="relative">
//             <input 
//               type="text" 
//               placeholder="Order ID, Item Name" 
//               className="w-full bg-[#1a1a1a] border border-gray-700 rounded px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gray-500"
//             />
//           </div>
//         </div>

//         <div className="h-[1px] bg-gray-800 w-full" />

//         {/* Row 2: Filters */}
//         <div className="flex flex-col md:flex-row gap-6 items-end relative">
//           <div className="space-y-2 flex-1">
//             <label className="text-xs text-gray-400 font-bold">Date (UTC)</label>
//             <div className="relative">
//               <div className="w-full bg-[#1a1a1a] border border-gray-700 rounded px-4 py-3 text-sm text-gray-300 flex items-center justify-between cursor-pointer hover:border-gray-500">
//                 <span>Nov 1, 2025 - Nov 21, 2025</span>
//                 <Calendar size={16} className="text-gray-500" />
//               </div>
//             </div>
//           </div>

//           <div className="space-y-2 w-full md:w-40">
//             <label className="text-xs text-gray-400 font-bold">Store</label>
//             <div className="relative">
//               <div className="w-full bg-[#1a1a1a] border border-gray-700 rounded px-4 py-3 text-sm text-primary flex items-center justify-between cursor-pointer">
//                 <span>All</span>
//                 <ChevronDown size={14} />
//               </div>
//             </div>
//           </div>

//           <div className="space-y-2 w-full md:w-40">
//              <label className="text-xs text-gray-400 font-bold">Paid Option</label>
//              <div className="relative">
//               <div className="w-full bg-[#1a1a1a] border border-gray-700 rounded px-4 py-3 text-sm text-primary flex items-center justify-between cursor-pointer">
//                 <span>All</span>
//                 <ChevronDown size={14} />
//               </div>
//             </div>
//           </div>

//            <div className="flex items-center gap-4 ml-auto pb-1">
//               <button className="text-xs font-bold text-white hover:text-gray-300 uppercase">Reset</button>
//               <button className="text-white hover:text-primary transition-colors">
//                 <Search size={24} />
//               </button>
//            </div>
//         </div>
//       </div>

//       {/* Summary Box */}
//       <div className="bg-[#202022] rounded p-8 flex gap-12 items-center">
//          <div>
//             <p className="text-xs text-gray-500 font-bold mb-1">Items</p>
//             <p className="text-xl font-bold">0</p>
//          </div>
//          <div>
//             <p className="text-xs text-gray-500 font-bold mb-1">Sales</p>
//             <p className="text-xl font-bold">$0.00</p>
//          </div>
//       </div>

//       {/* Table Section */}
//       <div>
//          <div className="flex justify-end mb-4">
//             <div className="flex items-center gap-2 border-b border-gray-600 pb-1 cursor-pointer">
//                <span className="text-sm">20</span>
//                <ChevronDown size={14} />
//             </div>
//          </div>

//          <div className="w-full">
//             {/* Header */}
//             <div className="flex items-center border-y border-gray-700 py-4 text-xs font-bold text-white">
//                <div className="w-20 pl-4">No.</div>
//                <div className="flex-1 flex items-center gap-2">
//                  Item Information / Use Cases
//                  <Info size={12} className="text-gray-500" />
//                </div>
//                <div className="w-40 text-right">Revenue</div>
//                <div className="w-40 text-right pr-4">Date (UTC)</div>
//             </div>

//             {/* Empty State Row */}
//             <div className="py-12 text-center text-gray-600 text-sm border-b border-gray-800">
//                No data available
//             </div>
//          </div>
//       </div>
//     </div>
//   );
// };

// const PayoutTab: React.FC = () => {
//   return (
//     <div className="animate-in fade-in duration-500 space-y-10">
//        {/* Top Cards */}
//        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          
//           {/* Total Card */}
//           <div className="bg-[#1a1a1a] border border-gray-800 rounded p-6 flex flex-col justify-between h-40">
//              <div>
//                <div className="flex items-baseline gap-2">
//                   <h3 className="font-bold text-lg">Total</h3>
//                   <span className="text-[10px] text-gray-500">Payout up to the previous month.</span>
//                </div>
//                <p className="text-xs text-gray-500 font-bold mt-4 mb-1">Amount</p>
//                <p className="text-2xl font-medium">$0.00</p>
//              </div>
//           </div>

//           {/* Current Range Card */}
//           <div className="bg-[#1a1a1a] border border-gray-800 rounded p-6 h-40">
//              <div className="flex items-center gap-2 mb-6">
//                <span className="text-primary font-bold text-sm">Oct 1, 2025 ~ Oct 31, 2025</span>
//                <span className="text-[10px] text-gray-500">Expected Revenue for this month.</span>
//              </div>

//              <div className="flex gap-12 items-start">
//                 <div>
//                   <p className="text-xs text-white font-bold mb-1">Expected Amount</p>
//                   <p className="text-xl font-medium">$0.00</p>
//                 </div>
//                 <div className="flex-1">
//                    <div className="flex justify-between items-start mb-2">
//                       <div>
//                          <p className="text-xs text-white font-bold mb-1">Expected Payout Date</p>
//                          <p className="text-sm text-gray-400">-</p>
//                       </div>
//                       <div className="text-right">
//                          <div className="flex justify-between text-[10px] text-gray-500 w-64 mb-1">
//                             <span>$0.00</span>
//                             <span>$50.00</span>
//                          </div>
//                          <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
//                             <div className="h-full bg-gray-500 w-0"></div>
//                          </div>
//                          <p className="text-[10px] text-gray-500 mt-1">Paid when expected amount is $50.00 or more</p>
//                       </div>
//                    </div>
//                 </div>
//              </div>
//           </div>
//        </div>

//        {/* List Section */}
//        <div>
//           <p className="text-xs text-gray-400 mb-4">Total: 0</p>
//           <div className="w-full">
//               {/* Header */}
//               <div className="flex items-center border-y border-gray-700 py-4 text-xs font-bold text-white">
//                  <div className="w-1/4 pl-4">Payout Date</div>
//                  <div className="w-1/4">Period</div>
//                  <div className="w-1/4 text-right">Amount</div>
//                  <div className="w-1/4 text-right pr-4">Detail</div>
//               </div>

//               {/* Empty State Placeholder */}
//               <div className="flex flex-col items-center justify-center py-32 gap-4">
//                   {/* Custom Icon resembling the screenshot */}
//                   <div className="w-12 h-12 border-2 border-white rounded-lg flex items-end justify-center pb-2 relative">
//                       <div className="w-1 h-3 bg-white absolute top-2"></div>
//                       <div className="w-6 h-3 border-b-2 border-white rounded-full"></div>
//                   </div>
//               </div>
//           </div>
//        </div>
//     </div>
//   );
// };


// 'use client';

// import { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
// import { DateRange } from 'react-day-picker';
// import { Button } from '@workspace/ui/components/button';
// import { Calendar } from '@workspace/ui/components/calendar';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@workspace/ui/components/popover';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@workspace/ui/components/card';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@workspace/ui/components/accordion';
// import { cn } from '@workspace/ui/lib/utils';

// // Type định nghĩa dựa trên kết quả trả về từ Backend
// interface SalesItem {
//   title: string;
//   price: number;
//   imageUrl: string;
//   productId: string;
// }

// interface SalesOrder {
//   _id: string;
//   orderDate: string;
//   sellerOrderTotal: number;
//   items: SalesItem[];
// }

// interface SalesSummary {
//   totalItemsSold: number;
//   totalRevenue: number;
// }

// export default function SalesReportPage() {
//   const [date, setDate] = useState<DateRange | undefined>({
//     from: new Date(new Date().setDate(new Date().getDate() - 30)), // Mặc định 30 ngày qua
//     to: new Date(),
//   });

//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState<SalesSummary>({ totalItemsSold: 0, totalRevenue: 0 });
//   const [orders, setOrders] = useState<SalesOrder[]>([]);

//   const fetchSalesData = async () => {
//     if (!date?.from || !date?.to) return;

//     setLoading(true);
//     try {
//       const query = new URLSearchParams({
//         startDate: date.from.toISOString(),
//         endDate: date.to.toISOString(),
//       });

//       // Thay thế bằng đường dẫn API thực tế của bạn
//       const res = await fetch(`/api/sales?${query}`, {
//         method: 'GET',
//         headers: {
//             // 'Authorization': `Bearer ${token}` 
//         }
//       });
//       const data = await res.json();
      
//       setSummary(data.summary);
//       setOrders(data.orders);
//     } catch (error) {
//       console.error('Failed to fetch sales:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Tự động fetch khi chọn ngày xong
//   useEffect(() => {
//     if (date?.from && date?.to) {
//       fetchSalesData();
//     }
//   }, [date]);

//   return (
//     <div className="container mx-auto py-10 space-y-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <h1 className="text-3xl font-bold tracking-tight">Sales Report</h1>
        
//         {/* Date Picker Component */}
//         <div className="grid gap-2">
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 id="date"
//                 variant={"outline"}
//                 className={cn(
//                   "w-[300px] justify-start text-left font-normal",
//                   !date && "text-muted-foreground"
//                 )}
//               >
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {date?.from ? (
//                   date.to ? (
//                     <>
//                       {format(date.from, "LLL dd, y")} -{" "}
//                       {format(date.to, "LLL dd, y")}
//                     </>
//                   ) : (
//                     format(date.from, "LLL dd, y")
//                   )
//                 ) : (
//                   <span>Pick a date range</span>
//                 )}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="end">
//               <Calendar
//                 initialFocus
//                 mode="range"
//                 defaultMonth={date?.from}
//                 selected={date}
//                 onSelect={setDate}
//                 numberOfMonths={2}
//               />
//             </PopoverContent>
//           </Popover>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//             <span className="text-muted-foreground">$</span>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {loading ? "..." : `$${summary.totalRevenue.toLocaleString()}`}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               in selected period
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Designs Sold</CardTitle>
//             <span className="text-muted-foreground">📦</span>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {loading ? "..." : summary.totalItemsSold}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               successful sales
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Orders List (Collapsible) */}
//       <div className="bg-background rounded-lg border p-4">
//         <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        
//         {loading ? (
//           <div className="flex justify-center py-8">
//             <Loader2 className="h-8 w-8 animate-spin" />
//           </div>
//         ) : orders.length === 0 ? (
//           <div className="text-center py-8 text-muted-foreground">
//             No sales found in this period.
//           </div>
//         ) : (
//           <Accordion type="single" collapsible className="w-full">
//             {orders.map((order) => (
//               <AccordionItem key={order._id} value={order._id}>
//                 <AccordionTrigger className="hover:no-underline px-4 hover:bg-muted/50 rounded-md">
//                   <div className="flex flex-1 justify-between items-center pr-4">
//                     <div className="text-left">
//                       <div className="font-semibold">Order #{order._id.slice(-6).toUpperCase()}</div>
//                       <div className="text-sm text-muted-foreground">
//                         {format(new Date(order.orderDate), "MMM dd, yyyy HH:mm")}
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="font-bold text-green-600">
//                         +${order.sellerOrderTotal.toLocaleString()}
//                       </div>
//                       <div className="text-xs text-muted-foreground">
//                         {order.items.length} item(s)
//                       </div>
//                     </div>
//                   </div>
//                 </AccordionTrigger>
//                 <AccordionContent className="px-4 pt-2 pb-4">
//                   <div className="space-y-2 mt-2">
//                     {order.items.map((item, index) => (
//                       <div key={index} className="flex items-center gap-4 py-2 border-b last:border-0">
//                         <div className="h-12 w-12 rounded bg-gray-100 overflow-hidden relative">
//                            {/* Dùng thẻ img hoặc Next/Image */}
//                            <img 
//                               src={item.imageUrl || '/placeholder.png'} 
//                               alt={item.title} 
//                               className="object-cover w-full h-full"
//                            />
//                         </div>
//                         <div className="flex-1">
//                           <p className="font-medium text-sm">{item.title}</p>
//                           <p className="text-xs text-muted-foreground">ID: {item.productId}</p>
//                         </div>
//                         <div className="font-medium">
//                           ${item.price.toLocaleString()}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         )}
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { format } from 'date-fns';
// import { 
//   Calendar as CalendarIcon, 
//   Loader2, 
//   Search, 
//   RotateCcw
// } from 'lucide-react';
// import { DateRange } from 'react-day-picker';

// import { cn } from '@workspace/ui/lib/utils';
// import { Button } from '@workspace/ui/components/button';
// import { Calendar } from '@workspace/ui/components/calendar';
// import { Input } from '@workspace/ui/components/input';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@workspace/ui/components/popover';
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@workspace/ui/components/accordion';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@workspace/ui/components/select";
// import { Badge } from "@workspace/ui/components/badge";
// import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
// import http from '@/lib/http';

// // --- INTERFACES ---
// interface SalesItem {
//   title: string;
//   price: number;
//   imageUrl: string;
//   productId: string;
// }

// interface SalesOrder {
//   _id: string;
//   orderDate: string;
//   sellerOrderTotal: number;
//   items: SalesItem[];
// }

// interface SalesSummary {
//   totalItemsSold: number;
//   totalRevenue: number;
// }

// export default function SalesReportPage() {
//   // --- STATE ---
//   const [date, setDate] = useState<DateRange | undefined>({
//     from: new Date(new Date().setDate(new Date().getDate() - 30)),
//     to: new Date(),
//   });

//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState<SalesSummary>({ totalItemsSold: 0, totalRevenue: 0 });
//   const [orders, setOrders] = useState<SalesOrder[]>([]);
//   const [activeTab, setActiveTab] = useState<'order' | 'payout'>('order');

//   // --- FETCH DATA ---
//   const fetchSalesData = async () => {
//     if (!date?.from || !date?.to) return;

//     setLoading(true);
//     try {
//       const query = new URLSearchParams({
//         startDate: date.from.toISOString(),
//         endDate: date.to.toISOString(),
//       });

//       // const res = await fetch(`/api/sales?${query}`); 
//       const res = await http.get('/sales', { params: query });
//       const data = res.data;
//       setSummary(data.summary);
//       setOrders(data.orders);
//     } catch (error) {
//       console.error('Failed to fetch sales:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (date?.from && date?.to) {
//       fetchSalesData();
//     }
//   }, [date]);

//   return (
//     <div className="container mx-auto p-6 space-y-8 font-sans">
//       <div className="max-w-7xl mx-auto space-y-8">
        
//         {/* --- HEADER TABS --- */}
//         <div className="flex items-center gap-6 text-sm font-semibold text-muted-foreground uppercase tracking-wide border-b border-border pb-4">
//           <span className="text-foreground cursor-pointer border-b-2 border-primary -mb-[17px] pb-4">Item Sales</span>
//           {/* <span className="hover:text-foreground cursor-pointer transition-colors">Referral</span>
//           <span className="hover:text-foreground cursor-pointer transition-colors">Info</span> */}
//         </div>

//         {/* --- CONTROLS BAR --- */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
//           {/* Left: Toggle Buttons */}
//           {/* <div className="flex bg-muted p-1 rounded-full">
//             <button
//               onClick={() => setActiveTab('order')}
//               className={cn(
//                 "px-6 py-1.5 rounded-full text-sm font-medium transition-all",
//                 activeTab === 'order' 
//                   ? "bg-background text-foreground shadow-sm" 
//                   : "text-muted-foreground hover:text-foreground"
//               )}
//             >
//               Order
//             </button>
//             <button
//               onClick={() => setActiveTab('payout')}
//               className={cn(
//                 "px-6 py-1.5 rounded-full text-sm font-medium transition-all",
//                 activeTab === 'payout' 
//                   ? "bg-background text-foreground shadow-sm" 
//                   : "text-muted-foreground hover:text-foreground"
//               )}
//             >
//               Payout
//             </button>
//           </div> */}

//           {/* Right: Search & Filters */}
//           <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
//             {/* Search Input */}
//             <div className="relative flex-1 md:w-80">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input 
//                 placeholder="Search for Order No., Item Name" 
//                 className="pl-9 rounded-full bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-ring"
//               />
//             </div>

//             {/* Filter Selects */}
//             <Select>
//               <SelectTrigger className="w-[110px] rounded-full bg-muted/50 border-transparent focus:bg-background">
//                 <SelectValue placeholder="All" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All</SelectItem>
//                 <SelectItem value="fixed">Store</SelectItem>
//                 <SelectItem value="auction">Auction</SelectItem>

//               </SelectContent>
//             </Select>

//             {/* <Select>
//               <SelectTrigger className="w-[140px] rounded-full bg-muted/50 border-transparent focus:bg-background">
//                 <SelectValue placeholder="Paid Option" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Option: All</SelectItem>
//               </SelectContent>
//             </Select> */}

//             {/* Reset Button */}
//             <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-full px-3">
//               <RotateCcw className="h-4 w-4 mr-1" /> Reset
//             </Button>
//           </div>
//         </div>

//         {/* --- DATE PICKER (Centered) --- */}
//         <div className="flex justify-center py-2">
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 id="date"
//                 variant="ghost"
//                 className={cn(
//                   "w-auto justify-center text-center font-normal hover:bg-muted/50",
//                   !date && "text-muted-foreground"
//                 )}
//               >
//                 {date?.from ? (
//                   date.to ? (
//                     <span className="text-xl font-medium flex items-center gap-2 text-foreground">
//                       {format(date.from, "MMM d, yyyy")} <span className="text-muted-foreground">~</span> {format(date.to, "MMM d, yyyy")}
//                       <CalendarIcon className="ml-2 h-5 w-5 text-muted-foreground" />
//                     </span>
//                   ) : (
//                     format(date.from, "MMM d, yyyy")
//                   )
//                 ) : (
//                   <span>Pick a date range</span>
//                 )}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="center">
//               <Calendar
//                 initialFocus
//                 mode="range"
//                 defaultMonth={date?.from}
//                 selected={date}
//                 onSelect={setDate}
//                 numberOfMonths={2}
//               />
//             </PopoverContent>
//           </Popover>
//         </div>

//         {/* --- SUMMARY CARDS --- */}
//         <div className="grid grid-cols-2 gap-6">
//           <Card className="flex flex-col items-center justify-center p-8 border-border/60 bg-card/50">
//             <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Items</span>
//             <span className="text-4xl font-bold text-foreground">
//                {loading ? <Loader2 className="animate-spin h-8 w-8" /> : summary.totalItemsSold}
//             </span>
//           </Card>
//           <Card className="flex flex-col items-center justify-center p-8 border-border/60 bg-card/50">
//             <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Sales</span>
//             <span className="text-4xl font-bold text-foreground">
//                {loading ? <Loader2 className="animate-spin h-8 w-8" /> : `$${summary.totalRevenue.toLocaleString()}`}
//             </span>
//           </Card>
//         </div>

//         {/* --- TABLE HEADER --- */}
//         <div className="flex justify-end mb-2">
//            <Select defaultValue="20">
//               <SelectTrigger className="w-[70px] border-none shadow-none text-muted-foreground h-8">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="20">20</SelectItem>
//                 <SelectItem value="50">50</SelectItem>
//               </SelectContent>
//             </Select>
//         </div>
        
//         <div className="border-t border-b border-border py-3 grid grid-cols-12 gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4">
//             <div className="col-span-2">Order No.</div>
//             <div className="col-span-6 flex items-center gap-1">
//                 Item Information / Use Cases 
//             </div>
//             <div className="col-span-2 text-right">Revenue</div>
//             <div className="col-span-2 text-right">Date (UTC)</div>
//         </div>

//         {/* --- ORDERS LIST (Accordion) --- */}
//         <div className="min-h-[200px]">
//           {loading ? (
//             <div className="flex justify-center py-20">
//               <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
//             </div>
//           ) : orders.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-20 text-muted-foreground space-y-4">
//                <div className="w-16 h-16 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
//                   <span className="text-2xl">📦</span>
//                </div>
//                <p>No sales found within this period</p>
//             </div>
//           ) : (
//             <Accordion type="single" collapsible className="w-full">
//               {orders.map((order) => (
//                 <AccordionItem key={order._id} value={order._id} className="border-b border-border last:border-0">
//                   <AccordionTrigger className="hover:no-underline py-4 px-4 hover:bg-muted/30 rounded-sm group transition-all">
//                     <div className="grid grid-cols-12 gap-4 w-full items-center text-sm">
//                       {/* Order No */}
//                       <div className="col-span-2 text-left font-mono text-muted-foreground">
//                         #{order._id.slice(-6).toUpperCase()}
//                       </div>
                      
//                       {/* Item Info Summary */}
//                       <div className="col-span-6 text-left">
//                          <div className="text-foreground font-medium truncate flex items-center gap-2">
//                             {order.items.length > 1 ? (
//                                 <Badge variant="secondary" className="px-2 py-0.5">
//                                     {order.items.length} items
//                                 </Badge>
//                             ) : null}
//                             <span className="truncate">{order.items[0]?.title || 'Unknown Product'}</span>
//                             {order.items.length > 1 && <span className="text-muted-foreground text-xs">...and more</span>}
//                          </div>
//                       </div>

//                       {/* Revenue */}
//                       <div className="col-span-2 text-right font-medium text-foreground">
//                         ${order.sellerOrderTotal.toLocaleString()}
//                       </div>

//                       {/* Date */}
//                       <div className="col-span-2 text-right text-muted-foreground text-xs">
//                         {format(new Date(order.orderDate), "MMM dd, yyyy")}
//                       </div>
//                     </div>
//                   </AccordionTrigger>

//                   {/* Accordion Content (Chi tiết Item) */}
//                   <AccordionContent className="bg-muted/20 px-4 pb-4 border-t border-border/50">
//                     <div className="pt-4 space-y-3">
//                       {order.items.map((item, index) => (
//                         <div key={index} className="flex items-start gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors">
//                           <div className="h-12 w-12 rounded bg-muted overflow-hidden shrink-0 border border-border">
//                              <img 
//                                 src={item.imageUrl || '/placeholder.png'} 
//                                 alt={item.title} 
//                                 className="object-cover w-full h-full"
//                              />
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="font-medium text-sm text-foreground">{item.title}</p>
//                             <p className="text-xs text-muted-foreground font-mono mt-1">ID: {item.productId}</p>
//                           </div>
//                           <div className="text-right">
//                             <div className="font-medium text-foreground">
//                               ${item.price.toLocaleString()}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { format, parseISO, subDays } from 'date-fns';
import { useRouter, useSearchParams, usePathname } from 'next/navigation'; // 1. Import hooks
import { 
  Calendar as CalendarIcon, 
  Loader2, 
  Search, 
  RotateCcw
} from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@workspace/ui/lib/utils';
import { Button } from '@workspace/ui/components/button';
import { Calendar } from '@workspace/ui/components/calendar';
import { Input } from '@workspace/ui/components/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@workspace/ui/components/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@workspace/ui/components/pagination';
import { Badge } from "@workspace/ui/components/badge";
import { Card } from '@workspace/ui/components/card';
import http from '@/libs/http';
import { formatCurrency } from '@/lib/utils';

interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}


// --- INTERFACES ---
interface SalesItem {
  title: string;
  price: number;
  imageUrl: string;
  productId: string;
}

interface SalesOrder {
  _id: string;
  orderDate: string;
  sellerOrderTotal: number;
  items: SalesItem[];
}

interface SalesSummary {
  totalItemsSold: number;
  totalRevenue: number;
}

export default function SalesReportPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- STATE TỪ URL ---
  const startDateParam = searchParams.get('startDate');
  const endDateParam = searchParams.get('endDate');
  const typeParam = searchParams.get('type') || 'all';
  const searchParam = searchParams.get('search') || '';
  const pageParam = searchParams.get('page'); // Lấy page từ URL

  const initialDateRange: DateRange = {
    from: startDateParam ? parseISO(startDateParam) : subDays(new Date(), 30),
    to: endDateParam ? parseISO(endDateParam) : new Date(),
  };

  const [date, setDate] = useState<DateRange | undefined>(initialDateRange);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<SalesSummary>({ totalItemsSold: 0, totalRevenue: 0 });
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  
  // State meta cho pagination
  const [meta, setMeta] = useState<MetaData>({ page: 1, limit: 10, total: 0, totalPages: 1 });

  // Current page từ URL hoặc default 1
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  // Sync searchQuery & Date
  useEffect(() => {
    setSearchQuery(searchParam);
    if (startDateParam && endDateParam) {
       setDate({ from: parseISO(startDateParam), to: parseISO(endDateParam) });
    }
  }, [searchParam, startDateParam, endDateParam]);

  // --- HELPER UPDATE URL ---
  const updateUrl = (newParams: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === '' || value === null) params.delete(key);
      else params.set(key, String(value));
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  // --- HANDLERS ---
  // Khi search/filter thay đổi -> Reset về trang 1
  const handleSearch = () => updateUrl({ search: searchQuery, page: 1 });
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') handleSearch(); };
  const handleDateSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (range?.from && range?.to) {
      updateUrl({ startDate: range.from.toISOString(), endDate: range.to.toISOString(), page: 1 });
    }
  };
  const handleTypeChange = (value: string) => updateUrl({ type: value, page: 1 });
  
  // Handler chuyển trang
  const handlePageChange = (page: number) => {
    if (page < 1 || page > meta.totalPages) return;
    updateUrl({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll lên đầu
  };

  const handleReset = () => { /* ... giữ nguyên logic reset ... */ };

  // --- FETCH DATA ---
  const fetchSalesData = async () => {
    const fromDate = startDateParam || date?.from?.toISOString();
    const toDate = endDateParam || date?.to?.toISOString();

    if (!fromDate || !toDate) return;

    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        startDate: fromDate,
        endDate: toDate,
        type: typeParam,
        search: searchParam,
        page: currentPage.toString(), // Gửi page lên BE
        limit: '10', // Cố định hoặc lấy từ state
      });

      const res = await http.get('/sales', { params: queryParams });
      const data = res.data;
      
      setSummary(data.summary);
      setOrders(data.orders);
      
      // Cập nhật meta từ response BE
      if (data.meta) {
        setMeta(data.meta);
      }
    } catch (error) {
      console.error('Failed to fetch sales:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, typeParam, startDateParam, endDateParam, currentPage]);

return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 md:space-y-8 font-sans">
      <div className="space-y-6 md:space-y-8">
        {/* --- CONTROLS BAR (Responsive Updated) --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          
          {/* Left: Date Picker (Full width on mobile) */}
          <div className="flex justify-start w-full lg:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full lg:w-auto justify-start text-left font-normal rounded-full border-border/60 bg-muted/30",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <span className="truncate">
                        {format(date.from, "MMM d, yyyy")} - {format(date.to, "MMM d, yyyy")}
                      </span>
                    ) : (
                      format(date.from, "MMM d, yyyy")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={handleDateSelect}
                  numberOfMonths={1} 
                  className="p-3 pointer-events-auto" 
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Right: Search & Filters (Wrap on mobile) */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1 lg:w-80">
              <Search 
                onClick={handleSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" 
              />
              <Input 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-9 rounded-full bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-ring w-full"
              />
            </div>

            {/* Filter & Reset Container */}
            <div className="flex gap-3 w-full sm:w-auto">
               {/* Filter Select */}
               <Select value={typeParam} onValueChange={handleTypeChange}>
                 <SelectTrigger className="flex-1 sm:w-[130px] rounded-full bg-muted/50 border-transparent focus:bg-background">
                   <SelectValue placeholder="All" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">All Types</SelectItem>
                   <SelectItem value="fixed">Store</SelectItem>
                   <SelectItem value="auction">Auction</SelectItem>
                 </SelectContent>
               </Select>

               {/* Reset Button */}
               <Button 
                 variant="ghost" 
                 size="sm" 
                 onClick={handleReset}
                 className="text-muted-foreground hover:text-foreground rounded-full px-4 border border-transparent hover:border-border"
               >
                 <RotateCcw className="h-4 w-4 sm:mr-1" /> 
                 <span className="hidden sm:inline">Reset</span>
               </Button>
            </div>
          </div>
        </div>

        {/* --- SUMMARY CARDS (Responsive Updated: grid-cols-1 on mobile) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card className="flex flex-col items-center justify-center p-6 md:p-8 border-border/60 bg-card/50 shadow-sm">
            <span className="text-muted-foreground text-xs md:text-sm font-medium uppercase tracking-wider mb-2">Items Sold</span>
            <span className="text-3xl md:text-4xl font-bold text-foreground">
               {loading ? <Loader2 className="animate-spin h-8 w-8" /> : summary.totalItemsSold}
            </span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 md:p-8 border-border/60 bg-card/50 shadow-sm">
            <span className="text-muted-foreground text-xs md:text-sm font-medium uppercase tracking-wider mb-2">Total Revenue</span>
            <span className="text-3xl md:text-4xl font-bold text-foreground">
               {loading ? <Loader2 className="animate-spin h-8 w-8" /> : formatCurrency(summary.totalRevenue)}
            </span>
          </Card>
        </div>

        {/* --- TABLE HEADER (Hidden on mobile) --- */}
        <div className="hidden md:grid border-t border-b border-border py-3 grid-cols-12 gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4">
            <div className="col-span-3">Order No.</div>
            <div className="col-span-5 flex items-center gap-1">
               Item Information
            </div>
            <div className="col-span-2 text-right">Revenue</div>
            <div className="col-span-2 text-right">Date</div>
        </div>

        {/* --- ORDERS LIST (Responsive Updated) --- */}
        <div className="min-h-[200px]">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground space-y-4">
               <div className="w-16 h-16 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📦</span>
               </div>
               <p>No sales found matching criteria</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-0">
              {orders.map((order) => (
                <AccordionItem 
                   key={order._id} 
                   value={order._id} 
                   className="border border-border md:border-x-0 md:border-t-0 md:border-b rounded-lg md:rounded-none bg-card md:bg-transparent overflow-hidden"
                >
                  <AccordionTrigger className="hover:no-underline py-4 px-4 hover:bg-muted/30 rounded-sm group transition-all">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 w-full items-start md:items-center text-sm">
                      
                      {/* Mobile Row 1: Order No & Date */}
                      <div className="col-span-1 md:col-span-3 flex justify-between md:block w-full">
                        <div className="flex flex-col text-left">
                           <span className="md:hidden text-xs text-muted-foreground font-semibold">Order ID</span>
                           <span className="font-mono text-muted-foreground truncate" title={order._id}>
                             #{order._id.slice(-6).toUpperCase()}
                           </span>
                        </div>
                        <div className="md:hidden text-right">
                           <span className="text-xs text-muted-foreground block font-semibold">Date</span>
                           <span className="text-xs text-muted-foreground">{format(new Date(order.orderDate), "dd/MM")}</span>
                        </div>
                      </div>
                      
                      {/* Item Info Summary */}
                      <div className="col-span-1 md:col-span-5 text-left w-full mt-2 md:mt-0">
                          <div className="text-foreground font-medium flex items-center gap-2">
                             {order.items.length > 1 ? (
                                 <Badge variant="secondary" className="px-2 py-0.5 shrink-0">
                                     {order.items.length} items
                                 </Badge>
                             ) : null}
                             <span className="truncate flex-1">{order.items[0]?.title || 'Unknown Product'}</span>
                          </div>
                      </div>

                      {/* Revenue */}
                      <div className="col-span-1 md:col-span-2 text-left md:text-right font-medium text-foreground w-full flex justify-between md:block mt-1 md:mt-0">
                        <span className="md:hidden text-xs text-muted-foreground">Total:</span>
                        {formatCurrency(order.sellerOrderTotal)}
                      </div>

                      {/* Date (Desktop Only) */}
                      <div className="hidden md:block col-span-2 text-right text-muted-foreground text-xs">
                        {format(new Date(order.orderDate), "dd/MM/yyyy")}
                      </div>
                    </div>
                  </AccordionTrigger>

                  {/* Chi tiết Item */}
                  <AccordionContent className="bg-muted/20 px-4 pb-4 border-t border-border/50">
                    <div className="pt-4 space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors">
                          <div className="h-12 w-12 rounded bg-muted overflow-hidden shrink-0 border border-border">
                             <img 
                                src={item.imageUrl || '/placeholder.png'} 
                                alt={item.title} 
                                className="object-cover w-full h-full"
                             />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground line-clamp-2">{item.title}</p>
                            <p className="text-xs text-muted-foreground font-mono mt-1 truncate">ID: {item.productId}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-medium text-foreground text-sm">
                              {formatCurrency(item.price)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
          {meta.totalPages > 0 && !loading && orders.length > 0 && (
            <div className="flex justify-center pt-4 overflow-x-auto pb-2">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={cn("cursor-pointer", currentPage === 1 && "pointer-events-none opacity-50")}
                    />
                  </PaginationItem>
                  
                  {/* Logic hiển thị trang thông minh */}
                  {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((page) => {
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
    </div>
  );
}