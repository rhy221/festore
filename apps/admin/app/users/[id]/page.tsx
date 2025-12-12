"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DesignDetailDialog, { type Design } from "../DesignDetail";
import { UsersAPI, type User } from "@/api/users.api";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

const SIDEBAR_WIDTH = 240;
const HEADER_HEIGHT = 80;

export interface UserDetail {
  id: number;
  name: string;
  username: string;
  type: "designer" | "customer";
  email?: string;
  phone?: string;
  createdAt?: string;
  lastLogin?: string;
  gender?: string;
  dateOfBirth?: string;
  description?: string;
  avatar?: string;
  status?: string;
  stats?: {
    designsPosted: number;
    revenue: string;
    reportedDesigns: number;
    mostAppealingDesign: string;
    followers: number;
  };
}


export default function AdminDashboard() {
  const params = useParams();
  const userId = params?.id as string;

  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const [designs, setDesigns] = useState<Design[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const response = await UsersAPI.getUserDetail(parseInt(userId));
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const filteredDesigns = designs.filter((design) => {
    const matchSearch = design.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = activeFilter === "Tất cả" || design.status === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex text-black">
      <div
        className="fixed top-0 right-0 z-20 bg-white shadow-md"
        style={{ height: HEADER_HEIGHT, left: SIDEBAR_WIDTH }}
      >
        <Header role="admin" name="ABC" />
      </div>

      <div className="flex-1 ml-0" style={{ marginLeft: SIDEBAR_WIDTH }}>
        <div
          className="fixed top-0 left-0 h-full bg-white shadow-lg"
          style={{ width: SIDEBAR_WIDTH }}
        >
          <Sidebar />
        </div>

        <main
          className="flex-1 bg-white p-6 overflow-y-auto text-lg"
          style={{ marginTop: HEADER_HEIGHT }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-64 text-xl">
              Đang tải thông tin người dùng...
            </div>
          ) : !user ? (
            <div className="flex items-center justify-center h-64 text-xl text-red-500">
              Không tìm thấy thông tin người dùng
            </div>
          ) : (
            <>
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
                  <InfoRow label="Giới tính" value={user?.gender || ""} />
                  <InfoRow label="Tên đăng nhập" value={user?.username || ""} />
                  <InfoRow label="Ngày sinh" value={user?.dateOfBirth || ""} />
                  <InfoRow label="Địa chỉ email" value={user?.email || ""} />
                  <InfoRow label="Ngày tạo tài khoản" value={user?.createdAt || ""} />
                  <InfoRow label="Số điện thoại" value={user?.phone || ""} />
                  <InfoRow label="Trạng thái" value={user?.status || ""} />
                  <div className="col-span-2">
                    <InfoRow label="Mô tả" value={user?.description || ""} />
                  </div>
                </div>
              </div>

              {user?.type === "designer" && (
                <>
                  <div className="flex gap-2 mb-4">
                    <input
                      placeholder="Nhập tên mẫu thiết kế để tìm kiếm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-[#BFE3F3] flex-1 rounded-full px-4 py-2 border text-lg"
                    />
                  </div>

                  <div className="flex gap-7 mb-4">
                    {["Tất cả", "Đang bán", "Đang đấu giá", "Đã bán", "Chia sẻ"].map(
                      (filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveFilter(filter)}
                          className={`px-4 py-2 rounded-full text-lg ${
                            activeFilter === filter
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                        >
                          {filter}
                        </button>
                      )
                    )}
                  </div>

                  {filteredDesigns.length > 0 ? (
                    <div className="grid grid-cols-3 gap-6">
                      {filteredDesigns.map((design, index) => (
                        <DesignCard
                          key={index}
                          image={design.image}
                          title={design.name}
                          status={design.status}
                          onClick={() => {
                            setSelectedDesign(design);
                            setShowDialog(true);
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-lg">
                      Không tìm thấy mẫu thiết kế nào
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>

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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="leading-snug">
      <span className="font-semibold">{label}: </span>
      {value}
    </p>
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
      <p className="font-semibold text-lg mt-1">{status}</p>
    </div>
  );
}
