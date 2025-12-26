import http from "@/lib/http";
import { UserProfileResType, UserProfileStaticsResType } from "@/schemas/user.schema";


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
    const response = await http.get<UserProfileResType>("/users/profile?opt=basics");
    return response.data;
  
  },

  getStatics: async () => {
    const response = await http.get<UserProfileStaticsResType>("/users/profile?opt=statics");
    console.log(response.data);
    return response.data;
  
  },


  updateMe: async (body: FormData) => {
      const response = await http.patch<UserProfileResType>("/users/profile", body, {timeout: 90000});
      return response.data;
  },

   getUserPortfolio: async (userId: string) => {
    const response = await http.get<UserProfileResType>("/users/portfolio", {
      params: {
        userId,
      }
    });
    return response.data;
  
  },

  updateUserPortfolio: async (body: FormData) => {
      const response = await http.patch<UserProfileResType>("/users/portfolio", body, {timeout: 90000});
      return response.data;
  },
};

export default userAction;
