// src/components/admin/user/UserListSection.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Filter, Loader2 } from "lucide-react";

import { User, UserStatusFilterType, UserTypeFilterType } from "./types";
import { UsersAPI, users } from "@/api/users.api";
import UserTable from "./UserTable";

export default function UserListSection() {
  // States
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showUserStatusDropdown, setShowUserStatusDropdown] = useState(false);
  const [showUserTypeDropdown, setShowUserTypeDropdown] = useState(false);
  const [userStatusFilter, setUserStatusFilter] =
    useState<UserStatusFilterType>("all");
  const [userTypeFilter, setUserTypeFilter] =
    useState<UserTypeFilterType>("all");

  // Refs
  const userStatusRef = useRef<HTMLDivElement | null>(null);
  const userTypeRef = useRef<HTMLDivElement | null>(null);

  // Loading states for actions
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

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

  // Filter users from mock data
  const filteredUsers = users.filter((u) => {
    const matchesStatus =
      userStatusFilter === "all" ? true : u.status === userStatusFilter;
    const matchesType =
      userTypeFilter === "all" ? true : u.type === userTypeFilter;
    const matchesSearch = debouncedSearch
      ? u.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      : true;

    return matchesStatus && matchesType && matchesSearch;
  });

  // Handlers
  const handleViewDetail = (userId: number) => {
    // Navigate to user detail page
    window.location.href = `/admin/users/${userId}`;
  };

  const handleToggleLock = async (userId: number, isLocked: boolean) => {
    setActionLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find and update user in mock data
      const userIndex = users.findIndex((u) => u.id === userId);
      if (userIndex !== -1) {
        users[userIndex].status = isLocked ? "locked" : "active";
        alert(
          isLocked
            ? "Đã khóa tài khoản thành công!"
            : "Đã mở khóa tài khoản thành công!"
        );
        // Force re-render by updating state
        setUserStatusFilter((prev) => prev);
      }
    } catch (error) {
      console.error("Error toggling lock:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      setActionLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Remove user from mock data
        const userIndex = users.findIndex((u) => u.id === userId);
        if (userIndex !== -1) {
          users.splice(userIndex, 1);
          alert("Đã xóa người dùng thành công!");
          // Force re-render by updating state
          setUserStatusFilter((prev) => prev);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  return (
    <section className="mb-8">
      <h3 className="font-bold text-xl mb-4">Danh sách người dùng</h3>

      {/* Search */}
      <div className="flex items-center gap-2">
        <Input
          className="text-base !bg-[#ADD8E6] border-none rounded-3xl"
          placeholder="Nhập tên người dùng để tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button
          className="bg-green-500 text-base text-white rounded-3xl hover:bg-green-700 disabled:opacity-50"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang tìm...
            </>
          ) : (
            "Tìm kiếm"
          )}
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

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Đang tải dữ liệu...</span>
        </div>
      )}

      {/* User table */}
      {!isLoading && (
        <UserTable
          users={filteredUsers}
          onViewDetail={handleViewDetail}
          onToggleLock={handleToggleLock}
          onDeleteUser={handleDeleteUser}
          isLoading={actionLoading}
        />
      )}

      {/* No data state */}
      {!isLoading && filteredUsers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Không tìm thấy người dùng nào phù hợp với tiêu chí tìm kiếm
        </div>
      )}
    </section>
  );
}