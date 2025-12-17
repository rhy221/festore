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
        className="max-w-4xl p-6 bg-white text-black"
        showCloseButton={false}
      >
        <div className="flex items-center justify-between">
          <DialogTitle className="text-xl font-bold">
            Design Details
          </DialogTitle>
          <BackspaceIcon
            className="w-8 h-8 cursor-pointer"
            onClick={() => onOpenChange(false)}
          />
        </div>

        <div className="flex gap-6 mt-4">
          <div className="w-72">
            <img
              src={resolveImage(design.imageUrls)}
              alt={design.title}
              className="w-full rounded-md border"
            />
          </div>

          <div className="flex-1 space-y-2 text-sm leading-relaxed">
            <p>
              <span className="font-semibold">Title:</span> {design.title}
            </p>

            <p>
              <span className="font-semibold">Description:</span>{" "}
              {design.description}
            </p>

            <p>
              <span className="font-semibold">Style:</span>{" "}
              {design.style ?? "-"}
            </p>

            <p>
              <span className="font-semibold">Gender:</span>{" "}
              {design.gender ?? "-"}
            </p>

            <p>
              <span className="font-semibold">Type:</span>{" "}
              {design.type ?? "-"}
            </p>

            <p>
              <span className="font-semibold">Price:</span>{" "}
              {design.price != null
                ? `${design.price.toLocaleString()} VND`
                : "-"}
            </p>

            <p>
              <span className="font-semibold">Status:</span>{" "}
              {design.status ?? "-"} &nbsp;&nbsp;
              <span className="font-semibold">State:</span>{" "}
              {design.state ?? "-"}
            </p>

            <p>
              <span className="font-semibold">Views:</span>{" "}
              {design.viewCount ?? 0} &nbsp;&nbsp;
              <span className="font-semibold">Likes:</span>{" "}
              {design.likeCount ?? 0}
            </p>

            <p>
              <span className="font-semibold">Purchases:</span>{" "}
              {design.purchaseCount ?? 0}
            </p>

            <p>
              <span className="font-semibold">Total Earning:</span>{" "}
              {design.totalEarning != null
                ? `${design.totalEarning.toLocaleString()} VND`
                : "0 VND"}
            </p>

            <p>
              <span className="font-semibold">Rating:</span>{" "}
              {design.averageRating ?? 0} / 5 (
              {design.ratingCount ?? 0} ratings)
            </p>

            <p>
              <span className="font-semibold">Comments:</span>{" "}
              {design.commentCount ?? 0}
            </p>

            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {design.createdAt
                ? new Date(design.createdAt).toLocaleString()
                : "-"}
            </p>

            <p>
              <span className="font-semibold">Updated At:</span>{" "}
              {design.updatedAt
                ? new Date(design.updatedAt).toLocaleString()
                : "-"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
