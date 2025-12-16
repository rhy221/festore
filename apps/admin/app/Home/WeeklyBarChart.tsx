"use client";
import { useState, useEffect } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@workspace/ui/components/chart";
import { getWeeklyDesigns, type WeeklyData } from "@/api/home.api";

const chartConfig = {
  designs: {
    label: "2025",
    color: "#111827",
  },
} satisfies ChartConfig;

interface WeeklyChartProps {
  data?: WeeklyData[];
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const [chartData, setChartData] = useState<WeeklyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        setLoading(true);

        if (data && data.length > 0) {
          setChartData(data);
          setLoading(false);
          return;
        }
        
        const apiData = await getWeeklyDesigns();
        setChartData(apiData);
      } catch (err) {
        console.error("Error fetching weekly data:", err);
        setError("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[220px] text-sm text-gray-400">
        Đang tải biểu đồ...
      </div>
    );
  }

  const maxDesigns = chartData.length
    ? Math.max(...chartData.map((d) => d.designs))
    : 0;

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-gray-900">
          Thiết kế mới theo tuần
        </h2>
        <span className="text-xs text-gray-400">Weekly Designs</span>
      </div>

      {error && (
        <div className="mb-3 rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-2 text-xs text-yellow-800">
          {error}
        </div>
      )}

      <div className="w-full h-[220px]">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart data={chartData} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="2 6" stroke="#eee" vertical={false} />

            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: "#9ca3af", fontSize: 10 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              tickCount={6}
              domain={[0, maxDesigns + 5]}
              allowDecimals={false}
            />

            <ChartTooltip content={<ChartTooltipContent />} />

            <ChartLegend content={<ChartLegendContent />} /> 

            <Bar
              dataKey="designs"
              fill="var(--color-designs)"
              barSize={22}
              radius={[6, 6, 0, 0]}
              background={{ fill: "#f3f4f6" }}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}