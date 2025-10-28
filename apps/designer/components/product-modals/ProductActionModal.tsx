"use client";
import React from "react";

interface ProductActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: "view" | "edit" | "delete") => void;
}

export default function ProductActionModal({
  isOpen,
  onClose,
  onAction,
}: ProductActionModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Click outside overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose}></div>

      {/* Dropdown Modal */}
      <div
        className="absolute top-0 left-1/2 translate-x-8 bg-white rounded-lg shadow-xl border border-gray-300 w-20 text-xs"
        style={{ zIndex: 1000 }}
      >
        <div className="divide-y divide-gray-200">
          <button
            onClick={() => onAction("view")}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50 text-sm"
          >
            <span className="text-gray-800 font-medium">Xem</span>
          </button>
          <button
            onClick={() => onAction("edit")}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50 text-sm"
          >
            <span className="text-gray-800 font-medium">Sửa</span>
          </button>
          <button
            onClick={() => onAction("delete")}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50 text-sm"
          >
            <span className="text-gray-800 font-medium">Xoá</span>
          </button>
        </div>
      </div>
    </>
  );
}
