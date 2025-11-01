"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp, DollarSign, ShoppingCart, Gavel } from "lucide-react";
import { useDashboardQueries } from "../../../queries/useDashboard";
import { MonthlyReportSkeleton } from "./skeletons";

export default function MonthlyReport() {
  const [selectedMonth, setSelectedMonth] = useState("07/2025");
  const { data, isLoading, error } = useDashboardQueries.useMonthlyReport(selectedMonth);

  if (isLoading) return <MonthlyReportSkeleton />;
  if (error) return <div className="text-red-500">Lỗi tải dữ liệu</div>;
  if (!data) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-xl font-semibold">Tháng báo cáo</h2>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded-full px-4 py-2"
        >
          <option>07/2025</option>
          <option>06/2025</option>
          <option>05/2025</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-[#001f87]" />
              <h4 className="font-semibold">Tổng Doanh Thu</h4>
            </div>
            <div className="text-2xl font-extrabold mt-2 break-words">
              {formatCurrency(data.totalRevenue)}
            </div>
          </div>
          <div className="flex items-center gap-1 text-green-600 mt-2 text-xs font-medium">
            <TrendingUp className="w-4 h-4" />
            +{data.growthRate}% so với tháng trước
          </div>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="w-5 h-5 text-[#001f87]" />
            <h4 className="font-semibold">Bán Trực Tiếp</h4>
          </div>
          <div className="text-2xl font-extrabold mt-2">{data.directSales}</div>
          <div className="text-gray-600 text-xs mt-1">Số lượng bán trực tiếp</div>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Gavel className="w-5 h-5 text-[#001f87]" />
            <h4 className="font-semibold">Đấu Giá</h4>
          </div>
          <div className="text-2xl font-extrabold mt-2">{data.auctionSales}</div>
          <div className="text-gray-600 text-xs mt-1">Số lượng bán đấu giá</div>
        </div>
      </div>

      {/* Bar chart */}
      <section>
        <h3 className="text-base font-semibold mb-3">Thống Kê Doanh Thu</h3>
        <div className="w-full h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="direct" name="Bán trực tiếp" fill="#001f87" />
              <Bar dataKey="auction" name="Đấu giá" fill="#3344cc" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
}

