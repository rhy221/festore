
import api from "@/lib/http";
import { ChangePasswordBodyType, ForgotPasswordBodyType, LoginBodyType, LoginResType } from "@/schema/auth.schema";

const authAction = {
  login: async (body: LoginBodyType) => {
    try {
       const response = await api.post<LoginResType>("api/admin/login", body);
    return response.data;
    } catch(error) {
      throw error;
    }
   
  },

//   register: async (body: RegisterType) => {
//     const response = await http.post("/auth/register", {...body, origin: process.env.NEXT_PUBLIC_URL + "/verify"});
//     return response.data;
//   },

//   sendVerifyEmail: async (body: SendVerifyEmailBodyType) => {
//     const response = await http.post("/auth/send-verifyemail", {...body, origin: process.env.NEXT_PUBLIC_URL + "/verify"});
//     return response.data;
//   },

  forgotPassword: async (body: ForgotPasswordBodyType) => {
    const response = await api.post("api/admin/forgot-password", {...body, origin: process.env.NEXT_PUBLIC_URL + "/changepassword"});
    return response.data;
  },

  changePassword: async (body: ChangePasswordBodyType) => {
    const response = await api.post("api/admin/reset-password", body);
    return response.data;
  },

//   logout: async () => {
//     const response = await http.delete<LogoutResType>("/session");
//     return response.data;
//   },

//   getMe: async () => {
//     const response = await http.get<LoginResType>("/user/me", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//       },
//     });
//     return response.data;
//   },
};

export default authAction;
