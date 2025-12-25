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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg bg-card text-card-foreground border border-border p-6 shadow-xl">
        
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-lg font-semibold">
            Edit category
          </h2>

          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Category name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black placeholder:text-muted-foreground"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Slug: <span className="italic">{generateSlug(name)}</span>
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Styles (comma separated)
            </label>
            <Input
              value={stylesInput}
              onChange={(e) => setStylesInput(e.target.value)}
              placeholder="T-shirt, Hoodie, Jacket"
              className="text-black placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-md px-5 py-2 text-sm"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-md bg-primary text-primary-foreground px-6 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
