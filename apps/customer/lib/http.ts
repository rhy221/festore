import envConfig from "@/config";
import axios, { AxiosError, AxiosInstance } from "axios";

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
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
