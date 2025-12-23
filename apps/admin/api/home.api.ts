import api from "@/lib/http";

const BASE_URL = "/api/admin";

export interface StatsData {
  userCount: number;
  templateCount: number;
  categoryCount: number;
}

export interface TopTemplate {
  icon: string;
  title: string;
  metric: string;
}

export interface TopDesigner {
  icon: string;
  title: string;
  metric: string;
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

export interface ProductData {      // ✅ Thêm interface cho product chart
  productName: string;
  quantity: number;
}

export interface Template {
  _id: string;
  title: string;
  type: string;
  viewCount: number;
}

export interface Designer {
  _id: string;
  name: string;
  email: string;
  followerCount: number;
}

export interface RoleStatsData {
  designerCount: number;
  customerCount: number;
}

export const getQuickStats = async (): Promise<StatsData> => {
  const response = await api.get<StatsData>(`${BASE_URL}/quick-stats`);
  return response.data;
};

export const getTopRankings = async (): Promise<RankingsData> => {
  try {
    const resTemplates = await api.get<Template[]>(`${BASE_URL}/templates`);
    const templatesData = Array.isArray(resTemplates.data) ? resTemplates.data : [];
    const topTemplates: TopTemplate[] = templatesData
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 3)
      .map(t => ({
        title: t.title,
        metric: `${t.viewCount || 0} views`,
        icon: "shirt",
      }));

    const resDesigners = await api.get<Designer[]>(`${BASE_URL}/designers`);
    const designersData = Array.isArray(resDesigners.data) ? resDesigners.data : [];
    const topDesigners: TopDesigner[] = designersData
      .sort((a, b) => (b.followerCount || 0) - (a.followerCount || 0))
      .slice(0, 3)
      .map(d => ({
        title: d.name,
        metric: `${d.followerCount || 0} followers`,
        icon: "user",
      }));

    return { topTemplates, topDesigners };
  } catch (err) {
    console.error("Error fetching rankings in API:", err);
    return { topTemplates: [], topDesigners: [] };
  }
};

export const getWeeklyDesigns = async (): Promise<WeeklyData[]> => {
  const response = await api.get<WeeklyData[]>(`${BASE_URL}/weekly-designs`);
  return Array.isArray(response.data) ? response.data : [];
};

export const getDailyAccess = async (): Promise<DailyAccessData[]> => {
  const response = await api.get<DailyAccessData[]>(`${BASE_URL}/daily-access`);
  return Array.isArray(response.data) ? response.data : [];
};

export const getProductStats = async (): Promise<ProductData[]> => {
  const response = await api.get<ProductData[]>(`${BASE_URL}/product-stats`);
  return Array.isArray(response.data) ? response.data : [];
};

export const getRoleStats = async (): Promise<RoleStatsData> => {
  const response = await api.get<RoleStatsData>(`${BASE_URL}/role-stats`);
  return response.data;
};
