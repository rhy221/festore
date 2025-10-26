import {
  LoginBodyType,
  LoginResType,
  LogoutResType,
  RegisterBodyType,
  RegisterResType,
  SendVerifyEmailBodyType,
  
} from "@/schema/auth.schema";
import http from "@/lib/http";

const authAction = {
  login: async (body: LoginBodyType) => {
    const response = await http.post<LoginResType>("/auth/login", body);
    return response.data;
  },

  register: async (body: RegisterBodyType) => {
    const response = await http.post<RegisterResType>("/auth/register", {...body, origin: process.env.NEXT_PUBLIC_URL + "/verify"});
    return response.data;
  },

  sendVerifyEmail: async (body: SendVerifyEmailBodyType) => {
    const response = await http.post<SendVerifyEmailBodyType>("/auth/send-verifyemail", {...body, origin: process.env.NEXT_PUBLIC_URL + "/verify"});
    return response.data;
  },

  logout: async () => {
    const response = await http.delete<LogoutResType>("/session");
    return response.data;
  },

  getMe: async () => {
    const response = await http.get<LoginResType>("/user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },
};

export default authAction;
