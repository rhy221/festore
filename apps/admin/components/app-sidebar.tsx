"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Layers } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@workspace/ui/components/sidebar"

const menuItems = [
  { label: "Home", href: "/home", icon: Home },
  { label: "User Management", href: "/users", icon: Users },
  { label: "Categories", href: "/category", icon: Layers },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/home" ? pathname === href : pathname.startsWith(href)

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
