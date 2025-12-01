"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Input, Textarea } from "components/input";
import { Button } from "../../../../packages/ui/src/components/button";
import { categoriesApi, Category } from "../../lib/api/categories";
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
  const [description, setDescription] = useState(category.description);
  const [imageUrl, setImageUrl] = useState(category.imageUrl || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Vui lòng nhập tên thể loại");
      return;
    }

    try {
      setLoading(true);
      await categoriesApi.update(category.id, {
        name: name.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim() || undefined,
      });
      onSuccess();
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error("Không thể cập nhật thể loại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-black max-w-3xl w-full">
        <div className="flex flex-row bg-white justify-between gap-70">
          <p className="font-bold text-2xl pb-3">Chỉnh sửa thể loại</p>
          <X
            className="w-8 h-8 pt-1 cursor-pointer hover:text-gray-600"
            onClick={onClose}
          />
        </div>

        <table className="w-full border-amber-950">
          <thead>
            <tr>
              <th className="w-1/2"></th>
              <th className="w-1/2"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-text-top">
                <p className="font-semibold">Tên thể loại</p>
                <Input
                  className="border-0 shadow-none border-b-2 rounded-none border-black w-full focus-visible:ring-0 p-0 focus-visible:border-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
              <td
                rowSpan={3}
                className=" text-center align-text-top justify-items-center"
              >
                <p className="font-semibold pb-2">Ảnh mô tả (nếu có)</p>
                <div className="w-60 h-40 border-2 border-black flex items-center justify-center cursor-pointer mx-auto rounded overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Category"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">Không có ảnh</span>
                  )}
                </div>
                <Input
                  type="text"
                  className="w-60 mx-auto text-xs mt-2"
                  placeholder="URL ảnh mới"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="align-text-top pt-3">
                <p className="font-semibold">Số mẫu hiện có</p>
                <p className="text-gray-600">{category.productCount}</p>
              </td>
            </tr>
            <tr>
              <td className="align-text-top pt-3">
                <p className="font-semibold">Mô tả thể loại</p>
                <Textarea
                  rows={4}
                  className="w-full mt-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <Button
          className="bg-[#0057FF] text-white text-xl hover:bg-[#0548ce] mt-6 w-full rounded-xl disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Hoàn tất"}
        </Button>
      </div>
    </div>
  );
}