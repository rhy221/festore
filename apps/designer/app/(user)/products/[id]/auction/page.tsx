"use client";
import React from "react";
import AuctionTimer from "../../../../components/AuctionTimer";
import BiddingHistory from "../../../../components/BiddingHistory";
import AuctionInfo from "../../../../components/AuctionInfo";

// API Data Interfaces
interface Bidder {
  id: string;
  name: string;
  avatar?: string;
}

interface Bid {
  id: string;
  bidder: Bidder;
  amount: number;
  timestamp: string;
  isWinning?: boolean;
}

interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  material: string;
  description?: string;
  images: string[];
  designerId: string;
  designerName: string;
}

interface AuctionData {
  id: string;
  product: Product;
  currentPrice: number;
  startingPrice: number;
  bidIncrement: number;
  startTime: string;
  endTime: string;
  participants: number;
  totalBids: number;
  status: "active" | "ended" | "pending";
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  bids: Bid[];
}

// API Response Interface
interface AuctionApiResponse {
  success: boolean;
  data: AuctionData;
  message?: string;
}

// Mock auction data - API ready structure
const mockAuctionData: AuctionData = {
  id: "000001",
  product: {
    id: "product_001",
    name: "Thông Tin Mẫu Thiết Kế",
    code: "SP001",
    category: "Thời trang",
    material: "Cotton",
    description: "Thiết kế áo thời trang hiện đại",
    images: ["/images/product1.jpg", "/images/product2.jpg"],
    designerId: "designer_001",
    designerName: "Nhà thiết kế XYZ",
  },
  currentPrice: 5400000,
  startingPrice: 2000000,
  bidIncrement: 200000,
  startTime: "18:00 15/01/2024",
  endTime: "00:00 19/01/2024",
  participants: 3,
  totalBids: 4,
  status: "active",
  timeRemaining: {
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  bids: [
    {
      id: "bid1",
      bidder: {
        id: "user_001",
        name: "Khách hàng 1",
        avatar: "/images/avatar1.jpg",
      },
      amount: 5400000,
      timestamp: "14:30",
      isWinning: true,
    },
    {
      id: "bid2",
      bidder: {
        id: "user_002",
        name: "Khách hàng 2",
        avatar: "/images/avatar2.jpg",
      },
      amount: 5200000,
      timestamp: "14:25",
    },
    {
      id: "bid4",
      bidder: {
        id: "user_002",
        name: "Khách hàng 2",
        avatar: "/images/avatar2.jpg",
      },
      amount: 5200000,
      timestamp: "14:50",
    },
    {
      id: "bid3",
      bidder: {
        id: "user_003",
        name: "Khách hàng 3",
        avatar: "/images/avatar3.jpg",
      },
      amount: 6300000,
      timestamp: "14:20",
    },
  ],
};

export default function AuctionScreen() {
  // ==================== API INTEGRATION GUIDE ====================
  //
  // ELEMENTS POPULATED FROM API DATA:
  // 1. Auction Info Bar:
  //    - auctionData.id (Mã phiên)
  //    - auctionData.participants (Người tham gia)
  //    - auctionData.totalBids (Tổng lượt đặt)
  //    - auctionData.status + timeRemaining (Trạng thái)
  //
  // 2. Product Information:
  //    - auctionData.product.name (Product title)
  //    - auctionData.product.images[] (Product images)
  //    - auctionData.product.code (Mã sản phẩm)
  //    - auctionData.product.category (Danh mục)
  //    - auctionData.product.material (Chất liệu)
  //    - auctionData.product.designerName (Nhà thiết kế)
  //
  // 3. Auction Details (AuctionInfo component):
  //    - auctionData.currentPrice (Giá hiện tại)
  //    - auctionData.startingPrice (Giá khởi điểm)
  //    - auctionData.bidIncrement (Bước giá)
  //    - auctionData.startTime (Thời gian bắt đầu)
  //    - auctionData.endTime (Thời gian kết thúc)
  //
  // 4. Bidding History (BiddingHistory component):
  //    - auctionData.bids[] (All bids with bidder info, amounts, timestamps)
  //    - auctionData.totalBids (Total bid count)
  //
  // 5. Timer (AuctionTimer component):
  //    - auctionData.endTime (For countdown calculation)
  //
  // API FUNCTIONS TO IMPLEMENT:
  // const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  //
  // - fetchAuctionData(auctionId: string): Promise<AuctionApiResponse>
  // - placeBid(auctionId: string, amount: number): Promise<Bid>
  // - getRealtimeUpdates(auctionId: string): WebSocket connection
  // - uploadProductImage(file: File): Promise<string>
  // - updateAuctionStatus(auctionId: string, status: string): Promise<boolean>
  //
  // REAL-TIME UPDATES NEEDED:
  // - New bids (update bids array and currentPrice)
  // - Participant count changes
  // - Auction status changes
  // - Time remaining updates
  // ============================================================

  // Function to sort bids by timestamp (most recent first)
  const sortBidsByTimestamp = (bids: Bid[]): Bid[] => {
    return [...bids].sort((a, b) => {
      // Convert timestamp to comparable format (assuming HH:MM format)
      const timeA = a.timestamp.split(":").map((num) => parseInt(num));
      const timeB = b.timestamp.split(":").map((num) => parseInt(num));

      // Convert to minutes for easier comparison
      const minutesA = timeA[0]! * 60 + timeA[1]!;
      const minutesB = timeB[0]! * 60 + timeB[1]!;

      // Sort in descending order (most recent first)
      return minutesB - minutesA;
    });
  };

  // Function to find the winning bid (highest amount)
  const findWinningBid = (bids: Bid[]): Bid | null => {
    if (!bids || bids.length === 0) return null;

    return bids.reduce((highest, current) => {
      return current.amount > highest.amount ? current : highest;
    });
  };

  // Sort bids by timestamp and then update the bids array to mark the winner
  const sortedBids = sortBidsByTimestamp(mockAuctionData.bids);
  const updatedBids = sortedBids.map((bid) => ({
    ...bid,
    isWinning: false, // Reset all winning flags
  }));

  const winningBid = findWinningBid(updatedBids);
  if (winningBid) {
    const winnerIndex = updatedBids.findIndex(
      (bid) => bid.id === winningBid.id
    );
    if (winnerIndex !== -1) {
      updatedBids[winnerIndex]!.isWinning = true;
    }
  }

  // Update auction data with correct winning bid
  const auctionDataWithWinner = {
    ...mockAuctionData,
    bids: updatedBids,
    currentPrice: winningBid
      ? winningBid.amount
      : mockAuctionData.startingPrice,
  };

  return (
    <div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-6 py-8">
          {/* Auction Info Bar */}
          <div className="grid grid-cols-4 gap-4 mb-6 mt-8">
            {/* Auction ID */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 min-h-[80px]">
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div>
                  <p className="text-xs text-gray-600">Mã phiên</p>
                  <p className="text-sm font-bold text-gray-900">
                    {auctionDataWithWinner.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 min-h-[80px]">
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div>
                  <p className="text-xs text-gray-600">Người tham gia</p>
                  <p className="text-sm font-bold text-gray-900">
                    {auctionDataWithWinner.participants} người
                  </p>
                </div>
              </div>
            </div>

            {/* Total Bids */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 min-h-[80px]">
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div>
                  <p className="text-xs text-gray-600">Tổng lượt đặt</p>
                  <p className="text-sm font-bold text-gray-900">
                    {auctionDataWithWinner.totalBids} lượt
                  </p>
                </div>
              </div>
            </div>

            {/* Status - API Data */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col items-center justify-center text-center">
                <div>
                  <p className="text-xs text-gray-600">Trạng thái</p>
                  <p
                    className={`text-sm font-bold ${
                      auctionDataWithWinner.status === "active"
                        ? "text-green-600"
                        : auctionDataWithWinner.status === "ended"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {auctionDataWithWinner.status === "active"
                      ? "Thời gian còn lại"
                      : auctionDataWithWinner.status === "ended"
                      ? "Đã kết thúc"
                      : "Sắp bắt đầu"}
                  </p>
                  {auctionDataWithWinner.status === "active" && (
                    <span className="text-xs text-red-500">
                      {auctionDataWithWinner.timeRemaining.days} ngày{" "}
                      {auctionDataWithWinner.timeRemaining.hours} giờ{" "}
                      {auctionDataWithWinner.timeRemaining.minutes} phút
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Auction Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left: Product Information */}
            <div className="col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  {auctionDataWithWinner.product.name}
                </h2>

                {/* Product image from API */}
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  {auctionDataWithWinner.product.images &&
                  auctionDataWithWinner.product.images.length > 0 ? (
                    <img
                      src={auctionDataWithWinner.product.images[0]}
                      alt={auctionDataWithWinner.product.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.remove(
                          "hidden"
                        );
                      }}
                    />
                  ) : null}
                  <div
                    className={`text-center text-gray-500 ${
                      auctionDataWithWinner.product.images?.length
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm">No Image Available</p>
                  </div>
                </div>

                {/* Product details from API */}
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Mã sản phẩm:</span>{" "}
                    {auctionDataWithWinner.product.code}
                  </p>
                  <p>
                    <span className="font-medium">Danh mục:</span>{" "}
                    {auctionDataWithWinner.product.category}
                  </p>
                  <p>
                    <span className="font-medium">Chất liệu:</span>{" "}
                    {auctionDataWithWinner.product.material}
                  </p>
                  <p>
                    <span className="font-medium">Nhà thiết kế:</span>{" "}
                    {auctionDataWithWinner.product.designerName}
                  </p>
                </div>
              </div>
            </div>

            {/* Center: Auction Details */}
            <div className="col-span-6">
              <AuctionInfo
                currentPrice={auctionDataWithWinner.currentPrice}
                startingPrice={auctionDataWithWinner.startingPrice}
                bidIncrement={auctionDataWithWinner.bidIncrement}
                startTime={auctionDataWithWinner.startTime}
                endTime={auctionDataWithWinner.endTime}
                isDesignerView={true}
              />
            </div>

            {/* Right: Bidding Section */}
            <div className="col-span-3">
              <div className="space-y-6">
                {/* Timer Section */}
                <AuctionTimer
                  endTime={auctionDataWithWinner.endTime}
                  onTimeUp={() => console.log("Auction ended!")}
                />

                {/* Bidding History */}
                <BiddingHistory
                  bids={auctionDataWithWinner.bids}
                  totalBids={auctionDataWithWinner.totalBids}
                  isDesignerView={true}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
