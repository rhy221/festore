import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboard.api";

export const useDashboardQueries = {
  useMonthlyReport: (month: string) => {
    return useQuery({
      queryKey: ["monthlyReport", month],
      queryFn: () => dashboardApi.getMonthlyReport(month),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  },

  useCategoryAnalysis: () => {
    return useQuery({
      queryKey: ["categoryAnalysis"],
      queryFn: () => dashboardApi.getCategoryAnalysis(),
      staleTime: 5 * 60 * 1000,
    });
  },

  useSalesHistory: () => {
    return useQuery({
      queryKey: ["salesHistory"],
      queryFn: () => dashboardApi.getSalesHistory(),
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  },
};