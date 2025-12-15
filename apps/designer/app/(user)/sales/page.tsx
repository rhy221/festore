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
import { format } from 'date-fns';
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
import { Badge } from "@workspace/ui/components/badge";
import { Card } from '@workspace/ui/components/card';
import http from '@/lib/http'; // Đảm bảo import đúng
// Import hàm formatCurrency của bạn
import { formatCurrency } from '@/lib/utils'; // Hoặc để inline

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
  // --- STATE ---
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  const [searchQuery, setSearchQuery] = useState(''); // State cho tìm kiếm
  const [saleType, setSaleType] = useState('all');    // State cho filter type
  
  // Debounce search value để tránh call API quá nhiều
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<SalesSummary>({ totalItemsSold: 0, totalRevenue: 0 });
  const [orders, setOrders] = useState<SalesOrder[]>([]);

  // Effect để debounce search input (delay 500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // --- FETCH DATA ---
  const fetchSalesData = async () => {
    if (!date?.from || !date?.to) return;

    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        startDate: date.from.toISOString(),
        endDate: date.to.toISOString(),
        type: saleType, // Gửi type
        search: debouncedSearch, // Gửi search text
      });

      const res = await http.get('/sales', { params: queryParams });
      const data = res.data;
      setSummary(data.summary);
      setOrders(data.orders);
    } catch (error) {
      console.error('Failed to fetch sales:', error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch khi Date, Type, hoặc Debounced Search thay đổi
  useEffect(() => {
    if (date?.from && date?.to) {
      fetchSalesData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, saleType, debouncedSearch]);

  const handleReset = () => {
    setSearchQuery('');
    setSaleType('all');
    setDate({
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- HEADER --- */}
        <div className="flex items-center gap-6 text-sm font-semibold text-muted-foreground uppercase tracking-wide border-b border-border pb-4">
          <span className="text-foreground cursor-pointer border-b-2 border-primary -mb-[17px] pb-4">Item Sales</span>
        </div>

        {/* --- CONTROLS BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          {/* Left: Date Picker */}
          <div className="flex justify-start">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-auto justify-start text-left font-normal rounded-full border-border/60 bg-muted/30",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "MMM d, yyyy")} - {format(date.to, "MMM d, yyyy")}
                      </>
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
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Right: Search & Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search Order No. or Item Name" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-full bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            {/* Filter Select */}
            <Select value={saleType} onValueChange={setSaleType}>
              <SelectTrigger className="w-[110px] rounded-full bg-muted/50 border-transparent focus:bg-background">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="fixed">Store</SelectItem>
                <SelectItem value="auction">Auction</SelectItem>
              </SelectContent>
            </Select>

            {/* Reset Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReset}
              className="text-muted-foreground hover:text-foreground rounded-full px-3"
            >
              <RotateCcw className="h-4 w-4 mr-1" /> Reset
            </Button>
          </div>
        </div>

        {/* --- SUMMARY CARDS --- */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="flex flex-col items-center justify-center p-8 border-border/60 bg-card/50">
            <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Items Sold</span>
            <span className="text-4xl font-bold text-foreground">
               {loading ? <Loader2 className="animate-spin h-8 w-8" /> : summary.totalItemsSold}
            </span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-8 border-border/60 bg-card/50">
            <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Total Revenue</span>
            <span className="text-4xl font-bold text-foreground">
               {loading ? <Loader2 className="animate-spin h-8 w-8" /> : formatCurrency(summary.totalRevenue)}
            </span>
          </Card>
        </div>

        {/* --- TABLE HEADER --- */}
        <div className="border-t border-b border-border py-3 grid grid-cols-12 gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4">
            <div className="col-span-3">Order No.</div>
            <div className="col-span-5 flex items-center gap-1">
                Item Information
            </div>
            <div className="col-span-2 text-right">Revenue</div>
            <div className="col-span-2 text-right">Date</div>
        </div>

        {/* --- ORDERS LIST --- */}
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
            <Accordion type="single" collapsible className="w-full">
              {orders.map((order) => (
                <AccordionItem key={order._id} value={order._id} className="border-b border-border last:border-0">
                  <AccordionTrigger className="hover:no-underline py-4 px-4 hover:bg-muted/30 rounded-sm group transition-all">
                    <div className="grid grid-cols-12 gap-4 w-full items-center text-sm">
                      {/* Order No */}
                      <div className="col-span-3 text-left font-mono text-muted-foreground truncate" title={order._id}>
                        #{order._id.slice(-6).toUpperCase()}
                      </div>
                      
                      {/* Item Info Summary */}
                      <div className="col-span-5 text-left">
                          <div className="text-foreground font-medium truncate flex items-center gap-2">
                             {order.items.length > 1 ? (
                                 <Badge variant="secondary" className="px-2 py-0.5">
                                     {order.items.length} items
                                 </Badge>
                             ) : null}
                             <span className="truncate">{order.items[0]?.title || 'Unknown Product'}</span>
                          </div>
                      </div>

                      {/* Revenue */}
                      <div className="col-span-2 text-right font-medium text-foreground">
                        {formatCurrency(order.sellerOrderTotal)}
                      </div>

                      {/* Date */}
                      <div className="col-span-2 text-right text-muted-foreground text-xs">
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
                            <p className="font-medium text-sm text-foreground">{item.title}</p>
                            <p className="text-xs text-muted-foreground font-mono mt-1">ID: {item.productId}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-foreground">
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

      </div>
    </div>
  );
}