"use client";
import { BackspaceIcon } from "@heroicons/react/24/solid";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { ImagePlus } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
export default function AdminCategoryAddPopup({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-row bg-white justify-between gap-70">
          <p className="font-bold text-2xl pb-3 text-black">Tạo thể loại mới</p>
          <BackspaceIcon
            className="w-8 h-8 pt-1 text-black cursor-pointer"
            onClick={onClose}
          />
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
                <p className="font-semibold text-black">Tên thể loại</p>
                <Input className="border-0 shadow-none border-b-1 rounded-none border-black w-80 focus-visible:ring/0 p-0 focus-visible:border-black !bg-white text-black" />
              </td>
              <td
                rowSpan={2}
                className=" text-center align-text-top justify-items-center"
              >
                <p className="font-semibold pb-2 text-black">
                  Ảnh mô tả (nếu có)
                </p>
                <div className="w-60 h-40 border-1 border-black flex items-center justify-center cursor-pointer mx-auto">
                  <ImagePlus className="text-black" strokeWidth={1} />
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top pt-5">
                <p className="font-semibold text-black">Mô tả thể loại</p>
                <Textarea rows={1} className="!bg-white text-black" />
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