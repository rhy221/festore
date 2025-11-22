"use client";
import { BackspaceIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Button } from "@workspace/ui/components/button";
export default function AdminCategoryEditPopup({
  onClose,
}: {
  onClose: () => void;
}) {
  console.log("AdminCategoryEditPopup rendered");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-black">
        <div className="flex flex-row bg-white justify-between gap-70">
          <p className="font-bold text-2xl pb-3">Chỉnh sửa thể loại</p>
          <BackspaceIcon className="w-8 h-8 pt-1" onClick={onClose} />
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
                <p className="">Giày</p>
              </td>
              <td
                rowSpan={3}
                className=" text-center align-text-top justify-items-center"
              >
                <p className="font-semibold pb-2">Ảnh mô tả (nếu có)</p>
                <div className="w-60 h-40 border-1 border-black flex items-center justify-center cursor-pointer mx-auto">
                  <Image
                    src="https://picsum.photos/220/140"
                    alt="Category Image"
                    className="object-cover"
                    width={220}
                    height={140}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-text-top">
                <p className="font-semibold">Số mẫu hiện có</p>
                <p className="">100</p>
              </td>
            </tr>
            <tr>
              <td className="align-text-top">
                <p className="font-semibold">Mô tả thể loại</p>
                <p className="">
                  Giày là nhóm các mẫu giày được phân loại theo kiểu dáng và
                  công dụng như giày thể thao, giày công sở, giày boot, giày
                  sandal, mỗi loại phù hợp với mục đích sử dụng và phong cách
                  khác nhau.
                </p>
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
