
export default function SalesHistory() {

    const salesHistory = [
        {
          img: "/shoe2.png",
          name: "Giày thể thao",
          buyer: "Nguyễn Văn A",
          type: "Bán trực tiếp",
          price: "2.500.000 ₫",
          date: "15/01/2024",
          status: "Hoàn thành",
        },
        {
          img: "/shoe2.png",
          name: "Giày thể thao",
          buyer: "Nguyễn Văn B",
          type: "Đấu giá",
          price: "1.800.000 ₫",
          date: "13/01/2024",
          status: "Đang xử lý",
        },
        {
          img: "/shoe2.png",
          name: "Giày thể thao",
          buyer: "Nguyễn Văn C",
          type: "Bán trực tiếp",
          price: "2.500.000 ₫",
          date: "11/01/2024",
          status: "Đã hủy",
        },
      ];
      
    return(
    <>
    <aside className="border rounded-lg p-4 bg-gray-50 overflow-hidden">
          <h3 className="font-semibold mb-3 text-base">Lịch Sử Bán Hàng</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  {["Mẫu thiết kế", "Người mua", "Loại bán", "Giá bán", "Ngày bán", "Trạng thái"].map((h) => (
                    <th key={h} className="p-2 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {salesHistory.map((s, i) => (
                  <tr key={i} className="border-b hover:bg-gray-100">
                    <td className="p-2 flex items-center gap-2">
                      <img src={s.img} alt={s.name} className="w-8 h-8 object-cover rounded" />
                      <span className="truncate">{s.name}</span>
                    </td>
                    <td className="p-2 truncate">{s.buyer}</td>
                    <td className="p-2 truncate">{s.type}</td>
                    <td className="p-2 truncate">{s.price}</td>
                    <td className="p-2 truncate">{s.date}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          s.status === "Hoàn thành"
                            ? "bg-green-100 text-green-800"
                            : s.status === "Đang xử lý"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 text-center text-xs text-gray-500">
              — Không có dữ liệu thêm —
            </div>
          </div>
        </aside>
    </>)
}