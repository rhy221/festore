import { type UnlockRequest } from "./UnlockRequest";
import { type User } from "@/api/users.api";

export type { User };

export type UserStatusFilterType = "all" | "ACTIVE" | "BLOCKED";
export type UserTypeFilterType = "all" | "designer" | "customer";
export type UnlockStatusFilterType = "all" | "pending" | "processed";

export const displayUserStatus = (status: string) =>
  status === "ACTIVE" ? "Active" : "Blocked";

export const displayUserType = (type: string) =>
  type === "designer" ? "Designer" : "Customer";

export const displayUnlockStatus = (status: string) =>
  status === "pending" ? "Pending" : "Processed";
