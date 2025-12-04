// src/components/admin/user/types.ts

// Re-export UnlockRequest type
import { type UnlockRequest } from "./UnlockRequest";

// Import User type từ mock API
import { type User } from "@/api/users.api";

// Re-export lại cho các component dùng chung
export type { User };

// Filter Types
export type UserStatusFilterType = "all" | "active" | "locked";
export type UserTypeFilterType = "all" | "designer" | "customer";
export type UnlockStatusFilterType = "all" | "pending" | "processed";

// UI Display Data
export const adminInfo = {
  name: "ABC",
  greeting: "Xin chào admin",
};

export const stats = {
  designers: 64,
  customers: 36,
  bannedUsers: 12,
};

// Unlock Requests Mock (vì chưa có API riêng)
export const unlockRequests: UnlockRequest[] = [
  {
    id: 1,
    name: "Trịnh Mai Cường",
    reason: "Tài khoản bị khoá nhầm",
    date: "22/07/2025",
    status: "pending",
  },
];

// Display Helpers
export const displayUserStatus = (s: string) =>
  s === "active" ? "Đang hoạt động" : "Bị khoá";

export const displayUserType = (t: string) =>
  t === "designer" ? "Nhà thiết kế" : "Khách hàng";

export const displayUnlockStatus = (s: string) =>
  s === "pending" ? "Đang chờ xử lý" : "Đã xử lý";
