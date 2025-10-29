"use client";

import { useState } from "react";
import MonthlyReport from "./monthly-report";
import CategoryAnalysis from "./category-analysis";
import SalesHistory from "./sales-history";


export default function NTK_BDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("07/2025");

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
            <MonthlyReport />

          {/* Category analysis */}
            <CategoryAnalysis />
          
        </main>

        {/* Right panel */}
        <SalesHistory />
        
      </div>
    </div>
  );
}
