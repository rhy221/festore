"use client"

import { useState } from "react"
import DesignDetailDialog, { type Design } from "@/components/DesignDetailDialog"

const sampleDesign: Design = {
  name: "Footwear Romans Cad",
  designer: "Nguyễn Văn Tiên",
  description: "Mẫu giày lấy cảm hứng từ chiến binh La Mã với thiết kế dây đan mạnh mẽ và phong cách cổ điển hiện đại.",
  category: "Giày",
  status: "Chia sẻ",
  datePosted: "15/09/2024",
  image: "/designImage.png",
  salesInfo: {
    directPrice: "X",
    auction: {
      startingPrice: "X",
      priceStep: "X",
      finalPrice: "X",
      winner: "X"
    }
  },
  engagement: {
    likes: 135,
    views: 125
  }
}

export default function DesignDetailPage() {
  const [open, setOpen] = useState(true)

  return (
    <DesignDetailDialog 
      design={sampleDesign}
      open={open}
      onOpenChange={setOpen}
    />
  )
}