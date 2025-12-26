"use client";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import QuickStatsSection from "./StatCard";
import TopRankingsSection from "./RankingCard";
import ProductChart from "./ProductChart";
import RolePieChart from "./RolePieChart";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen">

        {/* MAIN */}
        <main className="flex-1 px-6 md:px-10 lg:px-20 ">
          {/* STATS */}
          <div className="mb-6">
            <QuickStatsSection />
          </div>

          {/* RANKING */}
          <div className="mb-6 rounded-lg border border-border bg-card p-4 shadow-sm">
            <TopRankingsSection />
          </div>

          {/* TITLE */}
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Visual Data Overview
          </h2>

          {/* CHARTS */}
          <div className="mb-6 rounded-lg border border-border bg-card p-4 shadow-sm">
            <ProductChart />
          </div>

          <div className="mb-6 rounded-lg border border-border bg-card p-4 shadow-sm">
            <RolePieChart />
          </div>
        </main>
    </div>
  );
}
