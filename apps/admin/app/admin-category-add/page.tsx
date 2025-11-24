"use client";
import { useState } from "react";
import { X, ImagePlus } from "lucide-react";
import { Input, Textarea } from "../../../../packages/ui/src/components/input";
import { Button } from "../../../../packages/ui/src/components/button";
import { categoriesApi } from "../../lib/api/categories";
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
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Vui lòng nhập tên thể loại");
      return;
    }

    try {
      setLoading(true);
      await categoriesApi.create({
        name: name.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim() || undefined,
      });
      onSuccess();
    } catch (error) {
      console.error("Failed to create category:", error);
      toast.error("Không thể tạo thể loại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-black max-w-3xl w-full">
        <div className="flex flex-row bg-white justify-between gap-70">
          <p className="font-bold text-2xl pb-3">Tạo thể loại mới</p>
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
                  placeholder="Nhập tên thể loại"
                />
              </td>
              <td
                rowSpan={2}
                className=" text-center align-text-top justify-items-center"
              >
                <p className="font-semibold pb-2">Ảnh mô tả (nếu có)</p>
                <div className="w-60 h-40 border-2 border-black flex flex-col items-center justify-center cursor-pointer mx-auto rounded">
                  <ImagePlus className="w-12 h-12 mb-2" strokeWidth={1} />
                  <Input
                    type="text"
                    className="w-full text-xs px-2"
                    placeholder="URL ảnh"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top pt-5">
                <p className="font-semibold">Mô tả thể loại</p>
                <Textarea
                  rows={4}
                  className="w-full mt-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Nhập mô tả thể loại"
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
