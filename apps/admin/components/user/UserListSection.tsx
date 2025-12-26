"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Filter } from "lucide-react";
import { User, UsersAPI } from "@/api/users.api";
import UserTable from "./UserTable";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

type UserStateFilterType = "all" | "active" | "banned";

export default function UserListSection() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [showUserStateDropdown, setShowUserStateDropdown] = useState(false);
  const [userStateFilter, setUserStateFilter] =
    useState<UserStateFilterType>("all");

  const userStateRef = useRef<HTMLDivElement | null>(null);

  const {data, refetch, isLoading, isError, error} = useQuery<User[]>({
      queryKey: ["users"],
      queryFn: () => UsersAPI.getUsers(),
      
    })


  useEffect(() => {
    if (isError && error) {
      const errorMessage = (error as any)?.response?.data?.message || "Failed to fetch users";
      toast.error(errorMessage);
    }
  }, [isError, error]);

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

  const filteredUsers = data?.filter((u) => {
    const matchState =
      userStateFilter === "all" ? true : u.state === userStateFilter;

    const matchSearch = debouncedSearch
      ? u.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      : true;

    return matchState && matchSearch;
  });

  const handleViewDetail = (userId: string) => {
    window.location.href = `/users/${userId}`;
  };

;

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await UsersAPI.deleteUser(userId);
      await refetch();
      toast.success("User deleted successfully.");
    } catch {
      toast.error("Failed to delete user.");
    } finally {
    }
  };

  return (
    <section className="mb-10 font-sans">
      <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
        User List
      </h3>

      {/* Search */}
      <div className="flex flex-1 max-w-lg mb-6">
        <Input
          className="flex-1 px-4 py-3 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]"
          placeholder="Search by email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* State filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative" ref={userStateRef}>
          <div
            className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-full text-[var(--card-foreground)]"
            onClick={() => setShowUserStateDropdown((s) => !s)}
          >
            <span className="font-medium">State</span>
            <Filter className="h-5 w-5 text-[var(--muted-foreground)]" />
          </div>

          {showUserStateDropdown && (
            <div className="absolute mt-2 w-44 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg z-50">
              {(["all", "active", "banned"] as UserStateFilterType[]).map(
                (state) => (
                  <button
                    key={state}
                    className={`w-full text-left px-4 py-2 hover:bg-[var(--accent)] ${
                      userStateFilter === state
                        ? "bg-[var(--accent)] font-semibold"
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
                      : "Banned"}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      <UserTable
        users={filteredUsers || []}
        onViewDetail={handleViewDetail}
        // onToggleLock={handleToggleLock}
        isLoading={isLoading}
        onRefresh={refetch}      
      />
    </section>
  );
}
