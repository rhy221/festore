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
  const [selectedRequest, setSelectedRequest] = useState<UnlockRequest | null>(
    null
  );
  const [showUnlockDialog, setShowUnlockDialog] = useState(false);
  const [showUnlockStatusDropdown, setShowUnlockStatusDropdown] =
    useState(false);
  const [unlockStatusFilter, setUnlockStatusFilter] =
    useState<UnlockStatusFilterType>("all");

  const [requests, setRequests] = useState<UnlockRequest[]>([]);
  const unlockStatusRef = useRef<HTMLDivElement | null>(null);

  const fetchUnlockRequests = async () => {
    try {
      const res = await api.get("/api/admin/unlock-requests");
      
      const rawData: any = res.data;
      const data = Array.isArray(rawData) ? rawData : rawData?.data;
      
      if (Array.isArray(data)) {
        setRequests(data);
      } else { 
        setRequests([]); 
      }
    } catch (error) { 
        console.error("Error fetching unlock requests:", error);
        toast.error("Không thể tải yêu cầu mở khóa.");
        setRequests([]); 
    }
  };

  useEffect(() => {
    fetchUnlockRequests();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        unlockStatusRef.current &&
        !unlockStatusRef.current.contains(e.target as Node)
      ) {
        setShowUnlockStatusDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredRequests = requests.filter((r) => { 
    const matchesStatus =
      unlockStatusFilter === "all"
        ? true
        : r.status === unlockStatusFilter;

    const keyword = debouncedSearch.toLowerCase();
    const matchesSearch =
      r.name.toLowerCase().includes(keyword) ||
      r.reason.toLowerCase().includes(keyword);

    return matchesStatus && matchesSearch;
  });

  const handleViewRequest = (request: UnlockRequest) => {
    setSelectedRequest(request);
    setShowUnlockDialog(true);
  };

  return (
    <section className="mb-10 font-sans">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">
        Yêu cầu mở khoá tài khoản
      </h3>

      <div className="flex flex-1 max-w-lg mb-4">
        <Input
          className="flex-1 px-4 py-3 rounded-full border border-gray-200 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-100 transition-all duration-300"
          placeholder="Nhập tên hoặc nội dung tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative" ref={unlockStatusRef}>
          <div
            className="flex items-center gap-2 cursor-pointer select-none px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300"
            onClick={() => setShowUnlockStatusDropdown((s) => !s)}
          >
            <span className="text-gray-700 font-medium">Trạng thái</span>
            <Filter className="h-5 w-5 text-gray-500" />
          </div>

          {showUnlockStatusDropdown && (
            <div className="absolute mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              {(["all", "pending", "processed"] as UnlockStatusFilterType[]).map(
                (status) => (
                  <button
                    key={status}
                    className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors ${
                      unlockStatusFilter === status
                        ? "bg-blue-100 font-semibold"
                        : ""
                    }`}
                    onClick={() => {
                      setUnlockStatusFilter(status);
                      setShowUnlockStatusDropdown(false);
                    }}
                  >
                    {status === "all" ? "Tất cả" : displayUnlockStatus(status)}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      <UnlockRequestTable
        requests={filteredRequests}
        onViewRequest={handleViewRequest}
      />

      <UnlockRequestDialog
        request={selectedRequest}
        open={showUnlockDialog}
        onOpenChange={setShowUnlockDialog}
      />
    </section>
  );
}