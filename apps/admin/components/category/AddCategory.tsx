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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-lg bg-card text-card-foreground shadow-xl border border-border p-6">
        
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-lg font-semibold">
            Create new category
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
              placeholder="e.g. Tops"
              className="text-black"
            />
            {name && (
              <p className="mt-1 text-xs text-muted-foreground">
                Slug: <span className="italic">{generateSlug(name)}</span>
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Styles (comma separated)
            </label>
            <Input
              value={stylesInput}
              onChange={(e) => setStylesInput(e.target.value)}
              placeholder="T-Shirt, Hoodie, Jacket"
              className="text-black"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-md bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Create category"}
          </Button>
        </div>
      </div>
    </div>
  );
}
