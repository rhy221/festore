"use client";

import { EyeIcon } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";

import { useState } from "react";
import AdminReportDetailPopup from "./DetailReport";
import Sidebar from "@/components/Sidebar/Sidebar";
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

const displayUserViolate = (v: string) =>
  v === "copyright" ? "Vi phạm bản quyền" : "Vi phạm bình luận";

export default function AdminReportPage() {
  const [search, setSearch] = useState("");
  const [showDetailViolate, setShowDetailViolate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filter
  const filteredUsers = users.filter((u) => {
    const s = search.toLowerCase();
    return (
      s === "" ||
      u.name.toLowerCase().includes(s) ||
      u.email.toLowerCase().includes(s) ||
      u.phone.includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <Header />
      <Sidebar />

      <main className="bg-[#F7F7F8] ml-[296px] mt-32 p-8 min-h-[calc(100vh-8rem)]">
        {/* Title */}
        <h2 className="text-2xl font-semibold tracking-tight mt-8">
          Danh sách đang xử lý
        </h2>

        {/* Search */}
        <div className="flex items-center gap-3 pt-3">
          <Input
            className="text-base py-2 px-4 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-black/20"
            placeholder="Nhập tên người dùng để tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button className="bg-black text-base px-6 py-2 rounded-xl hover:bg-neutral-800 transition">
            Tìm kiếm
          </Button>
        </div>

        {/* Table */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <UserTable
            users={filteredUsers}
            onClickRow={(u) => {
              setSelectedUser(u);
              setShowDetailViolate(true);
            }}
          />
        </div>

        {/* Popup */}
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
}

function UserTable({
  users,
  onClickRow,
}: {
  users: User[];
  onClickRow: (u: User) => void;
}) {
  return (
    <table className="w-full text-base">
      <thead className="bg-neutral-100 text-neutral-900">
        <tr>
          <th className="p-4 font-semibold text-left">STT</th>
          <th className="p-4 font-semibold text-left">Họ và tên</th>
          <th className="p-4 font-semibold text-left">Vi phạm</th>
          <th className="p-4"></th>
        </tr>
      </thead>

      <tbody>
        {users.map((u, i) => (
          <tr
            key={u.id}
            className="border-b border-neutral-200 hover:bg-neutral-50 transition"
          >
            <td className="p-4 text-neutral-700">{i + 1}</td>
            <td className="p-4 text-neutral-800">{u.name}</td>
            <td className="p-4 text-neutral-700">
              {displayUserViolate(u.violate)}
            </td>

            <td className="p-4 text-right">
              <EyeIcon
                size={26}
                className="cursor-pointer text-neutral-700 hover:text-black transition"
                onClick={() => onClickRow(u)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
