import { MonthlyReportData, SalesHistoryData } from "@/schema/dashboard.schema";
import  http  from "../lib/http";



export interface CategoryData {
  id: number;
  name: string;
  value: number;
  amount: number;
  count: number;
}

// export interface SalesHistoryItem {
//   id: number;
//   designId: number;
//   designName: string;
//   designImage: string;
//   buyerName: string;
//   saleType: "direct" | "auction";
//   price: number;
//   date: string;
//   status: "completed" | "processing" | "cancelled";
// }

export const dashboardApi = {
  getMonthlyReport: async (month: string)  => {
    // Simulate API call with jsonplaceholder + mock data
    const time = month.split("/");
    const response = await http.get(`/analytics/revenue-by-week?month=${time[0]}&year=${time[1]}`); // Just to simulate delay
    return response.data;
    // Mock data based on month
    // return {
    //   totalRevenue: 344000000,
    //   directSales: 162,
    //   auctionSales: 83,
    //   growthRate: 12.5,
    //   weeklyData: [
    //     { week: "Tuần 0", direct: 10, auction: 5 },
    //     { week: "Tuần 1", direct: 25, auction: 20 },
    //     { week: "Tuần 2", direct: 30, auction: 22 },
    //     { week: "Tuần 3", direct: 50, auction: 28 },
    //     { week: "Tuần 4", direct: 60, auction: 40 },
    //     { week: "Tuần 5", direct: 15, auction: 10 },
    //   ],
    // };
  },

  getCategoryAnalysis: async (): Promise<CategoryData[]> => {
    const response = await http.get("/posts"); // Simulate delay
    
    return [
      { id: 1, name: "Giày", value: 70, amount: 112500000, count: 70 },
      { id: 2, name: "Dạ hội", value: 64, amount: 96000000, count: 64 },
      { id: 3, name: "Đường phố", value: 50, amount: 50400000, count: 50 },
      { id: 4, name: "Phụ kiện", value: 29, amount: 57500000, count: 29 },
      { id: 5, name: "Unisex", value: 33, amount: 66000000, count: 33 },
      { id: 6, name: "Trẻ em", value: 12, amount: 30000000, count: 12 },
    ];
  },

  getSalesHistory: async () => {
    const response = await http.get<SalesHistoryData>("analytics/sales-history?page=1&limit=10"); // Simulate delay
    return response.data;
    // return [
    //   {
    //     id: 1,
    //     designId: 101,
    //     designName: "Giày thể thao Nike Air",
    //     designImage: "https://picsum.photos/seed/shoe1/200/200",
    //     buyerName: "Nguyễn Văn A",
    //     saleType: "direct",
    //     price: 2500000,
    //     date: "2024-01-15",
    //     status: "completed",
    //   },
    //   {
    //     id: 2,
    //     designId: 102,
    //     designName: "Giày chạy bộ Adidas",
    //     designImage: "https://picsum.photos/seed/shoe2/200/200",
    //     buyerName: "Nguyễn Văn B",
    //     saleType: "auction",
    //     price: 1800000,
    //     date: "2024-01-13",
    //     status: "processing",
    //   },
    //   {
    //     id: 3,
    //     designId: 103,
    //     designName: "Giày sneaker Puma",
    //     designImage: "https://picsum.photos/seed/shoe3/200/200",
    //     buyerName: "Nguyễn Văn C",
    //     saleType: "direct",
    //     price: 2500000,
    //     date: "2024-01-11",
    //     status: "cancelled",
    //   },
    // ];
  },
};