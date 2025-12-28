import http from "@/lib/http";

type UserStats = {
  rating?: number;
  followers?: number;
  followings?: number;
  likes?: number;
}
const MOCK_KEY = "fe_mock_user_statics";
const useMockEnv =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_USE_MOCK === "true";
function readMock(): UserStats {
  const initial: UserStats = {
    rating: 4.0,
    followers: 20,
    followings: 5,
    likes: 100,
  };
  if (typeof window === "undefined") return initial;
  const raw = localStorage.getItem(MOCK_KEY);
  if (!raw) {
    localStorage.setItem(MOCK_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(raw) as UserStats;
  } catch {
    return initial;
  }
}
function writeMock(payload: Partial<UserStats>) {
  if (typeof window === "undefined") return null;
  const cur = readMock();
  const merged = { ...cur, ...payload };
  localStorage.setItem(MOCK_KEY, JSON.stringify(merged));
  return merged;
}
const staticsAction = {
  get: async (): Promise<UserStats> => {
    if (useMockEnv) return Promise.resolve(readMock());
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("access_token")
          : null;
      const res = await http.get<UserStats>("/user/statics", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      try {
        writeMock(res.data);
      } catch {}
      return res.data;
    } catch (err) {
      return readMock();
    }
  },
};
export default staticsAction;