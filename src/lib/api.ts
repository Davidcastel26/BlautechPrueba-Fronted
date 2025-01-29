import { AxiosRequestConfig } from "axios";
import apiInstance from "./apiInstance";

const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    return await apiInstance.get<T>(url, config);
  },

  post: async <T>(url: string, data: any, config?: AxiosRequestConfig) => {
    return await apiInstance.post<T>(url, data, config);
  },

  put: async <T>(url: string, data: any, config?: AxiosRequestConfig) => {
    return await apiInstance.put<T>(url, data, config);
  },

  patch: async <T>(url: string, data: any, config?: AxiosRequestConfig) => {
    return await apiInstance.patch<T>(url, data, config);
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    return await apiInstance.delete<T>(url, config);
  },
};

export default api;
