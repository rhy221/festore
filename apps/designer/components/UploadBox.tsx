"use client";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Image as ImageIcon } from "lucide-react";
import React, { useRef } from "react";

export default function UploadBox({
  value,
  onChange,
}: {
  value?: string | null;
  onChange: (f: File | null) => void;
}) {
  
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col items-center">
      <label className="text-lg mb-4">Tải ảnh</label>
      <Card 
      className="w-[360px] h-[240px] relative flex flex-col justify-center p-0"               
      
      >
        <CardContent >
           {value ? (
          <>
            <img
              src={value}
              className="object-contain w-[100%] h-[100%]"
              alt="preview"
            />
            {/* Delete button */}
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
              title="Xóa ảnh"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-600">
            <ImageIcon className="w-[48px] h-[48px]" />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-2 text-sm cursor-pointer hover:text-blue-600 transition-colors duration-200"
            >
              Chọn ảnh
            </button>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          className="hidden"
          onChange={(e) => {
            const f =
              e.target.files && e.target.files[0] ? e.target.files[0] : null;
            onChange(f);
          }}
        />
        </CardContent>
       
      </Card>
    </div>
  );
}
