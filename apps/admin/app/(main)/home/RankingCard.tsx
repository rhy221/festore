"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Shirt, User } from "lucide-react";
import {
  getTopRankings,
  type TopTemplate,
  type TopDesigner,
} from "@/api/home.api";
import { cn } from "@/lib/utils";
import { Spinner } from "@workspace/ui/components/spinner";

interface RankItemProps {
  icon: React.ReactNode;
  title: string;
  metric: string;
  isTopOne?: boolean;
  rank: number; // Thêm prop rank
}

function RankItem({ icon, title, metric, isTopOne, rank }: RankItemProps) {
  return (
    <Card
      className={cn(
        "group relative w-full  rounded-xl transition-all duration-300 hover:-translate-y-1",
        isTopOne
          ? "border-2 border-yellow-400 shadow-lg scale-[1.03] ring-2 ring-yellow-400/40"
          : "border border-border shadow-sm hover:shadow-md"
      )}
    >
      {/* RANK BADGE - Đưa vào bên trong Card để luôn dính vào mép Card */}
      <div
        className={cn(
          "absolute -top-2 -right-2 z-10 h-7 w-7 rounded-full text-xs font-bold flex items-center justify-center shadow-md border-2",
          isTopOne
            ? "bg-yellow-400 text-black border-yellow-500"
            : "bg-primary text-primary-foreground border-background"
        )}
      >
        {rank}
      </div>

      <CardContent className="p-4">
        <div className="flex flex-col gap-3">
          <div
            className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center transition",
              isTopOne
                ? "bg-yellow-400 text-black"
                : "bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground"
            )}
          >
            {icon}
          </div>

          <div>
            <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-foreground">
              {title}
            </h3>
            <p
              className={cn(
                "text-xs font-medium tracking-wide",
                isTopOne ? "text-yellow-600" : "text-muted-foreground"
              )}
            >
              {metric}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RankingSection<
  T extends { title: string; icon: string; metric: string }
>({
  title,
  items,
}: {
  title: string;
  items: T[];
}) {
  const getIcon = (iconName: string, size = 18) => {
    switch (iconName) {
      case "shirt":
        return <Shirt size={size} />;
      case "user":
        return <User size={size} />;
      default:
        return <Shirt size={size} />;
    }
  };

  return (
    <section className="mb-12">
      {/* HEADER */}
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-base md:text-lg font-bold text-foreground shrink-0">
          {title}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {items.map((item, index) => (
          <RankItem
            key={`${item.title}-${index}`}
            icon={getIcon(item.icon)}
            title={item.title}
            metric={item.metric}
            isTopOne={index === 0}
            rank={index + 1}
          />
        ))}
      </div>
    </section>
  );
}

export default function TopRankingsSection() {
  const [topTemplates, setTopTemplates] = useState<TopTemplate[]>([]);
  const [topDesigners, setTopDesigners] = useState<TopDesigner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setIsLoading(true);
        const data = await getTopRankings();
        setTopTemplates(data.topTemplates ?? []);
        setTopDesigners(data.topDesigners ?? []);
      } catch (err) {
        console.error(err);
        setFetchError("Failed to fetch rankings.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRankings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-sm text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <Spinner />
          <span>Loading rankings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* PAGE HEADER */}
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-2">
          Top Rankings
        </h1>
        <p className="text-sm text-muted-foreground max-w-lg">
          Explore our most popular design templates and top-performing creators.
        </p>
      </div>

      {fetchError && (
        <div className="mb-8 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {fetchError}
        </div>
      )}

      <div className="space-y-4">
        <RankingSection title="Top Designs" items={topTemplates} />
        <RankingSection title="Top Designers" items={topDesigners} />
      </div>
    </div>
  );
}