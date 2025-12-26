"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@workspace/ui/components/chart";
import { getProductStats, type ProductData } from "@/api/home.api";

const chartConfig = {
  products: {
    label: "Số lượng",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

interface ProductChartProps {
  data?: ProductData[];
}

export default function ProductChart({ data }: ProductChartProps) {
  const [chartData, setChartData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (data && data.length > 0) {
          setChartData(data);
        } else {
          const apiData = await getProductStats();
          setChartData(apiData);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load product chart data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [data]);

  if (loading) {
    return (
      <div className="flex h-[180px] md:h-[260px] items-center justify-center text-sm text-muted-foreground">
        Loading chart...
      </div>
    );
  }

  const maxQuantity = chartData.length
    ? Math.max(...chartData.map((d) => d.quantity))
    : 0;

  return (
    <div className="w-full rounded-xl border border-border bg-card px-4 md:px-6 pt-4 md:pt-6 pb-4 shadow-sm">
      {/* HEADER */}
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm md:text-base font-semibold text-foreground">
          Category Product Statistics
        </h2>
        <span className="text-xs text-muted-foreground">
          All Categories
        </span>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </div>
      )}

      {/* CHART */}
      <div className="h-[180px] sm:h-[220px] md:h-[280px] w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="30%">
              <CartesianGrid
                strokeDasharray="2 6"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="categoryName"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                tickCount={6}
                domain={[0, maxQuantity + 5]}
                allowDecimals={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="quantity"
                fill="var(--color-chart-1)"
                barSize={14}
                radius={[6, 6, 0, 0]}
                className="md:!barSize-[22]"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
