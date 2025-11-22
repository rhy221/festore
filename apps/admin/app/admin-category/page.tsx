"use client";

import { SetStateAction, useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { CircleButton } from "@/components/button";
import { CategoryCard } from "@/components/card";
import AdminCategoryAddPopup from "../admin-category-add/page";
import AdminCategoryEditPopup from "../admin-category-edit/page";
import AdminCategoryDeletePopup from "../admin-category-delete/page";

export default function AdminCategoryDashboard() {
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  // Optionally, you can track which category is being edited
  // const [editCategory, setEditCategory] = useState(null);

  const handleEdit = () => {
    setShowEditPopup(true);
    setShowDeletePopup(false);
    // setEditCategory(category); // if you want to pass data
  };
  const handleDelete = () => {
    setShowDeletePopup(true);
    setShowEditPopup(false); // optional: close other popups
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#F0F7FF] flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center">
            <img src="/Logo.png" alt="Logo" className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-extrabold text-black">HHCLOSET</h1>
        </div>
        <div className="text-2xl font-extrabold italic text-black">
          Xin chào admin: ABC
        </div>
      </header>

      {/* Content layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 text-white p-4 space-y-4">
          <nav className="flex flex-col px-2">
            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a&0]">
              <img
                src="/homeIcon.png"
                alt="Home"
                className="w-6 h-6 shrink-0"
              />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">
                Trang chủ
              </span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img
                src="/adminManagementIcon.png"
                alt="User Management"
                className="w-6 h-6 shrink-0"
              />
              <span className="text-2xl font-semibold leading-none">
                Quản lý admin
              </span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img
                src="/userManagementIcon.png"
                alt="User Management"
                className="w-6 h-6 shrink-0"
              />
              <span className="text-2xl font-semibold leading-none">
                Quản lý người dùng
              </span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img
                src="/styleIcon.png"
                alt="Style"
                className="w-6 h-6 shrink-0"
              />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">
                Thể loại
              </span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img
                src="/reportIcon.png"
                alt="Report"
                className="w-6 h-6 shrink-0"
              />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">
                Báo cáo
              </span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img
                src="/settingIcon.png"
                alt="Settings"
                className="w-6 h-6 shrink-0"
              />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">
                Hệ thống
              </span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70] mt-2">
              <img
                src="/logoutIcon.png"
                alt="Logout"
                className="w-6 h-6 shrink-0"
              />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">
                Đăng xuất
              </span>
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-white p-6 overflow-y-auto text-lg">
          {/* Search */}
          <div className="flex items-center gap-2">
            <Input
              className="text-base !bg-[#ADD8E6] border-none rounded-3xl"
              placeholder="Nhập nội dung tìm kiếm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="bg-green-500 text-base text-white rounded-3xl hover:bg-green-700">
              Tìm kiếm
            </Button>
          </div>
          {/* Add Category */}
          <div className="flex flex-row items-center">
            <h2 className="font-bold px-2 py-4 text-black">
              Danh sách thể loại
            </h2>
            <CircleButton onClick={() => setShowPopup(true)} />
          </div>
          {showPopup && (
            <AdminCategoryAddPopup onClose={() => setShowPopup(false)} />
          )}
          {/* Table of Card choose category */}
          <table className="table-fixed min-w-full min-h-screen">
            <thead>
              <tr>
                <th className="w-1/3"></th>
                <th className="w-1/3"></th>
                <th className="w-1/3"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <CategoryCard
                    title="GIÀY"
                    imageUrl="https://picsum.photos/800/600"
                    href="/admin-detail-category"
                    onMenuClick={() => alert("Menu clicked")}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </td>
                <td>
                  <CategoryCard
                    title="DẠ HỘI"
                    imageUrl="https://picsum.photos/800/600"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </td>
                <td>
                  <CategoryCard
                    title="ĐƯỜNG PHỐ"
                    imageUrl="https://picsum.photos/800/600"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <CategoryCard
                    title="PHỤ KIỆN"
                    imageUrl="https://picsum.photos/800/600"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </td>
                <td>
                  <CategoryCard
                    title="UNISEX"
                    imageUrl="https://picsum.photos/800/600"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </td>
                <td>
                  <CategoryCard
                    title="TRẺ EM"
                    imageUrl="https://picsum.photos/800/600"
                    href="#"
                    onMenuClick={() => alert("Menu clicked")}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {/* Edit Category Popup */}
          {showEditPopup && (
            <AdminCategoryEditPopup onClose={() => setShowEditPopup(false)} />
          )}
          {/* Delete Category Popup */}
          {showDeletePopup && (
            <AdminCategoryDeletePopup
              onClose={() => setShowDeletePopup(false)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
