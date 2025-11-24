import { Card, CardContent } from '@workspace/ui/components/card'

interface StatCardProps {
  title: string
  value: number
  bgColor: string
}

function StatCard({ title, value, bgColor }: StatCardProps) {
  return (
    <Card
      className={`${bgColor} border-0 w-[220px] h-[100px] rounded-[30px] pt-3`}
    >
      <CardContent className="pt-3 px-4">
        <h3 className="text-white text-base font-extrabold mb-1 whitespace-nowrap text-center">
          {title}
        </h3>

        <div className="flex items-center justify-center">
          <div className="text-white text-3xl font-extrabold">
            {value}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface QuickStatsProps {
  userCount?: number
  templateCount?: number
  categoryCount?: number
}

export default function QuickStats({
  userCount = 100,
  templateCount = 130,
  categoryCount = 25
}: QuickStatsProps = {}) {
  const stats = [
    {
      title: 'Tổng số người dùng',
      value: userCount,
      bgColor: 'bg-[#00C853]'
    },
    {
      title: 'Tổng số mẫu thiết kế',
      value: templateCount,
      bgColor: 'bg-[#FFD700]'
    },
    {
      title: 'Tổng số thể loại',
      value: categoryCount,
      bgColor: 'bg-[#FF69B4]'
    }
  ]

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold mb-4">Thống kê nhanh</h1>

      <div className="flex flex-wrap gap-6 justify-start">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            bgColor={stat.bgColor}
          />
        ))}
      </div>
    </div>
  )
}
