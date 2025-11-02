import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { PieChartIcon } from "lucide-react";
import { useDashboardQueries } from "../../../queries/useDashboard";
import { CategoryAnalysisSkeleton } from "./skeletons";

const COLORS = ["#001f87", "#0029a6", "#0033cc", "#0040ff", "#1a4cff", "#3355ff"];

export default function CategoryAnalysis() {
  const { data, isLoading, error } = useDashboardQueries.useCategoryAnalysis();

  if (isLoading) return <CategoryAnalysisSkeleton />;
  if (error) return <div className="text-red-500">Lỗi tải dữ liệu</div>;
  if (!data) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <PieChartIcon className="w-5 h-5 text-[#001f87]" />
        <h3 className="text-base font-semibold">Phân Tích Theo Thể Loại</h3>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side: category list */}
        <div className="flex-1 min-w-[250px]">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-100 rounded-lg p-3 mb-2 shadow-sm"
            >
              <div className="font-semibold text-gray-800 truncate">{item.name}</div>
              <div className="text-right whitespace-nowrap">
                <div className="font-bold text-sm">{formatCurrency(item.amount)}</div>
                <div className="text-xs text-gray-600">{item.count} mẫu</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side: pie chart */}
        <div className="flex-1 min-w-[220px] flex justify-center items-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                outerRadius={80}
                nameKey="name"
              >
                {data.map((_, i) => (
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
  );
}