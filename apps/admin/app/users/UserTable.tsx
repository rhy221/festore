// src/components/admin/user/UserTable.tsx
import React from "react";
import { User, displayUserStatus } from "./types";
import { EyeIcon, LockKeyhole, LockKeyholeOpen, Trash2 } from "lucide-react";

type UserTableProps = {
  users: User[];
  onViewDetail: (userId: number) => void;
  onToggleLock: (userId: number, isLocked: boolean) => void;
  onDeleteUser: (userId: number) => void;
  isLoading?: boolean;
};

export default function UserTable({
  users,
  onViewDetail,
  onToggleLock,
  onDeleteUser,
  isLoading = false,
}: UserTableProps) {
  return (
    <div className="overflow-x-auto shadow-lg rounded-xl">
      <table className="min-w-full bg-white rounded-xl border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 font-semibold text-gray-700">STT</th>
            <th className="p-3 font-semibold text-gray-700">Họ và tên</th>
            <th className="p-3 font-semibold text-gray-700">Trạng thái</th>
            <th className="p-3 font-semibold text-gray-700 text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr
              key={u.id}
              className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200"
            >
              <td className="p-3">{i + 1}</td>
              <td className="p-3 font-medium text-gray-800">{u.name}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    u.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {displayUserStatus(u.status)}
                </span>
              </td>

              <td className="p-3 flex justify-center items-center gap-4">
                <button
                  className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${
                    isLoading ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={() => !isLoading && onViewDetail(u.id)}
                  title="Xem chi tiết"
                >
                  <EyeIcon size={24} className="text-gray-700" />
                </button>

                {u.status === "locked" ? (
                  <button
                    className={`p-2 rounded-full hover:bg-green-100 transition-colors ${
                      isLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
                    onClick={() => !isLoading && onToggleLock(u.id, false)}
                    title="Mở khóa tài khoản"
                  >
                    <LockKeyholeOpen size={24} className="text-green-500" />
                  </button>
                ) : (
                  <button
                    className={`p-2 rounded-full hover:bg-red-100 transition-colors ${
                      isLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
                    onClick={() => !isLoading && onToggleLock(u.id, true)}
                    title="Khóa tài khoản"
                  >
                    <LockKeyhole size={24} className="text-red-500" />
                  </button>
                )}

                <button
                  className={`p-2 rounded-full hover:bg-red-100 transition-colors ${
                    isLoading ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={() => !isLoading && onDeleteUser(u.id)}
                  title="Xóa tài khoản"
                >
                  <Trash2 size={24} className="text-gray-500 hover:text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-lg">
          Không tìm thấy người dùng phù hợp
        </div>
      )}
    </div>
  );
}
