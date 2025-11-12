"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import UnlockRequestDialog, { type UnlockRequest } from "@/components/UnlockRequestDialog";

// Types
type User = {
  id: number;
  name: string;
  type: "designer" | "customer";
  status: "active" | "locked";
}

type AdminStats = {
  designers: number;
  customers: number;
  bannedUsers: number;
}

type AdminInfo = {
  name: string;
  greeting: string;
}

// Data objects
const adminInfo: AdminInfo = {
  name: "ABC",
  greeting: "Xin chào admin"
}

const stats: AdminStats = {
  designers: 64,
  customers: 36,
  bannedUsers: 12
}

const users: User[] = [
  { id: 1, name: "Nguyễn Thị An", type: "designer", status: "active" },
  { id: 2, name: "Phạm Công Bình", type: "customer", status: "active" },
  { id: 3, name: "Trịnh Mai Cường", type: "designer", status: "locked" },
];

const unlockRequests: UnlockRequest[] = [
  { id: 1, name: "Trịnh Mai Cường", reason: "Tài khoản bị khoá nhầm", date: "22/07/2025", status: "pending" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  
  // Add dialog states
  const [selectedRequest, setSelectedRequest] = useState<UnlockRequest | null>(null);
  const [showUnlockDialog, setShowUnlockDialog] = useState(false);

  // Dropdown states
  const [showUserStatusDropdown, setShowUserStatusDropdown] = useState(false);
  const [showUserTypeDropdown, setShowUserTypeDropdown] = useState(false);
  const [showUnlockStatusDropdown, setShowUnlockStatusDropdown] = useState(false);

  // Selected filter values
  const [userStatusFilter, setUserStatusFilter] = useState<"all" | "active" | "locked">("all");
  const [userTypeFilter, setUserTypeFilter] = useState<"all" | "designer" | "customer">("all");
  const [unlockStatusFilter, setUnlockStatusFilter] = useState<"all" | "pending" | "processed">("all");

  const userStatusRef = useRef<HTMLDivElement | null>(null);
  const userTypeRef = useRef<HTMLDivElement | null>(null);
  const unlockStatusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userStatusRef.current && !userStatusRef.current.contains(e.target as Node)) {
        setShowUserStatusDropdown(false);
      }
      if (userTypeRef.current && !userTypeRef.current.contains(e.target as Node)) {
        setShowUserTypeDropdown(false);
      }
      if (unlockStatusRef.current && !unlockStatusRef.current.contains(e.target as Node)) {
        setShowUnlockStatusDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtering logic
  const filteredUsers = users.filter((u) => {
    const matchesStatus = userStatusFilter === "all" ? true : u.status === userStatusFilter;
    const matchesType = userTypeFilter === "all" ? true : u.type === userTypeFilter;
    return matchesStatus && matchesType;
  });

  const filteredUnlockRequests = unlockRequests.filter((r) => {
    const matchesStatus =
      unlockStatusFilter === "all"
        ? true
        : unlockStatusFilter === "pending"
        ? r.status === "pending"
        : r.status === "processed";
    return matchesStatus;
  });

  const handleViewRequest = (request: UnlockRequest) => {
    setSelectedRequest(request);
    setShowUnlockDialog(true);
  };

  // Display helpers
  const displayUserStatus = (s: string) => (s === "active" ? "Đang hoạt động" : "Bị khoá");
  const displayUserType = (t: string) => (t === "designer" ? "Nhà thiết kế" : "Khách hàng");
  const displayUnlockStatus = (s: string) => (s === "pending" ? "Đang chờ xử lý" : "Đã xử lý");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Banner */}
      <header className="bg-[#F0F7FF] flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center">
            <img src="/Logo.png" alt="Logo" className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-extrabold text-black">HHCLOSET</h1>
        </div>
        <div className="text-2xl font-extrabold italic text-black">
          {adminInfo.greeting}: {adminInfo.name}
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 text-white p-4 space-y-4">
          <nav className="flex flex-col px-2">
            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img src="/homeIcon.png" alt="Home" className="w-8 h-8 shrink-0" />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">Trang chủ</span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img src="/adminManagementIcon.png" alt="Admin Management" className="w-8 h-8 shrink-0" />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">Quản lý admin</span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img src="/userManagementIcon.png" alt="User Management" className="w-8 h-8 shrink-0" />
              <span className="text-2xl font-semibold leading-none">Quản lý người dùng</span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img src="/styleIcon.png" alt="Style" className="w-8 h-8 shrink-0" />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">Thể loại</span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img src="/reportIcon.png" alt="Report" className="w-8 h-8 shrink-0" />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">Báo cáo</span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img src="/settingIcon.png" alt="Settings" className="w-8 h-8 shrink-0" />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">Hệ thống</span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70] mt-2">
              <img src="/logoutIcon.png" alt="Logout" className="w-8 h-8 shrink-0" />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">Đăng xuất</span>
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {/* Quick stats */}
          <h1 className="font-bold text-xl md:text-4xl">Thống kê nhanh</h1>
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Designers */}
            <Card className="bg-green-500 text-white rounded-3xl px-8 py-4 flex flex-col items-center shadow">
              <span className="font-bold text-lg mb-1">Nhà thiết kế</span>
              <div className="flex items-center gap-3">
                <img src="/numberOfDesignerIcon.png" alt="Designers" className="w-10 h-10" />
                <span className="text-3xl font-extrabold">{stats.designers}</span>
              </div>
            </Card>

            <Card className="bg-yellow-400 text-white rounded-3xl px-8 py-4 flex flex-col items-center shadow">
              <span className="font-bold text-lg mb-1">Khách hàng</span>
              <div className="flex items-center gap-3">
                <img src="/numberOfCustomerIcon.png" alt="Customers" className="w-10 h-10" />
                <span className="text-3xl font-extrabold">{stats.customers}</span>
              </div>
            </Card>

            <Card className="bg-red-400 text-white rounded-3xl px-8 py-4 flex flex-col items-center shadow">
              <span className="font-bold text-lg mb-1">Số người dùng bị chặn</span>
              <div className="flex items-center gap-3">
                <img src="/numberOfBannedIcon.png" alt="Banned Users" className="w-10 h-10" />
                <span className="text-3xl font-extrabold">{stats.bannedUsers}</span>
              </div>
            </Card>
          </div>

          <section className="mb-8">
            <h3 className="font-bold text-xl mb-4">Danh sách người dùng</h3>

            {/* Search */}
            <div className="flex items-center gap-2">
              <Input className="bg-[#BFE3F3] rounded-full px-4 py-2 text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 border-none" 
              placeholder="Nhập nội dung tìm kiếm" value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button className="bg-green-500 text-base rounded-full">Tìm kiếm</Button>
            </div>

            {/* Filters on new line */}
            <div className="flex gap-6 mt-4">
              {/* Lọc theo loại người dùng */}
              <div className="relative" ref={userTypeRef}>
                <div className="flex items-center gap-2">
                  <div className="text-base">Lọc theo loại người dùng</div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowUserTypeDropdown((s) => !s);
                      setShowUserStatusDropdown(false);
                      setShowUnlockStatusDropdown(false);
                    }}
                  >
                    <img src="/filterIcon.png" alt="Filter" className="w-5 h-5" />
                  </Button>
                </div>

                {showUserTypeDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border rounded shadow z-50">
                    <button
                      className={`w-full text-left px-3 py-2 ${userTypeFilter === "all" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
                      onClick={() => {
                        setUserTypeFilter("all");
                        setShowUserTypeDropdown(false);
                      }}
                    >
                      Tất cả
                    </button>
                    <button
                      className={`w-full text-left px-3 py-2 ${userTypeFilter === "designer" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
                      onClick={() => {
                        setUserTypeFilter("designer");
                        setShowUserTypeDropdown(false);
                      }}
                    >
                      Nhà thiết kế
                    </button>
                    <button
                      className={`w-full text-left px-3 py-2 ${userTypeFilter === "customer" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
                      onClick={() => {
                        setUserTypeFilter("customer");
                        setShowUserTypeDropdown(false);
                      }}
                    >
                      Khách hàng
                    </button>
                  </div>
                )}
              </div>

              {/* Lọc theo trạng thái */}
              <div className="relative" ref={userStatusRef}>
                <div className="flex items-center gap-2">
                  <div className="text-base">Lọc theo trạng thái</div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowUserStatusDropdown((s) => !s);
                      setShowUserTypeDropdown(false);
                      setShowUnlockStatusDropdown(false);
                    }}
                  >
                    <img src="/filterIcon.png" alt="Filter" className="w-5 h-5" />
                  </Button>
                </div>

                {showUserStatusDropdown && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow z-50">
                    <button
                      className={`w-full text-left px-3 py-2 ${userStatusFilter === "all" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
                      onClick={() => {
                        setUserStatusFilter("all");
                        setShowUserStatusDropdown(false);
                      }}
                    >
                      Tất cả
                    </button>
                    <button
                      className={`w-full text-left px-3 py-2 ${userStatusFilter === "active" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
                      onClick={() => {
                        setUserStatusFilter("active");
                        setShowUserStatusDropdown(false);
                      }}
                    >
                      Đang hoạt động
                    </button>
                    <button
                      className={`w-full text-left px-3 py-2 ${userStatusFilter === "locked" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
                      onClick={() => {
                        setUserStatusFilter("locked");
                        setShowUserStatusDropdown(false);
                      }}
                    >
                      Bị khoá
                    </button>
                  </div>
                )}
              </div>
            </div>

            <UserTable users={filteredUsers} />
          </section>

          {/* Unlock requests */}
          <section>
            <h3 className="font-bold text-xl mb-4">Yêu cầu mở khoá tài khoản</h3>

            {/* Search */}
            <div className="flex items-center gap-2">
              <Input className="bg-[#BFE3F3] rounded-full px-4 py-2 text-black placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 border-none" 
              placeholder="Nhập nội dung tìm kiếm" />
              <Button className="bg-green-500 text-base rounded-full">Tìm kiếm</Button>
            </div>

            {/* Filters on new line */}
            <div className="flex gap-6 mt-4">
              {/* Lọc theo trạng thái (unlock requests) */}
              <div className="relative" ref={unlockStatusRef}>
                <div className="flex items-center gap-2">
                  <div className="text-base">Lọc theo trạng thái</div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowUnlockStatusDropdown((s) => !s);
                      setShowUserStatusDropdown(false);
                      setShowUserTypeDropdown(false);
                    }}
                  >
                  <img src="/filterIcon.png" alt="Filter" className="w-5 h-5" />
                  </Button>
                </div>

                {showUnlockStatusDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
                    <button
                      className={`w-full text-left px-3 py-2 ${unlockStatusFilter === "all" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
                      onClick={() => {
                        setUnlockStatusFilter("all");
                        setShowUnlockStatusDropdown(false);
                      }}
                    >
                      Tất cả
                    </button>
                    <button
                      className={`w-full text-left px-3 py-2 ${unlockStatusFilter === "pending" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
                      onClick={() => {
                        setUnlockStatusFilter("pending");
                        setShowUnlockStatusDropdown(false);
                      }}
                    >
                      Đang chờ xử lý
                    </button>
                    <button
                      className={`w-full text-left px-3 py-2 ${unlockStatusFilter === "processed" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
                      onClick={() => {
                        setUnlockStatusFilter("processed");
                        setShowUnlockStatusDropdown(false);
                      }}
                    >
                      Đã xử lý
                    </button>
                  </div>
                )}
              </div>
            </div>

            <UnlockRequestTable requests={filteredUnlockRequests} />
          </section>
        </main>
      </div>

      {/* Unlock Request Dialog */}
      <UnlockRequestDialog
        request={selectedRequest}
        open={showUnlockDialog}
        onOpenChange={setShowUnlockDialog}
      />
    </div>
  );

  // Helper components
  function UserTable({ users }: { users: User[] }) {
    return (
    <table className="w-full border border-black text-lg mt-4 border-collapse">
  <thead>
    <tr className="bg-gray-200 text-left">
      <th className="p-3 font-semibold border border-black">STT</th>
      <th className="p-3 font-semibold border border-black">Họ và tên</th>
      <th className="p-3 font-semibold border border-black">Loại người dùng</th>
      <th className="p-3 font-semibold border border-black">Trạng thái</th>
      <th className="p-3 font-semibold border border-black">Thao tác</th>
    </tr>
  </thead>
  <tbody>
    {users.map((u, i) => (
      <tr key={u.id} className="border border-black">
        <td className="p-3 border border-black">{i + 1}</td>
        <td className="p-3 border border-black">{u.name}</td>
        <td className="p-3 border border-black">{displayUserType(u.type)}</td>
        <td className="p-3 border border-black">{displayUserStatus(u.status)}</td>
        <td className="p-3 border border-black items-center gap-2">
                <Button size="sm" variant="outline">
                  <img src="/viewIcon.png" alt="View" className="w-4 h-4" />
                </Button>
                {u.status === "locked" ? (
                  <Button size="sm" variant="outline">
                     <img src="/lockIcon.png" alt="Delete" className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button size="sm" variant="outline">
                   <img src="/lockIcon.png" alt="Delete" className="w-4 h-4" />
                  </Button>
                )}
                <Button size="sm" variant="outline" className="text-red-500">
                  <img src="/deleteIcon.png" alt="Delete" className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function UnlockRequestTable({ requests }: { requests: UnlockRequest[] }) {
    return (
      <table className="w-full border border-black text-lg mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 font-semibold border border-black">STT</th>
            <th className="p-3 font-semibold border border-black">Họ và tên</th>
            <th className="p-3 font-semibold border border-black">Nội dung khiếu nại</th>
            <th className="p-3 font-semibold border border-black">Ngày gửi</th>
            <th className="p-3 font-semibold border border-black">Trạng thái</th>
            <th className="p-3 font-semibold border border-black">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r, i) => (
            <tr key={r.id} className="border border-black">
              <td className="p-3 border border-black">{i + 1}</td>
              <td className="p-3 border border-black">{r.name}</td>
              <td className="p-3 border border-black">{r.reason}</td>
              <td className="p-3 border border-black">{r.date}</td>
              <td className="p-3 border border-black">{displayUnlockStatus(r.status)}</td>
              <td className="p-3 border border-black">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleViewRequest(r)}
                >
                  <img src="/viewIcon.png" alt="View" className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}