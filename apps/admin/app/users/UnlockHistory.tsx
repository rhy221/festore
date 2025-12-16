"use client";

import React from "react";
import { type User } from "@/api/users.api";

interface UnlockHistoryDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UnlockHistoryDialog({
  user,
  open,
  onOpenChange,
}: UnlockHistoryDialogProps) {
  if (!user || !open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
        <div className="mt-10 mb-8 w-full max-w-4xl rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-8">
          {/* Header */}
          <div className="relative">
            <h2 className="text-2xl font-bold text-slate-900">
              Processing Details
            </h2>
            <button
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              className="absolute right-0 top-0 inline-flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded"
            >
              <img src="/xButtonIcon.png" alt="Close" className="w-5 h-5" />
            </button>
          </div>

          {/* Two-column info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mt-6 text-slate-900">
            <InfoRow label="Full Name" value={user.fullName} />
            <InfoRow label="Role" value={user.role} />
            <InfoRow label="Email Address" value={user.email} />
            <InfoRow label="Phone Number" value={user.phone} />
            <InfoRow label="Account Status" value={user.status} />
            <InfoRow label="Lock Date" value={user.lockDate} />
          </div>

          {/* Reasons */}
          <div className="mt-6 text-slate-900">
            <ReasonSection
              label="Account Lock Reason"
              value={user.lockReason}
            />
            <ReasonSection
              label="Appeal Reason"
              value={user.appealReason}
              className="mt-4"
            />
          </div>

          {/* History table */}
          <div className="mt-6">
            <p className="font-semibold mb-3">Processing History</p>

            <div className="overflow-x-auto">
              <table className="w-full border border-slate-400 border-collapse text-sm">
                <thead>
                  <tr className="bg-white text-slate-700">
                    <th className="border border-slate-400 py-2 px-3">No.</th>
                    <th className="border border-slate-400 py-2 px-3">
                      Processed By
                    </th>
                    <th className="border border-slate-400 py-2 px-3">
                      Process Date
                    </th>
                    <th className="border border-slate-400 py-2 px-3">
                      Action
                    </th>
                    <th className="border border-slate-400 py-2 px-3">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user.processingHistory?.map((record, idx) => (
                    <tr key={record.id ?? idx}>
                      <td className="border border-slate-400 py-2 px-3 text-center">
                        {idx + 1}
                      </td>
                      <td className="border border-slate-400 py-2 px-3">
                        {record.processor}
                      </td>
                      <td className="border border-slate-400 py-2 px-3 text-center">
                        {record.processDate}
                      </td>
                      <td className="border border-slate-400 py-2 px-3 text-center">
                        {record.action}
                      </td>
                      <td className="border border-slate-400 py-2 px-3">
                        {record.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      <p className="font-semibold">{label}</p>
      <p className="mt-1">{value}</p>
    </div>
  );
}

function ReasonSection({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-semibold">{label}</p>
      <p className="mt-2">{value}</p>
    </div>
  );
}

export type { User };
