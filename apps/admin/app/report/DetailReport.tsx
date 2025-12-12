"use client";
import { BackspaceIcon } from "@heroicons/react/24/solid";
import { Button } from "@workspace/ui/components/button";

type User = {
  name: string;
  type: "designer" | "customer"; 
  violate: "copyright" | "comment";
  email: string;
  phone: string;
  status: "active";
  reportContent: string;
  reportDate: Date;
  annunciator: string;
};

export default function AdminReportDetailPopup({
  user,
  onClose,
}: {
  user: User;
  onClose: () => void;
}) {
  const displayStatus = (s: string) =>
    s === "active" ? "Đang hoạt động" : "Khóa";

  const displayViolate = (v: string) =>
    v === "copyright" ? "Vi phạm bản quyền" : "Vi phạm bình luận";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center 
      bg-black/40 backdrop-blur-sm">
      <div
        className="relative w-[680px] rounded-2xl 
        bg-white/80 backdrop-blur-xl shadow-2xl p-8 
        border border-white/40"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold tracking-wide text-neutral-900">
            Chi tiết vi phạm
          </h2>

          <BackspaceIcon
            className="w-8 h-8 text-neutral-700 hover:text-black cursor-pointer transition"
            onClick={onClose}
          />
        </div>

        {/* Info */}
        <div className="space-y-4 text-[15px] text-neutral-700">
          <div className="grid grid-cols-4 gap-y-2">
            <p className="font-medium text-neutral-900">Họ và tên</p>
            <p className="col-span-3">{user.name}</p>

            <p className="font-medium text-neutral-900">Email</p>
            <p className="col-span-3">{user.email}</p>

            <p className="font-medium text-neutral-900">SĐT</p>
            <p className="col-span-3">{user.phone}</p>

            <p className="font-medium text-neutral-900">Trạng thái</p>
            <p className="col-span-3">{displayStatus(user.status)}</p>

            <p className="font-medium text-neutral-900">Loại vi phạm</p>
            <p className="col-span-3">{displayViolate(user.violate)}</p>

            <p className="font-medium text-neutral-900">Người báo cáo</p>
            <p className="col-span-3">{user.annunciator}</p>

            <p className="font-medium text-neutral-900">Ngày báo cáo</p>
            <p className="col-span-3">{user.reportDate.toLocaleDateString()}</p>
          </div>

          {/* Content */}
          <div className="mt-4">
            <p className="font-medium text-neutral-900 pb-1">Nội dung chi tiết</p>
            <div
              className="p-4 rounded-xl bg-neutral-100 
              text-neutral-800 text-sm leading-relaxed 
              shadow-inner"
            >
              {user.reportContent}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-6 mt-8">
          <Button
            className="rounded-full px-8 py-2 text-lg
              bg-orange-500 hover:bg-orange-600 transition
              text-white shadow-md"
          >
            Cảnh cáo
          </Button>

          <Button
            className="rounded-full px-8 py-2 text-lg
              bg-red-600 hover:bg-red-700 transition
              text-white shadow-md"
          >
            Chặn tài khoản
          </Button>
        </div>
      </div>
    </div>
  );
}
