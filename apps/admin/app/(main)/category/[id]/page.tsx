"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Input } from "../../../../../../packages/ui/src/components/input";
import { ProductCard } from "components/card";
import { CategoriesAPI, type Category, type Product } from "@/api/categories.api";
import { toast } from "sonner";
import { Spinner } from "@workspace/ui/components/spinner";
import { cn } from "@/lib/utils";

export default function AdminCategoryDetail() {
  const { id } = useParams<{ id: string }>();

  const [search, setSearch] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategoryData = useCallback(async () => {
    if (!id) return;
    setLoading(true);

    try {
      // 1. Load Category Info
      if (!category || category.id !== id) {
        const rawCategory: any = await CategoriesAPI.getById(id);
        if (rawCategory) {
          setCategory({
            id: String(rawCategory.id ?? rawCategory._id),
            name: rawCategory.name,
            slug: rawCategory.slug,
            styles: Array.isArray(rawCategory.styles) ? rawCategory.styles : [],
            isDeleted: Boolean(rawCategory.isDeleted),
            productCount: rawCategory.productCount,
          });
        }
      }

      // 2. Load Products with filters
      const rawProducts = await CategoriesAPI.getProducts(id, { 
        search: search, 
        style: selectedStyle 
      });

      const normalizedProducts: Product[] = (rawProducts || []).map((p: any) => ({
        id: String(p.id ?? p._id),
        name: p.title,
        imageUrl: Array.isArray(p.imageUrls) && p.imageUrls.length ? p.imageUrls[0] : "",
        createdAt: p.createdAt,
      }));

      setProducts(normalizedProducts);
    } catch (error: any) {
      toast.error(`Failed to load data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [id, search, selectedStyle]);

  useEffect(() => {
    loadCategoryData();
  }, [loadCategoryData]);

  const toggleStyle = (style: string) => {
    setSelectedStyle((prev) => (prev === style ? null : style));
  };

  if (loading && !category) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-20 space-y-8">
      {/* Header Section */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {category?.name}
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage product listings and style variations.
          </p>
        </div>

        {/* Styles Filter Tags */}
        {category?.styles?.length && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium mr-2 hidden sm:inline">Styles:</span>
            <button
              onClick={() => setSelectedStyle(null)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all border",
                !selectedStyle 
                  ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                  : "bg-background text-muted-foreground hover:border-foreground"
              )}
            >
              All
            </button>
            {category.styles.map((style) => (
              <button
                key={style}
                onClick={() => toggleStyle(style)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all border",
                  selectedStyle === style
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-background text-muted-foreground hover:border-foreground"
                )}
              >
                {style}
              </button>
            ))}
          </div>
        )}

        {/* Search Bar */}
        <div className="max-w-md">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loadCategoryData()}
            className="w-full shadow-sm"
          />
        </div>
      </div>

      <hr className="border-border" />

      {/* Grid Section */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {products.map((product) => (
            <div key={product.id} className="w-full max-w-[280px] sm:max-w-none">
               <ProductCard
                title={product.name}
                imageUrl={product.imageUrl}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed rounded-2xl bg-muted/30">
          <p className="text-muted-foreground text-lg italic text-center px-4">
            {search || selectedStyle 
              ? "No products found matching your filters" 
              : "No products in this category yet"}
          </p>
          {(search || selectedStyle) && (
            <button 
              onClick={() => {setSearch(""); setSelectedStyle(null);}}
              className="mt-4 text-primary font-semibold hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}