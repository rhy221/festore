export type User = {
  id: number;
  name: string;
  type: "designer" | "customer";
  status: "active" | "locked";
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

export const UsersAPI = {
  // Lấy danh sách users
  getUsers: async (query: {
    name?: string;
    status?: string;
    type?: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredUsers = [...users];

    if (query.name) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(query.name!.toLowerCase())
      );
    }

    if (query.status && query.status !== "all") {
      filteredUsers = filteredUsers.filter(
        (user) => user.status === query.status
      );
    }

    if (query.type && query.type !== "all") {
      filteredUsers = filteredUsers.filter(
        (user) => user.type === query.type
      );
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
    if (!user) throw new Error("User not found");

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
  blockUserAccount: async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) throw new Error("User not found");

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
    if (userIndex === -1) throw new Error("User not found");

    users[userIndex].status = "active";

    return {
      data: users[userIndex],
      message: "User unlocked successfully",
    };
  },

  // Xóa user
  deleteUser: async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) throw new Error("User not found");

    users.splice(userIndex, 1);

    return {
      message: "User deleted successfully",
    };
  },
};

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


// import api from '@/lib/http';

// const BASE_URL = '/api/admin';

// export const UsersAPI = {
//   getUsers: async (query: { name?: string; status?: string }) => {
//     const response = await api.get(`${BASE_URL}/users`, { params: query });
//     return response.data;
//   },

//   getUserDetail: async (id: string) => {
//     const response = await api.get(`${BASE_URL}/users/${id}`);
//     return response.data;
//   },

//   blockUserAccount: async (id: string) => {
//     const response = await api.patch(`${BASE_URL}/users/block/${id}`);
//     return response.data;
//   },

//   unlockUser: async (id: string) => {
//     const response = await api.patch(`${BASE_URL}/users/unlock/${id}`);
//     return response.data;
//   },
// };