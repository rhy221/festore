"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { getRoleStats, RoleStatsData } from "@/api/home.api";

const COLORS = ["#f472b6", "#60a5fa"];

interface RoleStats {
  name: string;
  value: number;
}

export default function RolePieChart() {
  const [data, setData] = useState<RoleStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoleStats = async () => {
      try {
        setLoading(true);
        const stats: RoleStatsData = await getRoleStats();
        setData([
          { name: "Designers", value: stats.designerCount },
          { name: "Customers", value: stats.customerCount },
        ]);
      } catch (err) {
        console.error(err);
        setError("Failed to load role statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchRoleStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[220px] text-sm text-gray-400">
        Loading chart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm text-xs text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-gray-900">
          User Role Distribution
        </h2>
        <span className="text-xs text-gray-400">Designers vs Customers</span>
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={35}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
