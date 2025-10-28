"use client";
import React from "react";

interface AuctionInfoProps {
  currentPrice: number;
  startingPrice: number;
  bidIncrement: number;
  startTime: string;
  endTime: string;
  currency?: string;
  isDesignerView?: boolean;
}

export default function AuctionInfo({
  currentPrice,
  startingPrice,
  bidIncrement,
  startTime,
  endTime,
  currency = "Đ",
  isDesignerView = false,
}: AuctionInfoProps) {
  const formatPrice = (amount: number): string => {
    return amount.toLocaleString("vi-VN");
  };

  const formatDateTime = (dateTime: string): string => {
    // If it's already formatted, return as is
    if (dateTime.includes("/")) {
      return dateTime;
    }

    // Otherwise format from ISO string
    try {
      const date = new Date(dateTime);
      return date.toLocaleDateString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateTime;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        Thông Tin Đấu Giá
      </h2>

      {/* Current Price - Large Display */}
      <div className="text-center mb-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Giá hiện tại</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatPrice(currentPrice)} {currency}
          </p>
        </div>
      </div>

      {/* Price Details */}
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-600">💰</span>
            <p className="text-sm font-medium text-gray-700">Giá khởi điểm</p>
          </div>
          <p className="text-lg font-bold text-gray-900">
            {formatPrice(startingPrice)} {currency}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Bước giá</p>
          <p className="text-lg font-bold text-gray-900">
            {formatPrice(bidIncrement)} {currency}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Thời gian bắt đầu</p>
          <p className="text-sm text-gray-900">{formatDateTime(startTime)}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Thời gian kết thúc</p>
          <p className="text-sm text-gray-900">{formatDateTime(endTime)}</p>
        </div>
      </div>
    </div>
  );
}
