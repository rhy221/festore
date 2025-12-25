"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Input } from "../../../../../packages/ui/src/components/input";
import { ProductCard } from "components/card";
import Sidebar from "components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { CategoriesAPI, type Category, type Product } from "@/api/categories.api";
import { toast } from "sonner";

export default function AdminCategoryDetail() {
  const { id } = useParams<{ id: string }>();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategoryData = useCallback(async () => {
    if (!id) return;
    setLoading(true);

    try {
      const rawCategory: any = await CategoriesAPI.getById(id);
      if (!rawCategory) {
        toast.error("Category not found");
        setCategory(null);
        setProducts([]);
        return;
      }

      const normalizedCategory: Category = {
        id: String(rawCategory.id ?? rawCategory._id),
        name: rawCategory.name,
        slug: rawCategory.slug,
        styles: Array.isArray(rawCategory.styles) ? rawCategory.styles : [],
        isDeleted: Boolean(rawCategory.isDeleted),
        productCount: rawCategory.productCount,
      };

      setCategory(normalizedCategory);

      const rawProducts = await CategoriesAPI.getProducts(id, search);
      const normalizedProducts: Product[] = (rawProducts || []).map((p: any) => ({
        id: String(p.id ?? p._id),
        name: p.title,
        imageUrl: Array.isArray(p.imageUrls) && p.imageUrls.length ? p.imageUrls[0] : "", // đảm bảo có imageUrl
        createdAt: p.createdAt,
      }));

      setProducts(normalizedProducts);
    } catch (error: any) {
      toast.error(`Failed to load category. Error: ${error.response?.status || "Server error"}`);
      setCategory(null);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [id, search]);

  useEffect(() => {
    loadCategoryData();
  }, [loadCategoryData]);

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
    <div className="flex flex-col min-h-screen bg-background">
      <Header role="admin" name="ABC" />
      <div className="flex flex-1 pt-32">
        <div className="w-[296px]">
          <Sidebar />
        </div>

        <main className="flex-1 bg-card p-6 overflow-y-auto text-foreground">
          <h1 className="font-bold text-3xl">
            {category?.name}
          </h1>

          {category?.styles?.length && (
            <div className="flex flex-wrap gap-2 mt-3">
              {category.styles.map((style) => (
                <span
                  key={style}
                  className="rounded-full bg-muted px-3 py-1 text-sm"
                >
                  {style}
                </span>
              ))}
            </div>
          )}

          <div className="py-2">
            <Input
              className="text-sm bg-card border border-input rounded-md px-3 py-2 w-full"
              placeholder="Enter search keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && loadCategoryData()}
            />
          </div>

          {loading && (
            <div className="text-center py-8 text-muted-foreground">
              Loading products...
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.name}
                  imageUrl={product.imageUrl}
                />
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {search ? "No products match your search" : "No products in this category yet"}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
