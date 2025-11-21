"use client";
import { X } from "lucide-react";
import { Input, Textarea } from "../../../../packages/ui/src/components/input";
import { ImagePlus } from "lucide-react";
import { Button } from "../../../../packages/ui/src/components/button";

export default function AdminCategoryAddPopup({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-black">
        <div className="flex flex-row bg-white justify-between gap-70">
          <p className="font-bold text-2xl pb-3">Tạo thể loại mới</p>
          <X className="w-8 h-8 pt-1 cursor-pointer hover:text-gray-600" onClick={onClose} />
        </div>
        <table className="w-160 border-amber-950">
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
                <Input className="border-0 shadow-none border-b-2 rounded-none border-black w-80 focus-visible:ring-0 p-0 focus-visible:border-black" />
              </td>
              <td
                rowSpan={2}
                className=" text-center align-text-top justify-items-center"
              >
                <p className="font-semibold pb-2">Ảnh mô tả (nếu có)</p>
                <div className="w-60 h-40 border-2 border-black flex items-center justify-center cursor-pointer mx-auto rounded">
                  <ImagePlus className="w-12 h-12" strokeWidth={1} />
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top pt-5">
                <p className="font-semibold">Mô tả thể loại</p>
                <Textarea rows={4} className="w-80 mt-2" />
              </td>
            </tr>
          </tbody>
        </table>
        <Button className="bg-[#0057FF] text-white text-xl hover:bg-[#0548ce] mt-6 w-full rounded-xl">
          Hoàn tất
        </Button>
      </div>
    </div>
  );
}
