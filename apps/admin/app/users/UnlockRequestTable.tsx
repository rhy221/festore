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
    <div className="overflow-x-auto shadow-lg rounded-xl">
      <table className="min-w-full bg-white rounded-xl border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 font-semibold text-gray-700">STT</th>
            <th className="p-3 font-semibold text-gray-700">Họ và tên</th>
            <th className="p-3 font-semibold text-gray-700">Nội dung khiếu nại</th>
            <th className="p-3 font-semibold text-gray-700">Ngày gửi</th>
            <th className="p-3 font-semibold text-gray-700">Trạng thái</th>
            <th className="p-3 font-semibold text-gray-700 text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r, i) => (
            <tr
              key={r.id}
              className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200"
            >
              <td className="p-3">{i + 1}</td>
              <td className="p-3 font-medium text-gray-800">{r.name}</td>
              <td className="p-3">{r.reason}</td>
              <td className="p-3">{r.date}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    r.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : r.status === "processed"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {displayUnlockStatus(r.status)}
                </span>
              </td>
              <td className="p-3 flex justify-center items-center gap-4">
                <button
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                  onClick={() => onViewRequest(r)}
                  title="Xem yêu cầu chi tiết"
                >
                  <EyeIcon size={24} className="text-gray-700" />
                </button>
              </td>
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-12 text-center text-gray-400 text-lg font-medium"
              >
                Không có yêu cầu mở khóa nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
