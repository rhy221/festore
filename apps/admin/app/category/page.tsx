"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "../../../../packages/ui/src/components/button";
import { toast } from "sonner";
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import { CategoriesAPI } from "@/api/categories.api";
import AdminCategoryAddPopup from "./AddCategory";
import AdminCategoryEditPopup from "./EditCategory";
import AdminCategoryDeletePopup from "./DeleteCategory";
import { useRouter } from "next/navigation";

type CategoryFixed = {
  id: string;
  name: string;
  slug: string;
  styles: string[];
  isDeleted: boolean;
};

/* ----- DROPDOWN COMPONENT ----- */
const AdminCategoryActionsDropdown: React.FC<{
  category: CategoryFixed;
  onEdit: (category: CategoryFixed) => void;
  onDelete: (category: CategoryFixed) => void;
  onView: (id: string) => void;
  onClose: () => void;
}> = ({ category, onEdit, onDelete, onView, onClose }) => {
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
        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-t-lg"
        onClick={() => {
          onView(category.id);
          onClose();
        }}
      >
        View details
      </div>
      <div
        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          onEdit(category);
          onClose();
        }}
      >
        Edit
      </div>
      <div
        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer rounded-b-lg"
        onClick={() => {
          onDelete(category);
          onClose();
        }}
      >
        Delete
      </div>
    </div>
  );
};

/* ----- MAIN PAGE COMPONENT ----- */
export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<CategoryFixed[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryFixed | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<CategoryFixed | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const router = useRouter();

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data: any = await CategoriesAPI.getCategories({});

      const list: CategoryFixed[] = (
        Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []
      ).map((c: any) => ({
        id: String(c._id),
        name: c.name,
        slug: c.slug,
        styles: Array.isArray(c.styles) ? c.styles : [],
        isDeleted: Boolean(c.isDeleted),
      }));

      setCategories(list);
    } catch {
      toast.error("Failed to load categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleView = (id: string) => {
    router.push(`/admin/category/${id}`);
    setOpenDropdownId(null);
  };

  // 🔹 FILTER LOGIC (NAME OR STYLES)
  const filteredCategories = categories.filter((c) => {
    if (!search) return true;

    const keyword = search.toLowerCase();
    const matchName = c.name.toLowerCase().includes(keyword);
    const matchStyles = c.styles.some((s) => s.toLowerCase().includes(keyword));

    return matchName || matchStyles;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 pt-24">
        <div className="w-[296px]">
          <Sidebar />
        </div>

        <main className="flex-1 p-6 overflow-y-auto font-sans text-gray-800">
          <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-200">
            <h1 className="text-xl font-medium text-black">Category List</h1>
            <Button
              className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800"
              onClick={() => setShowAddPopup(true)}
            >
              + Add category
            </Button>
          </div>

          {/* 🔹 SEARCH BAR */}
          <div className="mb-4 max-w-sm">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by category name or style..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading data...</div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No categories found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-center">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase">Category name</th>
                    <th className="px-6 py-2 text-xs font-medium text-gray-500 uppercase">Styles</th>
                    <th className="px-6 py-2 w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-100 cursor-pointer">
                      <td className="px-6 py-3 font-medium text-gray-900" onClick={() => handleView(category.id)}>
                        {category.name}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600">
                        {category.styles.length > 0 ? category.styles.join(", ") : "—"}
                      </td>
                      <td className="px-6 py-3 relative">
                        <Button
                          className="bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === category.id ? null : category.id);
                          }}
                        >
                          ⋮
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
              onSuccess={() => {
                setShowAddPopup(false);
                loadCategories();
              }}
            />
          )}
          {editCategory && (
            <AdminCategoryEditPopup
              category={editCategory}
              onClose={() => setEditCategory(null)}
              onSuccess={() => {
                setEditCategory(null);
                loadCategories();
              }}
            />
          )}
          {deleteCategory && (
            <AdminCategoryDeletePopup
              category={deleteCategory}
              onClose={() => setDeleteCategory(null)}
              onSuccess={() => {
                setDeleteCategory(null);
                loadCategories();
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
