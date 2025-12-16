import React from "react";
import { User } from "@/api/users.api";
import { displayUserStatus } from "./types";
import {
  EyeIcon,
  LockKeyhole,
  LockKeyholeOpen,
  Trash2,
} from "lucide-react";

type UserTableProps = {
  users: User[];
  onViewDetail: (userId: number) => void;
  onToggleLock: (userId: number, willLock: boolean) => void;
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
            <th className="p-3 font-semibold text-gray-700">No.</th>
            <th className="p-3 font-semibold text-gray-700">Full Name</th>
            <th className="p-3 font-semibold text-gray-700">Status</th>
            <th className="p-3 font-semibold text-gray-700 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr
              key={u.id}
              className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
            >
              <td className="p-3">{i + 1}</td>

              <td className="p-3 font-medium text-gray-800">
                {u.fullName}
              </td>

              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    u.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {displayUserStatus(u.status)}
                </span>
              </td>

              <td className="p-3 flex justify-center items-center gap-4">
                {/* View detail */}
                <button
                  className={`p-2 rounded-full hover:bg-gray-200 ${
                    isLoading ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={() => onViewDetail(u.id)}
                  title="View details"
                >
                  <EyeIcon size={22} />
                </button>

                {/* Lock / Unlock */}
                {u.status === "BLOCKED" ? (
                  <button
                    className={`p-2 rounded-full hover:bg-green-100 ${
                      isLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
                    onClick={() => onToggleLock(u.id, false)}
                    title="Unlock account"
                  >
                    <LockKeyholeOpen
                      size={22}
                      className="text-green-500"
                    />
                  </button>
                ) : (
                  <button
                    className={`p-2 rounded-full hover:bg-red-100 ${
                      isLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
                    onClick={() => onToggleLock(u.id, true)}
                    title="Lock account"
                  >
                    <LockKeyhole
                      size={22}
                      className="text-red-500"
                    />
                  </button>
                )}

                {/* Delete */}
                <button
                  className={`p-2 rounded-full hover:bg-red-100 ${
                    isLoading ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={() => onDeleteUser(u.id)}
                  title="Delete account"
                >
                  <Trash2
                    size={22}
                    className="text-gray-500 hover:text-red-700"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No users found
        </div>
      )}
    </div>
  );
}
