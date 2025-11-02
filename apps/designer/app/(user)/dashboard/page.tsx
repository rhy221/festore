"use client";

import MonthlyReport from "./monthly-report";
import CategoryAnalysis from "./category-analysis";
import SalesHistory from "./sales-history";

export default function NTK_BDashboard() {
  return (
    <div className="min-h-screen bg-white text-sm w-full">
      <div className="max-w-[1300px] mx-auto px-8 py-8 grid grid-cols-2 gap-6">
        {/* Main */}
        <main className="space-y-6 overflow-hidden">
          <MonthlyReport />
          <CategoryAnalysis />
        </main>

        {/* Right panel */}
        <SalesHistory />
      </div>
    </div>
  );
}
