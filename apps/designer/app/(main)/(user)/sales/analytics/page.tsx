'use client';

import { useState, useEffect, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Loader2, CalendarDays, TrendingUp, Package, DollarSign, PieChartIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@workspace/ui/components/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import http from '@/lib/http';
import { formatCurrency } from '@/lib/utils';

const COLORS = ['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b'];

export default function SalesAnalyticsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentYear = new Date().getFullYear();

  // --- 1. LẤY GIÁ TRỊ TỪ URL ---
  const startYearParam = searchParams.get('startYear');
  const endYearParam = searchParams.get('endYear');

  // --- 2. LOCAL STATE (Khởi tạo từ URL hoặc mặc định) ---
  const [startYear, setStartYear] = useState(startYearParam ? parseInt(startYearParam) : currentYear - 1);
  const [endYear, setEndYear] = useState(endYearParam ? parseInt(endYearParam) : currentYear);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Sync state khi URL thay đổi (VD: User bấm Back/Forward trình duyệt)
  useEffect(() => {
    if (startYearParam) setStartYear(parseInt(startYearParam));
    if (endYearParam) setEndYear(parseInt(endYearParam));
  }, [startYearParam, endYearParam]);

  // Danh sách năm (2020 - nay)
  const years = useMemo(() => {
    const list = [];
    for (let i = currentYear; i >= 2020; i--) list.push(i);
    return list;
  }, [currentYear]);

  // --- 3. HELPER CẬP NHẬT URL ---
  const updateUrl = (newParams: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value.toString());
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  // --- 4. FETCH DATA ---
  const fetchAnalytics = async () => {
    // Luôn ưu tiên dùng giá trị từ URL để đồng nhất
    const sYear = startYearParam || startYear;
    const eYear = endYearParam || endYear;

    setLoading(true);
    try {
      const res = await http.get('/sales/analytics', { 
        params: { startYear: sYear, endYear: eYear } 
      });
      setData(res.data);
    } catch (error) {
      console.error("Analytics fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch khi URL thay đổi
  useEffect(() => {
    fetchAnalytics();
  }, [startYearParam, endYearParam]);

  // --- 5. HANDLERS ---
  const handleStartYearChange = (val: string) => {
    const newStart = parseInt(val);
    const updates: Record<string, number> = { startYear: newStart };
    // Nếu năm bắt đầu mới lớn hơn năm kết thúc cũ, đẩy năm kết thúc lên bằng năm bắt đầu
    if (newStart > endYear) {
      updates.endYear = newStart;
    }
    updateUrl(updates);
  };

  const handleEndYearChange = (val: string) => {
    updateUrl({ endYear: val });
  };

  if (loading && !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <Loader2 className="animate-spin text-violet-500 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 bg-zinc-950 text-white min-h-screen font-sans text-left">
      
      {/* HEADER & SELECTOR AREA */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-zinc-800 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            Sales Analytics
          </h1>
          <p className="text-zinc-400 mt-1 text-sm md:text-base italic">
            Monitoring performance from {startYear} to {endYear}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-zinc-900/80 p-2 rounded-2xl border border-zinc-800 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-2 px-3 border-r border-zinc-800">
            <CalendarDays className="text-violet-500" size={18} />
            <span className="text-xs font-bold text-zinc-500 uppercase">Period</span>
          </div>
          
          {/* Start Year Select */}
          <Select value={startYear.toString()} onValueChange={handleStartYearChange}>
            <SelectTrigger className="w-[100px] bg-transparent border-none focus:ring-0 font-bold text-violet-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
              {years.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
            </SelectContent>
          </Select>

          <span className="text-zinc-700 font-black">→</span>

          {/* End Year Select */}
          <Select value={endYear.toString()} onValueChange={handleEndYearChange}>
            <SelectTrigger className="w-[100px] bg-transparent border-none focus:ring-0 font-bold text-violet-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
              {years.filter(y => y >= startYear).map(y => (
                <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900/40 border-zinc-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity text-white">
            <DollarSign size={140} />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Accumulated Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tighter">
              {formatCurrency(data?.summary?.totalRevenue)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/40 border-zinc-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity text-white">
            <Package size={140} />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Total Units Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl md:text-5xl font-black text-blue-400 tracking-tighter">
              {data?.summary?.totalItemsSold}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* REVENUE TREND CHART */}
      <Card className="bg-zinc-900/40 border-zinc-800 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-left">
              <TrendingUp className="text-violet-500" /> Monthly Revenue Trend
            </CardTitle>
            <CardDescription className="text-zinc-500 text-left">Gross revenue generated per month</CardDescription>
          </div>
          {loading && <Loader2 className="animate-spin text-zinc-500" size={20} />}
        </CardHeader>
        <CardContent className="h-[450px] w-full pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.chartData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} opacity={0.5} />
              <XAxis 
                dataKey="month" 
                stroke="#52525b" 
                fontSize={12} 
                tickFormatter={(s) => format(parseISO(s + "-01"), "MMM yy")} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="#52525b" 
                fontSize={12} 
                tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px', textAlign: 'left' }}
                labelFormatter={(l) => format(parseISO(l + "-01"), "MMMM yyyy")}
                formatter={(val: number) => [formatCurrency(val), "Revenue"]}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8b5cf6" 
                strokeWidth={4} 
                fill="url(#colorRev)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* UNITS SOLD BAR CHART */}
        <Card className="bg-zinc-900/40 border-zinc-800 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-left">Monthly Units Sold</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} opacity={0.5} />
                <XAxis 
                  dataKey="month" 
                  stroke="#52525b" 
                  fontSize={11} 
                  tickFormatter={(s) => format(parseISO(s + "-01"), "MMM")} 
                />
                <YAxis stroke="#52525b" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#27272a', opacity: 0.4}} 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', textAlign: 'left' }} 
                />
                <Bar dataKey="itemsSold" fill="#06b6d4" radius={[6, 6, 0, 0]} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* PIE CHART BREAKDOWN */}
        <Card className="bg-zinc-900/40 border-zinc-800 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-left">
              <PieChartIcon className="text-pink-500" size={20} /> Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.pieData}
                  cx="50%" cy="50%"
                  innerRadius={75} outerRadius={105}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  {data?.pieData?.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => formatCurrency(val)} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}