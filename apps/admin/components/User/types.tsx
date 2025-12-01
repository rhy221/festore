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

// Mock function để lấy statistics từ users data
export const getUserStats = () => {
  const totalDesigners = users.filter((u) => u.type === "designer").length;
  const totalCustomers = users.filter((u) => u.type === "customer").length;
  const totalBannedUsers = users.filter((u) => u.status === "locked").length;
  const totalActiveUsers = users.filter((u) => u.status === "active").length;

  return {
    totalUsers: users.length,
    designers: totalDesigners,
    customers: totalCustomers,
    activeUsers: totalActiveUsers,
    bannedUsers: totalBannedUsers,
  };
};

export const users: User[] = [
  { id: 1, name: "Nguyễn Thị An", type: "designer", status: "active" },
  { id: 2, name: "Phạm Công Bình", type: "customer", status: "active" },
  { id: 3, name: "Trịnh Mai Cường", type: "designer", status: "locked" },
  { id: 4, name: "Lê Văn Dũng", type: "customer", status: "active" },
  { id: 5, name: "Hoàng Thị Ems", type: "designer", status: "active" },
  { id: 6, name: "Vũ Minh Phụng", type: "customer", status: "locked" },
  { id: 7, name: "Đặng Thị Giang", type: "designer", status: "active" },
  { id: 8, name: "Phan Văn Hoàng", type: "customer", status: "active" },
  { id: 9, name: "Trương Thị Inh", type: "designer", status: "locked" },
  { id: 10, name: "Bùi Văn Kiên", type: "customer", status: "active" },
  { id: 11, name: "Ngô Thị Linh", type: "designer", status: "active" },
  { id: 12, name: "Đinh Văn Minh", type: "customer", status: "locked" },
  { id: 13, name: "Lý Thị Nga", type: "designer", status: "active" },
  { id: 14, name: "Đỗ Văn Ơn", type: "customer", status: "active" },
  { id: 15, name: "Cao Thị Phương", type: "designer", status: "locked" },
];

// Mock API functions
export const mockUserAPI = {
  // Lấy danh sách users với filter và search
  getUsers: async (query: {
    name?: string;
    status?: string;
    type?: string;
  }) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredUsers = [...users];

    // Filter by name (search)
    if (query.name) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(query.name!.toLowerCase())
      );
    }

    // Filter by status
    if (query.status && query.status !== "all") {
      filteredUsers = filteredUsers.filter(
        (user) => user.status === query.status
      );
    }

    // Filter by type
    if (query.type && query.type !== "all") {
      filteredUsers = filteredUsers.filter((user) => user.type === query.type);
    }

    return {
      data: filteredUsers,
      total: filteredUsers.length,
      message: "Success",
    };
  },

  // Lấy chi tiết user
  getUserDetail: async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      data: {
        ...user,
        email: `${user.name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        phone: `090${Math.floor(Math.random() * 10000000)
          .toString()
          .padStart(7, "0")}`,
        createdAt: "2024-01-15",
        lastLogin: "2024-11-28",
      },
      message: "Success",
    };
  },

  // Khóa user
  blockUser: async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }

    users[userIndex].status = "locked";

    return {
      data: users[userIndex],
      message: "User blocked successfully",
    };
  },

  // Mở khóa user
  unlockUser: async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }

    users[userIndex].status = "active";

    return {
      data: users[userIndex],
      message: "User unlocked successfully",
    };
  },

  // Xóa user (soft delete - trong thực tế có thể là set status = 'deleted')
  deleteUser: async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }

    // Trong thực tế có thể không xóa thật mà chỉ đánh dấu
    users.splice(userIndex, 1);

    return {
      message: "User deleted successfully",
    };
  },
};

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
