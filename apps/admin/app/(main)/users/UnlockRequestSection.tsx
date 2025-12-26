"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Filter } from "lucide-react";
import UnlockRequestDialog, { type UnlockRequest } from "./UnlockRequest";
import { UnlockStatusFilterType, displayUnlockStatus } from "./types";
import UnlockRequestTable from "./UnlockRequestTable";
import api from "@/lib/http";
import { toast } from "sonner";

export default function UnlockRequestSection() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedRequest, setSelectedRequest] =
    useState<UnlockRequest | null>(null);
  const [showUnlockDialog, setShowUnlockDialog] = useState(false);

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [statusFilter, setStatusFilter] =
    useState<UnlockStatusFilterType>("all");

  const [requests, setRequests] = useState<UnlockRequest[]>([]);
  const statusDropdownRef = useRef<HTMLDivElement | null>(null);

  const fetchUnlockRequests = async () => {
    try {
      const res = await api.get("/api/admin/unlock-requests");
      const rawData: any = res.data;
      const data = Array.isArray(rawData) ? rawData : rawData?.data;
      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching unlock requests:", error);
      toast.error("Failed to load unlock requests.");
      setRequests([]);
    }
  };

  useEffect(() => {
    fetchUnlockRequests();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(e.target as Node)
      ) {
        setShowStatusDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredRequests = requests.filter((request) => {
    const matchesStatus =
      statusFilter === "all" ? true : request.status === statusFilter;
    const keyword = debouncedSearch.toLowerCase();
    const matchesSearch =
      request.userId?.email.toLowerCase().includes(keyword) ||
      request.reason.toLowerCase().includes(keyword);
    return matchesStatus && matchesSearch;
  });

  const handleViewRequest = (request: UnlockRequest) => {
    setSelectedRequest(request);
    setShowUnlockDialog(true);
  };

  return (
    <section className="mb-10 font-sans">
      <h3 className="text-2xl font-bold mb-6 text-[var(--foreground)]">
        Account Unlock Requests
      </h3>

      {/* Search */}
      <div className="flex flex-1 max-w-lg mb-4">
        <Input
          className="flex-1 px-4 py-3 rounded-full border border-[var(--input)] shadow-sm focus:border-[var(--primary)] focus:ring focus:ring-[var(--ring)] transition-all duration-300 bg-[var(--card)] text-[var(--card-foreground)]"
          placeholder="Search by name or request content"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative" ref={statusDropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer select-none px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 text-[var(--card-foreground)]"
            onClick={() => setShowStatusDropdown((prev) => !prev)}
          >
            <span className="font-medium">Status</span>
            <Filter className="h-5 w-5 text-[var(--card-foreground)]" />
          </div>

          {showStatusDropdown && (
            <div className="absolute mt-2 w-44 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg z-50 overflow-hidden">
              {(["all", "pending", "processed"] as UnlockStatusFilterType[]).map(
                (status) => (
                  <button
                    key={status}
                    className={`w-full text-left px-4 py-2 hover:bg-[var(--accent)] transition-colors ${
                      statusFilter === status
                        ? "bg-[var(--accent)] font-semibold"
                        : "text-[var(--card-foreground)]"
                    }`}
                    onClick={() => {
                      setStatusFilter(status);
                      setShowStatusDropdown(false);
                    }}
                  >
                    {status === "all" ? "All" : displayUnlockStatus(status)}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <UnlockRequestTable
        requests={filteredRequests}
        onViewRequest={handleViewRequest}
      />

      {/* Dialog */}
      <UnlockRequestDialog
        request={selectedRequest}
        open={showUnlockDialog}
        onOpenChange={setShowUnlockDialog}
      />
    </section>
  );
}
