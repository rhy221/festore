"use client";
import { BackspaceIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
import { useState } from "react";
type User = {
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
const user: User = {
  name: "Trịnh Mai Cường",
  type: "designer",
  violate: "copyright",
  email: "maicuong123@gmail.com",
  phone: "0123456789",
  status: "active",
  reportContent: "Mẫu ABC có hành vi đạo nhái mẫu của NTK XXX",
  reportDate: new Date("11/11/2024"),
  annunciator: "Nguyễn Văn Tiên",
};
export default function AdminReportDetailPopup({
  user,
  onClose,
}: {
  user: User;
  onClose: () => void;
}) {
  const displayUserType = (t: string) =>
    t === "designer" ? "Nhà thiết kế" : "Khách hàng";
  const displayStatus = (s: string) =>
    s === "active" ? "Đang hoạt động" : "Khóa";
  const displayViolate = (v: string) =>
    v === "copyright" ? "Vi phạm bản quyền" : "Vi phạm bình luận";
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-row bg-white justify-between gap-70">
          <p className="font-bold text-2xl pb-3">Chi tiết vi phạm</p>
          <BackspaceIcon className="w-8 h-8 pt-1" onClick={onClose} />
        </div>
        <table className="w-200 border-amber-950 [&>tbody>tr>td]:py-2">
          <thead>
            <tr>
              <th className="w-1/6"></th>
              <th className="w-1/3"></th>
              <th className="w-1/6"></th>
              <th className="w-1/6"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-text-top">
                <p className="font-semibold">Họ và tên đầy đủ</p>
              </td>
              <td>{user.name}</td>
              <td className="align-text-top">
                <p className="font-semibold">Vai trò</p>
              </td>
              <td>{displayUserType(user.type)}</td>
            </tr>
            <tr>
              <td className="align-text-top">
                <p className="font-semibold">Địa chỉ email</p>
              </td>
              <td>{user.email}</td>
              <td className="align-text-top">
                <p className="font-semibold">SĐT</p>
              </td>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <td className="align-text-top">
                <p className="font-semibold">Trạng thái</p>
              </td>
              <td>{displayStatus(user.status)}</td>
            </tr>
            <tr>
              <td className="align-text-top">
                <p className="font-semibold">Loại vi phạm</p>
              </td>
              <td>{displayViolate(user.violate)}</td>
            </tr>
            <tr>
              <td className="align-text-top">
                <p className="font-semibold">Nội dung chi tiết</p>
              </td>
              <td colSpan={3}>{user.reportContent}</td>
            </tr>
            <tr>
              <td className="align-text-top">
                <p className="font-semibold">Người báo cáo</p>
              </td>
              <td>{user.annunciator}</td>
              <td className="align-text-top">
                <p className="font-semibold">Ngày báo cáo</p>
              </td>
              <td>{user.reportDate.toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center gap-7 mt-4">
          <Button className="bg-[#0057FF] text-[#445a8600] text-xl hover:bg-[#033497] rounded-3xl px-8">
            Cảnh cáo
          </Button>
          <Button className="bg-[#FF7043] text-white text-xl hover:bg-[#f15627] rounded-3xl px-8">
            Cảnh cáo
          </Button>
          <Button className="bg-[#C62828] text-white text-xl hover:bg-[#a71c1c] rounded-3xl px-8">
            Chặn tài khoản
          </Button>
        </div>
      </div>
    </div>
  );
}