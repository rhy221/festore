"use client"

import { useState } from "react"
import DesignDetailDialog, { type Design } from "@/components/DesignDetailDialog"

// Designer type and data
type Designer = {
  fullName: string
  gender: string
  username: string
  dateOfBirth: string
  email: string
  accountCreated: string
  phoneNumber: string
  status: string
  description: string
  avatar: string
  stats: {
    designsPosted: number
    revenue: string
    reportedDesigns: number
    mostAppealingDesign: string
    followers: number
  }
}

const designer: Designer = {
  fullName: "Nguyễn Văn Tiên",
  gender: "Nam", 
  username: "ntktien98@saovang",
  dateOfBirth: "22/12/1998",
  email: "ntktien.saovang@gmail.com",
  accountCreated: "11/08/2024",
  phoneNumber: "0123456789",
  status: "Đang hoạt động",
  description: "Nhà thiết kế thời trang số với phong cách tối giản hiện đại. Yêu thích sự kết hợp giữa công nghệ và nghệ thuật",
  avatar: "/DesignerAvatar.png",
  stats: {
    designsPosted: 13,
    revenue: "0,89 tỷ VND",
    reportedDesigns: 0,
    mostAppealingDesign: "Áo kỹ thuật số Aurora",
    followers: 125
  }
}

// Sample designs data
const designs: Design[] = [
  {
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
  },
  {
    name: "Túi xách Flower",
    designer: "Nguyễn Văn Tiên",
    description: "Túi xách với họa tiết hoa xinh đẹp, phù hợp cho các buổi dạo phố.",
    category: "Túi xách",
    status: "Đang đấu giá",
    datePosted: "20/09/2024",
    image: "/designImage2.png",
    salesInfo: {
      directPrice: "500,000 VND",
      auction: {
        startingPrice: "300,000 VND",
        priceStep: "50,000 VND",
        finalPrice: "450,000 VND",
        winner: "Nguyễn Thị B"
      }
    },
    engagement: {
      likes: 89,
      views: 156
    }
  }
]

export default function AdminDashboard() {
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  const handleDesignClick = (design: Design) => {
    setSelectedDesign(design)
    setShowDialog(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#F0F7FF] flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center">
            <img src="/Logo.png" alt="Logo" className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-extrabold text-black">HHCLOSET</h1>
        </div>
        <div className="text-2xl font-extrabold italic text-black">
          Xin chào admin: ABC
        </div>
      </header>

      {/* Content layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 text-white p-4 space-y-4">
          <nav className="flex flex-col px-2">
            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img src="/homeIcon.png" alt="Home" className="w-8 h-8 shrink-0" />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">Trang chủ</span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img src="/adminManagementIcon.png" alt="Admin Management" className="w-8 h-8 shrink-0" />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">Quản lý admin</span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img src="/userManagementIcon.png" alt="User Management" className="w-8 h-8 shrink-0" />
              <span className="text-2xl font-semibold leading-none">Quản lý người dùng</span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img src="/styleIcon.png" alt="Style" className="w-8 h-8 shrink-0" />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">Thể loại</span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img src="/reportIcon.png" alt="Report" className="w-8 h-8 shrink-0" />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">Báo cáo</span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
              <img src="/settingIcon.png" alt="Settings" className="w-8 h-8 shrink-0" />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">Hệ thống</span>
            </button>
            <hr className="-mx-2 my-2 h-px bg-white/50 border-0" />

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70] mt-2">
              <img src="/logoutIcon.png" alt="Logout" className="w-8 h-8 shrink-0" />
              <span className="text-2xl font-semibold whitespace-nowrap leading-none">Đăng xuất</span>
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-white p-6 overflow-y-auto text-lg">
          {/* Profile */}
          <div className="flex gap-6 items-center mb-6">
            <div className="flex flex-col items-center">
              <img
                src={designer.avatar}
                alt="Avatar"
                className="w-48 h-48 rounded-full border mb-3"
              />
              <h2 className="text-2xl font-bold text-black">NHÀ THIẾT KẾ</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-2">
              <InfoRow label="Họ và tên đầy đủ" value={designer.fullName} />
              <InfoRow label="Giới tính" value={designer.gender} />
              <InfoRow label="Tên đăng nhập" value={designer.username} />
              <InfoRow label="Ngày sinh" value={designer.dateOfBirth} />
              <InfoRow label="Địa chỉ email" value={designer.email} />
              <InfoRow label="Ngày tạo tài khoản" value={designer.accountCreated} />
              <InfoRow label="Số điện thoại" value={designer.phoneNumber} />
              <InfoRow label="Trạng thái" value={designer.status} />
              <div className="col-span-2">
                <InfoRow label="Mô tả" value={designer.description} />
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-white">
            <StatCard color="bg-teal-600" iconSrc="/numberOfDesignPostedIcon.png" label="Số mẫu đã đăng" value={designer.stats.designsPosted.toString()} />
            <StatCard color="bg-pink-600" iconSrc="/revenueIcon.png" label="Doanh thu" value={designer.stats.revenue} />
            <StatCard color="bg-red-600" iconSrc="/numberOfWarningIcon.png" label="Số mẫu bị báo cáo" value={designer.stats.reportedDesigns.toString()} />
            <StatCard color="bg-blue-600" iconSrc="/mostAppealDesignIcon.png" label="Mẫu thu hút nhất" value={designer.stats.mostAppealingDesign} />
            <StatCard color="bg-gray-700" iconSrc="/numberOfFollowerIcon.png" label="Số người theo dõi" value={designer.stats.followers.toString()} />
          </div>

          {/* Search + Filters */}
          <div className="mb-4">
            <div className="flex gap-2 mb-2">
              <input
                placeholder="Nhập nội dung tìm kiếm"
                className="bg-[#BFE3F3] flex-1 rounded-full px-4 py-2 border text-lg"
              />
              <button className="px-4 py-2 bg-green-500 rounded-full text-white font-semibold">
                Tìm kiếm
              </button>
            </div>
            <div className="flex gap-7">
              {["Tất cả", "Đang bán", "Đang đấu giá", "Đã bán", "Chia sẻ"].map(
                (filter) => (
                  <button
                    key={filter}
                    className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 text-lg"
                  >
                    {filter}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Design list */}
          <div className="grid grid-cols-3 gap-6">
            {designs.map((design, index) => (
              <DesignCard
                key={index}
                image={design.image}
                title={design.name}
                status={design.status.toUpperCase()}
                onClick={() => handleDesignClick(design)}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Use the reusable component */}
      <DesignDetailDialog 
        design={selectedDesign}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </div>
  )
}

/* --- Components --- */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="leading-snug">
      <span className="font-semibold">{label}: </span>
      {value}
    </p>
  )
}

function StatCard({
  color,
  iconSrc,
  label,
  value,
}: {
  color: string
  iconSrc: string
  label: string
  value: string
}) {
  return (
    <div
      className={`${color} rounded-full flex items-center gap-4 px-5 py-4 min-h-[92px] h-full min-w-0 shadow-md`}
    >
      <img src={iconSrc} alt={label} className="w-8 h-8 shrink-0" />
      <span className="flex-1 font-semibold leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </span>
      <span className="font-bold text-xl whitespace-nowrap">{value}</span>
    </div>
  )
}

function DesignCard({
  image,
  title,
  status,
  onClick,
}: {
  image: string
  title: string
  status: string
  onClick: () => void
}) {
  return (
    <div 
      className="rounded-lg border border-[#6a360e] p-4 shadow-sm hover:shadow-md bg-[#faf0e6] text-black flex flex-col items-center text-center h-72 justify-center cursor-pointer transition-shadow"
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="w-40 h-40 object-cover rounded-md mb-4 border border-white/20"
      />
      <p className="font-semibold text-lg">{title}</p>
      <p className="font-semibold text-lg mt-1">
        Trạng thái: <span className="font-bold">{status}</span>
      </p>
    </div>
  )
}