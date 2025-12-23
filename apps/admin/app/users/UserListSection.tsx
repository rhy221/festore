"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Filter } from "lucide-react";
import { User, UsersAPI } from "@/api/users.api";
import UserTable from "./UserTable";
import { toast } from "sonner";

type UserStateFilterType = "all" | "active" | "blocked";

export default function UserListSection() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [showUserStateDropdown, setShowUserStateDropdown] = useState(false);
  const [userStateFilter, setUserStateFilter] =
    useState<UserStateFilterType>("all");

  const userStateRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await UsersAPI.getUsers();
      const list = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
        ? res.data
        : [];
      setUsers(list);
    } catch {
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
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userStateRef.current &&
        !userStateRef.current.contains(e.target as Node)
      ) {
        setShowUserStateDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredUsers = users.filter((u) => {
    const matchState =
      userStateFilter === "all" ? true : u.state === userStateFilter;

    const matchSearch = debouncedSearch
      ? u.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      : true;

    return matchState && matchSearch;
  });

  const handleViewDetail = (userId: string) => {
    window.location.href = `/admin/users/${userId}`;
  };

  const handleToggleLock = async (
    userId: string,
    willLock: boolean
  ) => {
    setActionLoading(true);
    try {
      await UsersAPI.updateUserState(
        userId,
        willLock ? "blocked" : "active"
      );
      await fetchUsers();
      toast.success("User state updated successfully.");
    } catch {
      toast.error("Failed to update user state.");
    } finally {
      setActionLoading(false);
    }
  };


  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setActionLoading(true);
    try {
      await UsersAPI.deleteUser(userId);
      await fetchUsers();
      toast.success("User deleted successfully.");
    } catch {
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
          placeholder="Search by email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* State filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative" ref={userStateRef}>
          <div
            className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-white border rounded-full"
            onClick={() => setShowUserStateDropdown((s) => !s)}
          >
            <span className="text-gray-700 font-medium">State</span>
            <Filter className="h-5 w-5 text-gray-500" />
          </div>

          {showUserStateDropdown && (
            <div className="absolute mt-2 w-44 bg-white border rounded-xl shadow-lg z-50">
              {(["all", "active", "blocked"] as UserStateFilterType[]).map(
                (state) => (
                  <button
                    key={state}
                    className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                      userStateFilter === state
                        ? "bg-blue-100 font-semibold"
                        : ""
                    }`}
                    onClick={() => {
                      setUserStateFilter(state);
                      setShowUserStateDropdown(false);
                    }}
                  >
                    {state === "all"
                      ? "All"
                      : state === "active"
                      ? "Active"
                      : "Blocked"}
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
        isLoading={loading}      
        actionLoading={actionLoading}
      />
    </section>
  );
}
