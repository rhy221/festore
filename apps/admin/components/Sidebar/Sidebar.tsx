import Link from "next/link";

const menuItems = [
  { label: "Trang chủ", href: "/home" },
  { label: "Quản lý người dùng", href: "/users" },
  { label: "Thể loại", href: "/category" },
  { label: "Báo cáo", href: "/report" },
  { label: "Đăng xuất", href: "/admin" },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-[80px] left-0 h-screen w-[240px] bg-[#000080] text-white flex flex-col">
      {menuItems.map((item, index) => (
        <div key={index}>
          <Link
            href={item.href}
            className="flex items-center px-4 py-3 space-x-3 hover:bg-[#0707a8] transition"
          >
            <span className="font-extrabold text-base">{item.label}</span>
          </Link>
          {index !== menuItems.length - 1 && (
            <div className="border-t border-white/50" />
          )}
        </div>
      ))}
    </aside>
  );
}
