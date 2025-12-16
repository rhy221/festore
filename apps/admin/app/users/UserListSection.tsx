"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Filter } from "lucide-react";

import { User, UserStatusFilterType } from "./types";
import { UsersAPI } from "@/api/users.api";
import UserTable from "./UserTable";
import { toast } from "sonner";

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
      const res = await UsersAPI.getUsers();

      const rawData: any = res;
      const userList: User[] = Array.isArray(rawData)
        ? rawData
        : Array.isArray(rawData?.data)
        ? rawData.data
        : [];

      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load user list.");
      setUsers([]);
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
      userStatusFilter === "all" ? true : u.status === userStatusFilter;

    const matchSearch = debouncedSearch
      ? (u.fullName ?? "")
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
      toast.success("User status updated successfully.");
    } catch (error) {
      console.error("Error toggling lock:", error);
      toast.error("Failed to update user status.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setActionLoading(true);
    try {
      await UsersAPI.deleteUser(userId);
      await fetchUsers();
      toast.success("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <section className="mb-10 font-sans">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">
        User List
      </h3>

      {/* Search */}
      <div className="flex flex-1 max-w-lg mb-6">
        <Input
          className="flex-1 px-4 py-3 rounded-full border border-gray-200"
          placeholder="Search by user name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative" ref={userStatusRef}>
          <div
            className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-white border rounded-full"
            onClick={() => setShowUserStatusDropdown((s) => !s)}
          >
            <span className="text-gray-700 font-medium">Status</span>
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
                      ? "All"
                      : status === "ACTIVE"
                      ? "Active"
                      : "Blocked"}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
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
