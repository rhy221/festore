"use client";
import React, { useState } from "react";
import { Product, DirectSaleData } from "./types";

interface DirectSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: DirectSaleData) => void;
  product: Product | null;
}

export default function DirectSaleModal({
  isOpen,
  onClose,
  onConfirm,
  product,
}: DirectSaleModalProps) {
  const [salePrice, setSalePrice] = useState("");

  const handleClose = () => {
    setSalePrice("");
    onClose();
  };

  const handleConfirm = () => {
    if (salePrice.trim() && product) {
      const directSaleData: DirectSaleData = {
        productId: product.id,
        price: parseFloat(salePrice.replace(/,/g, "")),
        currency: "VND",
      };

      onConfirm(directSaleData);
      setSalePrice("");
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-60"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-6 text-center">
          Bán trực tiếp
        </h2>

        {/* Product Display */}
        <div className="flex flex-col items-center mb-8">
          {/* Product Image Container */}
          <div className="w-48 h-48 bg-white rounded-3xl border-8 border-black mb-6 flex items-center justify-center overflow-hidden shadow-lg">
            <img
              src={
                product.mainImage ||
                product.images[0] ||
                "/images/placeholder.png"
              }
              alt={product.name}
              className="w-40 h-40 object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/200x200/f0f0f0/999999?text=" +
                  encodeURIComponent(product.name);
              }}
            />
          </div>

          {/* Product Name */}
          <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
        </div>

        {/* Price Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nhập giá bán
          </label>
          <input
            type="text"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            placeholder="VND"
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleClose}
            className="flex-1 py-3 px-6 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-6 text-white rounded-full font-medium transition-colors cursor-pointer"
            style={{ backgroundColor: "#000080" }}
            disabled={!salePrice.trim()}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
