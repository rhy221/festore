"use client";

import React, { useState } from "react";
import { UserPlus, Filter, X, CheckCircle, AlertTriangle, Eye, Lock, Edit, Trash2, Save } from "lucide-react";


// --- MOCK COMPONENTS (Defined here due to single-file constraint) ---

// Types shared by dialogs and main component
interface AdminFormData {
  fullName: string;
  username: string;
  phone: string;
  email: string;
  password?: string;
  confirmPassword?: string;
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

// 1. Mock Create/Edit Dialog (CreateAdminDialog)
const CreateAdminDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminFormData) => boolean;
  mode?: "create" | "edit";
  adminData?: Omit<AdminFormData, 'password' | 'confirmPassword'>;
}> = ({ isOpen, onClose, onSubmit, mode = "create", adminData }) => {
  if (!isOpen) return null;

  const title = mode === "create" ? "Tạo tài khoản quản trị viên mới" : "Chỉnh sửa tài khoản quản trị viên";
  const buttonText = mode === "create" ? "Tạo tài khoản" : "Cập nhật";

  const [formData, setFormData] = useState<AdminFormData>({
    fullName: adminData?.fullName || "",
    username: adminData?.username || "",
    phone: adminData?.phone || "",
    email: adminData?.email || "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified validation (just check required fields)
    if (!formData.fullName || !formData.username || !formData.email) {
        // Using alert for simplified mock validation as in original code
        alert("Vui lòng điền đầy đủ các trường bắt buộc."); 
        return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="fullName" placeholder="Họ và tên" value={formData.fullName} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
          <input name="username" placeholder="Tên đăng nhập" value={formData.username} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
          <input name="phone" type="tel" placeholder="Số điện thoại (Tuỳ chọn)" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          {mode === "create" && (
            <>
              <input name="password" type="password" placeholder="Mật khẩu" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
              <input name="confirmPassword" type="password" placeholder="Xác nhận mật khẩu" value={formData.confirmPassword} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
            </>
          )}
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded-full text-gray-600 hover:bg-gray-100 transition-colors">Hủy</button>
            <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-semibold">{buttonText}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. Mock Custom Alert Dialog (CustomAlertDialog)
const CustomAlertDialog: React.FC<{ isOpen: boolean; onClose: () => void; title: string; message: string; }> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-red-600 bg-opacity-10 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm text-center border-t-4 border-red-500">
        <AlertTriangle size={32} className="text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2 text-red-700">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button onClick={onClose} className="w-full py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">Đóng</button>
      </div>
    </div>
  );
};

// 3. Mock Success Alert Dialog (SuccessAlertDialog)
const SuccessAlertDialog: React.FC<{ isOpen: boolean; onClose: () => void; message: string; }> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-green-600 bg-opacity-10 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm text-center border-t-4 border-green-500">
        <CheckCircle size={32} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2 text-green-700">Thành công!</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button onClick={onClose} className="w-full py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">OK</button>
      </div>
    </div>
  );
};

// 4. Mock View Admin Dialog (ViewAdminDialog)
const ViewAdminDialog: React.FC<{ isOpen: boolean; onClose: () => void; adminData: AdminAccount | null; }> = ({ isOpen, onClose, adminData }) => {
  if (!isOpen || !adminData) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">Thông tin quản trị viên</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X size={24} /></button>
        </div>
        <div className="space-y-4 text-lg">
          <p><strong>Họ và tên:</strong> {adminData.name}</p>
          <p><strong>Tên đăng nhập:</strong> {adminData.username}</p>
          <p><strong>Email:</strong> {adminData.email || "Chưa cung cấp"}</p>
          <p><strong>Số điện thoại:</strong> {adminData.phone || "Chưa cung cấp"}</p>
          <p><strong>Trạng thái:</strong> <span className={`font-semibold ${adminData.isActive ? 'text-green-600' : 'text-red-600'}`}>{adminData.isActive ? "Đang hoạt động" : "Bị khóa"}</span></p>
        </div>
        <div className="mt-8 text-right">
          <button onClick={onClose} className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-semibold">Đóng</button>
        </div>
      </div>
    </div>
  );
};

// 5. Mock Block/Delete Alert (BlockDeleteAlert)
const BlockDeleteAlert: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type: "block" | "delete" | "unblock";
}> = ({ isOpen, onClose, onConfirm, title, message, type }) => {
  if (!isOpen) return null;

  let color = 'bg-red-500';
  if (type === 'unblock') color = 'bg-green-500';
  else if (type === 'block') color = 'bg-yellow-500';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X size={24} /></button>
        </div>
        <p className="text-gray-700 mb-8">{message}</p>
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="px-6 py-2 border rounded-full text-gray-600 hover:bg-gray-100 transition-colors">Hủy</button>
          <button onClick={onConfirm} className={`px-6 py-2 text-white rounded-full ${color} hover:opacity-90 transition-opacity font-semibold`}>
            {type === 'delete' ? 'Xác nhận xóa' : type === 'block' ? 'Xác nhận chặn' : 'Xác nhận bỏ chặn'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- DATA STRUCTURES & MOCK DATA (Extended for all tables) ---

interface AccessHistory {
  id: number;
  name: string;
  username: string;
  accessTime: string;
}

interface AdminRoleLevel {
  id: number;
  name: string;
  superAdmin: boolean;
  subAdmin: boolean;
}

interface AdminAuthorization {
  id: number;
  name: string;
  QLAD: boolean; // Quản lý Admin
  QLND: boolean; // Quản lý Người dùng
  TLoai: boolean; // Thống kê/Phân loại
  BCao: boolean; // Báo cáo
  HThong: boolean; // Hệ thống
}


const defaultAdminAccounts: AdminAccount[] = [
  { id: 1, name: "Nguyễn Văn An", username: "admin001@", isActive: true, password: "", phone: "0901234567", email: "annv@gmail.com" },
  { id: 2, name: "Nguyễn Thị Bình", username: "admin004@", isActive: true, password: "", phone: "0901234568", email: "binh@gmail.com" },
  { id: 3, name: "Trần Công Cường", username: "admin007@", isActive: false, password: "", phone: "0901234569", email: "TCCW@gmail.com" },
];

const defaultRoleLevels: AdminRoleLevel[] = [
  { id: 1, name: "Nguyễn Văn An", superAdmin: true, subAdmin: false },
  { id: 2, name: "Nguyễn Thị Bình", superAdmin: false, subAdmin: true },
  { id: 3, name: "Trần Công Cường", superAdmin: false, subAdmin: true },
];

const defaultAuthorization: AdminAuthorization[] = [
  { id: 1, name: "Nguyễn Văn An", QLAD: true, QLND: true, TLoai: true, BCao: true, HThong: true },
  { id: 2, name: "Nguyễn Thị Bình", QLAD: false, QLND: true, TLoai: false, BCao: true, HThong: false },
  { id: 3, name: "Trần Công Cường", QLAD: false, QLND: true, TLoai: false, BCao: true, HThong: false },
];


// --- MAIN COMPONENT ---

export default function AdminAccountManagement({
  adminAccounts = defaultAdminAccounts,
  accessHistory = [], // Placeholder for history data
}: {
    adminAccounts?: AdminAccount[];
    accessHistory?: AccessHistory[];
}) {
  const [listAdminAccounts, setListAdminAccounts] = useState<AdminAccount[]>(adminAccounts);
  // FIX 1: Add state for Role Levels and Authorizations
  const [listRoleLevels, setListRoleLevels] = useState<AdminRoleLevel[]>(defaultRoleLevels);
  const [listAuthorization, setListAuthorization] = useState<AdminAuthorization[]>(defaultAuthorization);


  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false); 

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

  // Handler Implementations (Mocked for UI demonstration)
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setSuccessAlert(true);
    // Use a custom message box instead of alert()
    // setTimeout(() => setSuccessAlert(false), 3000); 
  };

  const showError = (title: string, message: string) => {
    setAlertState({ isOpen: true, title, message });
  };

  const handleView = (id: number) => {
    const admin = listAdminAccounts.find((acc) => acc.id === id);
    if (admin) {
      setSelectedAdmin(admin);
      setIsViewDialogOpen(true);
    }
  };

  const handleEdit = (id: number) => {
    const admin = listAdminAccounts.find((acc) => acc.id === id);
    if (admin) {
      setEditingAdmin(admin);
      setIsEditDialogOpen(true);
    }
  };

  const handleBlock = (id: number) => {
    const admin = listAdminAccounts.find((acc) => acc.id === id);
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
    const admin = listAdminAccounts.find((acc) => acc.id === id);
    if (admin) {
      setSelectedAdmin(admin);
      setBlockDeleteAlertState({
        isOpen: true,
        title: "Xoá tài khoản",
        message: `Xoá tài khoản của quản trị viên ${admin.name}. Tài khoản sẽ bị xoá vĩnh viễn khỏi hệ thống sau 30 ngày kể từ hôm nay. (Mock: Thao tác này sẽ xoá ngay lập tức khỏi UI)`,
        type: "delete",
      });
    }
  };

  const handleBlockUnblockDeleteConfirm = () => {
    if (!selectedAdmin) return false;
    const id = selectedAdmin.id;
    let result = false;

    if (blockDeleteAlertState.type === "block") {
      setListAdminAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, isActive: false } : acc));
      result = true;
    } else if (blockDeleteAlertState.type === "unblock") {
      setListAdminAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, isActive: true } : acc));
      result = true;
    } else if (blockDeleteAlertState.type === "delete") {
      setListAdminAccounts(prev => prev.filter(acc => acc.id !== id));
      result = true;
    }

    setBlockDeleteAlertState({ ...blockDeleteAlertState, isOpen: false });
    setSelectedAdmin(null);

    if (result) {
      const successMsg = blockDeleteAlertState.type === "unblock"
        ? "Bỏ chặn tài khoản quản trị viên thành công."
        : blockDeleteAlertState.type === "block"
          ? "Chặn tài khoản quản trị viên thành công."
          : "Xoá tài khoản quản trị viên thành công.";
      showSuccess(successMsg);
    } else {
      showError(`Thao tác ${blockDeleteAlertState.type} thất bại`, `Không thể thực hiện thao tác ${blockDeleteAlertState.type} cho tài khoản. Vui lòng thử lại.`);
    }
    return result;
  };

  const handleCreateAdmin = (data: AdminFormData): boolean => {
    // Mock successful creation
    const newAdmin: AdminAccount = {
      id: Math.max(...listAdminAccounts.map(a => a.id), 0) + 1,
      name: data.fullName,
      username: data.username,
      isActive: true,
      phone: data.phone,
      email: data.email,
      password: data.password || "mock-password",
    };
    setListAdminAccounts(prev => [...prev, newAdmin]);
    return true; // Return true for success in mock
  };

  const handleEditAdmin = (data: AdminFormData): boolean => {
    if (!editingAdmin) return false;
    setListAdminAccounts(prev => prev.map(acc => acc.id === editingAdmin.id ? {
      ...acc,
      name: data.fullName,
      username: data.username,
      phone: data.phone,
      email: data.email,
      // Password is not updated on edit mock unless explicitly handled
    } : acc));
    return true; // Return true for success in mock
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  const handleSearch = () => {
    setActiveSearchQuery(searchQuery.toLowerCase().trim());
  };

  const filteredAccounts = listAdminAccounts.filter((account) => {
    // First filter by status
    const matchesStatus =
      selectedFilter === "Tất cả" ||
      (account.isActive && selectedFilter === "Đang hoạt động") ||
      (selectedFilter === "Bị khóa" && !account.isActive);

    // Then filter by search query (name or username or email)
    const matchesSearch =
      activeSearchQuery === "" ||
      account.name.toLowerCase().includes(activeSearchQuery) ||
      account.username.toLowerCase().includes(activeSearchQuery) ||
      account.email.toLowerCase().includes(activeSearchQuery);

    return matchesStatus && matchesSearch;
  });

  // FIX 2: Handler for Role Level Checkboxes
  const handleRoleChange = (id: number, field: keyof AdminRoleLevel, checked: boolean) => {
    setListRoleLevels(prev => prev.map(role => 
      role.id === id ? { ...role, [field]: checked } : role
    ));
    showSuccess(`Đã cập nhật mức quyền cho ID ${id}.`);
  };

  // FIX 3: Handler for Authorization Checkboxes
  const handleAuthChange = (id: number, field: keyof AdminAuthorization, checked: boolean) => {
    setListAuthorization(prev => prev.map(auth => 
      auth.id === id ? { ...auth, [field]: checked } : auth
    ));
    showSuccess(`Đã cập nhật phân quyền quản lí cho ID ${id}.`);
  };


  return (
    <div className="w-full max-w-7xl mx-auto p-8 space-y-10 font-sans">
      {/* Header & Search */}
      <div>
        <h1 className="text-[32px] font-extrabold mb-6">
          Quản lý tài khoản quản trị viên
        </h1>

        {/* Search Bar & Button */}
        <div className="flex mb-10 items-center space-x-4">
          <div className="relative flex-grow">
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
              className="w-full text-xl px-8 py-5 bg-[#e0f7fa] border border-blue-200 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-100 placeholder-gray-500 transition-shadow"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-[183px] py-4 bg-[#00C853] hover:bg-[#00a846] text-xl text-white font-extrabold rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Tìm kiếm
          </button>
        </div>

        {/* Admin Accounts Table Header & Actions */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-semibold text-2xl text-gray-700">
            Danh sách tài khoản quản trị viên
          </span>
          {/* Add New Admin Button */}
          <button
            className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors"
            onClick={() => setIsCreateDialogOpen(true)}
            title="Tạo tài khoản mới"
          >
            <UserPlus size={24} />
          </button>
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`p-3 rounded-full shadow-md transition-colors ${isFilterOpen ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
              title="Lọc theo trạng thái"
            >
              <Filter size={24} className="text-gray-700" />
            </button>
            {/* Filter Dropdown Content */}
            {isFilterOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-20 min-w-[200px] overflow-hidden">
                {["Tất cả", "Đang hoạt động", "Bị khóa"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className={`w-full px-5 py-3 text-left text-lg hover:bg-blue-50 transition-colors ${
                      selectedFilter === filter ? "bg-blue-100 font-bold text-blue-700" : "text-gray-800"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Admin Accounts Table */}
      <div className="bg-white border border-gray-300 rounded-xl overflow-x-auto shadow-lg">
        <table className="min-w-full border-collapse text-xl">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300 text-gray-700">
              <th className="px-6 py-4 text-center font-bold border-r border-gray-300 w-20">STT</th>
              <th className="px-6 py-4 text-left font-bold border-r border-gray-300 min-w-[200px]">Họ và tên</th>
              <th className="px-6 py-4 text-left font-bold border-r border-gray-300 min-w-[250px]">Email</th>
              <th className="px-6 py-4 text-center font-bold border-r border-gray-300 min-w-[150px]">Trạng thái</th>
              <th className="px-6 py-4 text-center font-bold min-w-[200px]">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account, index) => (
              <tr
                key={account.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-3 text-center border-r border-gray-200">{index + 1}</td>
                <td className="px-6 py-3 border-r border-gray-200 font-medium">{account.name}</td>
                <td className="px-6 py-3 border-r border-gray-200 text-blue-600">{account.email}</td>
                <td className="px-6 py-3 text-center border-r border-gray-200">
                  <span className={`font-semibold ${account.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {account.isActive ? "Đang hoạt động" : "Bị khóa"}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex justify-center items-center gap-2">
                    {/* View */}
                    <button onClick={() => handleView(account.id)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors" title="Xem chi tiết"><Eye size={24} /></button>
                    {/* Edit */}
                    <button onClick={() => handleEdit(account.id)} className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors" title="Chỉnh sửa"><Edit size={24} /></button>
                    {/* Block/Unblock */}
                    <button onClick={() => handleBlock(account.id)} className={`p-2 ${account.isActive ? 'text-red-500 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'} rounded-full transition-colors`} title={account.isActive ? "Khóa tài khoản" : "Mở khóa tài khoản"}><Lock size={24} /></button>
                    {/* Delete */}
                    <button onClick={() => handleDelete(account.id)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors" title="Xóa tài khoản"><Trash2 size={24} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredAccounts.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center text-gray-500 italic">Không tìm thấy tài khoản nào phù hợp.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mức quyền admin (Admin Role Level) */}
      <div className="space-y-4 pt-4">
        <h2 className="font-semibold text-2xl text-gray-700">Mức quyền admin <Save size={20} className="inline ml-2 align-text-bottom" /></h2>
        <div className="bg-white border border-gray-300 rounded-xl overflow-x-auto shadow-lg w-fit">
          <table className="min-w-full border-collapse text-xl">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 text-gray-700">
                <th className="px-6 py-4 text-center font-bold border-r border-gray-300 w-20">STT</th>
                <th className="px-6 py-4 text-left font-bold border-r border-gray-300 min-w-[200px]">Họ và tên</th>
                <th className="px-10 py-4 text-center font-bold border-r border-gray-300 min-w-[150px]">Super Admin</th>
                <th className="px-10 py-4 text-center font-bold min-w-[150px]">Sub-Admin</th>
              </tr>
            </thead>
            <tbody>
              {/* Use the stateful array listRoleLevels */}
              {listRoleLevels.map((role, index) => (
                <tr
                  key={role.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-3 text-center border-r border-gray-200">{role.id}</td>
                  <td className="px-6 py-3 border-r border-gray-200 font-medium">{role.name}</td>
                  <td className="px-10 py-3 text-center border-r border-gray-200">
                    {/* FIX: Removed readOnly and added onChange handler */}
                    <input 
                      type="checkbox" 
                      checked={role.superAdmin} 
                      onChange={(e) => handleRoleChange(role.id, 'superAdmin', e.target.checked)}
                      className="h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
                    />
                  </td>
                  <td className="px-10 py-3 text-center">
                    {/* FIX: Removed readOnly and added onChange handler */}
                    <input 
                      type="checkbox" 
                      checked={role.subAdmin} 
                      onChange={(e) => handleRoleChange(role.id, 'subAdmin', e.target.checked)}
                      className="h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Phân quyền quản lí (Management Authorization) */}
      <div className="space-y-4 pt-4">
        <h2 className="font-semibold text-2xl text-gray-700">Phân quyền quản lí <Save size={20} className="inline ml-2 align-text-bottom" /></h2>
        <div className="bg-white border border-gray-300 rounded-xl overflow-x-auto shadow-lg w-fit">
          <table className="min-w-full border-collapse text-xl">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 text-gray-700">
                <th className="px-6 py-4 text-center font-bold border-r border-gray-300 w-20">STT</th>
                <th className="px-6 py-4 text-left font-bold border-r border-gray-300 min-w-[200px]">Họ và tên</th>
                <th className="px-6 py-4 text-center font-bold border-r border-gray-300 min-w-[100px]" title="Quản lý Admin">QLAD</th>
                <th className="px-6 py-4 text-center font-bold border-r border-gray-300 min-w-[100px]" title="Quản lý Người dùng">QLND</th>
                <th className="px-6 py-4 text-center font-bold border-r border-gray-300 min-w-[100px]" title="Thống kê/Phân loại">TLoai</th>
                <th className="px-6 py-4 text-center font-bold border-r border-gray-300 min-w-[100px]" title="Báo cáo">BCao</th>
                <th className="px-6 py-4 text-center font-bold min-w-[100px]" title="Hệ thống">HThong</th>
              </tr>
            </thead>
            <tbody>
              {/* Use the stateful array listAuthorization */}
              {listAuthorization.map((auth, index) => (
                <tr
                  key={auth.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-3 text-center border-r border-gray-200">{auth.id}</td>
                  <td className="px-6 py-3 border-r border-gray-200 font-medium">{auth.name}</td>
                  <td className="px-6 py-3 text-center border-r border-gray-200">
                    {/* FIX: Removed readOnly and added onChange handler */}
                    <input 
                      type="checkbox" 
                      checked={auth.QLAD} 
                      onChange={(e) => handleAuthChange(auth.id, 'QLAD', e.target.checked)}
                      className="h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
                    />
                  </td>
                  <td className="px-6 py-3 text-center border-r border-gray-200">
                    {/* FIX: Removed readOnly and added onChange handler */}
                    <input 
                      type="checkbox" 
                      checked={auth.QLND} 
                      onChange={(e) => handleAuthChange(auth.id, 'QLND', e.target.checked)}
                      className="h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
                    />
                  </td>
                  <td className="px-6 py-3 text-center border-r border-gray-200">
                    {/* FIX: Removed readOnly and added onChange handler */}
                    <input 
                      type="checkbox" 
                      checked={auth.TLoai} 
                      onChange={(e) => handleAuthChange(auth.id, 'TLoai', e.target.checked)}
                      className="h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
                    />
                  </td>
                  <td className="px-6 py-3 text-center border-r border-gray-200">
                    {/* FIX: Removed readOnly and added onChange handler */}
                    <input 
                      type="checkbox" 
                      checked={auth.BCao} 
                      onChange={(e) => handleAuthChange(auth.id, 'BCao', e.target.checked)}
                      className="h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
                    />
                  </td>
                  <td className="px-6 py-3 text-center">
                    {/* FIX: Removed readOnly and added onChange handler */}
                    <input 
                      type="checkbox" 
                      checked={auth.HThong} 
                      onChange={(e) => handleAuthChange(auth.id, 'HThong', e.target.checked)}
                      className="h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Dialogs & Alerts --- */}

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
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={(data) => {
          const result = handleCreateAdmin(data);
          if (result) {
            setIsCreateDialogOpen(false);
            showSuccess("Tạo tài khoản quản trị viên thành công.");
          } else {
            showError("Tạo tài khoản thất bại", "Không thể tạo tài khoản quản trị viên. Vui lòng thử lại.");
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
            showSuccess("Chỉnh sửa tài khoản quản trị viên thành công.");
          } else {
            showError("Chỉnh sửa tài khoản thất bại", "Không thể chỉnh sửa tài khoản quản trị viên. Vui lòng thử lại.");
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
        onConfirm={handleBlockUnblockDeleteConfirm}
        title={blockDeleteAlertState.title}
        message={blockDeleteAlertState.message}
        type={blockDeleteAlertState.type}
      />
    </div>
  );
}