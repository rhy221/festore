// src/components/admin/user/types.ts

// Tái xuất (Re-export) UnlockRequest Type
import { type UnlockRequest } from "@/components/UnlockRequestDialog";

// Types
export type User = {
  id: number;
  name: string;
  type: "designer" | "customer";
  status: "active" | "locked";
};

export type UserStatusFilterType = "all" | "active" | "locked";
export type UserTypeFilterType = "all" | "designer" | "customer";
export type UnlockStatusFilterType = "all" | "pending" | "processed";

// Data objects
export const adminInfo = {
  name: "ABC",
  greeting: "Xin chào admin",
};

export const stats = {
  designers: 64,
  customers: 36,
  bannedUsers: 12,
};

export const users: User[] = [
  { id: 1, name: "Nguyễn Thị An", type: "designer", status: "active" },
  { id: 2, name: "Phạm Công Bình", type: "customer", status: "active" },
  { id: 3, name: "Trịnh Mai Cường", type: "designer", status: "locked" },
];

export const unlockRequests: UnlockRequest[] = [
  {
    id: 1,
    name: "Trịnh Mai Cường",
    reason: "Tài khoản bị khoá nhầm",
    date: "22/07/2025",
    status: "pending",
  },
];

// Display helpers
export const displayUserStatus = (s: string) =>
  s === "active" ? "Đang hoạt động" : "Bị khoá";
export const displayUserType = (t: string) =>
  t === "designer" ? "Nhà thiết kế" : "Khách hàng";
export const displayUnlockStatus = (s: string) =>
  s === "pending" ? "Đang chờ xử lý" : "Đã xử lý";