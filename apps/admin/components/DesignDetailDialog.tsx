"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import DesignWarningDialog from "@/components/DesignWarningDialog"
type Design = {
  name: string
  designer: string
  description: string
  category: string
  status: string
  datePosted: string
  image: string
  salesInfo: {
    directPrice: string
    auction: {
      startingPrice: string
      priceStep: string
      finalPrice: string
      winner: string
    }
  }
  engagement: {
    likes: number
    views: number
  }
}

interface DesignDetailDialogProps {
  design: Design | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DesignDetailDialog({ design, open, onOpenChange }: DesignDetailDialogProps) {
  const [showWarningDialog, setShowWarningDialog] = useState(false)

  if (!design) return null

  const handleWarningClick = () => {
    setShowWarningDialog(true)
  }

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Deleting design:", design.name)
    alert("Mẫu thiết kế đã được xóa!")
    onOpenChange(false)
  }

  // Convert Design to warning design format
  const warningDesign = {
    name: design.name,
    designer: design.designer,
    description: design.description,
    category: design.category,
    status: design.status,
    datePosted: design.datePosted,
    image: design.image
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl p-6" showCloseButton={false}>
          {/* Header */}
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Xem chi tiết mẫu thiết kế
            </DialogTitle>

            {/* Close button with X icon image */}
            <button
              onClick={() => onOpenChange(false)}
              className="flex items-center justify-center w-8 h-6 border rounded-md bg-muted hover:bg-muted/70"
            >
              <img src="/xButtonIcon.png" alt="Close" className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex gap-6 mt-4">
            {/* Left: Image */}
            <div className="w-60">
              <img
                src={design.image}
                alt={design.name}
                className="w-full rounded-md border"
              />
            </div>

            {/* Right: Info */}
            <div className="flex-1 space-y-2 text-sm leading-relaxed">
              <p><span className="font-semibold">Tên mẫu thiết kế:</span> {design.name}</p>
              <p><span className="font-semibold">Nhà thiết kế:</span> {design.designer}</p>
              <p>
                <span className="font-semibold">Mô tả:</span> {design.description}
              </p>
              <p><span className="font-semibold">Thể loại:</span> {design.category}</p>
              <p>
                <span className="font-semibold">Trạng thái:</span> {design.status} &nbsp;&nbsp;
                <span className="font-semibold">Ngày đăng mẫu:</span> {design.datePosted}
              </p>

              <h4 className="mt-3 font-semibold">Thông tin bán hàng</h4>
              <p><span className="font-semibold">Giá bán trực tiếp:</span> {design.salesInfo.directPrice}</p>
              <p><span className="font-semibold">Đấu giá:</span></p>
              <ul className="list-disc list-inside pl-2">
                <li>Giá khởi điểm: {design.salesInfo.auction.startingPrice}</li>
                <li>Bước giá: {design.salesInfo.auction.priceStep}</li>
                <li>Giá chốt cuối cùng: {design.salesInfo.auction.finalPrice}</li>
                <li>Người chốt: {design.salesInfo.auction.winner}</li>
              </ul>

              <p>
                <span className="font-semibold">Lượt thích:</span> {design.engagement.likes} &nbsp;&nbsp;
                <span className="font-semibold">Lượt xem:</span> {design.engagement.views}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button 
              onClick={handleWarningClick}
              className="px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white"
            >
              Cảnh cáo
            </button>
            <button 
              onClick={handleDelete}
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
            >
              Xoá
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Warning Dialog */}
      <DesignWarningDialog
        design={warningDesign}
        open={showWarningDialog}
        onOpenChange={setShowWarningDialog}
      />
    </>
  )
}

export type { Design }