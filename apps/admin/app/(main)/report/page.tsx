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
    reportContent: "Copyright violation details",
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
    reportContent: "Comment violation details",
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
    reportContent: "Copyright violation details",
    reportDate: new Date(),
    annunciator: "Admin",
  },
];

const displayUserViolation = (v: string) =>
  v === "copyright" ? "Copyright Violation" : "Comment Violation";

export default function AdminReportPage() {
  const [search, setSearch] = useState("");
  const [showDetailViolation, setShowDetailViolation] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
        <h2 className="text-2xl font-semibold tracking-tight mt-8">
          Reports Under Review
        </h2>

        <div className="flex items-center gap-3 pt-3">
          <Input
            className="text-base py-2 px-4 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-black/20"
            placeholder="Search by user name, email, or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button className="bg-black text-base px-6 py-2 rounded-xl hover:bg-neutral-800 transition">
            Search
          </Button>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <UserTable
            users={filteredUsers}
            onClickRow={(u) => {
              setSelectedUser(u);
              setShowDetailViolation(true);
            }}
          />
        </div>

        {showDetailViolation && selectedUser && (
          <AdminReportDetailPopup
            user={selectedUser}
            onClose={() => {
              setShowDetailViolation(false);
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
          <th className="p-4 font-semibold text-left">No.</th>
          <th className="p-4 font-semibold text-left">Full Name</th>
          <th className="p-4 font-semibold text-left">Violation</th>
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
              {displayUserViolation(u.violate)}
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
