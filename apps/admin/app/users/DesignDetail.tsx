"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import DesignWarningDialog from "./DesignWarning";
import { BackspaceIcon } from "@heroicons/react/24/solid";

export type Design = {
  id: string;
  name: string;
  designer: string;
  description: string;
  category: string;
  status: string;
  datePosted: string;
  image: string;
  salesInfo: {
    directPrice: string;
    auction: {
      startingPrice: string;
      priceStep: string;
      finalPrice: string;
      winner: string;
    };
  };
  engagement: {
    likes: number;
    views: number;
  };
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
  const [showWarningDialog, setShowWarningDialog] = useState(false);

  if (!design) return null;

  const handleWarningClick = () => {
    setShowWarningDialog(true);
  };

  const handleDelete = () => {
    console.log("Deleting design:", design.name);
    alert("The design has been deleted!");
    onOpenChange(false);
  };

  const warningDesign = {
    name: design.name,
    designer: design.designer,
    description: design.description,
    category: design.category,
    status: design.status,
    datePosted: design.datePosted,
    image: design.image,
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="max-w-3xl p-6 bg-white text-black"
          showCloseButton={false}
        >
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Design Details
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
              <p>
                <span className="font-semibold">Design Name:</span>{" "}
                {design.name}
              </p>
              <p>
                <span className="font-semibold">Designer:</span>{" "}
                {design.designer}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {design.description}
              </p>
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {design.category}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {design.status} &nbsp;&nbsp;
                <span className="font-semibold">Date Posted:</span>{" "}
                {design.datePosted}
              </p>

              <h4 className="mt-3 font-semibold">Sales Information</h4>
              <p>
                <span className="font-semibold">Direct Price:</span>{" "}
                {design.salesInfo.directPrice}
              </p>
              <p>
                <span className="font-semibold">Auction:</span>
              </p>
              <ul className="list-disc list-inside pl-2">
                <li>
                  Starting Price:{" "}
                  {design.salesInfo.auction.startingPrice}
                </li>
                <li>
                  Price Step:{" "}
                  {design.salesInfo.auction.priceStep}
                </li>
                <li>
                  Final Price:{" "}
                  {design.salesInfo.auction.finalPrice}
                </li>
                <li>
                  Winner:{" "}
                  {design.salesInfo.auction.winner}
                </li>
              </ul>

              <p>
                <span className="font-semibold">Likes:</span>{" "}
                {design.engagement.likes} &nbsp;&nbsp;
                <span className="font-semibold">Views:</span>{" "}
                {design.engagement.views}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleWarningClick}
              className="px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white"
            >
              Issue Warning
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <DesignWarningDialog
        design={warningDesign}
        open={showWarningDialog}
        onOpenChange={setShowWarningDialog}
      />
    </>
  );
}
