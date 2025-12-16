"use client";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import QuickStats from "./StatCard";
import TopThreeRankings from "./RankingCard";
import WeeklyChart from "./WeeklyBarChart";
import LineChartComponent from "./LoginAmountChart";

const SIDEBAR_WIDTH = "240px";
const HEADER_HEIGHT = "80px";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="fixed top-0 left-0 right-0 z-20 bg-white shadow-md"
        style={{ height: HEADER_HEIGHT }}
      >
        <Header role="admin" name="ABC" />
      </div>

      <Sidebar />

      <main
        className="grow p-6"
        style={{ paddingTop: HEADER_HEIGHT, marginLeft: SIDEBAR_WIDTH }}
      >
        <div className="mb-6">
          <QuickStats />
        </div>

        <div className="mb-6 rounded-lg border shadow-md p-4 bg-white">
          <TopThreeRankings />
        </div>

        <h2 className="text-[24px] font-bold pl-3 mb-4">Biểu đồ trực quan</h2>

        <div className="mb-6 rounded-lg border shadow-md p-4 bg-white">
          <WeeklyChart />
        </div>

        <div className="mb-6 rounded-lg border shadow-md p-4 bg-white">
          <LineChartComponent />
        </div>
      </main>
    </div>
  );
}
