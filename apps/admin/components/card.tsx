"using client";
import * as React from "react";
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  href: string; // link to product page
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
      <div className="rounded-4xl bg-[#FAF0E6] p-5 hover:shadow-lg transition w-70 h-70 relative cursor-pointer">
        <div className="relative flex justify-between items-center">
          <h3 className="font-bold text-center absolute left-1/2 -translate-x-1/2">
            {title}
          </h3>
          <div ref={menuRef} className="ml-auto relative">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // prevent triggering Link
                setIsMenuOpen((prev) => !prev);
              }}
              className="rounded-full hover:bg-[#ecded0] cursor-pointer"
            >
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="absolute top-1/2 left-full translate-y-[-70%] translate-x-[-70%] mr-2 bg-[#EFF6FF] border rounded-lg shadow-lg z-10 w-32">
            {/* Watch Button */}
            <button className="block px-4 py-1 hover:bg-[#dee8f5] w-full text-left">
              Xem
            </button>
            <hr className="mx-1 my-1 h-px bg-black border-0" />

            {/* Edit Button */}
            <button
              className="block px-4 py-1 hover:bg-[#dee8f5] w-full text-left"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onEdit) onEdit();
              }}
            >
              Sửa
            </button>
            <hr className="mx-1 my-1 h-px bg-black border-0" />

            {/* Delete Button */}
            <button
              className="block px-4 py-1 hover:bg-[#dee8f5] w-full text-left"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onDelete) onDelete();
              }}
            >
              Xoá
            </button>
          </div>
        )}
        {/* Popup Event removed; now handled by parent */}
        <div className="mt-3">
          <Image
            src={imageUrl}
            alt={title}
            width={800}
            height={600}
            className="rounded-4xl object-cover w-75 h-51"
          />
        </div>
      </div>
    </Link>
  );
}
export function ProductCard({ title, imageUrl, href }: CategoryCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <Link href={href} className="block !cursor-default">
      <div className="bg-[#FAF0E6] p-3 hover:shadow-lg transition w-70 h-70 relative cursor-pointer">
        <div className="mt-3">
          <Image
            src={imageUrl}
            alt={title}
            width={800}
            height={600}
            className="object-cover w-75 h-51"
          />
        </div>
        <h3 className="font-bold text-center py-2">{title}</h3>
      </div>
    </Link>
  );
}
export function ReportCard({ title, icon, number, color }: ReportCardProps) {
  return (
    <div
      className={`p-4 rounded-4xl shadow-md hover:shadow-lg transition`}
      style={{ backgroundColor: color || "#000" }}
    >
      <div className="flex items-center gap-10">
        <div className="text-2xl text-white">{icon}</div>
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-white font-bold text-2xl ml-auto">{number}</p>
      </div>
    </div>
  );
}
