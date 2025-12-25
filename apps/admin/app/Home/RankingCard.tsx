"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Shirt, User } from "lucide-react";
import {
  getTopRankings,
  type TopTemplate,
  type TopDesigner,
} from "@/api/home.api";

interface RankItemProps {
  icon: React.ReactNode;
  title: string;
  metric: string;
  isTopOne?: boolean;
}

function RankItem({ icon, title, metric, isTopOne }: RankItemProps) {
  return (
    <Card
      className={`
        group w-full max-w-[260px] rounded-xl transition-all duration-300
        hover:-translate-y-1
        ${
          isTopOne
            ? "border-2 border-yellow-400 shadow-lg scale-[1.03] ring-2 ring-yellow-400/40"
            : "border border-border shadow-sm hover:shadow-md"
        }
      `}
    >
      <CardContent className="p-4">
        <div className="flex flex-col gap-3">
          <div
            className={`
              h-10 w-10 rounded-xl flex items-center justify-center transition
              ${
                isTopOne
                  ? "bg-yellow-400 text-black"
                  : "bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground"
              }
            `}
          >
            {icon}
          </div>

          <div>
            <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-foreground">
              {title}
            </h3>
            <p
              className={`text-xs font-medium tracking-wide ${
                isTopOne ? "text-yellow-600" : "text-muted-foreground"
              }`}
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
      <div className="mb-5 flex items-center gap-4">
        <h2 className="text-base md:text-lg font-bold text-foreground">
          {title}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {items.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="relative w-full flex justify-center"
          >
            {/* RANK BADGE */}
            <div
              className={`
                absolute -top-2.5 -right-2.5 z-10 h-6 w-6 rounded-full
                text-xs font-bold flex items-center justify-center shadow
                ${
                  index === 0
                    ? "bg-yellow-400 text-black"
                    : "bg-primary text-primary-foreground"
                }
              `}
            >
              {index + 1}
            </div>

            <RankItem
              icon={getIcon(item.icon)}
              title={item.title}
              metric={item.metric}
              isTopOne={index === 0}
            />
          </div>
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
      <div className="flex min-h-[220px] items-center justify-center text-sm text-muted-foreground">
        Loading data...
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* TITLE */}
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground mb-2">
          Top Rankings
        </h1>
        <p className="text-sm text-muted-foreground max-w-lg">
          The most outstanding templates and designers.
        </p>
      </div>

      {fetchError && (
        <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {fetchError}
        </div>
      )}

      <RankingSection title="Top Design Pattern" items={topTemplates} />
      <RankingSection title="Top Designers" items={topDesigners} />
    </div>
  );
}
