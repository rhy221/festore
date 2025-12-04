"use client";

import { ReportCard } from "../../components/card";
import {
  Siren,
  User,
  MessageSquareWarningIcon,
  CheckCircle,
  EyeIcon,
} from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { useEffect, useRef, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import AdminReportDetailPopup from "../admin-report-detail/page";
import Sidebar from "@/components/Sidebar/Admin";
import Header from "@/components/Header/Header";

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
  const [showUserViolateDropdown, setShowUserViolateDropdown] = useState(false);
  const [showUserTypeDropdown, setShowUserTypeDropdown] = useState(false);

  const [userViolateFilter, setUserViolateFilter] = useState<
    "all" | "comment" | "copyright"
  >("all");
  const [userTypeFilter, setUserTypeFilter] = useState<
    "all" | "designer" | "customer"
  >("all");
  const userViolateRef = useRef<HTMLDivElement | null>(null);
  const userTypeRef = useRef<HTMLDivElement | null>(null);

  const filteredUsers = users.filter((u) => {
    const matchesViolate =
      userViolateFilter === "all" ? true : u.violate === userViolateFilter;
    const matchesType =
      userTypeFilter === "all" ? true : u.type === userTypeFilter;
    const matchesSearch =
      search === "" ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);

    return matchesViolate && matchesType && matchesSearch;
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

  const [showDetailViolate, setShowDetailViolate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />

      {/* main content: margin-left = sidebar width, margin-top = header height */}
      <main
        className="bg-gray-100 p-6 overflow-auto ml-[296px] mt-32 min-h-[calc(100vh-8rem)]"
      >
        <h1 className="text-2xl font-bold">Thống kê nhanh</h1>

        <div className="grid grid-cols-2 gap-4">
          <ReportCard title="Tổng số vi phạm" icon={<Siren />} number={3} color="#FF4C4C" />
          <ReportCard title="Số người vi phạm" icon={<User className="fill-current text-white" />} number={3} color="#FFAA00" />
          <ReportCard title="Số vi phạm đang xử lý" icon={<MessageSquareWarningIcon />} number={3} color="#1E90FF" />
          <ReportCard title="Số vi phạm đã xử lý" icon={<CheckCircle className=" text-white" />} number={3} color="#32CD32" />
        </div>

        <h1 className="text-2xl font-bold mt-6">Danh sách đang xử lý</h1>
        <div className="flex items-center gap-2 pt-2">
          <Input
            className="text-base"
            placeholder="Nhập nội dung tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button className="bg-green-500 text-base">Tìm kiếm</Button>
        </div>

        {/* đặt table vào container có overflow-x nếu màn hình nhỏ */}
        <div className="mt-4 overflow-x-auto">
          <UserTable users={filteredUsers} />
        </div>

        {/* modal */}
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
  );

  function UserTable({ users }: { users: User[] }) {
    return (
      <table className="w-full border border-black text-lg mt-4 border-collapse text-center align-middle">
        <thead>
          <tr>
            <th className="p-3 font-semibold border border-black">STT</th>
            <th className="p-3 font-semibold border border-black">Họ và tên</th>
            <th className="p-3 font-semibold border border-black">Loại người dùng</th>
            <th className="p-3 font-semibold border border-black">Vi phạm</th>
            <th className="p-3 font-semibold border border-black"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id}>
              <td className="p-3 border border-black">{i + 1}</td>
              <td className="p-3 border border-black">{u.name}</td>
              <td className="p-3 border border-black">{displayUserType(u.type)}</td>
              <td className="p-3 border border-black">{displayUserViolate(u.violate)}</td>
              <td className="p-3 border border-black gap-2">
                <EyeIcon
                  size={30}
                  className="fill-black text-white cursor-pointer"
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