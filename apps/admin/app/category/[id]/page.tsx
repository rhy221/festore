"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Input } from "../../../../../packages/ui/src/components/input";
import { Button } from "../../../../../packages/ui/src/components/button";
import { ProductCard } from "components/card";
import Sidebar from "components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import {
  CategoriesAPI,
  type Category,
  type Product,
} from "@/api/categories.api";
import { toast } from "sonner";

export default function AdminCategoryDetail() {
  const params = useParams();
  const categoryId = params.id as string;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "newest">("all");

  const extractData = (response: any): any => {
    if (Array.isArray(response)) return response;
    if (response && Array.isArray(response.data)) return response.data;
    if (response) return response;
    return null;
  };

  const applyFilter = useCallback(
    (products: Product[], currentFilter: "all" | "newest") => {
      if (currentFilter === "newest") {
        const sorted = [...products].sort((a, b) => {
          const dateA = new Date(a.createdAt ?? 0).getTime();
          const dateB = new Date(b.createdAt ?? 0).getTime();
          return dateB - dateA;
        });
        setDisplayedProducts(sorted);
      } else {
        setDisplayedProducts(products);
      }
    },
    []
  );

  const loadCategoryData = useCallback(async () => {
    if (!categoryId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const responseCategory = await CategoriesAPI.getById(categoryId);
      const rawCategory: any = extractData(responseCategory);

      if (!rawCategory) {
        setCategory(null);
        toast.error("Category not found.");
        return;
      }

      const normalizedCategory: Category = {
        ...rawCategory,
        id: rawCategory.id ?? rawCategory._id,
      };

      setCategory(normalizedCategory);

      const responseProducts = await CategoriesAPI.getProducts(
        categoryId,
        search
      );
      const rawProducts: any[] = extractData(responseProducts) || [];

      const normalizedProducts: Product[] = rawProducts.map((p: any) => ({
        ...p,
        id: p.id ?? p._id,
      }));

      setOriginalProducts(normalizedProducts);
      applyFilter(normalizedProducts, filter);
    } catch (error: any) {
      toast.error(
        `Failed to load data. Error code: ${
          error.response?.status || "Network/Server"
        }`
      );
      setCategory(null);
    } finally {
      setLoading(false);
    }
  }, [categoryId, search, filter, applyFilter]);

  useEffect(() => {
    loadCategoryData();
    if (search === "") {
      setFilter("all");
    }
  }, [categoryId, search, loadCategoryData]);

  const handleSearchClick = () => {
    loadCategoryData();
  };

  const handleFilter = (filterType: "all" | "newest") => {
    setFilter(filterType);
    applyFilter(originalProducts, filterType);
  };

  if (loading && !category) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!category && !loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">Category not found</p>
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
          <p className="font-bold text-3xl text-black">{category?.name}</p>

          {category?.styles?.length ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {category.styles.map((style: string) => (
                <span
                  key={style}
                  className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
                >
                  {style}
                </span>
              ))}
            </div>
          ) : null}

          <div className="flex items-center gap-2 py-4">
            <Input
              className="text-base text-black !bg-[#C8E4F5] !border-[#C8E4F5] focus-visible:!bg-[#C8E4F5]"
              placeholder="Enter search keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
            />
            <Button
              className="bg-green-500 text-base hover:bg-green-600 text-white"
              onClick={handleSearchClick}
              disabled={loading}
            >
              Search
            </Button>
          </div>

          <div className="flex items-center gap-5 py-2">
            <Button
              className={`${
                filter === "all" ? "bg-[#cdcde2]" : "bg-[#E6E6FA]"
              } text-black text-sm rounded-3xl hover:bg-[#cdcde2]`}
              onClick={() => handleFilter("all")}
            >
              All
            </Button>
            <Button
              className={`${
                filter === "newest" ? "bg-[#cdcde2]" : "bg-[#E6E6FA]"
              } text-black text-sm rounded-3xl hover:bg-[#cdcde2]`}
              onClick={() => handleFilter("newest")}
            >
              Newest
            </Button>
          </div>

          {loading && (
            <div className="text-center py-8 text-gray-500">
              Loading products...
            </div>
          )}

          {!loading && displayedProducts.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.name}
                  imageUrl={product.imageUrl}
                  href="#"
                />
              ))}
            </div>
          )}

          {!loading && displayedProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {search
                ? "No products match your search"
                : "No products in this category yet"}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
