"use client";
import React, { useState } from "react";

import CustomAlertDialog from "@/components/Dialog/CustomAlertDialog";
import SuccessAlertDialog from "@/components/Dialog/CustomSuccessDialog";

// Types
interface AdminRightsTablesProps {
  onTogglePermission: (userId: number, key: string) => boolean;
  users?: AdminUser[];
  permissions?: AdminPermission[];
}

interface AdminUser {
  id: number;
  name: string;
  username: string;
  isSuperAdmin: boolean;
  isSubAdmin: boolean;
}

interface AdminPermission {
  id: number;
  name: string;
  permissions: {
    QLAD: boolean;
    QLND: boolean;
    TLoai: boolean;
    BCao: boolean;
    HThong: boolean;
  };
}

interface AlertState {
  isOpen: boolean;
  title: string;
  message: string;
}

// Sample data
const defaultUsers: AdminUser[] = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    username: "admin001@",
    isSuperAdmin: true,
    isSubAdmin: false,
  },
  {
    id: 2,
    name: "Nguyễn Thị Bình",
    username: "admin004@",
    isSuperAdmin: false,
    isSubAdmin: true,
  },
  {
    id: 3,
    name: "Trần Công Cường",
    username: "admin007@",
    isSuperAdmin: false,
    isSubAdmin: true,
  },
];

const defaultPermissions: AdminPermission[] = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    permissions: {
      QLAD: true,
      QLND: true,
      TLoai: true,
      BCao: true,
      HThong: true,
    },
  },
  {
    id: 2,
    name: "Nguyễn Thị Bình",
    permissions: {
      QLAD: false,
      QLND: true,
      TLoai: true,
      BCao: true,
      HThong: false,
    },
  },
  {
    id: 3,
    name: "Trần Công Cường",
    permissions: {
      QLAD: false,
      QLND: true,
      TLoai: false,
      BCao: true,
      HThong: false,
    },
  },
];

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function AdminRightsTables({
  onTogglePermission,
  users: adminUsers = defaultUsers,
  permissions: initialPermission = defaultPermissions,
}: AdminRightsTablesProps) {
  const [permissions, setPermissions] = useState(initialPermission);
  const [alertState, setAlertState] = useState<AlertState>({
    isOpen: false,
    title: "",
    message: "",
  });
  const [successAlert, setSuccessAlert] = useState(false);

  const showAlert = (title: string, message: string) => {
    setAlertState({
      isOpen: true,
      title,
      message,
    });
  };

  const closeAlert = () => {
    setAlertState({
      isOpen: false,
      title: "",
      message: "",
    });
  };
  const handleTogglePermission = (
    userId: number,
    key: keyof AdminPermission["permissions"]
  ) => {
    const user = adminUsers.find((u) => u.id === userId);
    if (!user) return;

    if (user.isSuperAdmin) {
      showAlert(
        "Không thể bỏ phân quyền",
        `Tài khoản này là Admin toàn quyền (Super Admin), không thể bỏ bất kỳ phân quyền nào. Muốn thay đổi phân quyền, hãy chỉnh sửa cài đặt mức phân quyền.`
      );
      return;
    }

    if (user.isSubAdmin) {
      if (key === "QLAD") {
        showAlert(
          "Không thể thêm phân quyền",
          `Tài khoản này là Admin không toàn quyền (Sub-Admin), không có đầy đủ phân quyền. Muốn thay đổi phân quyền, hãy chỉnh sửa cài đặt mức phân quyền.`
        );
        return;
      }

      const current = permissions.find((p) => p.id === userId);
      if (!current) return;

      const currentChecked = Object.values(current.permissions).filter(
        Boolean
      ).length;
      const total = Object.keys(current.permissions).length;

      if (!current.permissions[key] && currentChecked === total - 1) {
        showAlert(
          "Không thể thêm phân quyền",
          `Tài khoản này là Admin không toàn quyền (Sub-Admin), không có đầy đủ phân quyền. Muốn thay đổi phân quyền, hãy chỉnh sửa cài đặt mức phân quyền.`
        );
        return;
      }
    }

    const allow = onTogglePermission(userId, key);
    if (!allow) return;

    setPermissions((prev) =>
      prev.map((p) =>
        p.id === userId
          ? {
              ...p,
              permissions: { ...p.permissions, [key]: !p.permissions[key] },
            }
          : p
      )
    );
    setSuccessAlert(true);
    setTimeout(() => setSuccessAlert(false), 1000);
  };

  return (
    <div className="w-full mx-auto max-w-5xl p-6 space-y-8 bg-white">
      {/* Custom Alert Dialog */}
      <CustomAlertDialog
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        title={alertState.title}
        message={alertState.message}
      />

      {/* Success Alert */}
      <SuccessAlertDialog
        isOpen={successAlert}
        onClose={() => setSuccessAlert(false)}
        message="Thay đổi hệ thống thành công."
      />
      {/* Admin Rights Table */}
      <div>
        <h2 className="text-[32px] font-extrabold mb-4 flex items-center gap-2">
          Mức quyền admin
          <img
            src="/adminTable.png"
            alt="Icon"
            className="w-[22.5px] h-[22.5px] ml-5"
          />
        </h2>
        <div className="border border-black text-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white border-b border-black">
                <th className="px-4 py-3 text-center font-bold border-r border-black w-20">
                  STT
                </th>
                <th className="px-4 py-3 text-center font-bold border-r border-black">
                  Họ và tên
                </th>
                <th className="px-4 py-3 text-center font-bold border-r border-black">
                  Tên đăng nhập
                </th>
                <th className="px-4 py-3 text-center font-bold border-r border-black">
                  Super Admin
                </th>
                <th className="px-4 py-3 text-center font-bold">Sub-Admin</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={
                    index < adminUsers.length - 1 ? "border-b border-black" : ""
                  }
                >
                  <td className="px-4 py-3 text-center border-r border-black">
                    {user.id}
                  </td>
                  <td className="px-4 py-3 border-r border-black">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 border-r text-center border-black">
                    {user.username}
                  </td>
                  <td className="px-4 py-3 text-center border-r border-black">
                    <div className="flex justify-center items-center">
                      <div
                        className={`w-5 h-5 border-2 border-black rounded flex items-center justify-center ${
                          user.isSuperAdmin ? "bg-white" : "bg-white"
                        }`}
                      >
                        {user.isSuperAdmin && <CheckIcon />}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center items-center">
                      <div
                        className={`w-5 h-5 border-2 border-black rounded flex items-center justify-center ${
                          user.isSubAdmin ? "bg-white" : "bg-white"
                        }`}
                      >
                        {user.isSubAdmin && <CheckIcon />}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission Management Table */}
      <div>
        <h2 className="text-[32px] font-extrabold mb-4 flex items-center gap-2">
          Phân quyền quản lí
          <img
            src="/adminTable.png"
            alt="Icon"
            className="w-[22.5px] h-[22.5px] ml-5"
          />
        </h2>
        <div className="border border-black text-xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white border-b border-black">
                <th className="px-4 py-3 text-center font-bold border-r border-black w-20">
                  STT
                </th>
                <th className="px-4 py-3 text-center font-bold border-r border-black">
                  Họ và tên
                </th>
                <th className="px-4 py-3 text-center font-bold border-r border-black">
                  QLAD
                </th>
                <th className="px-4 py-3 text-center font-bold border-r border-black">
                  QLND
                </th>
                <th className="px-4 py-3 text-center font-bold border-r border-black">
                  TLoai
                </th>
                <th className="px-4 py-3 text-center font-bold border-r border-black">
                  BCao
                </th>
                <th className="px-4 py-3 text-center font-bold">HThong</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((admin, index) => (
                <tr
                  key={admin.id}
                  className={
                    index < permissions.length - 1
                      ? "border-b border-black"
                      : ""
                  }
                >
                  <td className="px-4 py-3 text-center border-r border-black">
                    {admin.id}
                  </td>
                  <td className="px-4 py-3 border-r border-black">
                    {admin.name}
                  </td>
                  {Object.keys(admin.permissions).map((key) => (
                    <td
                      key={key}
                      className={
                        "text-center border-r align-middle" +
                        (key === "HThong" ? "" : " border-black")
                      }
                    >
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() =>
                            handleTogglePermission(
                              admin.id,
                              key as keyof AdminPermission["permissions"]
                            )
                          }
                          className="w-5 h-5 border-2 border-black rounded flex items-center justify-center bg-white"
                        >
                          {admin.permissions[
                            key as keyof AdminPermission["permissions"]
                          ] && <CheckIcon />}
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
