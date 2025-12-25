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
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/50" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-2 sm:px-4">
        <div
          className="
            mt-4 mb-6
            w-full max-w-4xl
            rounded-2xl
            bg-card text-card-foreground
            shadow-xl ring-1 ring-border
          "
        >
          {/* Header */}
          <div className="relative border-b border-border px-4 sm:px-6 py-4">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-center">
              Unlock Request Details
            </h2>

            <BackspaceIcon
              className="
                absolute right-4 top-4
                h-7 w-7 sm:h-9 sm:w-9
                cursor-pointer
                text-muted-foreground
                hover:text-foreground
              "
              onClick={closeModal}
            />
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 py-6 space-y-6">
            {/* User info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <InfoRow label="Email" value={currentUser.email ?? "—"} />
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Unlock */}
                <div className="space-y-4">
                  <label className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted transition">
                    <div className="flex items-center gap-3">
                      <CheckCircle2Icon className="h-7 w-7 text-chart-4" />
                      <span className="font-medium">Unlock Account</span>
                    </div>
                    <input
                      type="radio"
                      checked={action === "unlock"}
                      onChange={() => setAction("unlock")}
                    />
                  </label>

                  <label className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={finalWarning}
                      onChange={(e) => setFinalWarning(e.target.checked)}
                    />
                    Final warning
                  </label>

                  <label className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={sendCommitment}
                      onChange={(e) => setSendCommitment(e.target.checked)}
                    />
                    Send commitment email
                  </label>
                </div>

                {/* Reject */}
                <div className="space-y-3">
                  <label className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted transition">
                    <div className="flex items-center gap-3">
                      <MinusCircle className="h-7 w-7 text-destructive" />
                      <span className="font-medium">Reject Request</span>
                    </div>
                    <input
                      type="radio"
                      checked={action === "reject"}
                      onChange={() => setAction("reject")}
                    />
                  </label>

                  <p className="font-semibold">Rejection Reason</p>
                  <textarea
                    className="
                      w-full
                      rounded-md
                      bg-background
                      border border-border
                      p-2
                      text-sm
                      outline-none
                      focus:ring-2 focus:ring-ring
                      min-h-[120px]
                    "
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!action}
              className="
                w-full
                rounded-full
                bg-primary text-primary-foreground
                py-3 sm:py-4
                text-base sm:text-lg
                font-semibold
                hover:opacity-90
                disabled:opacity-50
                transition
              "
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
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className="mt-1">{value}</p>
    </div>
  );
}

function ReasonSection({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className="mt-2">{value}</p>
    </div>
  );
}

export type { UnlockRequest };
