import { Clock, CheckCircle, XCircle, History } from "lucide-react";
import { useDashboardQueries } from "../../../queries/useDashboard";
import { SalesHistorySkeleton } from "./skeletons";
import Image from "next/image";

export default function SalesHistory() {
  const { data, isLoading, error } = useDashboardQueries.useSalesHistory();

  if (isLoading) return <SalesHistorySkeleton />;
  if (error) return <div className="text-red-500">Lỗi tải dữ liệu</div>;
  if (!data) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "processing":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "processing":
        return "Đang xử lý";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <aside className="border rounded-lg p-4 bg-gray-50 overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <History className="w-5 h-5 text-[#001f87]" />
        <h3 className="font-semibold text-base">Lịch Sử Bán Hàng</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              {["Mẫu thiết kế", "Người mua", "Loại bán", "Giá bán", "Ngày bán", "Trạng thái"].map(
                (h) => (
                  <th key={h} className="p-2 whitespace-nowrap">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-100">
                <td className="p-2 flex items-center gap-2">
                  <Image
                    src={s.designImage}
                    alt={s.designName}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-cover rounded"
                  />
                  <span className="truncate">{s.designName}</span>
                </td>
                <td className="p-2 truncate">{s.buyerName}</td>
                <td className="p-2 truncate">
                  {s.saleType === "direct" ? "Bán trực tiếp" : "Đấu giá"}
                </td>
                <td className="p-2 truncate">{formatCurrency(s.price)}</td>
                <td className="p-2 truncate">{formatDate(s.date)}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1 ${getStatusClass(
                      s.status
                    )}`}
                  >
                    {getStatusIcon(s.status)}
                    {getStatusText(s.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <div className="mt-3 text-center text-xs text-gray-500">
            — Không có dữ liệu —
          </div>
        )}
      </div>
    </aside>
  );
}