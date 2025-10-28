"use client";
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
      <div className="w-[360px] h-[240px] border rounded shadow-sm flex items-center justify-center p-4 relative">
        {value ? (
          <>
            <img
              src={value}
              className="object-contain max-h-full max-w-full"
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
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="1"
                stroke="#111827"
                strokeOpacity="0.6"
                strokeWidth="1.4"
              />
              <path
                d="M9 14l2.5-3 3.5 4.5 2.5-3"
                stroke="#111827"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="17"
                cy="7"
                r="1.6"
                stroke="#111827"
                strokeWidth="1.4"
              />
            </svg>
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
      </div>
    </div>
  );
}
