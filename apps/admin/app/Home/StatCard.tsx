import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
interface StatCardProps {
  title: string
  value: number
  img: React.ReactNode
  bgColor: string
}

function StatCard({ title, value, img, bgColor }: StatCardProps) {
  return (
    <Card className={`${bgColor} border-0 w-61 h-33 rounded-[45px] pt-3`}>
      <CardContent className="">
        <h3 className="text-white text-xl font-extrabold mb-4 whitespace-nowrap text-center">
          {title}
        </h3>
        <div className="flex items-center justify-center gap-7">
          {/* Icon */}
          <div className="text-white/90">
            {img}
          </div>
          
          {/* Number */}
          <div className="text-white text-5xl font-extrabold">
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
      title: "Tổng số người dùng",
      value: userCount,
      img: (
        <Image src="/totalUser.png"
          alt="Total User"
          width={50}
          height={50}/>
      ),
      bgColor: "bg-[#00C853]"
    },
    {
      title: "Tổng số mẫu thiết kế",
      value: templateCount,
      img: (
        <Image src="/totalDesign.png"
          alt="Total Design"
          width={50}
          height={50}/>
      ),
      bgColor: "bg-[#FFD700]"
    },
    {
      title: "Tổng số thể loại",
      value: categoryCount,
      img: (
        <Image src="/totalCategory.png"
          alt="Total Category"
          width={50}
          height={50}/>
      ),
      bgColor: "bg-[#FF69B4]"
    }
  ]

  return (
    <div className="pl-7 pt-5">
      <h1 className="text-[32px] font-extrabold mb-3">
        Thống kê nhanh
      </h1>
      
      <div className="flex flex-wrap gap-6 pl-44">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            img={stat.img}
            bgColor={stat.bgColor}
          />
        ))}
      </div>
    </div>
  )
}