import { useState, useEffect } from 'react'
import { Card, CardContent } from '@workspace/ui/components/card'
import { Users, FileText, Grid3x3 } from 'lucide-react'
import { getQuickStats } from '@/api/admin.api'
interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  bgColor: string
}

function StatCard({ title, value, icon, bgColor }: StatCardProps) {
  return (
    <Card className={`${bgColor} border-0 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <CardContent className="p-6">
        <h3 className="text-white text-lg font-bold mb-4 text-center drop-shadow-sm">
          {title}
        </h3>
        <div className="flex items-center justify-center gap-6">
          {/* Icon Container */}
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border-4 border-white/40">
            <div className="text-gray-700">
              {icon}
            </div>
          </div>

          {/* Number */}
          <div className="text-white text-5xl font-black drop-shadow-md">
            {value.toLocaleString('vi-VN')}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface StatsData {
  userCount: number
  templateCount: number
  categoryCount: number
}

interface QuickStatsProps {
  userCount?: number
  templateCount?: number
  categoryCount?: number
}

export default function QuickStats({ 
  userCount, 
  templateCount, 
  categoryCount 
}: QuickStatsProps = {}) {
  const [stats, setStats] = useState<StatsData>({
    userCount: 0,
    templateCount: 0,
    categoryCount: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        
        // Nếu có props truyền vào, dùng luôn không cần call API
        if (userCount !== undefined && templateCount !== undefined && categoryCount !== undefined) {
          setStats({ userCount, templateCount, categoryCount })
          setLoading(false)
          return
        }
        
        // Call API từ service
        const data = await getQuickStats()
        setStats(data)
        
      } catch (err) {
        console.error('Error fetching stats:', err)
        setError('Có lỗi xảy ra khi tải dữ liệu')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [userCount, templateCount, categoryCount])

  const statCards = [
    {
      title: "Tổng số người dùng",
      value: stats.userCount,
      icon: <Users size={32} strokeWidth={2.5} />,
      bgColor: "bg-linear-to-br from-emerald-500 to-green-600"
    },
    {
      title: "Tổng số mẫu thiết kế",
      value: stats.templateCount,
      icon: <FileText size={32} strokeWidth={2.5} />,
      bgColor: "bg-linear-to-br from-amber-400 to-yellow-500"
    },
    {
      title: "Tổng số thể loại",
      value: stats.categoryCount,
      icon: <Grid3x3 size={32} strokeWidth={2.5} />,
      bgColor: "bg-linear-to-br from-pink-500 to-rose-500"
    }
  ]

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-lg text-gray-600">Đang tải thống kê...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-black mb-2 bg-linear-to-r from-emerald-600 via-amber-500 to-pink-600 bg-clip-text text-transparent">
          Thống kê nhanh
        </h1>
        <div className="h-1 w-32 bg-linear-to-r from-emerald-600 via-amber-500 to-pink-600 rounded-full"></div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-yellow-800 font-medium text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-5">
        {statCards.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
          />
        ))}
      </div>
    </div>
  )
}