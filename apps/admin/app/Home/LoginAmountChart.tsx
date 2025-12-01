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
import { getDailyAccess, type DailyAccessData } from '@/api/admin.api';

const CustomDot = (props: any) => {
  const { cx, cy } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={3}
      fill="white"
      stroke="#8b5cf6"
      strokeWidth={1}
    />
  );
};

interface LineChartProps {
  chartData?: DailyAccessData[];
}

export default function LineChartComponent({ chartData }: LineChartProps) {
  const [data, setData] = useState<DailyAccessData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        setLoading(true);
        
        // Nếu có props chartData truyền vào, dùng luôn
        if (chartData && chartData.length > 0) {
          setData(chartData);
          setLoading(false);
          return;
        }
        
        // Call API từ service
        const apiData = await getDailyAccess();
        setData(apiData);
        
      } catch (err) {
        console.error('Error fetching daily access data:', err);
        setError('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchDailyData();
  }, [chartData]);

  if (loading) {
    return (
      <div className="flex flex-col w-full p-2">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Đang tải biểu đồ...</div>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
     <div className="flex flex-col w-full p-6">
      <p className="text-2xl font-bold mb-6">
        Số lượng truy cập hệ thống theo ngày
      </p>

      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-yellow-800 font-medium text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                <feOffset dx="0" dy="3" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.4" />
                </feComponentTransfer>
                <feFlood floodColor="#8979FF" floodOpacity="0.3" />
                <feComposite in2="offsetblur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
              horizontal={true}
            />

            <XAxis
              dataKey="date"
              axisLine={true}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 10 }}
              dy={10}
              interval={0}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 10 }}
              tickCount={7}
              domain={[0, (maxValue + 10) - ((maxValue + 10) % 10)]}
              dx={-10}
              allowDecimals={false}
            />

            <Line
              type="linear"
              dataKey="value"
              stroke="#8979FF"
              strokeWidth={2}
              dot={<CustomDot />}
              filter="url(#shadow)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}