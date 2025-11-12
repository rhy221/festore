import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

interface RankingCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  metric: string
  bgColor: string
}

function RankingCard({ icon, title, subtitle, metric, bgColor }: RankingCardProps) {
  return (
    <Card className={`${bgColor} border-0 rounded-[45px] w-[300px] h-[151px]`}>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="w-[110px] h-[110px] flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-white font-extrabold text-xl leading-tight mb-1">
              {title}
            </h3>
            <p className="text-white font-extrabold text-x1 leading-tight mb-2">
              {subtitle}
            </p>
            <span className="text-white font-normal text-x1">
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
      icon: <Image src="/template-icon.png" alt="Template" width={110} height={110} />,
      title: "Túi xách",
      subtitle: "Urban Chic",
      metric: "125 lượt xem",
      bgColor: "bg-[#4B0082]"
    },
    {
      icon: <Image src="/template-icon.png" alt="Template" width={110} height={110} />,
      title: "Đầm",
      subtitle: "Nightfall Gown",
      metric: "100 lượt xem",
      bgColor: "bg-[#4B0082]"
    },
    {
      icon: <Image src="/template-icon.png" alt="Template" width={110} height={110} />,
      title: "Quần",
      subtitle: "Canvas Cargo",
      metric: "100 lượt xem",
      bgColor: "bg-[#4B0082]"
    }
  ]

  const defaultDesigners: TopItem[] = [
    {
      icon: <Image src="/designer-icon.png" alt="Designer" width={110} height={109} />,
      title: "Phan Thành Đạt",
      subtitle: "",
      metric: "1,25 tỷ VNĐ",
      bgColor: "bg-[#008080]"
    },
    {
      icon: <Image src="/designer-icon.png" alt="Designer" width={110} height={109} />,
      title: "Nguyễn Hồng Dương",
      subtitle: "",
      metric: "1,11 tỷ VNĐ",
      bgColor: "bg-[#008080]"
    },
    {
      icon: <Image src="/designer-icon.png" alt="Designer" width={110} height={109} />,
      title: "Đỗ Thiên Tài",
      subtitle: "",
      metric: "1,09 tỷ VNĐ",
      bgColor: "bg-[#008080]"
    }
  ]

  const templates = topTemplates && topTemplates.length > 0 ? topTemplates : defaultTemplates
  const designers = topDesigners && topDesigners.length > 0 ? topDesigners : defaultDesigners

  return (
    <div className="pl-7 pt-5">
      <h1 className="text-[32px] font-extrabold mb-3">
        Nổi bật
      </h1>
      
      {/* Top 3 Templates Section */}
      <div className="mb-2 pl-3">
        <h2 className="text-2xl font-normal mb-4">
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

      {/* Top 3 Designers Section */}
      <div className='pl-3 mb-10'>
        <h2 className="text-2xl font-normal mb-4">
          Top 3 nhà thiết kế có doanh thu cao nhất
        </h2>
        <div className="flex flex-wrap gap-7">
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