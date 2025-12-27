import envConfig from "@/config";
import { isTokenExpired } from "@/lib/jwt";
import { useAuthStore } from "@/stores/authStore";
import axios, { AxiosInstance } from "axios";

// Biến cờ dùng để chặn việc hiện nhiều alert cùng lúc
let isRedirecting = false;

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
            // Chỉ logout và chặn request nếu chưa có tiến trình redirect nào
            if (!isRedirecting) {
              useAuthStore.getState().logout();
            }
            return Promise.reject(new Error("Token expired"));
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
          const message = data?.message;

          if (status === 401) {
            // Nếu đang trong quá trình xử lý redirect thì bỏ qua các lỗi 401 sau đó
            if (isRedirecting) return Promise.reject(error);

            let alertMessage = "";

            if (message === "User has been bannned" || message === "User is inactive") {
              alertMessage = "Your account has been banned";
            } 

            if (alertMessage) {
              isRedirecting = true; // Đánh dấu bắt đầu quá trình xử lý
              alert(alertMessage);
              
              useAuthStore.getState().logout();
              window.location.href = "/login";
              
              // Lưu ý: window.location.href sẽ làm mới trang nên 
              // biến isRedirecting sẽ tự động reset về false khi trang mới load.
            }
          }
        }
        return Promise.reject(error.response?.data || error);
      }
    );
  }
}

const http = new Http().instance;
export default http;