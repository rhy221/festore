"use client";
import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  House,
  User,
  UsersRound,
  Shirt,
  CircleAlert,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { label: "Trang chủ", icon: <House size={32} />, href: "/admin" },
  {
    label: "Quản lý admin",
    icon: <User size={32} />,
    href: "/admin/manage/admin",
  },
  {
    label: "Quản lý người dùng",
    icon: <UsersRound size={32} />,
    href: "/admin",
  },
  { label: "Thể loại", icon: <Shirt size={32} />, href: "/admin" },
  { label: "Báo cáo", icon: <CircleAlert size={32} />, href: "/admin" },
  {
    label: "Hệ thống",
    icon: <Settings size={32} />,
    href: "/admin/manage/system",
  },
  { label: "Đăng xuất", icon: <LogOut size={32} />, href: "/admin" },
];

export default function Sidebar() {
  return (
    <aside className="sticky w-[296px] bg-[#000080] text-white flex flex-col">
      {menuItems.map((item, index) => (
        <div key={index}>
          <Link
            href={item.href}
            className="flex items-center px-3 py-4 space-x-4 hover:bg-[#0707a8] transition"
          >
            {typeof item.icon === "string" ? (
              <img src={item.icon} className="w-[50px]" />
            ) : (
              <div className="w-[50px] h-[50px] flex items-center justify-center text-white">
                {item.icon}
              </div>
            )}
            <span className="font-extrabold text-[21px]">{item.label}</span>
          </Link>
          {index !== menuItems.length - 1 && (
            <div className="border-t border-white" />
          )}
        </div>
      ))}
    </aside>
  );
}
