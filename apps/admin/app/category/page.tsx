"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "../../../../packages/ui/src/components/button";
import { toast } from "sonner";
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import { CategoriesAPI, type Category } from "@/api/categories.api";
import AdminCategoryAddPopup from "./AddCategory";
import AdminCategoryEditPopup from "./EditCategory";
import AdminCategoryDeletePopup from "./DeleteCategory";
import { useRouter } from "next/navigation";

interface ActionDropdownProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onView: (id: string) => void;
  onClose: () => void;
}

const AdminCategoryActionsDropdown: React.FC<ActionDropdownProps> = ({
  category,
  onEdit,
  onDelete,
  onView,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-40 bg-gray-50 border border-gray-200 rounded-lg shadow-lg z-10"
    >
      <div
        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-t-lg transition"
        onClick={() => { onView(category.id); onClose(); }}
      >
        Xem chi tiết
      </div>
      <div
        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition"
        onClick={() => { onEdit(category); onClose(); }}
      >
        Sửa
      </div>
      <div
        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer rounded-b-lg transition"
        onClick={() => { onDelete(category); onClose(); }}
      >
        Xóa
      </div>
    </div>
  );
};

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const router = useRouter();

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await CategoriesAPI.getCategories({});

      const rawData: any = data;
      const categoryList: Category[] = (
        Array.isArray(rawData)
          ? rawData
          : Array.isArray(rawData?.data)
            ? rawData.data
            : []
      ).map((c: any) => ({
        ...c,
        id: c.id ?? c._id,
      }));

      setCategories(categoryList);
    } catch (error) {
      console.error("Lỗi tải danh mục:", error);
      toast.error("Không thể tải danh sách danh mục");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleActionClick = (categoryId: string) => {
    setOpenDropdownId(openDropdownId === categoryId ? null : categoryId);
  };

  const handleView = (id: string) => {
    router.push(`/admin/category/${id}`);
    setOpenDropdownId(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 pt-24">
        <div className="w-[296px]">
          <Sidebar />
        </div>
        <main className="flex-1 p-6 overflow-y-auto font-sans text-gray-800">
          <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-200">
            <h1 className="text-xl font-medium text-black">Danh sách thể loại</h1>
            <Button
              className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 shadow-md transition"
              onClick={() => setShowAddPopup(true)}
            >
              + Thêm thể loại
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500 text-base">Đang tải dữ liệu...</div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-base">
              <p className="mb-4">Chưa có danh mục nào được tạo.</p>
              <Button
                className="text-black border border-black px-4 py-2 bg-transparent hover:bg-black hover:text-white transition"
                onClick={() => setShowAddPopup(true)}
              >
                Tạo thể loại đầu tiên
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-center">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Tên thể loại</th>
                    <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Mô tả</th>
                    <th className="px-6 py-2 w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                    >
                      <td
                        className="px-6 py-3 font-medium text-gray-900 hover:text-gray-600 transition"
                        onClick={() => handleView(category.id)}
                      >
                        {category.name}
                      </td>
                      <td className="px-6 py-3 text-gray-500 text-sm">
                        <p className="truncate max-w-lg">{category.description || "Không có mô tả"}</p>
                      </td>
                      <td className="px-6 py-3 relative">
                        <Button
                          className="text-gray-600 hover:text-black transition p-1 rounded-full border border-transparent hover:border-gray-300 bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActionClick(category.id);
                          }}
                          title="Tùy chọn hành động"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 5v.01M12 12v.01M12 19v.01"
                            />
                          </svg>
                        </Button>

                        {openDropdownId === category.id && (
                          <AdminCategoryActionsDropdown
                            category={category}
                            onClose={() => setOpenDropdownId(null)}
                            onEdit={setEditCategory}
                            onDelete={setDeleteCategory}
                            onView={handleView}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {showAddPopup && (
            <AdminCategoryAddPopup
              onClose={() => setShowAddPopup(false)}
              onSuccess={() => { setShowAddPopup(false); loadCategories(); }}
            />
          )}
          {editCategory && (
            <AdminCategoryEditPopup
              category={editCategory}
              onClose={() => setEditCategory(null)}
              onSuccess={() => { setEditCategory(null); loadCategories(); }}
            />
          )}
          {deleteCategory && (
            <AdminCategoryDeletePopup
              category={deleteCategory}
              onClose={() => setDeleteCategory(null)}
              onSuccess={() => { setDeleteCategory(null); loadCategories(); }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
