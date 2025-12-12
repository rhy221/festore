import { type UnlockRequest } from "./UnlockRequest";

import { type User } from "@/api/users.api";

export type { User };

export type UserStatusFilterType = "all" | "active" | "locked";
export type UserTypeFilterType = "all" | "designer" | "customer";
export type UnlockStatusFilterType = "all" | "pending" | "processed";

export const displayUserStatus = (s: string) =>
  s === "active" ? "Đang hoạt động" : "Bị khoá";

export const displayUserType = (t: string) =>
  t === "designer" ? "Nhà thiết kế" : "Khách hàng";

export const displayUnlockStatus = (s: string) =>
  s === "pending" ? "Đang chờ xử lý" : "Đã xử lý";
