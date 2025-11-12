"use client";

import React, { useState } from "react";
import UnlockHistoryDialog, { type User } from "./UnlockHistoryDialog";

type UnlockRequest = {
  id: number;
  name: string;
  reason: string;
  date: string;
  status: "pending" | "processed";
}

interface UnlockRequestDialogProps {
  request: UnlockRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UnlockRequestDialog({ request, open, onOpenChange }: UnlockRequestDialogProps) {
  const [action, setAction] = useState<"unlock" | "reject" | null>(null);
  const [warnLast, setWarnLast] = useState(false);
  const [sendCommitment, setSendCommitment] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  
  // State for unlock history dialog
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);

  // Don't render if request is null, open is false, OR history dialog is open
  if (!request || !open || showHistoryDialog) {
    // Only render history dialog if it should be shown
    if (showHistoryDialog) {
      // Use existing user data from unlock-history page
      const user: User = {
        fullName: "Trịnh Mai Cường",
        role: "Nhà thiết kế",
        email: "maicuong123@gmail.com", 
        phone: "0123456789",
        status: "Đang bị khoá",
        lockDate: "10/07/2025",
        lockReason: "Tài khoản bị khóa do đăng mẫu thiết kế bị báo cáo vi phạm bản quyền quá 3 lần trong vòng 7 ngày.",
        appealReason: "Tài khoản bị khoá nhầm",
        processingHistory: [
          {
            id: 1,
            processor: "Nguyễn Thị Bình",
            processDate: "15/07/2025",
            action: "Từ chối",
            note: "Vi phạm 1 lần trước đó, chưa gỡ mẫu vi phạm."
          },
          {
            id: 2,
            processor: "Nguyễn Văn An", 
            processDate: "24/07/2025",
            action: "Từ chối",
            note: "Đề nghị khoá vĩnh viễn."
          }
        ]
      };

      return (
        <UnlockHistoryDialog
          user={user}
          open={showHistoryDialog}
          onOpenChange={(isOpen) => {
            setShowHistoryDialog(isOpen);
            if (!isOpen) {
              // Reset form when history dialog closes
              setAction(null);
              setWarnLast(false);
              setSendCommitment(false);
              setRejectReason("");
            }
          }}
        />
      );
    }
    return null;
  }

  // Convert request to user data for display
  const user: User = {
    fullName: request.name,
    role: "Nhà thiết kế",
    email: "maicuong123@gmail.com",
    phone: "0123456789",
    status: "Đang bị khoá",
    lockDate: "10/07/2025",
    lockReason: "Tài khoản bị khóa do đăng mẫu thiết kế bị báo cáo vi phạm bản quyền quá 3 lần trong vòng 7 ngày.",
    appealReason: request.reason,
    processingHistory: [
      {
        id: 1,
        processor: "Nguyễn Thị Bình",
        processDate: "15/07/2025",
        action: "Từ chối",
        note: "Vi phạm 1 lần trước đó, chưa gỡ mẫu vi phạm."
      }
    ]
  };

  const handleSubmit = () => {
    // Just show the history dialog
    setShowHistoryDialog(true);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />

      {/* Modal container - top aligned, centered horizontally */}
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
        <div className="mt-6 mb-8 w-full max-w-4xl rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
          {/* Header */}
          <div className="relative border-b border-gray-100 px-8 pt-6 pb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-slate-900">
              Chi tiết yêu cầu mở khoá
            </h2>

            {/* top-right close pill */}
            <button
              onClick={() => onOpenChange(false)}
              aria-label="Đóng"
              className="absolute right-6 top-4 inline-flex items-center justify-center w-9 h-9 hover:bg-gray-100 rounded"
            >
              <img src="/xButtonIcon.png" alt="Close" className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-8 pb-8 pt-6">
            {/* Two column info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-slate-900">
              <InfoRow label="Họ và tên đầy đủ" value={user.fullName} />
              <InfoRow label="Vai trò" value={user.role} />
              <InfoRow label="Địa chỉ email" value={user.email} />
              <InfoRow label="SĐT" value={user.phone} />
              <InfoRow label="Trạng thái" value={user.status} />
              <InfoRow label="Ngày khoá" value={user.lockDate} />
            </div>

            {/* Reasons */}
            <div className="mt-6 text-slate-900">
              <ReasonSection label="Lý do khoá tài khoản" value={user.lockReason} />
              <ReasonSection label="Lý do khiếu nại" value={user.appealReason} className="mt-4" />
            </div>

            {/* History table */}
            <div className="mt-6">
              <p className="font-semibold mb-3">Lịch sử xử lý</p>

              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse text-sm">
                  <thead>
                    <tr className="bg-white text-left text-slate-700">
                      <th className="py-3 px-3 border border-slate-200 w-12">STT</th>
                      <th className="py-3 px-3 border border-slate-200">Người xử lý</th>
                      <th className="py-3 px-3 border border-slate-200 w-40">Ngày xử lý</th>
                      <th className="py-3 px-3 border border-slate-200 w-32">Hành động</th>
                      <th className="py-3 px-3 border border-slate-200">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.processingHistory.map((record) => (
                      <tr key={record.id}>
                        <td className="py-3 px-3 border border-slate-200">{record.id}</td>
                        <td className="py-3 px-3 border border-slate-200">{record.processor}</td>
                        <td className="py-3 px-3 border border-slate-200">{record.processDate}</td>
                        <td className="py-3 px-3 border border-slate-200">{record.action}</td>
                        <td className="py-3 px-3 border border-slate-200">{record.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action area */}
            <div className="mt-6">
              <p className="font-semibold mb-4">Hành động xử lý</p>

              {/* Radio style - inline */}
              <div className="flex items-center gap-8 mb-4">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="action"
                    checked={action === "unlock"}
                    onChange={() => setAction("unlock")}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="flex items-center gap-2 text-base">
                    Mở khoá
                    <span className="inline-flex items-center justify-center rounded bg-green-600 text-white w-6 h-6 text-xs">
                      ✓
                    </span>
                  </span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="action"
                    checked={action === "reject"}
                    onChange={() => setAction("reject")}
                    className="w-5 h-5 text-red-600"
                  />
                  <span className="flex items-center gap-2 text-base">
                    Từ chối
                    <span className="inline-flex items-center justify-center rounded bg-red-400 text-white w-6 h-6 text-xs">
                      ⊖
                    </span>
                  </span>
                </label>
              </div>

              {/* Small checkboxes */}
              <div className="flex flex-col gap-2 mb-6">
                <label className="flex items-center gap-3 text-base">
                  <input
                    type="checkbox"
                    checked={warnLast}
                    onChange={(e) => setWarnLast(e.target.checked)}
                    className="w-4 h-4"
                  />
                  Cảnh báo lần cuối cùng.
                </label>

                <label className="flex items-center gap-3 text-base">
                  <input
                    type="checkbox"
                    checked={sendCommitment}
                    onChange={(e) => setSendCommitment(e.target.checked)}
                    className="w-4 h-4"
                  />
                  Gửi cam kết qua email.
                </label>
              </div>

              <div className="mb-4">
                <p className="font-semibold mb-2">Lý do từ chối</p>

                {/* Underline style textarea */}
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder=""
                  className="w-full resize-y bg-transparent border-0 border-b-2 border-slate-300 focus:outline-none focus:border-slate-400 py-2 text-base min-h-[56px]"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6 pb-6">
              <button
                onClick={handleSubmit}
                className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-4 rounded-full"
              >
                Hoàn tất
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* --- Components --- */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-base font-semibold">{label}</p>
      <p className="mt-1 text-base">{value}</p>
    </div>
  )
}

function ReasonSection({ 
  label, 
  value, 
  className 
}: { 
  label: string; 
  value: string; 
  className?: string 
}) {
  return (
    <div className={className}>
      <p className="font-semibold text-base">{label}</p>
      <p className="mt-2 text-base">{value}</p>
    </div>
  )
}

export type { UnlockRequest }