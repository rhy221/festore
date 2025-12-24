import envConfig from "@/config";
import { useAuthStore } from "@/stores/authStore";
import axios, { AxiosError, AxiosInstance } from "axios";

function decodeJwtPayload(token: string) {
  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return null;
    return JSON.parse(atob(payloadBase64));
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string) {
  
  if(!token) return false;

  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

class Http {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: envConfig.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
          }
        const token =  useAuthStore.getState().token;

        if (token) {
          if (isTokenExpired(token)) {
              useAuthStore.getState().logout();
          } else {
            config.headers.set(
              "Authorization",
              `Bearer ${token}`
            );
          }
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const status = error.response?.status;
        const data = error.response?.data as any;

        // 1. Kiểm tra lỗi Banned (Thường là 401 hoặc 403 kèm message cụ thể)
        // Lưu ý: data.message phải khớp với chuỗi bạn gửi từ Backend
        if (
          status === 401 && 
          (data?.message === "User has been bannned" || data?.message === "User is inactive")
        ) {
          // Hiển thị thông báo
          alert("Your account has been banned. Please contact to admin!");

          // Xóa token và trạng thái auth
          localStorage.removeItem("accessToken");
          
          
          useAuthStore.getState().logout();

          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }
        }

        // 2. Trả về lỗi như bình thường để các hàm gọi API xử lý tiếp (nếu cần)
        if (error.response) return Promise.reject(error.response.data);
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
