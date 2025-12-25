"use client";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import QuickStatsSection from "./StatCard";
import TopRankingsSection from "./RankingCard";
import ProductChart from "./ProductChart";
import RolePieChart from "./RolePieChart";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-20 h-16 md:h-20 bg-card border-b border-border">
        <Header role="admin" name="ABC" />
      </header>

      {/* LAYOUT */}
      <div className="flex pt-16 md:pt-20">
        {/* SIDEBAR */}
        <aside className="hidden md:block fixed left-0 top-16 md:top-20 h-[calc(100vh-5rem)] w-60">
          <Sidebar />
        </aside>

        {/* MAIN */}
        <main className="flex-1 px-4 md:px-6 lg:px-8 md:ml-60">
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
    </div>
  );
}
