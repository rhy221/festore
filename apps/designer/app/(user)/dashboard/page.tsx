"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#001f87", "#0029a6", "#0033cc", "#0040ff", "#1a4cff", "#3355ff"];

export default function NTK_BDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("07/2025");

  const barData = [
    { week: "Tuần 0", direct: 10, auction: 5 },
    { week: "Tuần 1", direct: 25, auction: 20 },
    { week: "Tuần 2", direct: 30, auction: 22 },
    { week: "Tuần 3", direct: 50, auction: 28 },
    { week: "Tuần 4", direct: 60, auction: 40 },
    { week: "Tuần 5", direct: 15, auction: 10 },
  ];

  const categoryData = [
    { name: "Giày", value: 70 },
    { name: "Dạ hội", value: 64 },
    { name: "Đường phố", value: 50 },
    { name: "Phụ kiện", value: 29 },
    { name: "Unisex", value: 33 },
    { name: "Trẻ em", value: 12 },
  ];

  const salesHistory = [
    {
      img: "/shoe2.png",
      name: "Giày thể thao",
      buyer: "Nguyễn Văn A",
      type: "Bán trực tiếp",
      price: "2.500.000 ₫",
      date: "15/01/2024",
      status: "Hoàn thành",
    },
    {
      img: "/shoe2.png",
      name: "Giày thể thao",
      buyer: "Nguyễn Văn B",
      type: "Đấu giá",
      price: "1.800.000 ₫",
      date: "13/01/2024",
      status: "Đang xử lý",
    },
    {
      img: "/shoe2.png",
      name: "Giày thể thao",
      buyer: "Nguyễn Văn C",
      type: "Bán trực tiếp",
      price: "2.500.000 ₫",
      date: "11/01/2024",
      status: "Đã hủy",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-sm w-full">


      {/* Layout */}
      <div className="max-w-[1300px] mx-auto px-8 py-8 grid grid-cols-2 gap-6">
        {/* Sidebar
        <aside className="border rounded-lg p-4 h-fit bg-white">
          <h3 className="font-semibold mb-4 text-base">Dashboard</h3>
          <ul className="space-y-2">
            <li className="px-3 py-2 rounded-md bg-[#001f87] text-white">Tổng quan</li>
            <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Sản phẩm</li>
            <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Báo cáo</li>
          </ul>
        </aside> */}

        {/* Main */}
        <main className="space-y-6 overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h2 className="text-xl font-semibold">Tháng báo cáo</h2>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border rounded-full px-4 py-2"
            >
              <option>07/2025</option>
              <option>06/2025</option>
            </select>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-semibold">Tổng Doanh Thu</h4>
                <div className="text-2xl font-extrabold mt-2 break-words">
                  344.000.000 ₫
                </div>
              </div>
              <div className="text-green-600 mt-2 text-xs font-medium">
                +12.5% so với tháng trước
              </div>
            </div>
            <div className="border rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold">Bán Trực Tiếp</h4>
              <div className="text-2xl font-extrabold mt-2">162</div>
              <div className="text-gray-600 text-xs mt-1">Số lượng bán trực tiếp</div>
            </div>
            <div className="border rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold">Đấu Giá</h4>
              <div className="text-2xl font-extrabold mt-2">83</div>
              <div className="text-gray-600 text-xs mt-1">Số lượng bán đấu giá</div>
            </div>
          </div>

          {/* Bar chart */}
          <section>
            <h3 className="text-base font-semibold mb-3">Thống Kê Doanh Thu</h3>
            <div className="w-full h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
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

          {/* Category analysis */}
          <section>
            <h3 className="text-base font-semibold mb-3">Phân Tích Theo Thể Loại</h3>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left side: category list */}
              <div className="flex-1 min-w-[250px]">
                {[
                  { name: "Giày", amount: "112,5tr ₫", count: "70 mẫu" },
                  { name: "Dạ hội", amount: "96tr ₫", count: "64 mẫu" },
                  { name: "Đường phố", amount: "50,4tr ₫", count: "50 mẫu" },
                  { name: "Phụ kiện", amount: "57,5tr ₫", count: "29 mẫu" },
                  { name: "Unisex", amount: "66tr ₫", count: "33 mẫu" },
                  { name: "Trẻ em", amount: "30tr ₫", count: "12 mẫu" },
                ].map((it, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-100 rounded-lg p-3 mb-2 shadow-sm"
                  >
                    <div className="font-semibold text-gray-800 truncate">{it.name}</div>
                    <div className="text-right whitespace-nowrap">
                      <div className="font-bold text-sm">{it.amount}</div>
                      <div className="text-xs text-gray-600">{it.count}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right side: smaller pie chart, labels removed */}
              <div className="flex-1 min-w-[220px] flex justify-center items-center">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      outerRadius={80}
                      // label removed intentionally to avoid overlap and visual bugs
                      // labelLine is also omitted
                      nameKey="name"
                    >
                      {categoryData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </main>

        {/* Right panel */}
        <aside className="border rounded-lg p-4 bg-gray-50 overflow-hidden">
          <h3 className="font-semibold mb-3 text-base">Lịch Sử Bán Hàng</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  {["Mẫu thiết kế", "Người mua", "Loại bán", "Giá bán", "Ngày bán", "Trạng thái"].map((h) => (
                    <th key={h} className="p-2 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {salesHistory.map((s, i) => (
                  <tr key={i} className="border-b hover:bg-gray-100">
                    <td className="p-2 flex items-center gap-2">
                      <img src={s.img} alt={s.name} className="w-8 h-8 object-cover rounded" />
                      <span className="truncate">{s.name}</span>
                    </td>
                    <td className="p-2 truncate">{s.buyer}</td>
                    <td className="p-2 truncate">{s.type}</td>
                    <td className="p-2 truncate">{s.price}</td>
                    <td className="p-2 truncate">{s.date}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          s.status === "Hoàn thành"
                            ? "bg-green-100 text-green-800"
                            : s.status === "Đang xử lý"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 text-center text-xs text-gray-500">
              — Không có dữ liệu thêm —
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
