"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "components/input";
import { Button } from "../../../../packages/ui/src/components/button";
import { CategoriesAPI } from "@/api/categories.api";
import { toast } from "sonner";

interface AdminCategoryAddPopupProps {
  onClose: () => void;
  onSuccess: () => void;
}

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function AdminCategoryAddPopup({
  onClose,
  onSuccess,
}: AdminCategoryAddPopupProps) {
  const [name, setName] = useState("");
  const [stylesInput, setStylesInput] = useState("");
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

      await CategoriesAPI.createCategory({
        name: name.trim(),
        slug: generateSlug(name),
        styles,
        isDeleted: false,
      });

      toast.success(`Category "${name}" has been created successfully.`);
      onSuccess();
    } catch (error) {
      console.error("Failed to create category:", error);
      toast.error("Failed to create category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-gray-900 max-w-xl w-full">
        
        {/* HEADER */}
        <div className="flex justify-between items-start pb-4 border-b border-gray-100 mb-6">
          <h2 className="text-3xl font-light tracking-wide">
            Create new category
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-black rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tops"
            />
            {name && (
              <p className="text-xs text-gray-400 mt-1">
                Slug: <span className="italic">{generateSlug(name)}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Styles (comma separated)
            </label>
            <Input
              value={stylesInput}
              onChange={(e) => setStylesInput(e.target.value)}
              placeholder="T-Shirt, Hoodie, Jacket"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="pt-6 flex justify-end">
          <Button
            className="bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 px-6 py-2 rounded-lg disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Create category"}
          </Button>
        </div>
      </div>
    </div>
  );
}
