"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { BackspaceIcon } from "@heroicons/react/24/solid";
import type { Design } from "@/api/users.api";

const resolveImage = (urls?: string[]) => {
  const first = urls?.[0];
  return first && first.trim() !== "" ? first : "/placeholder.png";
};

interface DesignDetailDialogProps {
  design: Design | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DesignDetailDialog({
  design,
  open,
  onOpenChange,
}: DesignDetailDialogProps) {
  if (!design) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="
          w-[65vw] max-w-none
          max-h-[80vh]
          overflow-y-auto
          bg-[var(--card)]
          text-[var(--card-foreground)]
          border border-[var(--border)]
          p-3 sm:p-5
        "
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <DialogTitle className="text-lg sm:text-xl font-semibold">
            Design Details
          </DialogTitle>
          <BackspaceIcon
            className="
              w-6 h-6
              cursor-pointer
              text-[var(--muted-foreground)]
              hover:text-[var(--foreground)]
              transition
            "
            onClick={() => onOpenChange(false)}
          />
        </div>

        <div className="mt-3 flex flex-col md:flex-row gap-3 md:gap-5">
          <div className="w-full md:w-80 flex-shrink-0">
            <img
              src={resolveImage(design.imageUrls)}
              alt={design.title}
              className="
                w-full
                h-64
                object-cover
                rounded-lg
                border border-[var(--border)]
                bg-[var(--muted)]
              "
            />
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-1.5 text-sm">
            <Info label="Title" value={design.title} />
            <Info label="Style" value={design.style} />
            <Info label="Gender" value={design.gender} />
            <Info label="Type" value={design.type} />
            <Info
              label="Price"
              value={
                design.price != null
                  ? `${design.price.toLocaleString()} VND`
                  : "-"
              }
            />
            <Info label="Status" value={design.status} />
            <Info label="State" value={design.state} />
            <Info label="Views" value={design.viewCount ?? 0} />
            <Info label="Likes" value={design.likeCount ?? 0} />
            <Info label="Purchases" value={design.purchaseCount ?? 0} />
            <Info
              label="Total Earning"
              value={
                design.totalEarning != null
                  ? `${design.totalEarning.toLocaleString()} VND`
                  : "0 VND"
              }
            />
            <Info
              label="Rating"
              value={`${design.averageRating ?? 0} / 5 (${
                design.ratingCount ?? 0
              })`}
            />
            <Info label="Comments" value={design.commentCount ?? 0} />
            <Info
              label="Created At"
              value={
                design.createdAt
                  ? new Date(design.createdAt).toLocaleString()
                  : "-"
              }
            />
            <Info
              label="Updated At"
              value={
                design.updatedAt
                  ? new Date(design.updatedAt).toLocaleString()
                  : "-"
              }
            />

            <div className="sm:col-span-2 mt-1">
              <p className="text-[var(--muted-foreground)] text-xs mb-1">
                Description
              </p>
              <p className="leading-relaxed">
                {design.description || "-"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <p>
      <span className="text-[var(--muted-foreground)]">{label}:</span>{" "}
      <span className="font-medium">{value ?? "-"}</span>
    </p>
  );
}
