"use client";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getDailyAccess, type DailyAccessData } from "@/api/home.api";

const CustomDot = ({ cx, cy }: any) => (
  <circle
    cx={cx}
    cy={cy}
    r={2.5}
    fill="#fff"
    stroke="#111827"
    strokeWidth={1.5}
  />
);

export default function DailyAccessLineChart() {
  const [accessData, setAccessData] = useState<DailyAccessData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {    
    const fetchAccessData = async () => {
      try {
        setIsLoading(true);
        const dailyAccessData = await getDailyAccess(); 
        setAccessData(dailyAccessData);
      } catch (err) {
        console.error("Error fetching daily access data:", err);
        setFetchError("An error occurred while loading data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[220px] text-sm text-gray-400">
        Loading chart...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
        <div className="mb-3 rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-2 text-xs text-yellow-800">
          {fetchError} 
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...accessData.map((d) => d.value), 0);

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-gray-900">
          Daily Access Visits 
        </h2>
        <span className="text-xs text-gray-400">Daily Access</span>
      </div>

      <div className="w-full h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={accessData} // Uses accessData
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fashionLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#111827" />
                <stop offset="100%" stopColor="#6b7280" />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="2 6" stroke="#eee" vertical={false} />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              tickCount={6}
              domain={[0, maxValue + 10]}
              dx={-10}
              allowDecimals={false}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#fashionLine)"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}