import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API_URL;

export const baseApi = axios.create({
  baseURL,
});

export const api = {
  get: <T>(url: string, params?: object) =>
    baseApi.get<T>(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
      ...params,
    }),
  post: <T>(url: string, data: unknown) =>
    baseApi.post<T>(url, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    }),
  patch: <T>(url: string, data: unknown) =>
    baseApi.patch<T>(url, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    }),
  delete: <T>(url: string) =>
    baseApi.delete<T>(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    }),
};
