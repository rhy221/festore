"use client";

import { useState } from "react";
import { Input } from "../../../../packages/ui/src/components/input";
import { Button, CircleButton } from "../../../../packages/ui/src/components/button";
import { CategoryCard } from "../../../../packages/ui/src/components/card";
import AdminCategoryAddPopup from "../admin-category-add/page";
import AdminCategoryEditPopup from "../admin-category-edit/page";
import AdminCategoryDeletePopup from "../admin-category-delete/page";
import Sidebar from "../../components/Sidebar/Admin";
import Header from "../../components/Header/Header";

export default function AdminCategoryDashboard() {
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleEdit = () => {
    setShowEditPopup(true);
    setShowDeletePopup(false);
  };

  const handleDelete = () => {
    setShowDeletePopup(true);
    setShowEditPopup(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header role="admin" name="ABC" />

      {/* Content layout */}
      <div className="flex flex-1 pt-32">
        {/* Sidebar */}
        <div className="w-[296px]">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 bg-white p-6 overflow-y-auto text-lg text-black">
          {/* Search */}
          <div className="flex items-center gap-2">
            <Input
              className="text-base text-black"
              placeholder="Nhập nội dung tìm kiếm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="bg-green-500 text-base hover:bg-green-600 text-white">
              Tìm kiếm
            </Button>
          </div>

          {/* Add Category */}
          <div className="flex flex-row items-center">
            <h2 className="font-bold px-2 py-4 text-black">Danh sách thể loại</h2>
            <CircleButton onClick={() => setShowPopup(true)} />
          </div>
          {showPopup && (
            <AdminCategoryAddPopup onClose={() => setShowPopup(false)} />
          )}

          {/* Grid of Categories */}
          <div className="grid grid-cols-3 gap-4">
            <CategoryCard
              title="GIÀY"
              imageUrl="https://picsum.photos/seed/shoes/400/300"
              href="/admin-detail-category"
              onMenuClick={() => console.log("Menu clicked")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <CategoryCard
              title="DẠ HỘI"
              imageUrl="https://picsum.photos/seed/evening/400/300"
              href="#"
              onMenuClick={() => console.log("Menu clicked")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <CategoryCard
              title="ĐƯỜNG PHỐ"
              imageUrl="https://picsum.photos/seed/street/400/300"
              href="#"
              onMenuClick={() => console.log("Menu clicked")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <CategoryCard
              title="PHỤ KIỆN"
              imageUrl="https://picsum.photos/seed/accessories/400/300"
              href="#"
              onMenuClick={() => console.log("Menu clicked")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <CategoryCard
              title="UNISEX"
              imageUrl="https://picsum.photos/seed/unisex/400/300"
              href="#"
              onMenuClick={() => console.log("Menu clicked")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <CategoryCard
              title="TRẺ EM"
              imageUrl="https://picsum.photos/seed/kids/400/300"
              href="#"
              onMenuClick={() => console.log("Menu clicked")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

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
