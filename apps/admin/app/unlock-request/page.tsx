"use client";

import { useState } from "react";
import UnlockRequestDialog, { type UnlockRequest } from "@/components/UnlockRequestDialog";

const sampleRequest: UnlockRequest = {
  id: 1,
  name: "Trịnh Mai Cường",
  reason: "Tài khoản bị khoá nhầm",
  date: "22/07/2025",
  status: "pending"
};

export default function UnlockRequestPage() {
  const [open, setOpen] = useState(true);

  return (
    <UnlockRequestDialog 
      request={sampleRequest}
      open={open}
      onOpenChange={setOpen}
    />
  );
}