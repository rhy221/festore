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
      <div className="py-12 text-center text-[var(--muted-foreground)]">
        Loading users...
      </div>
    );
  }

  if (validUsers.length === 0) {
    return (
      <div className="py-12 text-center text-[var(--muted-foreground)]">
        No users found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-xl">
      <table className="min-w-full bg-[var(--card)] rounded-xl border-collapse">
        <thead>
          <tr className="bg-[var(--popover)] text-left text-[var(--card-foreground)]">
            <th className="p-3 font-semibold">No.</th>
            <th className="p-3 font-semibold">Email</th>
            <th className="p-3 font-semibold">State</th>
            <th className="p-3 font-semibold text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {validUsers.map((user, index) => {
            const isBlocked = user.state === "blocked";
            const isActive = user.state === "active";

            return (
              <tr
                key={user._id}
                className="border-b border-[var(--border)] hover:bg-[var(--accent)] transition-colors duration-200"
              >
                <td className="p-3 text-[var(--card-foreground)]">{index + 1}</td>

                <td className="p-3 font-medium text-[var(--card-foreground)]">
                  {user.email}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isBlocked
                        ? "bg-[var(--destructive)] text-[var(--destructive-foreground)]"
                        : isActive
                        ? "bg-[#3e7c65] text-white"
                        : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                    }`}
                  >
                    {(user.state ?? "unknown").toUpperCase()}
                  </span>
                </td>

                <td className="p-3 flex justify-center items-center gap-4">
                  <button
                    className="p-2 rounded-full hover:bg-[var(--secondary)] transition-colors"
                    onClick={() => onViewDetail(user._id)}
                    title="View details"
                  >
                    <EyeIcon size={22} className="text-[var(--card-foreground)]" />
                  </button>

                  {isBlocked ? (
                    <button
                      className={`p-2 rounded-full hover:bg-green-100 ${
                        actionLoading ? "opacity-50 pointer-events-none" : ""
                      }`}
                      onClick={() => onToggleLock(user._id, false)}
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
                        actionLoading ? "opacity-50 pointer-events-none" : ""
                      }`}
                      onClick={() => onToggleLock(user._id, true)}
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
