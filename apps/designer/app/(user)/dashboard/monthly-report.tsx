"use client"

import { useState } from 'react'
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

export default function MonthlyReport() {

    const [selectedMonth, setSelectedMonth] = useState("07/2025");
      
    const barData = [
      { week: "Tuần 0", direct: 10, auction: 5 },
      { week: "Tuần 1", direct: 25, auction: 20 },
      { week: "Tuần 2", direct: 30, auction: 22 },
      { week: "Tuần 3", direct: 50, auction: 28 },
      { week: "Tuần 4", direct: 60, auction: 40 },
      { week: "Tuần 5", direct: 15, auction: 10 },
    ];
    
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
        </>
  )
}

