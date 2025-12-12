"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "components/input";
import { Textarea } from "components/textarea";
import { Button } from "../../../../packages/ui/src/components/button";
import { CategoriesAPI, Category } from "@/api/categories.api";
import { toast } from "sonner";

interface AdminCategoryEditPopupProps {
  category: Category;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminCategoryEditPopup({
  category,
  onClose,
  onSuccess,
}: AdminCategoryEditPopupProps) {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description ?? "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Vui lòng nhập tên thể loại");
      return;
    }

    try {
      setLoading(true);

      await CategoriesAPI.updateCategory({
        id: category.id,
        body: {
          name: name.trim(),
          description: (description ?? "").trim(),
        },
      });

      onSuccess();
    } catch (error) {
      console.error("Update category failed:", error);
      toast.error("Không thể cập nhật thể loại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl animate-in fade-in zoom-in">
        
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-wide text-gray-900">
            Chỉnh sửa thể loại
          </h2>
          <X
            className="h-6 w-6 cursor-pointer text-gray-500 hover:text-black"
            onClick={onClose}
          />
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Tên thể loại
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Số mẫu hiện có
            </label>
            <div className="mt-2 rounded-xl border bg-gray-100 p-3 text-gray-800 font-medium">
              {category.productCount}
            </div>
          </div>

          <div className="w-full">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Mô tả thể loại
            </label>
            <Textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <Button
            variant="outline"
            className="rounded-xl px-6"
            onClick={onClose}
          >
            Huỷ
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-black px-8 text-white hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Hoàn tất"}
          </Button>
        </div>
      </div>
    </div>
  );
}
