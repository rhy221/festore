"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Filter } from "lucide-react";
import { User, UserStatusFilterType, UserTypeFilterType } from "./types";
import UserTable from "./UserTable";
import http from "@/lib/http";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const userService = {
  list: () => http.get("/api/users").then((res) => res.data),
  get: (userId: number) => http.get<User>(`/api/users/${userId}`),
  lock: (userId: number) => http.post(`/api/users/${userId}/lock`),
  unlock: (userId: number) => http.post(`/api/users/${userId}/unlock`),
  delete: (userId: number) => http.delete(`/api/users/${userId}`),
};

export default function UserListSection() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Query: lấy danh sách user
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userService.list,
  });

  // Mutations
  const lockMutation = useMutation({
    mutationFn: userService.lock,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const unlockMutation = useMutation({
    mutationFn: userService.unlock,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: userService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  // States
  const [search, setSearch] = useState("");
  const [showUserStatusDropdown, setShowUserStatusDropdown] = useState(false);
  const [showUserTypeDropdown, setShowUserTypeDropdown] = useState(false);
  const [userStatusFilter, setUserStatusFilter] =
    useState<UserStatusFilterType>("all");
  const [userTypeFilter, setUserTypeFilter] =
    useState<UserTypeFilterType>("all");

  const userStatusRef = useRef<HTMLDivElement | null>(null);
  const userTypeRef = useRef<HTMLDivElement | null>(null);

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
  const filteredUsers = users.filter((u: User) => {
    const matchesStatus =
      userStatusFilter === "all" ? true : u.status === userStatusFilter;

    const matchesType =
      userTypeFilter === "all" ? true : u.type === userTypeFilter;

    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  const handleViewDetail = (userId: number) => {
    router.push(`/admin/users/${userId}`);
  };

  const handleToggleLock = (userId: number, isLocked: boolean) => {
    if (isLocked) lockMutation.mutate(userId);
    else unlockMutation.mutate(userId);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm("Bạn có chắc muốn xóa?")) {
      deleteMutation.mutate(userId);
    }
  };

  return (
    <section className="mb-8 text-black">
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
      <div className="flex gap-6 mt-4 text-black">
        <div className="relative" ref={userStatusRef}>
          <div className="flex items-center gap-2">
            <div className="text-base">Lọc theo trạng thái</div>
            <Filter
              className="fill-black cursor-pointer"
              onClick={() => {
                setShowUserStatusDropdown((s) => !s);
                setShowUserTypeDropdown(false);
              }}
            />
          </div>

          {showUserStatusDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow z-50">
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
