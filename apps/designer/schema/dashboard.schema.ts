
export type MonthlyReportData = {
  totalRevenue: number;
  directSales: number;
  auctionSales: number;
  growthRate: number;
  weeklyData: {
    week: string;
    direct: number;
    auction: number;
  }[];
}

export type SalesHistoryItem = {
    designId: string,
    title: string,
    imageUrl: string,
    price: number,
    type: "fixed" | "auction"
}

export type SalesHistoryDataItem = {
     _id: string,
    items: SalesHistoryItem[],
    totalAmount: 450000,
    customerId: string,
    createdAt: string,
    itemCount: number,
    orderDate: string
}


export type SalesHistoryData = {
    data: SalesHistoryDataItem[],
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number,
        hasNext: boolean,
        hasPrev: boolean
    }
}