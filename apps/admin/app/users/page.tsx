// src/pages/admin/AdminUsersPage.tsx

import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

import UserListSection from "@/components/User/UserListSection";
import UnlockRequestSection from "@/components/User/UnlockRequestSection";

const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 80;

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <div
        className="fixed top-0 left-0 h-full bg-white shadow-lg"
        style={{ width: SIDEBAR_WIDTH }}
      >
        <Sidebar />
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 ml-0" style={{ marginLeft: SIDEBAR_WIDTH }}>
        {/* HEADER */}
        <div
          className="fixed top-0 right-0 z-20 bg-white shadow-md"
          style={{ height: HEADER_HEIGHT, left: SIDEBAR_WIDTH }}
        >
          <Header role="admin" name="ABC" />
        </div>

        {/* PAGE CONTENT */}
        <main className="p-6 mt-6" style={{ marginTop: HEADER_HEIGHT }}>
          <UserListSection />
          <UnlockRequestSection />
        </main>
      </div>
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
            <th className="p-3 font-semibold border border-black">
              Loại người dùng
            </th>
            <th className="p-3 font-semibold border border-black">
              Trạng thái
            </th>
            <th className="p-3 font-semibold border border-black">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id} className="border border-black">
              <td className="p-3 border border-black">{i + 1}</td>
              <td className="p-3 border border-black">{u.name}</td>
              <td className="p-3 border border-black">
                {displayUserType(u.type)}
              </td>
              <td className="p-3 border border-black">
                {displayUserStatus(u.status)}
              </td>
              <td className="p-3 flex items-center gap-2">
                <EyeIcon size={30} className="fill-black text-white"></EyeIcon>
                {u.status === "locked" ? (
                  <LockKeyhole size={30} className=""></LockKeyhole>
                ) : (
                  <LockKeyholeOpen size={30} className=""></LockKeyholeOpen>
                )}
                <Trash2 size={30} className=""></Trash2>
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
            <th className="p-3 font-semibold border border-black">
              Nội dung khiếu nại
            </th>
            <th className="p-3 font-semibold border border-black">Ngày gửi</th>
            <th className="p-3 font-semibold border border-black">
              Trạng thái
            </th>
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
              <td className="p-3 border border-black">
                {displayUnlockStatus(r.status)}
              </td>
              <td className="p-3 border border-black">
                <EyeIcon
                  size={30}
                  className="fill-black text-white"
                  onClick={() => handleViewRequest(r)}
                ></EyeIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
