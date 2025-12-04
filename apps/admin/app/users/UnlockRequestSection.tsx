// src/components/admin/user/UnlockRequestSection.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Filter } from "lucide-react";
import UnlockRequestDialog, {
  type UnlockRequest,
} from "./UnlockRequest";

import {
  unlockRequests,
  UnlockStatusFilterType,
  displayUnlockStatus,
} from "./types";
import UnlockRequestTable from "./UnlockRequestTable";

export default function UnlockRequestSection() {
  // States
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<UnlockRequest | null>(
    null
  );
  const [showUnlockDialog, setShowUnlockDialog] = useState(false);
  const [showUnlockStatusDropdown, setShowUnlockStatusDropdown] =
    useState(false);
  const [unlockStatusFilter, setUnlockStatusFilter] =
    useState<UnlockStatusFilterType>("all");

  // Ref
  const unlockStatusRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown logic
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

  // Filtering logic
  const filteredUnlockRequests = unlockRequests.filter((r) => {
    const matchesStatus =
      unlockStatusFilter === "all"
        ? true
        : unlockStatusFilter === "pending"
        ? r.status === "pending"
        : r.status === "processed";
    // Thêm logic tìm kiếm theo tên/reason/v.v. ở đây
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleViewRequest = (request: UnlockRequest) => {
    setSelectedRequest(request);
    setShowUnlockDialog(true);
  };
  
  // Dummy handler
  const handleSearch = () => {
      console.log(`Tìm kiếm yêu cầu mở khóa với từ khóa: ${search}`);
  }

  return (
    <section>
      <h3 className="font-bold text-xl mb-4">Yêu cầu mở khoá tài khoản</h3>

      {/* Search */}
      <div className="flex items-center gap-2">
        <Input
          className="text-base !bg-[#ADD8E6] border-none rounded-3xl"
          placeholder="Nhập nội dung tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button 
            className="bg-green-500 text-base text-white rounded-3xl hover:bg-green-700"
            onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-6 mt-4">
        {/* Lọc theo trạng thái (unlock requests) */}
        <div className="relative" ref={unlockStatusRef}>
          <div className="flex items-center gap-2">
            <div className="text-base">Lọc theo trạng thái</div>
            <Filter
              className="fill-black cursor-pointer"
              onClick={() => {
                setShowUnlockStatusDropdown((s) => !s);
              }}
            />
          </div>

          {showUnlockStatusDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
              {/* Các nút lọc trạng thái */}
              {(["all", "pending", "processed"] as UnlockStatusFilterType[]).map(
                (status) => (
                  <button
                    key={status}
                    className={`w-full text-left px-3 py-2 ${
                      unlockStatusFilter === status
                        ? "bg-gray-100 font-semibold"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      setUnlockStatusFilter(status);
                      setShowUnlockStatusDropdown(false);
                    }}
                  >
                    {displayUnlockStatus(status)}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      <UnlockRequestTable requests={filteredUnlockRequests} onViewRequest={handleViewRequest} />

      {/* Unlock Request Dialog (Giữ lại đây vì nó phụ thuộc vào state của Section này) */}
      <UnlockRequestDialog
        request={selectedRequest}
        open={showUnlockDialog}
        onOpenChange={setShowUnlockDialog}
      />
    </section>
  );
}