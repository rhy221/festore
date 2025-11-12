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

interface CustomAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function CustomAlertDialog({
  isOpen,
  onClose,
  title,
  message,
}: CustomAlertDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-fit h-[345px] rounded-[45px]">
        <AlertDialogHeader className="flex flex-col items-center">
          <img
            src={"/warningIcon.png"}
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
          <AlertDialogAction className="text-2xl font-bold bg-[#0057FF] w-[173px] h-[55px] rounded-[45px] hover:bg-blue-700 px-8">
            Đã hiểu
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
