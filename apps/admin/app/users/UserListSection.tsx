"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Filter, Loader2 } from "lucide-react";

import { User, UserStatusFilterType } from "./types";
import { users as mockUsers } from "@/api/users.api";
import UserTable from "./UserTable";

export default function UserListSection() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showUserStatusDropdown, setShowUserStatusDropdown] = useState(false);
  const [userStatusFilter, setUserStatusFilter] =
    useState<UserStatusFilterType>("all");

  const userStatusRef = useRef<HTMLDivElement | null>(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [localUsers, setLocalUsers] = useState<User[]>([]);

  useEffect(() => {
    setLocalUsers(mockUsers ?? []);
  }, []);

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // click outside dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userStatusRef.current && !userStatusRef.current.contains(e.target as Node)) {
        setShowUserStatusDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredUsers = localUsers.filter((u) => {
    const matchesStatus = userStatusFilter === "all" ? true : u.status === userStatusFilter;
    const matchesSearch = debouncedSearch
      ? u.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      : true;
    return matchesStatus && matchesSearch;
  });

  const handleViewDetail = (userId: number) => {
    window.location.href = `/admin/users/${userId}`;
  };

  const handleToggleLock = async (userId: number, isLocked: boolean) => {
    setActionLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLocalUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: isLocked ? "locked" : "active" } : u))
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;
    setActionLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLocalUsers((prev) => prev.filter((u) => u.id !== userId));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section className="mb-10 font-sans">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">
        Danh sách người dùng
      </h3>

      {/* Search */}
      <div className="flex flex-1 max-w-lg mb-6">
        <Input
          className="flex-1 px-4 py-3 rounded-full border border-gray-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-100 transition-all duration-300"
          placeholder="Nhập tên người dùng để tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* User Status Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative" ref={userStatusRef}>
          <div
            className="flex items-center gap-2 cursor-pointer select-none px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300"
            onClick={() => setShowUserStatusDropdown((s) => !s)}
          >
            <span className="text-gray-700 font-medium">Trạng thái</span>
            <Filter className="h-5 w-5 text-gray-500" />
          </div>
          {showUserStatusDropdown && (
            <div className="absolute mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              {(["all", "active", "locked"] as UserStatusFilterType[]).map((status) => (
                <button
                  key={status}
                  className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors ${
                    userStatusFilter === status ? "bg-blue-100 font-semibold" : ""
                  }`}
                  onClick={() => {
                    setUserStatusFilter(status);
                    setShowUserStatusDropdown(false);
                  }}
                >
                  {status === "all" ? "Tất cả" : status === "active" ? "Đang hoạt động" : "Bị khoá"}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* User Table */}
      <UserTable
        users={filteredUsers}
        onViewDetail={handleViewDetail}
        onToggleLock={handleToggleLock}
        onDeleteUser={handleDeleteUser}
        isLoading={actionLoading}
      />
    </section>
  );
}
