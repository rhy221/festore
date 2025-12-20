"use client";

import React, { useEffect, useState } from "react";
import UnlockHistoryDialog from "./UnlockHistory";
import { BackspaceIcon } from "@heroicons/react/24/solid";
import { CheckCircle2Icon, MinusCircle } from "lucide-react";
import { type User } from "@/api/users.api";

type UnlockRequest = {
  _id: string;
  userId: User;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

interface UnlockRequestDialogProps {
  request: UnlockRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UnlockRequestDialog({
  request,
  open,
  onOpenChange,
}: UnlockRequestDialogProps) {
  const [action, setAction] = useState<"unlock" | "reject" | null>(null);
  const [finalWarning, setFinalWarning] = useState(false);
  const [sendCommitment, setSendCommitment] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tempUser, setTempUser] = useState<User | null>(null);
  
  useEffect(() => {
    if (request && open) {
      setCurrentUser({
        ...request.userId,
        processingHistory: request.userId.processingHistory ?? [],
      });
    }
  }, [request, open]);

  if (!request || !open || !currentUser) return null;

  const closeModal = () => {
    onOpenChange(false);
    setAction(null);
    setFinalWarning(false);
    setSendCommitment(false);
    setRejectReason("");
    setShowHistoryDialog(false);
    setTempUser(null);
  };

  const handleSubmit = () => {
    if (!action) return;

    const now = new Date();
    const formatDate = (d: Date) =>
      `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${d.getFullYear()}`;

    const newRecord = {
      id: (currentUser.processingHistory?.length ?? 0) + 1,
      processor: "Administrator",
      processDate: formatDate(now),
      action: action === "unlock" ? "Unlocked" : "Rejected",
      note:
        action === "unlock"
          ? [
              finalWarning && "Final warning issued",
              sendCommitment && "Commitment email sent",
            ]
              .filter(Boolean)
              .join("; ") || "No additional notes"
          : rejectReason || "No reason provided",
    };

    const updatedUser: User = {
      ...currentUser,
      state: action === "unlock" ? "active" : "blocked",
      processingHistory: [
        ...(currentUser.processingHistory ?? []),
        newRecord,
      ],
    };

    setTempUser(updatedUser);
    setCurrentUser(updatedUser);
    setShowHistoryDialog(true);
  };

  if (showHistoryDialog) {
    return (
      <UnlockHistoryDialog
        user={tempUser ?? currentUser}
        open={showHistoryDialog}
        onOpenChange={(open) => {
          setShowHistoryDialog(open);
          if (!open) closeModal();
        }}
      />
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" />

      <div className="fixed inset-0 z-50 flex justify-center items-start overflow-y-auto">
        <div className="mt-6 w-full max-w-4xl bg-white rounded-2xl shadow-xl">
          {/* Header */}
          <div className="relative border-b px-8 pt-6 pb-4">
            <h2 className="text-3xl font-extrabold text-center">
              Unlock Request Details
            </h2>
            <BackspaceIcon
              className="absolute right-6 top-4 w-9 h-9 cursor-pointer"
              onClick={closeModal}
            />
          </div>

          {/* Content */}
          <div className="px-8 py-6 space-y-6">
            {/* User info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoRow label="Email" value={currentUser.email} />
              <InfoRow
                label="Role"
                value={currentUser.role?.join(", ") ?? "—"}
              />
              <InfoRow label="Status" value={currentUser.state ?? "—"} />
            </div>

            {/* Appeal reason */}
            <ReasonSection label="Appeal Reason" value={request.reason} />

            {/* Action */}
            <div>
              <p className="font-semibold mb-4">Administrative Action</p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Unlock */}
                <div className="space-y-4">
                  <label className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2Icon className="w-8 h-8 text-green-600" />
                      <span className="font-medium">Unlock Account</span>
                    </div>
                    <input
                      type="radio"
                      checked={action === "unlock"}
                      onChange={() => setAction("unlock")}
                    />
                  </label>

                  <label className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={finalWarning}
                      onChange={(e) => setFinalWarning(e.target.checked)}
                    />
                    Final warning
                  </label>

                  <label className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={sendCommitment}
                      onChange={(e) => setSendCommitment(e.target.checked)}
                    />
                    Send commitment email
                  </label>
                </div>

                {/* Reject */}
                <div>
                  <label className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <MinusCircle className="w-8 h-8 text-red-500" />
                      <span className="font-medium">Reject Request</span>
                    </div>
                    <input
                      type="radio"
                      checked={action === "reject"}
                      onChange={() => setAction("reject")}
                    />
                  </label>

                  <p className="font-semibold mt-4 mb-2">Rejection Reason</p>
                  <textarea
                    className="w-full border-b outline-none min-h-[120px]"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!action}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-4 rounded-full text-lg font-semibold"
            >
              Complete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-semibold">{label}</p>
      <p>{value}</p>
    </div>
  );
}

function ReasonSection({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-semibold">{label}</p>
      <p className="mt-2">{value}</p>
    </div>
  );
}

export type { UnlockRequest };
