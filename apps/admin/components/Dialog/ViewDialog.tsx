"use client";
import React from 'react';
interface ViewAdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  adminData: {
    id: number;
    name: string;
    username: string;
    phone: string;
    email: string;
    password: string;
    isActive: boolean;
  } | null;
}

export default function ViewAdminDialog({ isOpen, onClose, adminData }: ViewAdminDialogProps) {
  if (!isOpen || !adminData) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className="bg-white rounded-[45px] shadow-xl w-full max-w-3xl mx-4 h-[455px] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-11 pt-8 pb-0">
          <h2 className="text-[32px] font-extrabold">Xem tài khoản admin</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img src={"/closeIcon.png"} className="w-10" alt="Close" />
          </button>
        </div>

        {/* Content */}
        <div className="p-11 pt-2 space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-xl font-normal text-gray-700 mb-2">
              Họ và tên đầy đủ
            </label>
            <div className="w-full px-0 py-2 border-b-2 border-gray-300 text-xl font-bold uppercase">
              {adminData.name ? adminData.name : "Chưa cập nhật"}
            </div>
          </div>

          {/* Username and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xl font-normal mb-2">
                Tên đăng nhập
              </label>
              <div className="w-full px-0 py-2 border-b-2 border-gray-300 text-xl font-bold">
                {adminData.username ? adminData.username : "Chưa cập nhật"}
              </div>
            </div>
            <div>
              <label className="block text-xl font-normal mb-2">
                Số điện thoại
              </label>
              <div className="w-full px-0 py-2 border-b-2 border-gray-300 text-xl font-bold">
                {adminData.phone ? adminData.phone : "Chưa cập nhật"}
              </div>
            </div>
          </div>

          {/* Email and Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xl font-normal mb-2">
                Địa chỉ email
              </label>
              <div className="w-full px-0 py-2 border-b-2 border-gray-300 text-xl font-bold">
                {adminData.email ? adminData.email : "Chưa cập nhật"}
              </div>
            </div>
            <div>
              <label className="block text-xl font-normal mb-2">
                Mật khẩu
              </label>
              <div className="w-full px-0 py-2 border-b-2 border-gray-300 text-xl font-bold">
                {adminData.password ? adminData.password : "Chưa cập nhật"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}