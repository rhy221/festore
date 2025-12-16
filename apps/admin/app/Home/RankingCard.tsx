"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Shirt, User } from "lucide-react";
import { getTopRankings, type TopTemplate, type TopDesigner } from "@/api/home.api";

interface RankItemProps {
  icon: React.ReactNode;
  title: string;
  metric: string;
  isTopOne?: boolean;
}

function RankItem({ icon, title, metric, isTopOne }: RankItemProps) {
  return (
    <Card
      className={`group w-[220px] rounded-2xl transition-all duration-300 mx-auto
        hover:-translate-y-1
        ${isTopOne
          ? "border-2 border-yellow-400 shadow-lg scale-[1.04] ring-2 ring-yellow-300/40"
          : "border border-gray-200 shadow-sm hover:shadow-md"
        }`}
    >
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition
              ${isTopOne
                ? "bg-yellow-400 text-black"
                : "bg-gray-100 text-gray-800 group-hover:bg-black group-hover:text-white"
              }`}
          >
            {icon}
          </div>
          <div>
            <h3 className={`leading-tight mb-1 line-clamp-1 ${isTopOne ? "text-sm font-bold" : "text-sm font-semibold"}`}>
              {title}
            </h3>
            <p className={`tracking-wide ${isTopOne ? "text-xs font-semibold text-yellow-600" : "text-xs font-medium text-gray-800"}`}>
              {metric}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RankingSection<T extends { title: string; icon: string; metric: string }>({
  title,
  items
}: {
  title: string;
  items: T[];
}) {
  const getIcon = (iconName: string, size = 18) => {
    switch (iconName) {
      case "shirt": return <Shirt size={size} />;
      case "user": return <User size={size} />;
      default: return <Shirt size={size} />;
    }
  };

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <div className="h-px flex-1 ml-5 bg-gray-200"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
        {items.map((item, index) => (
          <div key={`${item.title}-${index}`} className="relative">
            <div
              className={`absolute -top-2.5 -right-2.5 z-10 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shadow
                ${index === 0 ? "bg-yellow-400 text-black" : "bg-black text-white"}`}
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
      <div className="flex items-center justify-center min-h-[260px] text-gray-500 text-sm">
        Loading data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-2">
            Top Rankings
          </h1>
          <p className="text-sm text-gray-500 max-w-lg">
            The most outstanding templates and designers.
          </p>
        </div>

        {fetchError && (
          <div className="mb-8 p-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm">
            {fetchError}
          </div>
        )}

        <RankingSection title="Top Templates" items={topTemplates} />
        <RankingSection title="Top Designers" items={topDesigners} />
      </div>
    </div>
  );
}
