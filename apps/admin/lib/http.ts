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
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

// 🟢 KHÔNG GÂY LỖI NỮA
const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT!;

class Http {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
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

        const token = localStorage.getItem("accessToken");

        if (token) {
          if (isTokenExpired(token)) {
            localStorage.removeItem("accessToken");
          } else {
            config.headers.set("Authorization", `Bearer ${token}`);
          }
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) return Promise.reject(error.response.data);
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
