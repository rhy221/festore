"use client";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@/components/ui/chart";

// Sample data
const chartData = [
  { week: "Tuần 1", designs: 5 },
  { week: "Tuần 2", designs: 16 },
  { week: "Tuần 3", designs: 9 },
  { week: "Tuần 4", designs: 6 },
  { week: "Tuần 5", designs: 3 },
  { week: "Tuần 6", designs: 22 },
  { week: "Tuần 7", designs: 23 },
  { week: "Tuần 8", designs: 17 },
  { week: "Tuần 9", designs: 18 },
  { week: "Tuần 10", designs: 11 },
  { week: "Tuần 11", designs: 9 },
  { week: "Tuần 12", designs: 10 },
];

// Chart config
const chartConfig = {
  designs: {
    label: "2025",
    color: "#9e92fe",
  },
} satisfies ChartConfig;

interface WeeklyChartProps {
  data?: typeof chartData;
}

export default function WeeklyChart({ data = chartData }: WeeklyChartProps) {
  const maxDesigns = Math.max(...data.map(d => d.designs));
  return (
    <div className="flex flex-col w-full pl-7 pt-5 mb-10">
      {/* Header text */}
      <h2 className="text-[32px] font-extrabold pl-3 mb-4">
        Biểu đồ trực quan
        </h2>
      <p className="text-2xl font-normal mb-20 pl-16">
        Số lượng mẫu thiết kế mới mỗi tuần
      </p>

      {/* Chart area */}
      <div className="flex pl-48 w-full">
        <ChartContainer
          config={chartConfig}
          className="w-[620px] min-h-[337px] rounded-lg"
        >
          <BarChart accessibilityLayer data={data} barCategoryGap={"30%"}>
            <CartesianGrid strokeDasharray="3 3"vertical={true}
              horizontal={true}/>
            <XAxis
              dataKey="week"
              angle={-45}
              tickLine={false}
              axisLine={true}
              tickMargin={10}
              scale={"band"}
              tick={{ textAnchor: "middle" }}                                                                            
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'hsl(0, 0%, 40%)', fontSize: 11 }}
              tickCount={8}
              domain={[0, (maxDesigns + 5) - (maxDesigns + 5) % 5]}
              allowDecimals={false}
              
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="designs"
              fill="var(--color-designs)"
              barSize={30}
              background={{ fill: "#f2f4f9" }} 
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}