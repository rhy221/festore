"use client";
import { useEffect, useState } from "react";
import productsAction, { type UserProduct } from "@/api/products.api";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import {
  Car,
  Pencil,
  PersonStanding,
  Search,
  Star,
  ThumbsUp,
  UserPlus,
  UserRoundPlus,
} from "lucide-react";

export default function Products() {
  const [modals, setModals] = useState<UserProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All");
  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        const data = await productsAction.get();
        if (!mounted) return;
        setModals(data);
      } catch (e) {
        // giữ nguyên danh sách rỗng khi lỗi
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <Card className="py-0">
          <TabsList className="w-full justify-around">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Sellings">Sellings</TabsTrigger>
            <TabsTrigger value="Auctions">Auctions</TabsTrigger>
            <TabsTrigger value="Boughts">Boughts</TabsTrigger>
          </TabsList>
          <div className="flex px-4 pb-4 gap-2">
            <Input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button>
              <Search />
            </Button>
          </div>
        </Card>

        <TabsContent value="All">
          {loading ? (
            <ProductsSkeleton />
          ) : (
            <ModalListing modals={filterByQuery(filterByTab(modals, tab), query)} />
          )}
        </TabsContent>
        <TabsContent value="Sellings">
          {loading ? (
            <ProductsSkeleton />
          ) : (
            <ModalListing modals={filterByQuery(filterByTab(modals, tab), query)} />
          )}
        </TabsContent>
        <TabsContent value="Auctions">
          {loading ? (
            <ProductsSkeleton />
          ) : (
            <ModalListing modals={filterByQuery(filterByTab(modals, tab), query)} />
          )}
        </TabsContent>
        <TabsContent value="Boughts">
          {loading ? (
            <ProductsSkeleton />
          ) : (
            <ModalListing modals={filterByQuery(filterByTab(modals, tab), query)} />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
function filterByQuery(items: UserProduct[], q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return items;
  return items.filter((it) => it.name.toLowerCase().includes(s));
}
function filterByTab(items: UserProduct[], tab: string) {
  switch (tab) {
    case "Sellings":
      return items.filter((it) => it.kind === "selling");
    case "Auctions":
      return items.filter((it) => it.kind === "auction");
    case "Boughts":
      return items.filter((it) => it.kind === "bought");
    default:
      return items;
  }
}
function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-4 w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="w-full overflow-hidden py-0">
          <div className="flex flex-col">
            <Skeleton className="w-full h-48" />
            <div className="px-4 py-2">
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
function ModalListing({ modals }: { modals: UserProduct[] }) {
  return (
    <div className="grid grid-cols-3 grid-flow-row gap-4 w-full">
      {modals.map((m, index) => (
        <Modal key={index} {...m} />
      ))}
    </div>
  );
}

function Modal({ name, thumbUrl }: UserProduct) {
  return (
    <Card className="w-full overflow-hidden py-0 ">
      <div className="flex flex-col">
        <div className="relative">
          <img src={thumbUrl} alt="Thumb" className="w-full h-48" />
        </div>
        <div className="px-4 py-2">
          <h3>{name}</h3>
        </div>
      </div>
    </Card>
  );
}
