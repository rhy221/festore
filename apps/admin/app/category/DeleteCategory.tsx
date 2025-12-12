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

  const handleDelete = async () => {
    try {
      setLoading(true);

      await CategoriesAPI.deleteCategory(category.id);

      toast.success(`Đã xóa thể loại "${category.name}".`);
      onSuccess();
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Không thể xóa thể loại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col justify-between items-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto" />

          <p className="font-bold text-2xl pb-3 text-black">
            Xoá thể loại
          </p>

          <p className="text-gray-800 text-center">
            Bạn có chắc chắn muốn xóa thể loại <strong>{category.name}</strong>?
          </p>

          <p className="text-gray-800 text-center">
            Hành động này sẽ không thể hoàn tác.
          </p>
        </div>

        <div className="flex flex-row gap-7 justify-center mt-4">
          <Button
            className="bg-[#0057FF] text-white text-xl hover:bg-[#0548ce] w-32 rounded-3xl"
            onClick={onClose}
            disabled={loading}
          >
            Huỷ
          </Button>

          <Button
            className="bg-[#FF0000] text-white text-xl hover:bg-[#db0606] w-32 rounded-3xl disabled:opacity-50"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Đang xóa..." : "Xoá"}
          </Button>
        </div>
      </div>
    </div>
  );
}
