"use client";
import React, { useState } from "react";
import { Product, AuctionSetupData } from "./types";

interface AuctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: AuctionSetupData) => void;
  product: Product | null;
}

export default function AuctionModal({
  isOpen,
  onClose,
  onConfirm,
  product,
}: AuctionModalProps) {
  const [startingPrice, setStartingPrice] = useState("");
  const [bidIncrement, setBidIncrement] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleClose = () => {
    setStartingPrice("");
    setBidIncrement("");
    setStartTime("");
    setEndTime("");
    onClose();
  };

  const handleConfirm = () => {
    if (
      startingPrice.trim() &&
      bidIncrement.trim() &&
      startTime &&
      endTime &&
      product
    ) {
      const auctionData: AuctionSetupData = {
        productId: product.id,
        startingPrice: parseFloat(startingPrice.replace(/,/g, "")),
        bidIncrement: parseFloat(bidIncrement.replace(/,/g, "")),
        startTime: `${startTime}:00`, // Convert to full datetime
        endTime: `${endTime}:00`, // Convert to full datetime
      };

      onConfirm(auctionData);
      handleClose();
    }
  };

  const isFormValid =
    startingPrice.trim() && bidIncrement.trim() && startTime && endTime;

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-60"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[500px] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-6 text-center">Bán đấu giá</h2>

        {/* Product Section - Centered */}
        <div className="flex flex-col items-center mb-6">
          {/* Product Image Container */}
          <div className="w-32 h-32 bg-white rounded-2xl border-4 border-black flex items-center justify-center overflow-hidden shadow-md mb-3">
            <img
              src={
                product.mainImage ||
                product.images[0] ||
                "/images/placeholder.png"
              }
              alt={product.name}
              className="w-24 h-24 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://via.placeholder.com/120x120/f0f0f0/999999?text=No+Image";
              }}
            />
          </div>

          {/* Product Name */}
          <h3 className="text-lg font-bold text-gray-900 text-center">
            {product.name}
          </h3>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Pricing Fields - Side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giá khởi điểm
              </label>
              <input
                type="text"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                placeholder="VND"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bước giá
              </label>
              <input
                type="text"
                value={bidIncrement}
                onChange={(e) => setBidIncrement(e.target.value)}
                placeholder="VND"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Time Fields - Side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thời gian bắt đầu
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thời gian kết thúc
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6">
          <button
            onClick={handleClose}
            className="flex-1 py-2.5 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors cursor-pointer text-sm"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 px-4 text-white rounded-lg font-medium transition-colors cursor-pointer text-sm"
            style={{ backgroundColor: "#000080" }}
            disabled={!isFormValid}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
