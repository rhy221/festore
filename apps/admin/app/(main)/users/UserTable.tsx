"use client";

import React, { useState } from "react";
import { User, UsersAPI } from "@/api/users.api";
import { EyeIcon, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import api from "@/lib/http";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

type UserTableProps = {
  users: User[];
  onViewDetail: (userId: string) => void;
  onRefresh: () => void; // Thêm hàm để refresh danh sách sau khi call API
  isLoading?: boolean;
};

export default function UserTable({
  users,
  onViewDetail,
  onRefresh,
  isLoading = false,
}: UserTableProps) {
  // State quản lý Dialog
  const [confirmData, setConfirmData] = useState<{
    userId: string;
    willLock: boolean;
  } | null>(null);
  const mutation = useMutation({
    mutationFn: UsersAPI.updateUserState
  })
  const handleActionConfirm = async (reason: string) => {
    if (!confirmData) return;

    try {
      
      const res = await mutation.mutateAsync({userId: confirmData.userId,
        state: confirmData.willLock ? "banned" : "active",
        reason: reason,
})

      toast.success(`User ${confirmData.willLock ? "locked" : "unlocked"} successfully`);
      setConfirmData(null); // Đóng dialog
      onRefresh(); // Load lại dữ liệu
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update user status");
    } finally {
      
    }
  };

  const validUsers = users.filter((u) => u.email && u.email.trim() !== "");

  if (isLoading) return <div className="py-12 text-center">Loading...</div>;

  return (
    <div className="overflow-x-auto shadow-lg rounded-xl">
      <table className="min-w-full bg-[var(--card)] rounded-xl border-collapse">
        {/* ... (Thead giữ nguyên) */}
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
            const isBlocked = user.state === "banned";
            return (
              <tr key={user._id} className="border-b border-[var(--border)] hover:bg-[var(--accent)]">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{user.email}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isBlocked ? "bg-red-500/20 text-red-600" : "bg-green-500/20 text-green-600"
                  }`}>
                    {(user.state ?? "unknown").toUpperCase()}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-4">
                  <button onClick={() => onViewDetail(user._id)} title="View details">
                    <EyeIcon size={22} className="text-muted-foreground hover:text-foreground transition" />
                  </button>

                  <button
                    onClick={() => setConfirmData({ userId: user._id, willLock: !isBlocked })}
                    title={isBlocked ? "Unlock account" : "Lock account"}
                    className={`p-2 rounded-full transition-colors ${
                      isBlocked ? "hover:bg-green-100" : "hover:bg-red-100"
                    }`}
                  >
                    {isBlocked ? (
                      <LockKeyholeOpen size={22} className="text-green-500" />
                    ) : (
                      <LockKeyhole size={22} className="text-red-500" />
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Render Dialog khi có data */}
      <ActionConfirmDialog
        isOpen={!!confirmData}
        title={confirmData?.willLock ? "Lock User Account" : "Unlock User Account"}
        onClose={() => setConfirmData(null)}
        onConfirm={handleActionConfirm}
        isLoading={mutation.isPending}
      />
    </div>
  );
}


// ActionConfirmDialog.tsx
interface ActionConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  title: string;
  isLoading?: boolean;
}

export  function ActionConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  isLoading
}: ActionConfirmDialogProps) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-card p-6 rounded-2xl shadow-xl border border-border">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Reason for this action
            </label>
            <textarea
              className="w-full mt-1 p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary outline-none min-h-[100px]"
              placeholder="Enter reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg hover:bg-muted transition"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(reason)}
              disabled={!reason.trim() || isLoading}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                title.includes("Unlock") 
                  ? "bg-green-600 text-white hover:bg-green-700" 
                  : "bg-destructive text-destructive-foreground hover:opacity-90"
              } disabled:opacity-50`}
            >
              {isLoading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
