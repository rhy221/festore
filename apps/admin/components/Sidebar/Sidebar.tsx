"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Home", href: "/home" },
  { label: "User Management", href: "/users" },
  { label: "Categories", href: "/category" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/home") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside
      className="
        fixed top-[72px] left-0 z-40
        h-[calc(100vh-72px)]
        w-[220px] sm:w-[240px]
        bg-sidebar text-sidebar-foreground
        border-r border-sidebar-border
        transition-all duration-300
        hidden md:block
      "
    >
      <nav className="flex h-full flex-col py-6 space-y-1">
        {menuItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center px-5 sm:px-6 py-3
                text-sm font-medium tracking-wide
                transition-colors
                ${
                  active
                    ? "bg-sidebar-accent text-foreground border-l-4 border-sidebar-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
