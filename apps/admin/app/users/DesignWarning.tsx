"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { BackspaceIcon } from "@heroicons/react/24/solid";

export type Design = {
  name: string;
  designer: string;
  description: string;
  category: string;
  status: string;
  datePosted: string;
  image: string;
};

interface DesignWarningDialogProps {
  design: Design | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DesignWarningDialog({
  design,
  open,
  onOpenChange,
}: DesignWarningDialogProps) {
  const [warningContent, setWarningContent] = useState("");

  if (!design) return null;

  const handleSendWarning = () => {
    console.log("Sending warning:", warningContent);
    alert("The warning has been sent via email!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl p-6 bg-white text-black"
        showCloseButton={false}
      >
        <div className="flex items-center justify-between">
          <DialogTitle className="text-xl font-bold">
            Issue Warning
          </DialogTitle>

          <BackspaceIcon
            className="w-8 h-8 pt-1 text-black cursor-pointer"
            onClick={() => onOpenChange(false)}
          />
        </div>

        <div className="flex gap-6 mt-4">
          <div className="w-60">
            <img
              src={design.image}
              alt={design.name}
              className="w-full rounded-md border"
            />
          </div>

          <div className="flex-1 space-y-2 text-sm leading-relaxed">
            <InfoRow label="Design Name" value={design.name} />
            <InfoRow label="Designer" value={design.designer} />
            <InfoRow label="Description" value={design.description} />
            <InfoRow label="Category" value={design.category} />

            <div className="flex gap-8">
              <InfoRow label="Status" value={design.status} />
              <InfoRow label="Date Posted" value={design.datePosted} />
            </div>

            <p className="font-semibold mt-3">Warning Message</p>
            <textarea
              rows={3}
              value={warningContent}
              onChange={(e) => setWarningContent(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter warning message..."
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSendWarning}
            className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold"
          >
            Send via Email
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
}
