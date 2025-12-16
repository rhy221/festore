"use client";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import QuickStatsSection from "./StatCard"; 
import TopRankingsSection from "./RankingCard"; 
import WeeklyAccessChart from "./WeeklyBarChart"; 
import LoginTrendChart from "./LoginAmountChart"; 

const SIDEBAR_WIDTH_PX = "240px"; 
const HEADER_HEIGHT_PX = "80px"; 

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="fixed top-0 left-0 right-0 z-20 bg-white shadow-md"
        style={{ height: HEADER_HEIGHT_PX }}
      >       
        <Header role="admin" name="ABC" />
      </div>

      <Sidebar />

      <main
        className="grow p-6"
        style={{ paddingTop: HEADER_HEIGHT_PX, marginLeft: SIDEBAR_WIDTH_PX }}
      >
        <div className="mb-6">
          <QuickStatsSection />
        </div>

        <div className="mb-6 rounded-lg border shadow-md p-4 bg-white">
          <TopRankingsSection />
        </div>

        <h2 className="text-[24px] font-bold pl-3 mb-4">
          Visual Data Overview
        </h2>

        <div className="mb-6 rounded-lg border shadow-md p-4 bg-white">
          <WeeklyAccessChart />
        </div>

        <div className="mb-6 rounded-lg border shadow-md p-4 bg-white">
          <LoginTrendChart />
        </div>
      </main>
    </div>
  );
}