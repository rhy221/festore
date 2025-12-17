import React from "react";
import { User } from "@/api/users.api";
import { EyeIcon, LockKeyhole, LockKeyholeOpen, Trash2 } from "lucide-react";

type UserTableProps = {
  users: User[];
  onViewDetail: (userId: string) => void;
  onToggleLock: (userId: string, willLock: boolean) => void;
  onDeleteUser: (userId: string) => void;
  isLoading?: boolean;       
  actionLoading?: boolean;  
};

export default function UserTable({
  users,
  onViewDetail,
  onToggleLock,
  onDeleteUser,
  isLoading = false,
  actionLoading = false,
}: UserTableProps) {
  const filteredUsers = users.filter(u => u.email && u.email.trim() !== "");

  return (
    <div className="overflow-x-auto shadow-lg rounded-xl">
      <table className="min-w-full bg-white rounded-xl border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 font-semibold text-gray-700">No.</th>
            <th className="p-3 font-semibold text-gray-700">Email</th>
            <th className="p-3 font-semibold text-gray-700">State</th>
            <th className="p-3 font-semibold text-gray-700 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((u, i) => (
            <tr
              key={u._id}
              className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
            >
              <td className="p-3">{i + 1}</td>
              <td className="p-3 font-medium text-gray-800">{u.email}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    u.state === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {u.state?.toUpperCase()}
                </span>
              </td>
              <td className="p-3 flex justify-center items-center gap-4">
                <button
                  className="p-2 rounded-full hover:bg-gray-200"
                  onClick={() => onViewDetail(u._id)}
                  title="View details"
                >
                  <EyeIcon size={22} />
                </button>
               
                {u.state === "blocked" ? (
                  <button
                    className={`p-2 rounded-full hover:bg-green-100 ${
                      actionLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
                    onClick={() => onToggleLock(u._id, false)}
                    title="Unlock account"
                  >
                    <LockKeyholeOpen size={22} className="text-green-500" />
                  </button>
                ) : (
                  <button
                    className={`p-2 rounded-full hover:bg-red-100 ${
                      actionLoading ? "opacity-50 pointer-events-none" : ""
                    }`}
                    onClick={() => onToggleLock(u._id, true)}
                    title="Lock account"
                  >
                    <LockKeyhole size={22} className="text-red-500" />
                  </button>
                )}

                <button
                  className={`p-2 rounded-full hover:bg-red-100 ${
                    actionLoading ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={() => onDeleteUser(u._id)}
                  title="Delete account"
                >
                  <Trash2 size={22} className="text-gray-500 hover:text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          {isLoading ? "Loading users..." : "No users found"}
        </div>
      )}
    </div>
  );
}
