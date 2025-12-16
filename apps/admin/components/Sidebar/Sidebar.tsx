"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; 

const menuItems = [
  { label: "Trang chủ", href: "/home" },
  { label: "Quản lý người dùng", href: "/users" },
  { label: "Thể loại", href: "/category" },
  { label: "Vi phạm", href: "/report" },
];

export default function Sidebar() {
  const currentPathname = usePathname(); 

  const checkIsActive = (href: string) => {
    if (href === "/home") {
        return currentPathname === href;
    } 
    return currentPathname.startsWith(href) && href !== '/';
  };

  return (
    <aside className="fixed top-[80px] left-0 h-screen w-[240px] bg-gray-900 text-white flex flex-col shadow-2xl transition-all duration-300">
      
      <div className="flex flex-col flex-1 py-6 space-y-2">
        {menuItems.map((item) => { 
            const isActive = checkIsActive(item.href);
            
            return (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`
                        flex items-center px-6 py-3 space-x-3 text-sm font-medium tracking-wide
                        ${isActive 
                            ? 'bg-indigo-700 text-white shadow-lg border-l-4 border-sky-400' 
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200'}
                    `}
                >
                    <span>{item.label}</span>
                </Link>
            );
        })}
      </div>
    </aside>
  );
}