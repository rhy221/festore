import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#001f87", "#0029a6", "#0033cc", "#0040ff", "#1a4cff", "#3355ff"];

export default function CategoryAnalysis() {

    const categoryData = [
    { name: "Giày", value: 70 },
    { name: "Dạ hội", value: 64 },
    { name: "Đường phố", value: 50 },
    { name: "Phụ kiện", value: 29 },
    { name: "Unisex", value: 33 },
    { name: "Trẻ em", value: 12 },
  ];

    return(
    <>
        <section>
            <h3 className="text-base font-semibold mb-3">Phân Tích Theo Thể Loại</h3>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left side: category list */}
              <div className="flex-1 min-w-[250px]">
                {[
                  { name: "Giày", amount: "112,5tr ₫", count: "70 mẫu" },
                  { name: "Dạ hội", amount: "96tr ₫", count: "64 mẫu" },
                  { name: "Đường phố", amount: "50,4tr ₫", count: "50 mẫu" },
                  { name: "Phụ kiện", amount: "57,5tr ₫", count: "29 mẫu" },
                  { name: "Unisex", amount: "66tr ₫", count: "33 mẫu" },
                  { name: "Trẻ em", amount: "30tr ₫", count: "12 mẫu" },
                ].map((it, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-100 rounded-lg p-3 mb-2 shadow-sm"
                  >
                    <div className="font-semibold text-gray-800 truncate">{it.name}</div>
                    <div className="text-right whitespace-nowrap">
                      <div className="font-bold text-sm">{it.amount}</div>
                      <div className="text-xs text-gray-600">{it.count}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right side: smaller pie chart, labels removed */}
              <div className="flex-1 min-w-[220px] flex justify-center items-center">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      outerRadius={80}
                      // label removed intentionally to avoid overlap and visual bugs
                      // labelLine is also omitted
                      nameKey="name"
                    >
                      {categoryData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </>)
}