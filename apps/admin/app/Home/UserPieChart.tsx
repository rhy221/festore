"use client";

import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

interface DonutChartProps {
  customer?: number;
  designer?: number;
}

const COLORS = ["#FF928A", "#8979FF"];

export default function DonutChart({
  customer = 64,
  designer = 36,
}: DonutChartProps) {
  const data = [
    { name: "Customer", value: customer },
    { name: "Designer", value: designer },
  ];
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="flex flex-col w-full pl-7 pt-0 mb-10">
      <h2 className="text-2xl font-normal pl-16 mb-16">Tỉ lệ người dùng</h2>
      <div className="flex pl-54 w-full">
        <ResponsiveContainer width={700} height={344}>
          <PieChart>
            <Pie
              data={data}
              cx={"50%"}
              cy={"50%"}
              innerRadius={69}
              outerRadius={172}
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={450}
              label={({ name, value, percent, cx, cy, midAngle }) => {
                const RADIAN = Math.PI / 180;
                const radius = 180;
                const x = cx + radius * Math.cos(-midAngle * RADIAN) * 0.5;
                const y = cy + radius * Math.sin(-midAngle * RADIAN) * 0.5;
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#fff"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={12}
                  >
                    <tspan x={x} dy={-6}>
                      {name}
                    </tspan>
                    <tspan x={x} dy={16} fontWeight="600">
                      {value}
                    </tspan>
                    <tspan>{` ${(percent * 100).toFixed(2)}%`}</tspan>
                  </text>
                );
              }}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ right: 50 }}
              content={({ payload }) => (
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {payload?.map((entry, index) => (
                    <li
                      key={`item-${index}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: entry.color,
                          marginRight: 8,
                        }}
                      />
                      <span style={{ fontSize: 12, color: "#222" }}>
                        {entry.value}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            />
            <text
              x="45%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={24}
              fontWeight="600"
            >
              {total}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
