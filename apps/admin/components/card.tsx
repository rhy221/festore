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
      <div
        className="
          relative w-70 h-70 rounded-2xl
          bg-card border border-border
          p-4 cursor-pointer
          transition hover:bg-accent
        "
      >
        {/* Header */}
        <div className="relative flex items-center justify-between">
          <h3 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-foreground text-center">
            {title}
          </h3>

          <div ref={menuRef} className="ml-auto relative">
            <button
              type="button"
              className="rounded-full p-1 hover:bg-muted"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
            >
              <MoreVertical size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Menu */}
        {isMenuOpen && (
          <div
            className="
              absolute top-1/2 left-full z-10 w-32
              -translate-x-[70%] -translate-y-[70%]
              rounded-md border border-border
              bg-popover shadow-lg
            "
          >
            <button className="block w-full px-4 py-1 text-left text-sm hover:bg-accent">
              View
            </button>
            <hr className="mx-2 my-1 h-px border-border" />
            <button
              className="block w-full px-4 py-1 text-left text-sm hover:bg-accent"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit?.();
              }}
            >
              Edit
            </button>
            <hr className="mx-2 my-1 h-px border-border" />
            <button
              className="block w-full px-4 py-1 text-left text-sm hover:bg-accent"
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
        <div className="mt-4">
          <img
            src={resolveImage(imageUrl)}
            alt={title}
            className="w-full h-44 rounded-xl object-cover bg-muted"
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
    // Thêm class 'group' để nhận diện hover cho ảnh bên trong
    <div className="group w-full">
      <div className="
        relative 
        aspect-[3/4] 
        rounded-xl sm:rounded-2xl 
        bg-card border border-border 
        p-2 sm:p-4 
        cursor-pointer 
        transition-all duration-300 
        hover:bg-accent hover:shadow-md
      ">
        {/* Container bọc ảnh để tránh tràn khi scale */}
        <div className="w-full h-full overflow-hidden rounded-lg sm:rounded-xl">
          <img
            src={resolveImage(imageUrl)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Chữ: nhỏ hơn trên mobile (text-xs) và bình thường trên desktop (sm:text-sm) */}
        <h3 className="mt-2 sm:mt-3 text-center text-xs sm:text-sm font-medium text-foreground line-clamp-1 px-1">
          {title}
        </h3>
      </div>
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
      className="
        rounded-2xl p-4
        shadow-md transition hover:shadow-lg
        text-foreground
      "
      style={{ backgroundColor: color || "var(--card)" }}
    >
      <div className="flex items-center gap-6">
        <div className="text-2xl">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
        <p className="ml-auto text-2xl font-bold">{number}</p>
      </div>
    </div>
  );
}
