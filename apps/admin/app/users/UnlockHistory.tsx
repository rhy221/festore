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

  const roles = Array.isArray(user.role)
    ? user.role.join(", ")
    : user.role ?? "—";

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/50" />

      {/* Modal wrapper */}
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-2 sm:px-4">
        <div
          className="
            mt-4 mb-6
            w-full max-w-4xl
            rounded-2xl
            bg-card text-card-foreground
            shadow-xl ring-1 ring-border
            p-4 sm:p-6 md:p-8
          "
        >
          {/* Header */}
          <div className="relative flex items-start justify-between gap-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
              Processing Details
            </h2>

            <button
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              className="
                inline-flex h-8 w-8 items-center justify-center
                rounded-md
                hover:bg-muted
                transition
              "
            >
              <img src="/xButtonIcon.png" alt="Close" className="h-4 w-4" />
            </button>
          </div>

          {/* User info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12">
            <InfoRow label="Full Name" value={user.fullName ?? "—"} />
            <InfoRow label="Role" value={roles} />
            <InfoRow label="Email Address" value={user.email ?? "—"} />
            <InfoRow label="Phone Number" value={user.phone ?? "—"} />
            <InfoRow label="Account Status" value={user.state ?? "—"} />
            <InfoRow label="Lock Date" value={user.lockDate ?? "—"} />
          </div>

          {/* Reasons */}
          <div className="mt-6 space-y-4">
            <ReasonSection
              label="Account Lock Reason"
              value={user.lockReason ?? "—"}
            />
            <ReasonSection
              label="Appeal Reason"
              value={user.appealReason ?? "—"}
            />
          </div>

          {/* History */}
          <div className="mt-6">
            <p className="mb-3 font-semibold">Processing History</p>

            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-xs sm:text-sm">
                <thead className="bg-muted">
                  <tr>
                    <Th>No.</Th>
                    <Th>Processed By</Th>
                    <Th>Process Date</Th>
                    <Th>Action</Th>
                    <Th>Notes</Th>
                  </tr>
                </thead>

                <tbody>
                  {user.processingHistory?.length ? (
                    user.processingHistory.map((record, idx) => (
                      <tr
                        key={record.id ?? idx}
                        className="hover:bg-muted/50 transition"
                      >
                        <Td center>{idx + 1}</Td>
                        <Td>{record.processor}</Td>
                        <Td center>{record.processDate}</Td>
                        <Td center>{record.action}</Td>
                        <Td>{record.note}</Td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-4 text-center text-muted-foreground"
                      >
                        No processing history
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm sm:text-base">{value}</p>
    </div>
  );
}

function ReasonSection({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm sm:text-base">{value}</p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="border border-border px-3 py-2 text-left font-medium">
      {children}
    </th>
  );
}

function Td({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <td
      className={`border border-border px-3 py-2 ${
        center ? "text-center" : ""
      }`}
    >
      {children}
    </td>
  );
}
