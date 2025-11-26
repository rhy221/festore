"use client";

import { ReportCard } from "@/components/card";
import {
  Siren,
  User,
  MessageSquareWarningIcon,
  CheckCircle,
  Filter,
  EyeIcon,
} from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { useEffect, useRef, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import AdminReportDetailPopup from "./DetailReport";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

type User = {
  id: number;
  name: string;
  type: "designer" | "customer";
  violate: "copyright" | "comment";
  email: string;
  phone: string;
  status: "active";
  reportContent: string;
  reportDate: Date;
  annunciator: string;
};
const users: User[] = [
  {
    id: 1,
    name: "Nguyễn Thị An",
    type: "designer",
    violate: "copyright",
    email: "an.nguyen@example.com",
    phone: "0123456789",
    status: "active",
    reportContent: "Nội dung vi phạm bản quyền",
    reportDate: new Date(),
    annunciator: "Admin",
  },
  {
    id: 2,
    name: "Phạm Công Bình",
    type: "customer",
    violate: "comment",
    email: "binh.pham@example.com",
    phone: "0123456789",
    status: "active",
    reportContent: "Nội dung vi phạm bình luận",
    reportDate: new Date(),
    annunciator: "Admin",
  },
  {
    id: 3,
    name: "Trịnh Mai Cường",
    type: "designer",
    violate: "copyright",
    email: "cuong.trinh@example.com",
    phone: "0123456789",
    status: "active",
    reportContent: "Nội dung vi phạm bản quyền",
    reportDate: new Date(),
    annunciator: "Admin",
  },
];

const displayUserViolate = (s: string) =>
  s === "copyright" ? "Vi phạm bản quyền" : "Vi phạm bình luận";
const displayUserType = (t: string) =>
  t === "designer" ? "Nhà thiết kế" : "Khách hàng";
export default function AdminReportPage() {
  const [search, setSearch] = useState("");
  // Dropdown states
  const [showUserViolateDropdown, setShowUserViolateDropdown] = useState(false);
  const [showUserTypeDropdown, setShowUserTypeDropdown] = useState(false);

  // Selected filter values
  const [userViolateFilter, setUserViolateFilter] = useState<
    "all" | "comment" | "copyright"
  >("all");
  const [userTypeFilter, setUserTypeFilter] = useState<
    "all" | "designer" | "customer"
  >("all");
  const userViolateRef = useRef<HTMLDivElement | null>(null);
  const userTypeRef = useRef<HTMLDivElement | null>(null);
  // Filtering logic
  const filteredUsers = users.filter((u) => {
    const matchesViolate =
      userViolateFilter === "all" ? true : u.violate === userViolateFilter;
    const matchesType =
      userTypeFilter === "all" ? true : u.type === userTypeFilter;
    return matchesViolate && matchesType;
  });
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userViolateRef.current &&
        !userViolateRef.current.contains(e.target as Node)
      ) {
        setShowUserViolateDropdown(false);
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
  // Detail Violate Popup
  const [showDetailViolate, setShowDetailViolate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Content layout */}
      <div className="flex flex-1 pt-32">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 bg-white p-3 overflow-y-auto text-lg text-black">
          <h1 className="text-2xl font-bold">Danh sách đang xử lý</h1>
          <div className="flex items-center gap-2 pt-2">
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
          {/* Filter Violate */}
          <div className="flex items-center gap-10 pt-4">
            <div className="flex items-center gap-2 relative">
              <p>Lọc theo loại vi phạm</p>
              <Filter
                className="fill-black"
                onClick={() => {
                  setShowUserViolateDropdown(!showUserViolateDropdown);
                  setShowUserTypeDropdown(false);
                }}
              />
              {showUserViolateDropdown && (
                <div className="absolute top-1/2 left-full translate-y-0 translate-x-0 mr-2 bg-[#EFF6FF] border rounded-lg shadow-lg z-10 w-32">
                  <button
                    className={`w-full text-left px-3 py-2 ${
                      userViolateFilter === "all"
                        ? "bg-[#EFF6FF] font-semibold"
                        : "hover:bg-[#dee8f5]"
                    }`}
                    onClick={() => {
                      setUserViolateFilter("all");
                      setShowUserTypeDropdown(false);
                    }}
                  >
                    Tất cả
                  </button>
                  <hr className="mx-1 my-1 h-px bg-black border-0" />
                  <button
                    className={`w-full text-left px-3 py-2 ${
                      userViolateFilter === "comment"
                        ? "bg-[#EFF6FF] font-semibold"
                        : "hover:bg-[#dee8f5]"
                    }`}
                    onClick={() => {
                      setUserViolateFilter("comment");
                      setShowUserTypeDropdown(false);
                    }}
                  >
                    Bình luận
                  </button>
                  <hr className="mx-1 my-1 h-px bg-black border-0" />
                  <button
                    className={`w-full text-left px-3 py-2 ${
                      userViolateFilter === "copyright"
                        ? "bg-[#EFF6FF] font-semibold"
                        : "hover:bg-[#dee8f5]"
                    }`}
                    onClick={() => {
                      setUserViolateFilter("copyright");
                      setShowUserTypeDropdown(false);
                    }}
                  >
                    Bản quyền
                  </button>
                </div>
              )}
            </div>
          </div>
          <UserTable users={filteredUsers} />
          {showDetailViolate && selectedUser && (
            <AdminReportDetailPopup
              user={selectedUser}
              onClose={() => {
                setShowDetailViolate(false);
                setSelectedUser(null);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
  function UserTable({ users }: { users: User[] }) {
    return (
      <table className="w-full border border-black text-lg mt-4 border-collapse text-center align-middle">
        <thead>
          <tr>
            <th className="p-3 font-semibold border border-black">STT</th>
            <th className="p-3 font-semibold border border-black">Họ và tên</th>
            <th className="p-3 font-semibold border border-black">Vi phạm</th>
            <th className="p-3 font-semibold border border-black"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id}>
              <td className="p-3 border border-black">{i + 1}</td>
              <td className="p-3 border border-black">{u.name}</td>
              <td className="p-3 border border-black">
                {displayUserViolate(u.violate)}
              </td>
              <td className="p-3 border border-black gap-2">
                <EyeIcon
                  size={30}
                  className="fill-black text-white"
                  onClick={() => {
                    setSelectedUser(u);
                    setShowDetailViolate(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}