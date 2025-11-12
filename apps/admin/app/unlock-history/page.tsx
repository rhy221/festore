"use client";

import { useState } from "react";
import UnlockHistoryDialog, { type User } from "@/components/UnlockHistoryDialog";

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
}

export default function UnlockHistoryPage() {
  const [open, setOpen] = useState(true);

  return (
    <UnlockHistoryDialog 
      user={user}
      open={open}
      onOpenChange={setOpen}
    />
  );
}