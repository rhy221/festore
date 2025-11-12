"use client";
import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CustomSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessAlertDialog({
  isOpen,
  onClose,
  message,
}: CustomSuccessDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-fit h-[249px] rounded-[45px] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center">
          <img
            src={"/successIcon.png"}
            alt="Admin Table"
            className="w-[50px] mb-8"
          />
          <AlertDialogTitle className="text-center text-2xl font-normal">
            {message}
          </AlertDialogTitle>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
