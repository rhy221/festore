import api from "@/lib/http";

const BASE_URL = "/admin/api";

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
  const response = await api.get<StatsData>(`${BASE_URL}/quick-stats`);
  return response.data;
};

export const getTopRankings = async (): Promise<RankingsData> => {
  const response = await api.get<RankingsData>(`${BASE_URL}/rankings`);
  return response.data;
};

export const getWeeklyDesigns = async (): Promise<WeeklyData[]> => {
  const response = await api.get<WeeklyData[]>(`${BASE_URL}/weekly-designs`);
  return response.data;
};

export const getDailyAccess = async (): Promise<DailyAccessData[]> => {
  const response = await api.get<DailyAccessData[]>(`${BASE_URL}/daily-access`);
  return response.data;
};
