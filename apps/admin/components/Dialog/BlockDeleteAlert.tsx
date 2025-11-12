"use client";
import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BlockDeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  type?: "block" | "delete" | "unblock";
}

export default function BlockDeleteAlert({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type,
}: BlockDeleteAlertProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-fit h-[345px] rounded-[45px]">
        <AlertDialogHeader className="flex flex-col items-center">
          <img
            src={type === "unblock" ? "/warningIcon.png" : "/warningButRed.png"}
            alt="Warning"
            className="w-[50px]"
          />
          <AlertDialogTitle className="text-center text-[28px] font-extrabold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center whitespace-pre-line text-xl text-black">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <div className="flex gap-4">
          <AlertDialogAction onClick={onClose} className="text-2xl font-bold bg-[#0057FF] w-[173px] h-[55px] rounded-[45px] hover:bg-blue-700 px-8">
            Huỷ
          </AlertDialogAction>
          <AlertDialogAction onClick={onConfirm} className={`text-2xl font-bold ${type === "unblock" ? "bg-[#00C853] hover:bg-green-700" : "bg-[#FF5E5E] hover:bg-red-700"} w-[173px] h-[55px] rounded-[45px] px-8`}>
            {type === "block" ? "Chặn" : type === "delete" ? "Xoá" : "Bỏ chặn"}
          </AlertDialogAction>
            </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
