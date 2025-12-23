import React from "react";
import { User } from "@/api/users.api";
import {
  EyeIcon,
  LockKeyhole,
  LockKeyholeOpen,
} from "lucide-react";

type UserTableProps = {
  users: User[];
  onViewDetail: (userId: string) => void;
  onToggleLock: (userId: string, willLock: boolean) => void;
  isLoading?: boolean;
  actionLoading?: boolean;
};

export default function UserTable({
  users,
  onViewDetail,
  onToggleLock,
  isLoading = false,
  actionLoading = false,
}: UserTableProps) {
  const validUsers = users.filter(
    (u) => u.email && u.email.trim() !== ""
  );

  if (isLoading) {
    return (
      <div className="py-12 text-center text-gray-400">
        Loading users...
      </div>
    );
  }

  if (validUsers.length === 0) {
    return (
      <div className="py-12 text-center text-gray-400">
        No users found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-xl">
      <table className="min-w-full bg-white rounded-xl border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 font-semibold text-gray-700">No.</th>
            <th className="p-3 font-semibold text-gray-700">Email</th>
            <th className="p-3 font-semibold text-gray-700">State</th>
            <th className="p-3 font-semibold text-gray-700 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {validUsers.map((user, index) => {
            const isBlocked = user.state === "blocked";

            return (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
              >
                <td className="p-3">{index + 1}</td>

                <td className="p-3 font-medium text-gray-800">
                  {user.email}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isBlocked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {(user.state ?? "unknown").toUpperCase()}
                  </span>
                </td>

                <td className="p-3 flex justify-center items-center gap-4">
                  {/* View detail */}
                  <button
                    className="p-2 rounded-full hover:bg-gray-200"
                    onClick={() => onViewDetail(user._id)}
                    title="View details"
                  >
                    <EyeIcon size={22} />
                  </button>

                  {/* Lock / Unlock */}
                  {isBlocked ? (
                    <button
                      className={`p-2 rounded-full hover:bg-green-100 ${
                        actionLoading
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                      onClick={() =>
                        onToggleLock(user._id, false)
                      }
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
                        actionLoading
                          ? "opacity-50 pointer-events-none"
                          : ""
                      }`}
                      onClick={() =>
                        onToggleLock(user._id, true)
                      }
                      title="Lock account"
                    >
                      <LockKeyhole
                        size={22}
                        className="text-red-500"
                      />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
