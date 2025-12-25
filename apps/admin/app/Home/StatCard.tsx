"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Users, FileText, Grid3x3 } from "lucide-react";
import { getQuickStats, type StatsData } from "@/api/home.api";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card
      className="
        group w-full rounded-xl border border-border bg-card
        shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md
      "
    >
      <CardContent className="p-5 md:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
              {title}
            </p>
            <p className="text-2xl md:text-3xl font-extrabold text-foreground">
              {value.toLocaleString("en-US")}
            </p>
          </div>
          <div
            className="
              h-11 w-11 md:h-12 md:w-12 rounded-xl border border-border
              flex items-center justify-center
              text-foreground transition
              group-hover:bg-primary group-hover:text-primary-foreground
            "
          >
            {icon}
          </div>
        </div>

        <div className="h-[2px] w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full w-1/3 bg-primary transition-all duration-300 group-hover:w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function QuickStatsSection() {
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
        console.error(err);
        setError("Unable to load statistics data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards: StatCardProps[] = [
    { title: "Users", value: stats.userCount, icon: <Users size={22} /> },
    { title: "Templates", value: stats.templateCount, icon: <FileText size={22} /> },
    { title: "Categories", value: stats.categoryCount, icon: <Grid3x3 size={22} /> },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[160px] items-center justify-center text-sm text-muted-foreground">
        Loading statistics...
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
          Quick Statistics
        </h1>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}
