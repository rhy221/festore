import http from "@/lib/http";

export type ProductKind = "selling" | "auction" | "bought";
export type UserProduct = {
  id: string;
  name: string;
  thumbUrl: string;
  kind: ProductKind;
};

const MOCK_KEY = "fe_mock_user_products";
const useMockEnv =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_USE_MOCK === "true";

function readMock(): UserProduct[] {
  const initial: UserProduct[] = [
    { id: "1", name: "Product 1", thumbUrl: "https://picsum.photos/seed/p1/600/400", kind: "selling" },
    { id: "2", name: "Product 2", thumbUrl: "https://picsum.photos/seed/p2/600/400", kind: "auction" },
    { id: "3", name: "Product 3", thumbUrl: "https://picsum.photos/seed/p3/600/400", kind: "bought" },
  ];
  if (typeof window === "undefined") return initial;
  const raw = localStorage.getItem(MOCK_KEY);
  if (!raw) {
    localStorage.setItem(MOCK_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("invalid");
    // migrate legacy entries without kind to default "selling"
    const normalized = parsed.map((p: any) => ({
      id: String(p?.id ?? ""),
      name: String(p?.name ?? ""),
      thumbUrl: String(p?.thumbUrl ?? ""),
      kind: (p?.kind === "selling" || p?.kind === "auction" || p?.kind === "bought") ? p.kind : "selling",
    }));
    return normalized as UserProduct[];
  } catch {
    localStorage.setItem(MOCK_KEY, JSON.stringify(initial));
    return initial;
  }
}

function writeMock(payload: UserProduct[]) {
  if (typeof window === "undefined") return null;
  localStorage.setItem(MOCK_KEY, JSON.stringify(payload ?? []));
  return payload;
}

const productsAction = {
  get: async (): Promise<UserProduct[]> => {
    if (useMockEnv) return Promise.resolve(readMock());
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("access_token")
          : null;
      const res = await http.get<unknown>("/user/products", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const data = Array.isArray((res as any).data)
        ? ((res as any).data as UserProduct[])
        : (res as any).data
        ? [((res as any).data as UserProduct)]
        : [];
      try {
        writeMock(data);
      } catch {}
      return data;
    } catch (err) {
      return readMock();
    }
  },
};
export default productsAction;
