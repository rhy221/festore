"use client";

import React from "react";
import type { UnlockRequest } from "./UnlockRequest";
import { displayUnlockStatus } from "./types";
import { EyeIcon } from "lucide-react";

type UnlockRequestTableProps = {
  requests: UnlockRequest[];
  onViewRequest: (request: UnlockRequest) => void;
};

export default function UnlockRequestTable({
  requests,
  onViewRequest,
}: UnlockRequestTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[var(--popover)] text-[var(--popover-foreground)]">
            <th className="p-3 font-semibold">No.</th>
            <th className="p-3 font-semibold">Email</th>
            <th className="p-3 font-semibold">Appeal Content</th>
            <th className="p-3 font-semibold">Submitted Date</th>
            <th className="p-3 font-semibold">Status</th>
            <th className="p-3 font-semibold text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r, i) => (
            <tr
              key={r._id}
              className="border-b border-[var(--border)] hover:bg-[var(--accent)] transition-colors"
            >
              <td className="p-3 text-[var(--card-foreground)]">{i + 1}</td>

              <td className="p-3 text-[var(--card-foreground)]">
                {r.userId?.email ?? "—"}
              </td>

              <td className="p-3 text-[var(--card-foreground)]">{r.reason}</td>

              <td className="p-3 text-[var(--card-foreground)]">
                {r.createdAt
                  ? new Date(r.createdAt).toLocaleDateString()
                  : "—"}
              </td>

              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    r.status === "pending"
                      ? "bg-[var(--accent)] text-[var(--foreground)]"
                      : r.status === "approved"
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                      : "bg-[var(--destructive)] text-[var(--destructive-foreground)]"
                  }`}
                >
                  {displayUnlockStatus(r.status)}
                </span>
              </td>

              <td className="p-3 flex justify-center">
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-[var(--muted)] transition-colors"
                  onClick={() => onViewRequest(r)}
                  title="View request details"
                >
                  <EyeIcon size={22} className="text-[var(--card-foreground)]" />
                </button>
              </td>
            </tr>
          ))}

          {requests.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-12 text-center text-[var(--muted-foreground)] text-lg font-medium"
              >
                No unlock requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
