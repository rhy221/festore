"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";



const data = [
  { date: "1/9", value: 30 },
  { date: "2/9", value: 40 },
  { date: "3/9", value: 68 },
  { date: "4/9", value: 85 },
  { date: "5/9", value: 55 },
  { date: "6/9", value: 33 },
  { date: "7/9", value: 91 },
  { date: "8/9", value: 83 },
  { date: "9/9", value: 34 },
  { date: "10/9", value: 37 },
  { date: "11/9", value: 78 },
  { date: "12/9", value: 24 },
];

interface LineChartProps {
  chartData?: typeof data;
}

const CustomDot = (props: any) => {
  const { cx, cy } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="white"
      stroke="#8b5cf6"
      strokeWidth={1}
    />
  );
};

export default function LineChartComponent( { chartData = data }: LineChartProps) {
    const maxValue = Math.max(...data.map(d => d.value));
  return (
    <div className="flex flex-col w-full pl-7 pt-0 mb-10">
      <h2 className="text-2xl font-normal pl-16 mb-16">Số lượng truy cập hệ thống theo ngày</h2>
      <div className="flex pl-54 w-full">
        <ResponsiveContainer width={568} height={328}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          >
            <defs>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                <feOffset dx="0" dy="3" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.4   " />
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
              vertical={true}
              horizontal={true}
            />

            <XAxis
              dataKey="date"
              axisLine={true}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              dy={10}
              interval={0}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickCount={7}
              domain={[0, (maxValue + 10) - (maxValue + 10) % 10]}
              dx={-10}
              allowDecimals={false}
            />

            <Line
              type="linear"
              dataKey="value"
              stroke="#8979FF"
              strokeWidth={1}
              dot={<CustomDot />}
              filter="url(#shadow)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
