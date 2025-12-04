import { useState, useEffect } from 'react'
import { Card, CardContent } from '@workspace/ui/components/card'
import { ShoppingBag, Shirt, User } from 'lucide-react'
import { getTopRankings, type TopTemplate, type TopDesigner } from '@/api/home.api'

interface RankingCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  metric: string
  bgColor: string
}

function RankingCard({ icon, title, subtitle, metric, bgColor }: RankingCardProps) {
  return (
    <Card className={`${bgColor} border-0 rounded-2xl w-[280px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden`}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 flex items-center justify-center shrink-0 bg-white rounded-xl shadow-lg border-4 border-white/40">
            <div className="text-purple-600">
              {icon}
            </div>
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg leading-tight mb-1 drop-shadow-sm">
              {title}
            </h3>
            {subtitle && (
              <p className="text-white/95 font-medium text-sm leading-tight mb-2 truncate">
                {subtitle}
              </p>
            )}
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <span className="text-white/90 font-medium text-xs tracking-wide">
                {metric}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TopThreeRankings() {
  const [templates, setTemplates] = useState<TopTemplate[]>([])
  const [designers, setDesigners] = useState<TopDesigner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Map icon names to actual icon components
  const getIcon = (iconName?: string, size = 32) => {
    switch (iconName) {
      case 'bag':
        return <ShoppingBag size={size} strokeWidth={2.5} />
      case 'shirt':
        return <Shirt size={size} strokeWidth={2.5} />
      case 'user':
        return <User size={size} strokeWidth={2.5} />
      default:
        return <ShoppingBag size={size} strokeWidth={2.5} />
    }
  }

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setLoading(true)
        
        // ✅ Gọi API từ service
        const data = await getTopRankings()
        
        setTemplates(data.topTemplates)
        setDesigners(data.topDesigners)
        
      } catch (err) {
        console.error('Error fetching rankings:', err)
        setError('Có lỗi xảy ra khi tải dữ liệu')
      } finally {
        setLoading(false)
      }
    }

    fetchRankings()
  }, [])

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Đang tải...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2 bg-linear-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
            Nổi bật
          </h1>
          <div className="h-1 w-24 bg-linear-to-r from-purple-600 to-teal-600 rounded-full"></div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-800 font-medium text-sm">{error}</span>
            </div>
          </div>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="text-purple-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Top 3 mẫu thiết kế được xem nhiều nhất
            </h2>
          </div>
          <div className="flex flex-wrap gap-5">
            {templates.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                  {index + 1}
                </div>
                <RankingCard
                  icon={getIcon(item.icon, 36)}
                  title={item.title}
                  subtitle={item.subtitle}
                  metric={item.metric}
                  bgColor={item.bgColor}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <User className="text-teal-600" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Top 3 nhà thiết kế có doanh thu cao nhất
            </h2>
          </div>
          <div className="flex flex-wrap gap-5">
            {designers.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                  {index + 1}
                </div>
                <RankingCard
                  icon={getIcon(item.icon, 36)}
                  title={item.title}
                  subtitle={item.subtitle}
                  metric={item.metric}
                  bgColor={item.bgColor}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}