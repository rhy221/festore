"use client";
import React, { useState } from "react";
import { Button } from "@workspace/ui/components/button";

interface SalesTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (salesType: "direct" | "auction") => void;
}

export default function SalesTypeModal({
  isOpen,
  onClose,
  onConfirm,
}: SalesTypeModalProps) {
  const [selectedSalesType, setSelectedSalesType] = useState<
    "direct" | "auction" | null
  >(null);

  const handleClose = () => {
    setSelectedSalesType(null);
    onClose();
  };

  const handleConfirm = () => {
    if (selectedSalesType) {
      onConfirm(selectedSalesType);
      setSelectedSalesType(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-6 text-center">
          Chọn hình thức bán
        </h2>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => setSelectedSalesType("direct")}
            className={`w-full p-4 rounded-2xl border-2 text-left font-medium transition-all ${
              selectedSalesType === "direct"
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
            }`}
          >
            Bán trực tiếp
          </button>

          <button
            onClick={() => setSelectedSalesType("auction")}
            className={`w-full p-4 rounded-2xl border-2 text-left font-medium transition-all ${
              selectedSalesType === "auction"
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
            }`}
          >
            Bán đấu giá
          </button>
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={handleClose}
            className="flex-1 py-3 px-6 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors"
          >
            Hủy
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 py-3 px-6 text-white rounded-full font-medium transition-colors"
            style={{ backgroundColor: "#000080" }}
            disabled={!selectedSalesType}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
}
