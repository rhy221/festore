"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getRoleStats, type RoleStatsData } from "@/api/home.api";

const COLORS = [
  "var(--color-chart-4)",
  "var(--color-chart-2)",
];

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
      <div className="flex h-[180px] md:h-[260px] items-center justify-center text-sm text-muted-foreground">
        Loading chart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-border bg-card px-4 md:px-6 pt-4 md:pt-6 pb-4 shadow-sm">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm md:text-base font-semibold text-foreground">
          User Role Distribution
        </h2>
        <span className="text-xs text-muted-foreground">
          Designers vs Customers
        </span>
      </div>

      <div className="h-[180px] sm:h-[220px] md:h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              innerRadius="45%"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((_, index) => (
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
