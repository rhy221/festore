// src/components/admin/user/UserTable.tsx

import React from "react";
import { User, displayUserStatus, displayUserType } from "./types";
import { EyeIcon, LockKeyhole, LockKeyholeOpen, Trash2 } from "lucide-react";

type UserTableProps = {
  users: User[];
  onViewDetail: (userId: number) => void;
  onToggleLock: (userId: number, isLocked: boolean) => void;
  onDeleteUser: (userId: number) => void;
};

export default function UserTable({
  users,
  onViewDetail,
  onToggleLock,
  onDeleteUser,
}: UserTableProps) {
  return (
    <table className="w-full border border-black text-lg mt-4 border-collapse text-black">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="p-3 font-semibold border border-black">STT</th>
          <th className="p-3 font-semibold border border-black">Họ và tên</th>
          <th className="p-3 font-semibold border border-black">
            Loại người dùng
          </th>
          <th className="p-3 font-semibold border border-black">Trạng thái</th>
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
              <div
                className="cursor-pointer"
                onClick={() => onViewDetail(u.id)}
                title="Xem chi tiết"
              >
                <EyeIcon size={30} className="fill-black text-white" />
              </div>

              {u.status === "locked" ? (
                <div
                  className="cursor-pointer"
                  onClick={() => onToggleLock(u.id, false)}
                  title="Mở khóa tài khoản"
                >
                  <LockKeyholeOpen size={30} className="text-green-500" />
                </div>
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => onToggleLock(u.id, true)}
                  title="Khóa tài khoản"
                >
                  <LockKeyhole size={30} className="text-red-500" />
                </div>
              )}

              <div
                className="cursor-pointer"
                onClick={() => onDeleteUser(u.id)}
                title="Xóa tài khoản"
              >
                <Trash2
                  size={30}
                  className="text-gray-500 hover:text-red-700"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
