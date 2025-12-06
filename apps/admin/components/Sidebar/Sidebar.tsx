"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; 

const menuItems = [
  { label: "Trang chủ", href: "/home" },
  { label: "Quản lý người dùng", href: "/users" },
  { label: "Thể loại", href: "/category" },
  { label: "Vi phạm", href: "/report" },
  { label: "Đăng xuất", href: "/admin", isLogout: true },
];

export default function Sidebar() {
  const currentPathname = usePathname(); 

  const checkIsActive = (href: string) => {
    if (href === "/home") {
        return currentPathname === href;
    } 
    // Cho phép active khi có sub-route (ví dụ: /category/edit)
    return currentPathname.startsWith(href) && href !== '/';
  };

  return (
    <aside className="fixed top-[80px] left-0 h-screen w-[240px] bg-gray-900 text-white flex flex-col shadow-2xl transition-all duration-300">
      
      <div className="flex flex-col flex-1 py-6 space-y-2">
        {menuItems.map((item, index) => {
            const isActive = checkIsActive(item.href);
            
            if (item.isLogout) return null; 

            return (
                <Link
                    key={index}
                    href={item.href}
                    className={`
                        flex items-center px-6 py-3 space-x-3 text-sm font-medium tracking-wide
                        ${isActive 
                            // Thay thế màu đỏ bằng màu Indigo và Sky Blue
                            ? 'bg-indigo-700 text-white shadow-lg border-l-4 border-sky-400' 
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200'}
                    `}
                >
                    <span>{item.label}</span>
                </Link>
            );
        })}
      </div>
      
      {/* Mục Đăng xuất (Vẫn giữ màu cảnh báo) */}
      <div className="p-4 border-t border-gray-700">
        {menuItems.filter(item => item.isLogout).map((item, index) => {
            return (
                <Link
                    key={index}
                    href={item.href}
                    // Màu Đăng xuất vẫn giữ màu cảnh báo (đỏ/cam) nhưng tông nhẹ hơn
                    className="flex items-center px-2 py-3 text-orange-400 hover:bg-gray-800 hover:text-orange-300 transition duration-200 text-sm font-medium"
                >
                    <span>{item.label}</span>
                </Link>
            );
        })}
      </div>
    </aside>
  );
}