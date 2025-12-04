"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DesignDetailDialog, {
  type Design,
} from "@/components/DesignDetailDialog";
import { UsersAPI, type User } from "@/api/users.api";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 80;

// Designer type and data
type Designer = {
  fullName: string;
  gender: string;
  username: string;
  dateOfBirth: string;
  email: string;
  accountCreated: string;
  phoneNumber: string;
  status: string;
  description: string;
  avatar: string;
  stats: {
    designsPosted: number;
    revenue: string;
    reportedDesigns: number;
    mostAppealingDesign: string;
    followers: number;
  };
};

// Extended user type for detail page
type UserDetail = User & {
  email?: string;
  phone?: string;
  createdAt?: string;
  lastLogin?: string;
  gender?: string;
  dateOfBirth?: string;
  description?: string;
  avatar?: string;
  stats?: {
    designsPosted: number;
    revenue: string;
    reportedDesigns: number;
    mostAppealingDesign: string;
    followers: number;
  };
};

// Sample designs data
const designs: Design[] = [
  {
    name: "Footwear Romans Cad",
    designer: "Nguyễn Văn Tiên",
    description:
      "Mẫu giày lấy cảm hứng từ chiến binh La Mã với thiết kế dây đan mạnh mẽ và phong cách cổ điển hiện đại.",
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
        winner: "X",
      },
    },
    engagement: {
      likes: 135,
      views: 125,
    },
  },
  {
    name: "Túi xách Flower",
    designer: "Nguyễn Văn Tiên",
    description:
      "Túi xách với họa tiết hoa xinh đẹp, phù hợp cho các buổi dạo phố.",
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
        winner: "Nguyễn Thị B",
      },
    },
    engagement: {
      likes: 89,
      views: 156,
    },
  },
  {
    name: "Túi xách Flower",
    designer: "Nguyễn Văn Tiên",
    description:
      "Túi xách với họa tiết hoa xinh đẹp, phù hợp cho các buổi dạo phố.",
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
        winner: "Nguyễn Thị B",
      },
    },
    engagement: {
      likes: 89,
      views: 156,
    },
  },
  {
    name: "Túi xách Flower",
    designer: "Nguyễn Văn Tiên",
    description:
      "Túi xách với họa tiết hoa xinh đẹp, phù hợp cho các buổi dạo phố.",
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
        winner: "Nguyễn Thị B",
      },
    },
    engagement: {
      likes: 89,
      views: 156,
    },
  },
];

export default function AdminDashboard() {
  const params = useParams();
  const userId = params?.id as string;

  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const response = await UsersAPI.getUserDetail(parseInt(userId));

        // Extend user data with mock additional info for demonstration
        const extendedUser: UserDetail = {
          ...response.data,
          gender: "Nam",
          dateOfBirth: "22/12/1998",
          description:
            response.data.type === "designer"
              ? "Nhà thiết kế thời trang số với phong cách tối giản hiện đại. Yêu thích sự kết hợp giữa công nghệ và nghệ thuật"
              : "Khách hàng thân thiết của cửa hàng, thường xuyên mua sắm các sản phẩm thời trang.",
          avatar:
            response.data.type === "designer"
              ? "https://via.placeholder.com/200x200/4F46E5/FFFFFF?text=Designer"
              : "https://via.placeholder.com/200x200/10B981/FFFFFF?text=Customer",
          stats:
            response.data.type === "designer"
              ? {
                  designsPosted: 13,
                  revenue: "0,89 tỷ VND",
                  reportedDesigns: 0,
                  mostAppealingDesign: "Áo kỹ thuật số Aurora",
                  followers: 125,
                }
              : undefined,
        };

        setUser(extendedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleDesignClick = (design: Design) => {
    setSelectedDesign(design);
    setShowDialog(true);
  };

  // Filter designs based on search term and active filter
  const filteredDesigns = designs.filter((design) => {
    const matchesSearch = design.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "Tất cả" || design.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSearchDesign = () => {
    // Search is handled automatically through filteredDesigns
    // This function can be used for additional search actions if needed
    console.log(`Searching for: ${searchTerm} with filter: ${activeFilter}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex text-black">
      {/* Header */}
      <div
        className="fixed top-0 right-0 z-20 bg-white shadow-md"
        style={{ height: HEADER_HEIGHT, left: SIDEBAR_WIDTH }}
      >
        <Header role="admin" name="ABC" />
      </div>

      {/* Content layout */}
      <div className="flex-1 ml-0" style={{ marginLeft: SIDEBAR_WIDTH }}>
        {/* Sidebar */}
        <div
          className="fixed top-0 left-0 h-full bg-white shadow-lg"
          style={{ width: SIDEBAR_WIDTH }}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <main
          className="flex-1 bg-white p-6 overflow-y-auto text-lg"
          style={{ marginTop: HEADER_HEIGHT }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-xl">Đang tải thông tin người dùng...</div>
            </div>
          ) : !user ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-xl text-red-500">
                Không tìm thấy thông tin người dùng
              </div>
            </div>
          ) : (
            <>
              {/* Profile */}
              <div className="flex gap-6 items-center mb-6">
                <div className="flex flex-col items-center">
                  <img
                    src={
                      user?.avatar ||
                      "https://via.placeholder.com/200x200/6B7280/FFFFFF?text=User"
                    }
                    alt="Avatar"
                    className="w-48 h-48 rounded-full border mb-3"
                  />
                  <h2 className="text-2xl font-bold text-black">
                    {user?.type === "designer" ? "NHÀ THIẾT KẾ" : "KHÁCH HÀNG"}
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                  <InfoRow label="Họ và tên đầy đủ" value={user?.name || ""} />
                  <InfoRow
                    label="Giới tính"
                    value={user?.gender || "Không có thông tin"}
                  />
                  <InfoRow label="Tên đăng nhập" value={user?.name || ""} />
                  <InfoRow
                    label="Ngày sinh"
                    value={user?.dateOfBirth || "Không có thông tin"}
                  />
                  <InfoRow
                    label="Địa chỉ email"
                    value={user?.email || "Không có thông tin"}
                  />
                  <InfoRow
                    label="Ngày tạo tài khoản"
                    value={user?.createdAt || "Không có thông tin"}
                  />
                  <InfoRow
                    label="Số điện thoại"
                    value={user?.phone || "Không có thông tin"}
                  />
                  <InfoRow
                    label="Trạng thái"
                    value={
                      user?.status === "active" ? "Đang hoạt động" : "Bị khóa"
                    }
                  />
                  <div className="col-span-2">
                    <InfoRow
                      label="Mô tả"
                      value={user?.description || "Không có mô tả"}
                    />
                  </div>
                </div>
              </div>

              {/* Search + Filters - Only show for designers */}
              {user?.type === "designer" && (
                <div className="mb-4">
                  <div className="flex gap-2 mb-2">
                    <input
                      placeholder="Nhập tên mẫu thiết kế để tìm kiếm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSearchDesign()
                      }
                      className="bg-[#BFE3F3] flex-1 rounded-full px-4 py-2 border text-lg"
                    />
                    <button
                      onClick={() => handleSearchDesign()}
                      className="px-4 py-2 bg-green-500 rounded-full text-white font-semibold"
                    >
                      Tìm kiếm
                    </button>
                  </div>
                  <div className="flex gap-7">
                    {[
                      "Tất cả",
                      "Đang bán",
                      "Đang đấu giá",
                      "Đã bán",
                      "Chia sẻ",
                    ].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-4 py-2 rounded-full text-lg transition-colors ${
                          activeFilter === filter
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Design list - Only show for designers */}
              {user?.type === "designer" && (
                <>
                  {filteredDesigns.length > 0 ? (
                    <div className="grid grid-cols-3 gap-6">
                      {filteredDesigns.map((design, index) => (
                        <DesignCard
                          key={index}
                          image={design.image}
                          title={design.name}
                          status={design.status.toUpperCase()}
                          onClick={() => handleDesignClick(design)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-lg">Không tìm thấy mẫu thiết kế nào</p>
                      {searchTerm && (
                        <p className="text-sm mt-2">
                          Không có kết quả cho "{searchTerm}" với bộ lọc "
                          {activeFilter}"
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>

      {/* Use the reusable component - only show for designers */}
      {user?.type === "designer" && (
        <DesignDetailDialog
          design={selectedDesign}
          open={showDialog}
          onOpenChange={setShowDialog}
        />
      )}
    </div>
  );
}

/* --- Components --- */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="leading-snug">
      <span className="font-semibold">{label}: </span>
      {value}
    </p>
  );
}

function StatCard({
  color,
  iconSrc,
  label,
  value,
}: {
  color: string;
  iconSrc: string;
  label: string;
  value: string;
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
  );
}

function DesignCard({
  image,
  title,
  status,
  onClick,
}: {
  image: string;
  title: string;
  status: string;
  onClick: () => void;
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
  );
}