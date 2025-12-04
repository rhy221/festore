// src/components/admin/user/UnlockRequestTable.tsx

import React from "react";
import { type UnlockRequest } from "./UnlockRequest";
import { displayUnlockStatus } from "./types";
import { EyeIcon } from "lucide-react";

type UnlockRequestTableProps = {
  requests: UnlockRequest[];
  onViewRequest: (request: UnlockRequest) => void;
};

export default function UnlockRequestTable({
  requests,
  onViewRequest,
}: UnlockRequestTableProps) {
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
            <td className="p-3 border border-black">
              {displayUnlockStatus(r.status)}
            </td>
            <td className="p-3 border border-black">
              {/* ✅ Đã sửa: Bọc EyeIcon trong <div> và dùng thuộc tính title của HTML */}
              <div
                className="cursor-pointer"
                title="Xem yêu cầu chi tiết" // <-- Thuộc tính title được đặt ở đây
                onClick={() => onViewRequest(r)}
              >
                <EyeIcon
                  size={30}
                  className="fill-black text-white"
                  // Thuộc tính title bị loại bỏ khỏi EyeIcon để tránh lỗi TypeScript
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}