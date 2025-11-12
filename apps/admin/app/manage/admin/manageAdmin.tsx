"use client";

import React, { useState } from "react";
import { UserPlus, Filter } from "lucide-react";
import CreateAdminDialog, {
  AdminFormData,
} from "@/components/Dialog/CreateNewAdmin";
import CustomAlertDialog from "@/components/Dialog/CustomAlertDialog";
import SuccessAlertDialog from "@/components/Dialog/CustomSuccessDialog";
import ViewAdminDialog from "@/components/Dialog/ViewDialog";
import BlockDeleteAlert from "@/components/Dialog/BlockDeleteAlert";

// Types
interface AdminAccountManagementProps {
  adminAccounts?: AdminAccount[];
  accessHistory?: AccessHistory[];
}

interface AdminAccount {
  id: number;
  name: string;
  username: string;
  isActive: boolean;
  phone: string;
  email: string;
  password: string;
}

interface AccessHistory {
  id: number;
  name: string;
  username: string;
  accessTime: string;
}

// Sample data
const defaultAdminAccounts: AdminAccount[] = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    username: "admin001@",
    isActive: true,
    password: "",
    phone: "",
    email: "",
  },
  {
    id: 2,
    name: "Nguyễn Thị Bình",
    username: "admin004@",
    isActive: true,
    password: "",
    phone: "",
    email: "",
  },
  {
    id: 3,
    name: "Trần Công Cường",
    username: "admin007@",
    isActive: false,
    password: "",
    phone: "",
    email: "",
  },
];

const defaultAccessHistory: AccessHistory[] = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    username: "admin001@",
    accessTime: "13:00:13 8/7/2025",
  },
  {
    id: 2,
    name: "Nguyễn Thị Bình",
    username: "admin004@",
    accessTime: "10:09:13 8/7/2025",
  },
  {
    id: 3,
    name: "Trần Công Cường",
    username: "admin007@",
    accessTime: "08:10:13 8/7/2025",
  },
  {
    id: 4,
    name: "Nguyễn Văn An",
    username: "admin001@",
    accessTime: "13:54:08 1/7/2025",
  },
  {
    id: 5,
    name: "Nguyễn Thị Bình",
    username: "admin004@",
    accessTime: "10:54:08 1/7/2025",
  },
  {
    id: 6,
    name: "Trần Công Cường",
    username: "admin007@",
    accessTime: "07:54:08 1/7/2025",
  },
];

export default function AdminAccountManagement({
  adminAccounts = defaultAdminAccounts,
  accessHistory = defaultAccessHistory,
}: AdminAccountManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminAccount | null>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("Tất cả");

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminAccount | null>(null);

  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const [blockDeleteAlertState, setBlockDeleteAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "block" as "block" | "delete" | "unblock",
  });

  const [successAlert, setSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleView = (id: number) => {
    const admin = adminAccounts.find((acc) => acc.id === id);
    if (admin) {
      setSelectedAdmin(admin);
      setIsViewDialogOpen(true);
    }
  };

  const handleEdit = (id: number) => {
    const admin = adminAccounts.find((acc) => acc.id === id);
    if (admin) {
      setEditingAdmin(admin);
      setIsEditDialogOpen(true);
    }
  };

  const handleBlock = (id: number) => {
    const admin = adminAccounts.find((acc) => acc.id === id);
    if (admin) {
      setSelectedAdmin(admin);
      if (admin.isActive) {
        setBlockDeleteAlertState({
          isOpen: true,
          title: "Chặn tài khoản",
          message: `Chặn quyền truy cập hệ thống của quản trị viên ${admin.name}. Tài khoản bị chặn không thể truy cập vào hệ thống.`,
          type: "block",
        });
      } else {
        setBlockDeleteAlertState({
          isOpen: true,
          title: "Bỏ chặn tài khoản",
          message: `Bỏ chặn quyền truy cập hệ thống của quản trị viên ${admin.name}. Tài khoản được bỏ chặn có thể truy cập vào hệ thống.`,
          type: "unblock",
        });
      }
    }
  };

  const handleDelete = (id: number) => {
    const admin = adminAccounts.find((acc) => acc.id === id);
    if (admin) {
      setSelectedAdmin(admin);
      setBlockDeleteAlertState({
        isOpen: true,
        title: "Xoá tài khoản",
        message: `Xoá tài khoản của quản trị viên ${admin.name}. Tài khoản sẽ bị xoá vĩnh viễn khỏi hệ thống sau 30 ngày kể từ hôm nay.`,
        type: "delete",
      });
    }
  };

  const handleBlockAdmin = (id: number) => {
    return false;
  };

  const handleUnblockAdmin = (id: number) => {
    return false;
  };

  const handleDeleteAdmin = (id: number) => {
    return false;
  };

  const handleCreateAdmin = (data: AdminFormData) => {
    return false;
  };

  const handleEditAdmin = (data: AdminFormData) => {
    return false;
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  const handleSearch = () => {
    setActiveSearchQuery(searchQuery);
  };

  const filteredAccounts = adminAccounts.filter((account) => {
    // First filter by status
    const matchesStatus =
      selectedFilter === "Tất cả" ||
      (account.isActive && selectedFilter === "Đang hoạt động") ||
      (selectedFilter === "Bị khóa" && !account.isActive);

    // Then filter by search query (name or username)
    const matchesSearch =
      activeSearchQuery.trim() === "" ||
      account.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      account.username.toLowerCase().includes(activeSearchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Filter access history based on search query (name or username)
  const filteredHistory = accessHistory.filter((record) => {
    const matchesSearch =
      activeSearchQuery.trim() === "" ||
      record.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      record.username.toLowerCase().includes(activeSearchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-8 pl-12 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[32px] font-extrabold mb-6">
          Quản lý tài khoản quản trị viên
        </h1>

        {/* Search Bar */}
        <div className="flex mb-4">
          <div className="relative mr-14">
            <input
              type="text"
              placeholder="Nhập nội dung tìm kiếm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="w-[643px] text-xl px-8 py-5 bg-[#ADD8E6] border-none rounded-full focus:outline-none focus:ring-2 focus:ring-[#74a1b1]"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-[183px] py-3 bg-[#00C853] hover:bg-[#04b24d] text-xl text-white font-extrabold rounded-full transition-colors"
          >
            Tìm kiếm
          </button>
        </div>

        {/* Table Actions */}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-normal text-xl">
            Danh sách tài khoản quản trị viên
          </span>
          <button
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            onClick={() => setIsDialogOpen(true)}
          >
            <UserPlus size={28} />
          </button>
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Lọc"
            >
              <Filter size={28} />
            </button>
            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[200px]">
                <button
                  onClick={() => handleFilterChange("Tất cả")}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors border-b border-gray-200 ${
                    selectedFilter === "Tất cả"
                      ? "bg-gray-50 font-semibold"
                      : ""
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => handleFilterChange("Đang hoạt động")}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors border-b border-gray-200 ${
                    selectedFilter === "Đang hoạt động"
                      ? "bg-gray-50 font-semibold"
                      : ""
                  }`}
                >
                  Đang hoạt động
                </button>
                <button
                  onClick={() => handleFilterChange("Bị khóa")}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                    selectedFilter === "Bị khóa"
                      ? "bg-gray-50 font-semibold"
                      : ""
                  }`}
                >
                  Bị khóa
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Admin Accounts Table */}
      <div className="w-fit bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full border-collapse text-xl">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-4 py-2 text-center font-bold border-r border-gray-300 w-20">
                STT
              </th>
              <th className="px-4 py-2 text-center font-bold border-r border-gray-300">
                Họ và tên
              </th>
              <th className="px-14 py-2 text-center font-bold border-r border-gray-300">
                Tên đăng nhập
              </th>
              <th className="px-6 py-2 text-center font-bold border-r border-gray-300">
                Trạng thái
              </th>
              <th className="px-4 py-2 text-center font-bold">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account, index) => (
              <tr
                key={account.id}
                className={
                  index < filteredAccounts.length - 1
                    ? "border-b border-gray-300"
                    : ""
                }
              >
                <td className="px-4 py-2 text-center border-r border-gray-300">
                  {account.id}
                </td>
                <td className="px-6 py-2 border-r border-gray-300">
                  {account.name}
                </td>
                <td className="px-4 py-2 text-center border-r border-gray-300">
                  {account.username}
                </td>
                <td className="px-6 py-2 border-r border-gray-300">
                  {account.isActive ? "Đang hoạt động" : "Bị khóa"}
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleView(account.id)}
                      className="px-2 h-[30px] hover:bg-gray-100 rounded transition-colors"
                      title="Xem"
                    >
                      <img src={"/viewAccount.png"} className="w-[30px]" />
                    </button>
                    <button
                      onClick={() => handleEdit(account.id)}
                      className="px-2 hover:bg-gray-100 rounded transition-colors"
                      title="Chỉnh sửa"
                    >
                      <img src={"/editAccount.png"} className="w-[30px]" />
                    </button>
                    <button
                      onClick={() => handleBlock(account.id)}
                      className="px-2 hover:bg-gray-100 rounded transition-colors"
                      title="Khóa/Mở khóa"
                    >
                      <img src={"/lockAccount.png"} className="w-[30px]" />
                    </button>
                    <button
                      onClick={() => handleDelete(account.id)}
                      className="px-2 hover:bg-gray-100 rounded transition-colors text-red-600"
                      title="Xóa"
                    >
                      <img src={"/deleteAccount.png"} className="w-[30px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Access History Section */}
      <div className="text-xl">
        <h2 className="font-normal text-xl mb-6">Lịch sử truy cập</h2>
        <div className="bg-white w-fit border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <table className="w-fit border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="px-4 py-2 text-center font-bold border-r border-gray-300 w-20">
                  STT
                </th>
                <th className="px-4 py-2 text-center font-bold border-r border-gray-300">
                  Họ và tên
                </th>
                <th className="px-10 py-2 text-center font-bold border-r border-gray-300">
                  Tên đăng nhập
                </th>
                <th className="px-4 py-2 text-center font-bold">
                  Thời gian truy cập hệ thống
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((record, index) => (
                <tr
                  key={record.id}
                  className={
                    index < filteredHistory.length - 1
                      ? "border-b border-gray-300"
                      : ""
                  }
                >
                  <td className="px-4 py-2 text-center border-r border-gray-300">
                    {record.id}
                  </td>
                  <td className="px-5 py-2 border-r border-gray-300">
                    {record.name}
                  </td>
                  <td className="px-10 py-2 text-center border-r border-gray-300">
                    {record.username}
                  </td>
                  <td className="px-5 py-2">{record.accessTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Error Alert */}
      <CustomAlertDialog
        isOpen={alertState.isOpen}
        onClose={() => setAlertState({ ...alertState, isOpen: false })}
        title={alertState.title}
        message={alertState.message}
      />

      {/* Success Alert */}
      <SuccessAlertDialog
        isOpen={successAlert}
        onClose={() => setSuccessAlert(false)}
        message={successMessage}
      />
      {/* Dialog */}
      <CreateAdminDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleCreateAdmin}
      />

      {/* View Dialog */}
      <ViewAdminDialog
        isOpen={isViewDialogOpen}
        onClose={() => {
          setIsViewDialogOpen(false);
          setSelectedAdmin(null);
        }}
        adminData={selectedAdmin}
      />
      {/* Create Dialog */}
      <CreateAdminDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={(data) => {
          const result = handleCreateAdmin(data);
          if (result) {
            setIsDialogOpen(false);
            setSuccessMessage("Tạo tài khoản quản trị viên thành công.");
            setSuccessAlert(true);
            setTimeout(() => setSuccessAlert(false), 1000);
          } else {
            setAlertState({
              isOpen: true,
              title: "Tạo tài khoản thất bại",
              message:
                "Không thể tạo tài khoản quản trị viên. Vui lòng thử lại.",
            });
          }
          return result;
        }}
        mode="create"
      />
      {/* Edit Dialog */}
      <CreateAdminDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingAdmin(null);
        }}
        onSubmit={(data) => {
          const result = handleEditAdmin(data);
          if (result) {
            setIsEditDialogOpen(false);
            setSuccessMessage("Chỉnh sửa tài khoản quản trị viên thành công.");
            setSuccessAlert(true);
            setTimeout(() => setSuccessAlert(false), 1000);
          } else {
            setAlertState({
              isOpen: true,
              title: "Chỉnh sửa tài khoản thất bại",
              message:
                "Không thể chỉnh sửa tài khoản quản trị viên. Vui lòng thử lại.",
            });
          }
          return result;
        }}
        adminData={
          editingAdmin
            ? {
                fullName: editingAdmin?.name || "",
                username: editingAdmin?.username || "",
                phone: editingAdmin?.phone || "",
                email: editingAdmin?.email || "",
                password: "",
                confirmPassword: "",
              }
            : undefined
        }
        mode="edit"
      />
      {/* Block/Delete Alert */}
      <BlockDeleteAlert
        isOpen={blockDeleteAlertState.isOpen}
        onClose={() =>
          setBlockDeleteAlertState({ ...blockDeleteAlertState, isOpen: false })
        }
        onConfirm={() => {
          if (selectedAdmin) {
            if (blockDeleteAlertState.type === "block") {
              const result = handleBlockAdmin(selectedAdmin.id);
              if (!result) {
                setBlockDeleteAlertState({
                  ...blockDeleteAlertState,
                  isOpen: false,
                });
                setSelectedAdmin(null);
                setAlertState({
                  isOpen: true,
                  title: "Chặn tài khoản thất bại",
                  message:
                    "Không thể chặn tài khoản quản trị viên. Vui lòng thử lại.",
                });
                return;
              }
            } else if (blockDeleteAlertState.type === "unblock") {
              const result = handleUnblockAdmin(selectedAdmin.id);
              if (!result) {
                setBlockDeleteAlertState({
                  ...blockDeleteAlertState,
                  isOpen: false,
                });
                setSelectedAdmin(null);
                setAlertState({
                  isOpen: true,
                  title: "Bỏ chặn tài khoản thất bại",
                  message:
                    "Không thể bỏ chặn tài khoản quản trị viên. Vui lòng thử lại.",
                });
                return;
              }
            } else if (blockDeleteAlertState.type === "delete") {
              const result = handleDeleteAdmin(selectedAdmin.id);
              if (!result) {
                setBlockDeleteAlertState({
                  ...blockDeleteAlertState,
                  isOpen: false,
                });
                setSelectedAdmin(null);
                setAlertState({
                  isOpen: true,
                  title: "Xoá tài khoản thất bại",
                  message:
                    "Không thể xoá tài khoản quản trị viên. Vui lòng thử lại.",
                });
                return;
              }
            }
          }
          setBlockDeleteAlertState({ ...blockDeleteAlertState, isOpen: false });
          setSelectedAdmin(null);
          setSuccessMessage(
            blockDeleteAlertState.type === "unblock"
              ? "Bỏ chặn tài khoản quản trị viên thành công."
              : blockDeleteAlertState.type === "block"
              ? "Chặn tài khoản quản trị viên thành công."
              : "Xoá tài khoản quản trị viên thành công."
          );
          setSuccessAlert(true);
          setTimeout(() => setSuccessAlert(false), 1000);
        }}
        title={blockDeleteAlertState.title}
        message={blockDeleteAlertState.message}
        type={blockDeleteAlertState.type}
      />
    </div>
  );
}
