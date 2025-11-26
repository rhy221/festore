"use client"

import { useState } from "react"
import DesignWarningDialog from "@/components/DesignWarningDialog"


// Design type and data
type Design = {
  name: string
  designer: string
  description: string
  category: string
  status: string
  datePosted: string
  image: string
}

const design: Design = {
  name: "Footwear Romans Cad",
  designer: "Nguyễn Văn Tiên",
  description: "Mẫu giày lấy cảm hứng từ chiến binh La Mã với thiết kế dây đan mạnh mẽ và phong cách cổ điển hiện đại.",
  category: "Giày",
  status: "Chia sẻ",
  datePosted: "15/09/2024",
  image: "/designImage.png"
}

export default function WarningPage() {
  const [open, setOpen] = useState(true)

  return (
    <DesignWarningDialog 
      design={design}
      open={open}
      onOpenChange={setOpen}
    />
  )
}