import axios from "axios";
import useUserStore from "../stores/user";

const baseURL = import.meta.env.VITE_BASE_API_URL;
export const baseApi = axios.create({
  baseURL,
});

baseApi.interceptors.request.use(
  (config) => {
    const { access_token } = useUserStore.getState();
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = {
  get: <T>(url: string, params?: object) => baseApi.get<T>(url, { ...params }),
  post: <T>(url: string, data: unknown) => baseApi.post<T>(url, data),
  patch: <T>(url: string, data: unknown) => baseApi.patch<T>(url, data),
  delete: <T>(url: string) => baseApi.delete<T>(url),
};
