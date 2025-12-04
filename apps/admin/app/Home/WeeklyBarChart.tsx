"use client";
import { useState, useEffect } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@workspace/ui/components/chart";
import { getWeeklyDesigns, type WeeklyData } from '@/api/home.api';

const chartConfig = {
  designs: {
    label: "2025",
    color: "#9e92fe",
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
        
        // Nếu có props data truyền vào, dùng luôn
        if (data && data.length > 0) {
          setChartData(data);
          setLoading(false);
          return;
        }
        
        // Call API từ service
        const apiData = await getWeeklyDesigns();
        setChartData(apiData);
        
      } catch (err) {
        console.error('Error fetching weekly data:', err);
        setError('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, [data]);

  if (loading) {
    return (
      <div className="flex flex-col w-full p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-lg text-gray-600">Đang tải biểu đồ...</div>
        </div>
      </div>
    );
  }

  const maxDesigns = Math.max(...chartData.map(d => d.designs));

  return (
    <div className="flex flex-col w-full p-6">
      <p className="text-2xl font-bold mb-6">
        Số lượng mẫu thiết kế mới mỗi tuần
      </p>

      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-yellow-800 font-medium text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        <ChartContainer
          config={chartConfig}
          className="w-full max-w-5xl min-h-[450px] rounded-lg"
        >
          <BarChart accessibilityLayer data={chartData} barCategoryGap={"20%"}>
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true}/>
            <XAxis
              dataKey="week"
              angle={-45}
              tickLine={false}
              axisLine={true}
              tickMargin={15}
              scale={"band"}
              tick={{ textAnchor: "middle", fontSize: 13 }}                                                                            
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'hsl(0, 0%, 40%)', fontSize: 13 }}
              tickCount={8}
              domain={[0, (maxDesigns + 5) - (maxDesigns + 5) % 5]}
              allowDecimals={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent/>} />
            <Bar
              dataKey="designs"
              fill="var(--color-designs)"
              barSize={45}
              radius={[8, 8, 0, 0]}
              background={{ fill: "#f2f4f9" }} 
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}