"use client";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@workspace/ui/components/button";
export default function AdminCategoryDeletePopup({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col bg-white justify-between items-center">
          <ExclamationTriangleIcon className="w-16 h-16 text-black mx-auto fill-yellow-300" />
          <p className="font-bold text-2xl pb-3">Xoá thể loại thời trang</p>
          <p>Bạn có chắc chắn muốn xóa thể loại thời trang này?</p>
          <p>Hành động này sẽ không thể hoàn tác.</p>
        </div>
        <div className="flex flex-row gap-7 justify-center">
          <Button
            className="bg-[#0057FF] text-white text-xl hover:bg-[#0548ce] w-32 mt-3 rounded-3xl"
            onClick={onClose}
          >
            Huỷ
          </Button>
          <Button className="bg-[#FF0000] text-white text-xl hover:bg-[#db0606] w-32 mt-3 rounded-3xl">
            Xoá
          </Button>
        </div>
      </div>
    </div>
  );
}