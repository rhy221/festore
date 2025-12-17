"use client";

import * as React from "react";
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { useState, useRef } from "react";

/* =======================
   Helpers
======================= */
const resolveImage = (url?: string) =>
  url && url.trim() !== "" ? url : "/placeholder.png";

/* =======================
   Types
======================= */
interface CategoryCardProps {
  title: string;
  imageUrl?: string;
  href: string;
  onMenuClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

interface ReportCardProps {
  title: string;
  icon: React.ReactNode;
  number: number;
  color?: string;
}

/* =======================
   CategoryCard
======================= */
export function CategoryCard({
  title,
  imageUrl,
  href,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <Link href={href} className="block !cursor-default">
      <div className="relative w-70 h-70 rounded-4xl bg-[#FAF0E6] p-5 cursor-pointer transition hover:shadow-lg">
        {/* Header */}
        <div className="relative flex items-center justify-between">
          <h3 className="absolute left-1/2 -translate-x-1/2 font-bold text-center">
            {title}
          </h3>

          <div ref={menuRef} className="ml-auto relative">
            <button
              type="button"
              className="rounded-full cursor-pointer hover:bg-[#ecded0]"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
            >
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Menu */}
        {isMenuOpen && (
          <div className="absolute top-1/2 left-full z-10 w-32 -translate-x-[70%] -translate-y-[70%] rounded-lg border bg-[#EFF6FF] shadow-lg">
            <button className="block w-full px-4 py-1 text-left hover:bg-[#dee8f5]">
              View
            </button>
            <hr className="mx-1 my-1 h-px border-0 bg-black" />
            <button
              className="block w-full px-4 py-1 text-left hover:bg-[#dee8f5]"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit?.();
              }}
            >
              Edit
            </button>
            <hr className="mx-1 my-1 h-px border-0 bg-black" />
            <button
              className="block w-full px-4 py-1 text-left hover:bg-[#dee8f5]"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete?.();
              }}
            >
              Delete
            </button>
          </div>
        )}

        {/* Image */}
        <div className="mt-3">
          <img
            src={resolveImage(imageUrl)}
            alt={title}
            className="w-75 h-51 rounded-4xl object-cover"
          />
        </div>
      </div>
    </Link>
  );
}

/* =======================
   ProductCard
======================= */
export function ProductCard({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl?: string;
}) {
  return (
    <div className="relative w-70 h-70 rounded-4xl bg-[#FAF0E6] p-3 cursor-default transition hover:shadow-lg">
      <div className="mt-3">
        <img
          src={resolveImage(imageUrl)}
          alt={title}
          className="h-48 w-full rounded-4xl object-cover"
        />
      </div>
      <h3 className="py-2 text-center font-bold">{title}</h3>
    </div>
  );
}

/* =======================
   ReportCard
======================= */
export function ReportCard({
  title,
  icon,
  number,
  color,
}: ReportCardProps) {
  return (
    <div
      className="rounded-4xl p-4 shadow-md transition hover:shadow-lg"
      style={{ backgroundColor: color || "#000" }}
    >
      <div className="flex items-center gap-10">
        <div className="text-2xl text-white">{icon}</div>
        <h3 className="font-bold text-white">{title}</h3>
        <p className="ml-auto text-2xl font-bold text-white">{number}</p>
      </div>
    </div>
  );
}
