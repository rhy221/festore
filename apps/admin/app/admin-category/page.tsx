"use client";

import { useState, useEffect } from "react";
import { Input } from "../../../../packages/ui/src/components/input";
import { Button, CircleButton } from "../../../../packages/ui/src/components/button";
import { CategoryCard } from "../../../../packages/ui/src/components/card";
import AdminCategoryAddPopup from "../admin-category-add/page";
import AdminCategoryEditPopup from "../admin-category-edit/page";
import AdminCategoryDeletePopup from "../admin-category-delete/page";
import Sidebar from "../../components/Sidebar/Admin";
import Header from "../../components/Header/Header";
import { categoriesApi, Category } from "../../lib/api/categories";
import { toast } from "sonner";

export default function AdminCategoryDashboard() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Load categories
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async (searchQuery?: string) => {
    try {
      setLoading(true);
      const data = await categoriesApi.getAll(searchQuery);
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
      toast.error("Không thể tải danh sách thể loại");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadCategories(search);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowEditPopup(true);
    setShowDeletePopup(false);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setShowDeletePopup(true);
    setShowEditPopup(false);
  };

  const handleAddSuccess = () => {
    setShowPopup(false);
    loadCategories(search);
    toast.success("Thêm thể loại thành công");
  };

  const handleEditSuccess = () => {
    setShowEditPopup(false);
    setSelectedCategory(null);
    loadCategories(search);
    toast.success("Cập nhật thể loại thành công");
  };

  const handleDeleteSuccess = () => {
    setShowDeletePopup(false);
    setSelectedCategory(null);
    loadCategories(search);
    toast.success("Xóa thể loại thành công");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header role="admin" name="ABC" />

      <div className="flex flex-1 pt-32">
        <div className="w-[296px]">
          <Sidebar />
        </div>

        <main className="flex-1 bg-white p-6 overflow-y-auto text-lg text-black">
          {/* Search */}
          <div className="flex items-center gap-2">
            <Input
              className="text-base text-black"
              placeholder="Nhập nội dung tìm kiếm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button 
              className="bg-green-500 text-base hover:bg-green-600 text-white"
              onClick={handleSearch}
            >
              Tìm kiếm
            </Button>
          </div>

          {/* Add Category */}
          <div className="flex flex-row items-center">
            <h2 className="font-bold px-2 py-4 text-black">Danh sách thể loại</h2>
            <CircleButton onClick={() => setShowPopup(true)} />
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-8 text-gray-500">Đang tải...</div>
          )}

          {/* Grid of Categories */}
          {!loading && categories.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  title={category.name}
                  imageUrl={category.imageUrl || "https://picsum.photos/400/300"}
                  href={`/admin-detail-category?id=${category.id}`}
                  onEdit={() => handleEdit(category)}
                  onDelete={() => handleDelete(category)}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && categories.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {search ? "Không tìm thấy thể loại nào" : "Chưa có thể loại nào"}
            </div>
          )}

          {/* Popups */}
          {showPopup && (
            <AdminCategoryAddPopup 
              onClose={() => setShowPopup(false)}
              onSuccess={handleAddSuccess}
            />
          )}

          {showEditPopup && selectedCategory && (
            <AdminCategoryEditPopup 
              category={selectedCategory}
              onClose={() => {
                setShowEditPopup(false);
                setSelectedCategory(null);
              }}
              onSuccess={handleEditSuccess}
            />
          )}

          {showDeletePopup && selectedCategory && (
            <AdminCategoryDeletePopup
              category={selectedCategory}
              onClose={() => {
                setShowDeletePopup(false);
                setSelectedCategory(null);
              }}
              onSuccess={handleDeleteSuccess}
            />
          )}
        </main>
      </div>
    </div>
  );
}