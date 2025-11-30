import { Card, CardContent } from '@workspace/ui/components/card'

interface RankingCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  metric: string
  bgColor: string
}

function RankingCard({ icon, title, subtitle, metric, bgColor }: RankingCardProps) {
  return (
    <Card className={`${bgColor} border-0 rounded-[20px] w-[240px] h-[110px]`}>
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="w-[70px] h-[70px] flex items-center justify-center flex-shrink-0">
            {icon}
          </div>

          <div className="flex flex-col">
            <h3 className="text-white font-extrabold text-base leading-tight mb-0.5">
              {title}
            </h3>
            <p className="text-white font-extrabold text-sm leading-tight mb-1">
              {subtitle}
            </p>
            <span className="text-white font-normal text-xs">
              {metric}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface TopItem {
  icon: React.ReactNode
  title: string
  subtitle: string
  metric: string
  bgColor: string
}

interface TopThreeRankingsProps {
  topTemplates?: TopItem[]
  topDesigners?: TopItem[]
}

export default function TopThreeRankings({ 
  topTemplates,
  topDesigners
}: TopThreeRankingsProps = {}) {

  const defaultTemplates: TopItem[] = [
    {
      icon: null,
      title: "Túi xách",
      subtitle: "Urban Chic",
      metric: "125 lượt xem",
      bgColor: "bg-[#4B0082]"
    },
    {
      icon: null,
      title: "Đầm",
      subtitle: "Nightfall Gown",
      metric: "100 lượt xem",
      bgColor: "bg-[#4B0082]"
    },
    {
      icon: null,
      title: "Quần",
      subtitle: "Canvas Cargo",
      metric: "100 lượt xem",
      bgColor: "bg-[#4B0082]"
    }
  ]

  const defaultDesigners: TopItem[] = [
    {
      icon: null,
      title: "Phan Thành Đạt",
      subtitle: "",
      metric: "1,25 tỷ VNĐ",
      bgColor: "bg-[#008080]"
    },
    {
      icon: null,
      title: "Nguyễn Hồng Dương",
      subtitle: "",
      metric: "1,11 tỷ VNĐ",
      bgColor: "bg-[#008080]"
    },
    {
      icon: null,
      title: "Đỗ Thiên Tài",
      subtitle: "",
      metric: "1,09 tỷ VNĐ",
      bgColor: "bg-[#008080]"
    }
  ]

  const templates = topTemplates && topTemplates.length > 0 ? topTemplates : defaultTemplates
  const designers = topDesigners && topDesigners.length > 0 ? topDesigners : defaultDesigners

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold mb-4">
        Nổi bật
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-normal mb-3">
          Top 3 mẫu thiết kế được xem nhiều nhất
        </h2>
        <div className="flex flex-wrap gap-4">
          {templates.map((item, index) => (
            <RankingCard
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              metric={item.metric}
              bgColor={item.bgColor}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-normal mb-3">
          Top 3 nhà thiết kế có doanh thu cao nhất
        </h2>
        <div className="flex flex-wrap gap-4">
          {designers.map((item, index) => (
            <RankingCard
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              metric={item.metric}
              bgColor={item.bgColor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
