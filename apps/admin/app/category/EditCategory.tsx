"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "components/input";
import { Button } from "../../../../packages/ui/src/components/button";
import { CategoriesAPI, Category } from "@/api/categories.api";
import { toast } from "sonner";

interface AdminCategoryEditPopupProps {
  category: Category;
  onClose: () => void;
  onSuccess: () => void;
}

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function AdminCategoryEditPopup({
  category,
  onClose,
  onSuccess,
}: AdminCategoryEditPopupProps) {
  const [name, setName] = useState(category.name);
  const [stylesInput, setStylesInput] = useState(
    (category.styles ?? []).join(", ")
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    const styles = stylesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (styles.length === 0) {
      toast.error("Please enter at least one style");
      return;
    }

    try {
      setLoading(true);

      await CategoriesAPI.updateCategory({
        id: category.id,
        body: {
          name: name.trim(),
          slug: generateSlug(name),
          styles,
        },
      });

      toast.success("Category updated successfully");
      onSuccess();
    } catch (error) {
      console.error("Update category failed:", error);
      toast.error("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl animate-in fade-in zoom-in">
        
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-wide text-gray-900">
            Edit category
          </h2>
          <X
            className="h-6 w-6 cursor-pointer text-gray-500 hover:text-black"
            onClick={onClose}
          />
        </div>

        {/* FORM */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Category name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-400">
              Slug:{" "}
              <span className="italic">{generateSlug(name)}</span>
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Styles (comma separated)
            </label>
            <Input
              value={stylesInput}
              onChange={(e) => setStylesInput(e.target.value)}
              placeholder="T-shirt, Hoodie, Jacket"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-10 flex justify-end gap-4">
          <Button
            variant="outline"
            className="rounded-xl px-6"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-black px-8 text-white hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
