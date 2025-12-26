"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "../../../../../packages/ui/src/components/button";
import { CategoriesAPI, type Category } from "@/api/categories.api";
import { toast } from "sonner";

interface AdminCategoryDeletePopupProps {
  category: Category;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminCategoryDeletePopup({
  category,
  onClose,
  onSuccess,
}: AdminCategoryDeletePopupProps) {
  const [loading, setLoading] = useState(false);

  const hasProducts = (category.productCount ?? 0) > 0;

  const handleDelete = async () => {
    if (hasProducts) {
      toast.error("Cannot delete a category that contains products");
      return;
    }

    try {
      setLoading(true);
      await CategoriesAPI.updateCategory({
        id: category.id,
        body: { isDeleted: true },
      });
      toast.success(`Category "${category.name}" has been deleted.`);
      onSuccess();
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md md:max-w-lg bg-card text-card-foreground rounded-xl shadow-lg p-6 md:p-8 flex flex-col gap-4">
        <div className="flex flex-col items-center text-center gap-2">
          <AlertTriangle className="w-16 h-16 text-yellow-500" />
          <h2 className="font-bold text-2xl md:text-3xl text-foreground">
            Delete Category
          </h2>
          <p className="text-[var(--muted-foreground)] text-sm md:text-base">
            Are you sure you want to delete the category{" "}
            <strong>{category.name}</strong>?
          </p>
          {hasProducts ? (
            <p className="mt-2 text-sm text-[var(--destructive-foreground)]">
              This category contains {category.productCount} products and cannot
              be deleted
            </p>
          ) : (
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              This action cannot be undone
            </p>
          )}
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <Button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 bg-[var(--accent)] text-[var(--accent-foreground)] text-lg rounded-3xl hover:opacity-90 transition"
          >
            Cancel
          </Button>

          <Button
            onClick={handleDelete}
            disabled={loading || hasProducts}
            className="px-6 py-2 bg-[var(--destructive)] text-[var(--destructive-foreground)] text-lg rounded-3xl hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
