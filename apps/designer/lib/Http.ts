import envConfig from "@/config";
import { useAuthStore } from "@/stores/authStore";
import { isTokenExpired } from "./jwt"; // Import từ file mới
import axios, { AxiosInstance } from "axios";


class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: envConfig.NEXT_PUBLIC_API_ENDPOINT,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });

    this.instance.interceptors.request.use((config) => {
      if (typeof window !== 'undefined') { 
        const token = useAuthStore.getState().token;
        if (token) {
          if (isTokenExpired(token)) {
            useAuthStore.getState().logout();
          } else {
            config.headers.set("Authorization", `Bearer ${token}`);
          }
        }
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (typeof window !== 'undefined') { 
          const status = error.response?.status;
          const data = error.response?.data as any;

          if (status === 401 && (data?.message === "User has been bannned" || data?.message === "User is inactive")) {
            alert("Your account has been banned. Please contact admin!");
            useAuthStore.getState().logout();
            window.location.href = "/auth/login";
          }
        }
        return Promise.reject(error.response?.data || error);
      }
    );
  }
}

const http = new Http().instance;
export default http;