// src/components/admin/user/UserListSection.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Filter } from "lucide-react";

import {
  users,
  User,
  UserStatusFilterType,
  UserTypeFilterType,
} from "./types";
import UserTable from "./UserTable";

export default function UserListSection() {
  // States
  const [search, setSearch] = useState("");
  const [showUserStatusDropdown, setShowUserStatusDropdown] = useState(false);
  const [showUserTypeDropdown, setShowUserTypeDropdown] = useState(false);
  const [userStatusFilter, setUserStatusFilter] =
    useState<UserStatusFilterType>("all");
  const [userTypeFilter, setUserTypeFilter] =
    useState<UserTypeFilterType>("all");

  // Refs
  const userStatusRef = useRef<HTMLDivElement | null>(null);
  const userTypeRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown logic
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userStatusRef.current &&
        !userStatusRef.current.contains(e.target as Node)
      ) {
        setShowUserStatusDropdown(false);
      }
      if (
        userTypeRef.current &&
        !userTypeRef.current.contains(e.target as Node)
      ) {
        setShowUserTypeDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtering logic
  const filteredUsers = users.filter((u) => {
    const matchesStatus =
      userStatusFilter === "all" ? true : u.status === userStatusFilter;
    const matchesType =
      userTypeFilter === "all" ? true : u.type === userTypeFilter;
    // Thêm logic tìm kiếm theo tên/id/v.v. ở đây
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });
  
  // Dummy Handlers (Cần thay thế bằng logic API thực tế)
  const handleViewDetail = (userId: number) => {
    console.log(`Xem chi tiết người dùng ID: ${userId}`);
    // **TODO:** Thực hiện chuyển trang sang UserDetailPage
  };
  const handleToggleLock = (userId: number, isLocked: boolean) => {
    console.log(`${isLocked ? 'Khóa' : 'Mở khóa'} người dùng ID: ${userId}`);
    // **TODO:** Gọi API khóa/mở khóa
  };
  const handleDeleteUser = (userId: number) => {
    console.log(`Xóa người dùng ID: ${userId}`);
    // **TODO:** Gọi API xóa
  };


  return (
    <section className="mb-8">
      <h3 className="font-bold text-xl mb-4">Danh sách người dùng</h3>

      {/* Search */}
      <div className="flex items-center gap-2">
        <Input
          className="text-base !bg-[#ADD8E6] border-none rounded-3xl"
          placeholder="Nhập nội dung tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="bg-green-500 text-base text-white rounded-3xl hover:bg-green-700">
          Tìm kiếm
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-6 mt-4">
        {/* Lọc theo loại người dùng */}
        <div className="relative" ref={userTypeRef}>
          <div className="flex items-center gap-2">
            <div className="text-base">Lọc theo loại người dùng</div>
            <Filter
              className="fill-black cursor-pointer"
              onClick={() => {
                setShowUserTypeDropdown((s) => !s);
                setShowUserStatusDropdown(false); // Đóng filter khác
              }}
            />
          </div>

          {showUserTypeDropdown && (
            <div className="absolute right-0 mt-2 w-52 bg-white border rounded shadow z-50">
              {/* Các nút lọc loại người dùng */}
              {(["all", "designer", "customer"] as UserTypeFilterType[]).map(
                (type) => (
                  <button
                    key={type}
                    className={`w-full text-left px-3 py-2 ${
                      userTypeFilter === type
                        ? "bg-gray-100 font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      setUserTypeFilter(type);
                      setShowUserTypeDropdown(false);
                    }}
                  >
                    {type === "all"
                      ? "Tất cả"
                      : type === "designer"
                      ? "Nhà thiết kế"
                      : "Khách hàng"}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Lọc theo trạng thái */}
        <div className="relative" ref={userStatusRef}>
          <div className="flex items-center gap-2">
            <div className="text-base">Lọc theo trạng thái</div>
            <Filter
              className="fill-black cursor-pointer"
              onClick={() => {
                setShowUserStatusDropdown((s) => !s);
                setShowUserTypeDropdown(false); // Đóng filter khác
              }}
            />
          </div>

          {showUserStatusDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow z-50">
              {/* Các nút lọc trạng thái */}
              {(["all", "active", "locked"] as UserStatusFilterType[]).map(
                (status) => (
                  <button
                    key={status}
                    className={`w-full text-left px-3 py-2 ${
                      userStatusFilter === status
                        ? "bg-gray-100 font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      setUserStatusFilter(status);
                      setShowUserStatusDropdown(false);
                    }}
                  >
                    {status === "all"
                      ? "Tất cả"
                      : status === "active"
                      ? "Đang hoạt động"
                      : "Bị khoá"}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      <UserTable 
        users={filteredUsers} 
        onViewDetail={handleViewDetail}
        onToggleLock={handleToggleLock}
        onDeleteUser={handleDeleteUser}
      />
    </section>
  );
}