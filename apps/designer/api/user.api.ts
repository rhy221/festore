import http from "@/lib/http";
import { UserProfileResType } from "@/schema/user.schema";


// const MOCK_KEY = "fe_mock_user_me";

// const useMockEnv = typeof process !== "undefined" && process.env.NEXT_PUBLIC_USE_MOCK === "true";

// function readMock(): UserMe {
//   if (typeof window === "undefined") return { description: "chillguy", name: "John", email: "Johnht@gmail.com", status: "active", joinedAt: "2/2/2020", avatar: "https://picsum.photos/seed/picsum/200/300" };
//   const raw = localStorage.getItem(MOCK_KEY);
//   if (!raw) {
//     const initial = { description: "chillguy", name: "John", email: "Johnht@gmail.com", status: "active", joinedAt: "2/2/2020", avatar: "https://picsum.photos/seed/picsum/200/300" };
//     localStorage.setItem(MOCK_KEY, JSON.stringify(initial));
//     return initial;
//   }
//   try {
//     return JSON.parse(raw) as UserMe;
//   } catch {
//     return { description: "chillguy" };
//   }
// }

// function writeMock(payload: Partial<UserMe>) {
//   if (typeof window === "undefined") return null;
//   const cur = readMock();
//   const merged = { ...cur, ...payload };
//   localStorage.setItem(MOCK_KEY, JSON.stringify(merged));
//   return merged;
// }

const userAction = {
  getMe: async () => {
    // if (useMockEnv) {
    //   return Promise.resolve(readMock());
    // }

    // try {
    //   const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    //   const res = await http.get("/user/me", { headers: { Authorization: token ? `Bearer ${token}` : "" } });
    //   // persist a copy locally for offline/mock fallback
    //   try { writeMock(res.data); } catch {}
    //   return res.data;
    // } catch (err) {
    //   // fallback to mock data if backend unavailable
    //   return readMock();
    // }

    const response = await http.get<UserProfileResType>("/users/profile");
    return response.data;
  
  },

  updateMe: async (body: FormData) => {
      const response = await http.patch<UserProfileResType>("/user/me", body);
      return response.data;
  }
};

export default userAction;
