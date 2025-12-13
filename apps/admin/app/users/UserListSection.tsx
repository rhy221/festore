"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Filter } from "lucide-react";

import { User, UserStatusFilterType } from "./types";
import { UsersAPI } from "@/api/users.api";
import UserTable from "./UserTable";

export default function UserListSection() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showUserStatusDropdown, setShowUserStatusDropdown] = useState(false);
  const [userStatusFilter, setUserStatusFilter] =
    useState<UserStatusFilterType>("all");

  const userStatusRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await UsersAPI.getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userStatusRef.current &&
        !userStatusRef.current.contains(e.target as Node)
      ) {
        setShowUserStatusDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchStatus =
      userStatusFilter === "all"
        ? true
        : u.status === userStatusFilter;

    const matchSearch = debouncedSearch
      ? u.fullName
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())
      : true;

    return matchStatus && matchSearch;
  });

  const handleViewDetail = (userId: number) => {
    window.location.href = `/admin/users/${userId}`;
  };

  const handleToggleLock = async (userId: number, isLocked: boolean) => {
    setActionLoading(true);
    try {
      if (isLocked) {
        await UsersAPI.unlockUser(userId);
      } else {
        await UsersAPI.blockUserAccount(userId);
      }
      await fetchUsers();
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;
    setActionLoading(true);
    try {
      await UsersAPI.deleteUser(userId);
      await fetchUsers();
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section className="mb-10 font-sans">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">
        Danh sách người dùng
      </h3>

      <div className="flex flex-1 max-w-lg mb-6">
        <Input
          className="flex-1 px-4 py-3 rounded-full border border-gray-200"
          placeholder="Nhập tên người dùng để tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative" ref={userStatusRef}>
          <div
            className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-white border rounded-full"
            onClick={() => setShowUserStatusDropdown((s) => !s)}
          >
            <span className="text-gray-700 font-medium">Trạng thái</span>
            <Filter className="h-5 w-5 text-gray-500" />
          </div>

          {showUserStatusDropdown && (
            <div className="absolute mt-2 w-44 bg-white border rounded-xl shadow-lg z-50">
              {(["all", "ACTIVE", "BLOCKED"] as UserStatusFilterType[]).map(
                (status) => (
                  <button
                    key={status}
                    className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                      userStatusFilter === status
                        ? "bg-blue-100 font-semibold"
                        : ""
                    }`}
                    onClick={() => {
                      setUserStatusFilter(status);
                      setShowUserStatusDropdown(false);
                    }}
                  >
                    {status === "all"
                      ? "Tất cả"
                      : status === "ACTIVE"
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
        isLoading={loading || actionLoading}
      />
    </section>
  );
}
