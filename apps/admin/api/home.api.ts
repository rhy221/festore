import api from '@/lib/http';

const BASE_URL = '/api/admin';

export interface StatsData {
  userCount: number;
  templateCount: number;
  categoryCount: number;
}

export interface TopTemplate {
  icon?: string;
  title: string;
  subtitle: string;
  metric: string;
  bgColor: string;
}

export interface TopDesigner {
  icon?: string;
  title: string;
  subtitle: string;
  metric: string;
  bgColor: string;
}

export interface RankingsData {
  topTemplates: TopTemplate[];
  topDesigners: TopDesigner[];
}

export interface WeeklyData {
  week: string;
  designs: number;
}

export interface DailyAccessData {
  date: string;
  value: number;
}

export const getQuickStats = async (): Promise<StatsData> => {
  try {
    const response = await api.get<StatsData>(`${BASE_URL}/quick-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quick stats:', error);
    return {
      userCount: 1234,
      templateCount: 856,
      categoryCount: 42
    };
  }
};

export const getTopRankings = async (): Promise<RankingsData> => {
  try {
    const response = await api.get<RankingsData>(`${BASE_URL}/rankings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return {
      topTemplates: [
        {
          icon: 'bag',
          title: "Túi xách",
          subtitle: "Urban Chic",
          metric: "125 lượt xem",
          bgColor: "bg-purple-700"
        },
        {
          icon: 'shirt',
          title: "Đầm",
          subtitle: "Nightfall Gown",
          metric: "100 lượt xem",
          bgColor: "bg-purple-700"
        },
        {
          icon: 'bag',
          title: "Quần",
          subtitle: "Canvas Cargo",
          metric: "100 lượt xem",
          bgColor: "bg-purple-700"
        }
      ],
      topDesigners: [
        {
          icon: 'user',
          title: "Phan Thành Đạt",
          subtitle: "",
          metric: "1,25 tỷ VNĐ",
          bgColor: "bg-teal-600"
        },
        {
          icon: 'user',
          title: "Nguyễn Hồng Dương",
          subtitle: "",
          metric: "1,11 tỷ VNĐ",
          bgColor: "bg-teal-600"
        },
        {
          icon: 'user',
          title: "Đỗ Thiên Tài",
          subtitle: "",
          metric: "1,09 tỷ VNĐ",
          bgColor: "bg-teal-600"
        }
      ]
    };
  }
};

export const getWeeklyDesigns = async (): Promise<WeeklyData[]> => {
  try {
    const response = await api.get<WeeklyData[]>(`${BASE_URL}/weekly-designs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weekly designs:', error);
    return [
      { week: "Tuần 1", designs: 5 },
      { week: "Tuần 2", designs: 16 },
      { week: "Tuần 3", designs: 9 },
      { week: "Tuần 4", designs: 6 },
      { week: "Tuần 5", designs: 3 },
      { week: "Tuần 6", designs: 22 },
      { week: "Tuần 7", designs: 23 },
      { week: "Tuần 8", designs: 17 },
      { week: "Tuần 9", designs: 18 },
      { week: "Tuần 10", designs: 11 },
      { week: "Tuần 11", designs: 9 },
      { week: "Tuần 12", designs: 10 },
    ];
  }
};

export const getDailyAccess = async (): Promise<DailyAccessData[]> => {
  try {
    const response = await api.get<DailyAccessData[]>(`${BASE_URL}/daily-access`);
    return response.data;
  } catch (error) {
    console.error('Error fetching daily access:', error);
    return [
      { date: "1/9", value: 30 },
      { date: "2/9", value: 40 },
      { date: "3/9", value: 68 },
      { date: "4/9", value: 85 },
      { date: "5/9", value: 55 },
      { date: "6/9", value: 33 },
      { date: "7/9", value: 91 },
      { date: "8/9", value: 83 },
      { date: "9/9", value: 34 },
      { date: "10/9", value: 37 },
      { date: "11/9", value: 78 },
      { date: "12/9", value: 24 },
    ];
  }
};


/*
 * export const HomeAPI = {
 *   getDashboardStats: async () => {
 *     return api.get('/api/admin/stats');
 *   },
 * 
 *   getTemplatesPerWeek: async () => {
 *     return api.get('/api/admin/stats/templates-week');
 *   },
 * 
 *   getUsersDaily: async () => {
 *     return api.get('/api/admin/stats/users-daily');
 *   },
 * };
 */
