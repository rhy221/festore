"use client";
import React from "react";

interface Bid {
  id: string;
  bidder: {
    name: string;
    avatar?: string;
  };
  amount: number;
  timestamp: string;
  isWinning?: boolean;
}

interface BiddingHistoryProps {
  bids: Bid[];
  totalBids: number;
  isDesignerView?: boolean;
}

export default function BiddingHistory({
  bids,
  totalBids,
  isDesignerView = false,
}: BiddingHistoryProps) {
  const getAvatarColor = (name: string): string => {
    const colors = [
      "bg-orange-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-red-500",
      "bg-yellow-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInitials = (name: string): string => {
    return name.charAt(0).toUpperCase();
  };

  const formatPrice = (amount: number): string => {
    return amount.toLocaleString("vi-VN");
  };

  const winningBid = bids.find((bid) => bid.isWinning) || bids[0];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-sm font-bold text-gray-900 mb-4">
        Lịch Sử Đấu Giá ({totalBids} lượt đặt)
      </h3>

      <div className="space-y-3">
        {/* Current Leader */}
        {winningBid && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-green-600">👑</span>
              <span className="text-sm font-bold text-green-700">
                Đang dẫn đầu
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  {winningBid.bidder.avatar ? (
                    <img
                      src={winningBid.bidder.avatar}
                      alt={winningBid.bidder.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to colored background with initials if image fails
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget
                          .nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-6 h-6 ${getAvatarColor(
                      winningBid.bidder.name
                    )} rounded-full flex items-center justify-center ${
                      winningBid.bidder.avatar ? "hidden" : ""
                    }`}
                    style={{
                      display: winningBid.bidder.avatar ? "none" : "flex",
                    }}
                  >
                    <span className="text-white text-xs font-bold">
                      {getInitials(winningBid.bidder.name)}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {winningBid.bidder.name}
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                {formatPrice(winningBid.amount)}
              </span>
            </div>
          </div>
        )}

        {/* Bid History */}
        {bids.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2 mt-8">
              <span className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🕐</span>
              </span>
              <span className="text-xs font-medium text-gray-700">
                Lịch Sử Đặt Giá
              </span>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {bids.map((bid, index) => (
                <div
                  key={bid.id}
                  className="flex items-center justify-between p-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full overflow-hidden">
                      {bid.bidder.avatar ? (
                        <img
                          src={bid.bidder.avatar}
                          alt={bid.bidder.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to colored background with initials if image fails
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget
                              .nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-5 h-5 ${getAvatarColor(
                          bid.bidder.name
                        )} rounded-full flex items-center justify-center ${
                          bid.bidder.avatar ? "hidden" : ""
                        }`}
                        style={{ display: bid.bidder.avatar ? "none" : "flex" }}
                      >
                        <span className="text-white text-xs font-bold">
                          {getInitials(bid.bidder.name)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {bid.bidder.name}
                      </span>
                      {bid.timestamp && (
                        <span className="text-xs text-gray-400">
                          {bid.timestamp}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">
                      {formatPrice(bid.amount)} Đ
                    </span>
                    {index === 0 && (
                      <div className="text-xs text-green-600">Mới nhất</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {bids.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-gray-400">📝</span>
            </div>
            <p className="text-sm">
              {isDesignerView
                ? "Chưa có lượt đấu giá nào cho sản phẩm của bạn"
                : "Chưa có lượt đấu giá nào"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {isDesignerView
                ? "Chia sẻ đấu giá để thu hút người mua!"
                : "Hãy là người đầu tiên đặt giá!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
