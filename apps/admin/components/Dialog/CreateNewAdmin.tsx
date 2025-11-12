"use client";

import React, { useEffect, useState } from "react";

export interface AdminFormData {
  fullName: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface CreateAdminDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminFormData) => void;
  adminData?: AdminFormData; // Optional prop for editing existing admin
  mode?: "create" | "edit"; // To differentiate between create and edit modes
}

export default function CreateAdminDialog({
  isOpen,
  onClose,
  onSubmit,
  adminData,
  mode,
}: CreateAdminDialogProps) {
  const [formData, setFormData] = useState<AdminFormData>(adminData || {
    fullName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  useEffect(() => {
  if (isOpen) {
    setFormData(adminData || {
      fullName: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }
}, [adminData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password length
    if (formData.password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    onSubmit(formData);

    // Reset form
    setFormData({
      fullName: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 min-h-screen">
      <div className="bg-white rounded-[45px] shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-11 pt-8 pb-0">
          <h2 className="text-[32px] font-extrabold">
            {mode === "edit" ? "Chỉnh sửa tài khoản admin" : "Tạo tài khoản admin"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img src="/closeIcon.png" className="w-10" alt="Close" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-11 pt-6 space-y-6">
          {/* Full Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xl mb-2">
                Họ và tên đầy đủ
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full text-xl px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition-colors"
              />
            </div>
          </div>

          {/* Username and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xl mb-2">
                Tên đăng nhập
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full text-xl px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xl mb-2">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full text-xl px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xl mb-2">
                Địa chỉ email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full text-xl px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition-colors"
              />
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xl mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                // required
                // minLength={8}
                className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xl mb-2">
                Xác nhận lại mật khẩu
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                // required
                // minLength={8}
                className="w-full px-0 py-2 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition-colors"
              />
              <div className="h-5 mt-1 text-sm text-red-600">{error}</div>
            </div>
          </div>

          {/* Password Note */}
          <p className="text-red-600 text-sm">
            * Lưu ý: Mật khẩu có độ dài từ 8 kí tự.
          </p>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="px-24 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-full transition-colors"
            >
                {mode === "edit" ? "Lưu" : "Hoàn tất"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
