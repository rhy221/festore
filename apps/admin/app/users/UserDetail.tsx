"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DesignDetailDialog, { type Design } from "./DesignDetail";
import { UsersAPI } from "@/api/users.api";

type Designer = {
  id: number;
  fullName: string;
  gender: string;
  username: string;
  dateOfBirth: string;
  email: string;
  createdAt: string;
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

export default function AdminDashboard() {
  const params = useParams();
  const userId = Number(params.id);

  const [designer, setDesigner] = useState<Designer | null>(null);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const res = await UsersAPI.getUserDetail(userId);

        setDesigner(res.user);
        setDesigns(res.designs ?? []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleDesignClick = (design: Design) => {
    setSelectedDesign(design);
    setShowDialog(true);
  };

  if (loading) return null;
  if (!designer) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-[#F0F7FF] flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center">
            <img src="/Logo.png" alt="Logo" className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-extrabold text-black">HHCLOSET</h1>
        </div>
        <div className="text-2xl font-extrabold italic text-black">
          Xin chào admin
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-blue-900 text-white p-4" />

        <main className="flex-1 bg-white p-6 overflow-y-auto text-lg">
          <div className="flex gap-6 items-center mb-6">
            <div className="flex flex-col items-center">
              <img
                src={designer.avatar}
                className="w-48 h-48 rounded-full border mb-3"
              />
              <h2 className="text-2xl font-bold text-black">NHÀ THIẾT KẾ</h2>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-2">
              <InfoRow label="Họ và tên đầy đủ" value={designer.fullName} />
              <InfoRow label="Giới tính" value={designer.gender} />
              <InfoRow label="Tên đăng nhập" value={designer.username} />
              <InfoRow label="Ngày sinh" value={designer.dateOfBirth} />
              <InfoRow label="Email" value={designer.email} />
              <InfoRow label="Ngày tạo" value={designer.createdAt} />
              <InfoRow label="SĐT" value={designer.phoneNumber} />
              <InfoRow label="Trạng thái" value={designer.status} />
              <div className="col-span-2">
                <InfoRow label="Mô tả" value={designer.description} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-white">
            <StatCard label="Số mẫu đã đăng" value={designer.stats.designsPosted.toString()} />
            <StatCard label="Doanh thu" value={designer.stats.revenue} />
            <StatCard label="Mẫu bị báo cáo" value={designer.stats.reportedDesigns.toString()} />
            <StatCard label="Mẫu nổi bật" value={designer.stats.mostAppealingDesign} />
            <StatCard label="Người theo dõi" value={designer.stats.followers.toString()} />
          </div>

          <div className="grid grid-cols-3 gap-6">
            {designs.map((design) => (
              <DesignCard
                key={design.id}
                image={design.image}
                title={design.name}
                status={design.status}
                onClick={() => handleDesignClick(design)}
              />
            ))}
          </div>
        </main>
      </div>

      <DesignDetailDialog
        design={selectedDesign}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-semibold">{label}: </span>
      {value}
    </p>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-blue-600 rounded-full px-5 py-4 font-semibold flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
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
      onClick={onClick}
      className="border p-4 rounded-lg cursor-pointer hover:shadow-md"
    >
      <img src={image} className="w-full h-40 object-cover mb-2 rounded" />
      <p className="font-semibold">{title}</p>
      <p>Trạng thái: {status}</p>
    </div>
  );
}
