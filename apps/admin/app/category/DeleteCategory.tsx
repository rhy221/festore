"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "../../../../packages/ui/src/components/button";
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

      // Soft delete
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mb-3" />

          <p className="font-bold text-2xl pb-3 text-black">
            Delete category
          </p>

          <p className="text-gray-800">
            Are you sure you want to delete the category{" "}
            <strong>{category.name}</strong>?
          </p>

          {hasProducts ? (
            <p className="mt-2 text-sm text-red-600">
              This category currently contains {category.productCount} products
              and cannot be deleted.
            </p>
          ) : (
            <p className="text-gray-600 text-sm mt-1">
              This action cannot be undone.
            </p>
          )}
        </div>

        <div className="flex gap-7 justify-center mt-6">
          <Button
            className="bg-[#0057FF] text-white text-xl hover:bg-[#0548ce] w-32 rounded-3xl"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            className="bg-[#FF0000] text-white text-xl hover:bg-[#db0606] w-32 rounded-3xl disabled:opacity-50"
            onClick={handleDelete}
            disabled={loading || hasProducts}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
