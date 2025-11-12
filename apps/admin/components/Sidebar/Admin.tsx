"use client";
import Link from "next/link";

const menuItems = [
  { label: "Trang chủ", icon: "/homeIcon.png", href: "/admin" },
  { label: "Quản lý admin", icon: "/adminManageIcon.png", href: "/admin/manage/admin" },
  { label: "Quản lý người dùng", icon: "/userManageIcon.png", href: "/admin" },
  { label: "Thể loại", icon: "/categoryIcon.png", href: "/admin" },
  { label: "Báo cáo", icon: "/warningIconButWhite.png", href: "/admin" },
  { label: "Hệ thống", icon: "/systemIcon.png", href: "/admin/manage/system" },
  { label: "Đăng xuất", icon: "/signoutIcon.png", href: "/admin" },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-32 left-0 h-screen max-w-[296px] bg-[#000080] text-white flex flex-col ">
      {menuItems.map((item, index) => (
        <div key={index}>
          <Link
            href={item.href}
            className="flex items-center px-3 py-4 space-x-4 hover:bg-[#0707a8] transition"
          >
            <img src={item.icon} className="w-[50px]" />
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