import http from "@/lib/http";

type UserMe = {
  id?: number;
  name?: string;
  email?: string;
  description?: string;
  status?: string;
  joinedAt?: string;
  avatar?: string;
};

const MOCK_KEY = "fe_mock_user_me";

const useMockEnv = typeof process !== "undefined" && process.env.NEXT_PUBLIC_USE_MOCK === "true";

function readMock(): UserMe {
  if (typeof window === "undefined") return { description: "chillguy", name: "John", email: "Johnht@gmail.com", status: "active", joinedAt: "2/2/2020", avatar: "https://picsum.photos/seed/picsum/200/300" };
  const raw = localStorage.getItem(MOCK_KEY);
  if (!raw) {
    const initial = { description: "chillguy", name: "John", email: "Johnht@gmail.com", status: "active", joinedAt: "2/2/2020", avatar: "https://picsum.photos/seed/picsum/200/300" };
    localStorage.setItem(MOCK_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(raw) as UserMe;
  } catch {
    return { description: "chillguy" };
  }
}

function writeMock(payload: Partial<UserMe>) {
  if (typeof window === "undefined") return null;
  const cur = readMock();
  const merged = { ...cur, ...payload };
  localStorage.setItem(MOCK_KEY, JSON.stringify(merged));
  return merged;
}

const userAction = {
  getMe: async (): Promise<UserMe> => {
    if (useMockEnv) {
      return Promise.resolve(readMock());
    }

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
      const res = await http.get("/user/me", { headers: { Authorization: token ? `Bearer ${token}` : "" } });
      // persist a copy locally for offline/mock fallback
      try { writeMock(res.data); } catch {}
      return res.data;
    } catch (err) {
      // fallback to mock data if backend unavailable
      return readMock();
    }
  },

  updateMe: async (body: Partial<UserMe>): Promise<UserMe> => {
    if (useMockEnv) {
      return Promise.resolve(writeMock(body) as UserMe);
    }

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
      const res = await http.put("/user/me", body, { headers: { Authorization: token ? `Bearer ${token}` : "" } });
      try { writeMock(res.data); } catch {}
      return res.data;
    } catch (err) {
      // fallback: update mock locally so UI can continue
      return writeMock(body) as UserMe;
    }
  },
};

export default userAction;
