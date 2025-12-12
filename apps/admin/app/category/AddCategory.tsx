"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "components/input";
import { Textarea } from "components/textarea";
import { Button } from "../../../../packages/ui/src/components/button";
import { CategoriesAPI } from "@/api/categories.api";
import { toast } from "sonner";

interface AdminCategoryAddPopupProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminCategoryAddPopup({
  onClose,
  onSuccess,
}: AdminCategoryAddPopupProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Vui lòng nhập tên danh mục");
      return;
    }

    try {
      setLoading(true);

      await CategoriesAPI.createCategory({
        name: name.trim(),
        description: description.trim(),
      });

      toast.success(`Đã tạo danh mục "${name}" thành công.`);
      onSuccess();
    } catch (error) {
      console.error("Failed to create category:", error);
      toast.error("Không thể tạo danh mục. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-gray-900 max-w-xl w-full">
        
        <div className="flex justify-between items-start pb-4 border-b border-gray-100 mb-6">
          <h2 className="text-3xl font-light tracking-wide">Tạo thể loại mới</h2>
          <button 
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-black rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên thể loại
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <Button
            className="bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 px-6 py-2 rounded-lg disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Tạo thể loại"}
          </Button>
        </div>

      </div>
    </div>
  );
}
