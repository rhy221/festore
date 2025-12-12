"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Input } from "../../../../../packages/ui/src/components/input";
import { Button } from "../../../../../packages/ui/src/components/button";
import { ProductCard } from "components/card";
import Sidebar from "components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { CategoriesAPI, type Category, type Product } from "@/api/categories.api";
import { toast } from "sonner";

export default function AdminCategoryDashboard() {
  const params = useParams();
  const categoryId = params.id as string;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "newest">("all");

  useEffect(() => {
    loadCategoryData();
  }, [categoryId]);

  const loadCategoryData = async () => {
    try {
      setLoading(true);
      const [categoryData, productsData] = await Promise.all([
        CategoriesAPI.getById(categoryId),
        CategoriesAPI.getProducts(categoryId),
      ]);
      setCategory(categoryData);
      setProducts(productsData);
    } catch (error) {
      toast.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const productsData = await CategoriesAPI.getProducts(categoryId, search);
      setProducts(productsData);
    } catch (error) {
      toast.error("Không thể tìm kiếm");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filterType: "all" | "newest") => {
    setFilter(filterType);
    if (filterType === "newest") {
      const sorted = [...products].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setProducts(sorted);
    } else {
      loadCategoryData();
    }
  };

  if (!category && !loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">Không tìm thấy thể loại</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header role="admin" name="ABC" />

      <div className="flex flex-1 pt-32">
        <div className="w-[296px]">
          <Sidebar />
        </div>

        <main className="flex-1 bg-white p-6 overflow-y-auto text-lg text-black">
          {loading && !category ? (
            <div className="text-center py-8 text-gray-500">Đang tải...</div>
          ) : (
            <>
              <p className="font-bold text-3xl text-black">{category?.name}</p>
              <p className="text-black">{category?.description}</p>

              <div className="flex items-center gap-2 py-2">
                <Input
                  className="text-base text-black !bg-[#C8E4F5] !border-[#C8E4F5] focus-visible:!bg-[#C8E4F5]"
                  placeholder="Nhập nội dung tìm kiếm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button
                  className="bg-green-500 text-base hover:bg-green-600 text-white"
                  onClick={handleSearch}
                >
                  Tìm kiếm
                </Button>
              </div>

              <div className="flex items-center gap-5 py-2">
                <Button
                  className={`${
                    filter === "all" ? "bg-[#cdcde2]" : "bg-[#E6E6FA]"
                  } text-black text-sm rounded-3xl hover:bg-[#cdcde2]`}
                  onClick={() => handleFilter("all")}
                >
                  Tất cả
                </Button>
                <Button
                  className={`${
                    filter === "newest" ? "bg-[#cdcde2]" : "bg-[#E6E6FA]"
                  } text-black text-sm rounded-3xl hover:bg-[#cdcde2]`}
                  onClick={() => handleFilter("newest")}
                >
                  Mới nhất
                </Button>
              </div>

              {loading && (
                <div className="text-center py-8 text-gray-500">Đang tải...</div>
              )}

              {!loading && products.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      title={product.name}
                      imageUrl={product.imageUrl}
                      href="#"
                    />
                  ))}
                </div>
              )}

              {!loading && products.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {search
                    ? "Không tìm thấy sản phẩm nào"
                    : "Chưa có sản phẩm nào"}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
