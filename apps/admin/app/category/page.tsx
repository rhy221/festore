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
      className="absolute right-0 mt-2 w-40 rounded-lg border border-border bg-card shadow-lg z-10"
    >
      <div
        className="px-4 py-2 text-sm text-foreground hover:bg-muted cursor-pointer rounded-t-lg"
        onClick={() => { onView(category.id); onClose(); }}
      >
        View details
      </div>
      <div
        className="px-4 py-2 text-sm text-foreground hover:bg-muted cursor-pointer"
        onClick={() => { onEdit(category); onClose(); }}
      >
        Edit
      </div>
      <div
        className="px-4 py-2 text-sm text-destructive hover:bg-destructive/10 cursor-pointer rounded-b-lg"
        onClick={() => { onDelete(category); onClose(); }}
      >
        Delete
      </div>
    </div>
  );
};

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
      const list: CategoryFixed[] = (Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []).map((c: any) => ({
        id: String(c.id ?? c._id),
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

  useEffect(() => { loadCategories(); }, [loadCategories]);

  const handleView = (id: string) => {
    router.push(`/category/${id}`);
    setOpenDropdownId(null);
  };

  const filteredCategories = categories.filter((c) => {
    if (!search) return true;
    const keyword = search.toLowerCase();
    return c.name.toLowerCase().includes(keyword) || c.styles.some((s) => s.toLowerCase().includes(keyword));
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-20 h-16 md:h-20 bg-card border-b border-border">
        <Header />
      </header>

      <div className="flex pt-16 md:pt-20 flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:block fixed left-0 top-16 md:top-20 h-[calc(100vh-5rem)] w-60 border-r border-border bg-sidebar">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 px-4 md:px-6 lg:px-8 md:ml-60 py-6 font-sans text-foreground">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 border-b border-border pb-3">
            <h1 className="text-lg sm:text-xl font-bold">Category List</h1>
            <Button
              className="bg-primary text-primary-foreground hover:opacity-90 w-full sm:w-auto"
              onClick={() => setShowAddPopup(true)}
            >
              + Add category
            </Button>
          </div>

          <div className="mb-4 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by category name or style..."
              className="w-full rounded-lg border border-input bg-card px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring focus:ring-ring"
            />
          </div>

          {loading ? (
            <div className="py-12 text-center text-muted-foreground">
              Loading data...
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No categories found.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="min-w-full divide-y divide-border text-center text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">Category name</th>
                    <th className="px-6 py-3 text-xs font-medium uppercase text-muted-foreground">Styles</th>
                    <th className="w-16 px-6 py-3" />
                  </tr>
                </thead>

                <tbody className="divide-y divide-border bg-card">
                  {filteredCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-accent cursor-pointer">
                      <td className="px-6 py-3 font-medium" onClick={() => handleView(category.id)}>
                        {category.name}
                      </td>
                      <td className="px-6 py-3 text-muted-foreground">
                        {category.styles.length > 0 ? category.styles.join(", ") : "—"}
                      </td>
                      <td className="relative px-6 py-3">
                        <Button
                          variant="ghost"
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
