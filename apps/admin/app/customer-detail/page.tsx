"use client"

// Customer type and data
type Customer = {
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
    totalPurchases: number
    auctionParticipations: number
    auctionWins: number
    likedDesigns: number
    reviewsComments: number
    warnings: number
    followers: number
  }
}

const customer: Customer = {
  fullName: "Trịnh Văn Dương",
  gender: "Nam",
  username: "duongabc123",
  dateOfBirth: "01/01/2004",
  email: "duongthichsuutam@gmail.com",
  accountCreated: "09/09/2024",
  phoneNumber: "0987654321",
  status: "Đang hoạt động",
  description: "Tìm kiếm các mẫu thiết kế độc lạ.",
  avatar: "/customerAvatar.png",
  stats: {
    totalPurchases: 5,
    auctionParticipations: 2,
    auctionWins: 1,
    likedDesigns: 12,
    reviewsComments: 25,
    warnings: 0,
    followers: 12,
  }
}

export default function CustomerDashboard() {
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

            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-[#002a70]">
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
                src={customer.avatar}
                alt="Avatar"
                className="w-48 h-48 rounded-full border mb-3"
              />
              <h2 className="text-2xl font-bold text-black">KHÁCH HÀNG</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-2">
              <InfoRow label="Họ và tên đầy đủ" value={customer.fullName} />
              <InfoRow label="Giới tính" value={customer.gender} />
              <InfoRow label="Tên đăng nhập" value={customer.username} />
              <InfoRow label="Ngày sinh" value={customer.dateOfBirth} />
              <InfoRow label="Địa chỉ email" value={customer.email} />
              <InfoRow label="Ngày tạo tài khoản" value={customer.accountCreated} />
              <InfoRow label="Số điện thoại" value={customer.phoneNumber} />
              <InfoRow label="Trạng thái" value={customer.status} />
              <div className="col-span-2">
                <InfoRow label="Mô tả" value={customer.description} />
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <h2 className="font-bold text-xl mb-4">Thống kê hoạt động</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <StatCard color="bg-yellow-600" iconSrc="/numberOfDesignBoughtIcon.png" label="Tổng số mẫu đã mua" value={customer.stats.totalPurchases.toString()} />
            <StatCard color="bg-blue-800" iconSrc="/numberOfAuctionJoinedIcon.png" label="Tổng số lần tham gia đấu giá" value={customer.stats.auctionParticipations.toString()} />
            <StatCard color="bg-teal-600" iconSrc="/numberOfAuctionWonIcon.png" label="Số mẫu đã thắng đấu giá" value={customer.stats.auctionWins.toString()} />
            <StatCard color="bg-green-800" iconSrc="/numberOfDeisgnLikedIcon.png" label="Số mẫu đã thích" value={customer.stats.likedDesigns.toString()} />
            <StatCard color="bg-purple-700" iconSrc="/numberOfCommentIcon.png" label="Số lượt đánh giá, bình luận" value={customer.stats.reviewsComments.toString()} />
            <StatCard color="bg-red-600" iconSrc="/numberOfWarningIcon.png" label="Số lần bị cảnh báo" value={customer.stats.warnings.toString()} />
            <StatCard color="bg-gray-700" iconSrc="/numberOfFollowerIcon.png" label="Số người đang theo dõi" value={customer.stats.followers.toString()} />
          </div>
        </main>
      </div>
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
      className={`${color} rounded-full flex items-center gap-4 px-5 py-4 min-h-[92px] h-full min-w-0 shadow-md text-white`}
    >
      <img src={iconSrc} alt={label} className="w-8 h-8 shrink-0" />
      <span className="flex-1 font-semibold leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </span>
      <span className="font-bold text-xl whitespace-nowrap">{value}</span>
    </div>
  )
}