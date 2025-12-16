import { useState, useEffect } from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Users, FileText, Grid3x3 } from "lucide-react";
import { getQuickStats } from "@/api/home.api";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className="group w-full sm:w-[280px] rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
              {title}
            </p>
            <p className="text-3xl font-extrabold text-gray-900">
              {value.toLocaleString("en-US")}
            </p>
          </div>

          <div className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 group-hover:bg-black group-hover:text-white transition">
            {icon}
          </div>
        </div>

        <div className="h-[2px] w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-black transition-all duration-300 group-hover:w-full"></div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatsData {
  userCount: number;
  templateCount: number;
  categoryCount: number;
}

export default function QuickStats() {
  const [stats, setStats] = useState<StatsData>({
    userCount: 0,
    templateCount: 0,
    categoryCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getQuickStats();
        setStats({
          userCount: data.userCount ?? 0,
          templateCount: data.templateCount ?? 0,
          categoryCount: data.categoryCount ?? 0,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Unable to load statistics data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Users", value: stats.userCount, icon: <Users size={22} /> },
    { title: "Templates", value: stats.templateCount, icon: <FileText size={22} /> },
    { title: "Categories", value: stats.categoryCount, icon: <Grid3x3 size={22} /> },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[180px] text-gray-500 text-sm">
        Loading statistics...
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-2">
            Quick Statistics
          </h1>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {statCards.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
