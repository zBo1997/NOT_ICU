import axios, { AxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// 创建 axios 实例
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器，可以在每个请求前做一些处理，比如添加 token
api.interceptors.request.use(
  (config) => {
    // 这里可以添加 token 或其他公共请求头
    const token = localStorage.getItem("user");
    console.log("token", token);
    if (token) {
      config.headers["Authorization"] = `${JSON.parse(localStorage.getItem("user") || "{}").token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器，可以在收到响应后处理一些逻辑
api.interceptors.response.use(
  (response) => {
    return response.data;
  }, // 只返回数据部分
  (error) => {
    // 错误处理
    if (error.response) {
      console.error("API 请求错误: ", error.response);
      // 处理不同类型的错误
      if (error.response.status === 401) {
        // 例如未授权，跳转到登录页
        window.location.href = "/login";
      }
      if (error.response.status === 500) {
        // 例如服务器错误，显示错误提示
        console.error("服务器错误: ", error.response.data);
      }
    } else {
      console.error("请求失败: ", error.message);
    }
    return Promise.reject(error);
  }
);

// 通用的 GET 请求
export const get = <T>(url: string, config?: AxiosRequestConfig) => {
  return api.get<T>(url, config);
};

// 通用的 POST 请求
export const post = <T>(url: string, data: Record<string, unknown>, config?: AxiosRequestConfig) => {
  return api.post<T>(url, data, config);
};

// 可以继续扩展更多的请求方法，如 PUT, DELETE 等
export const put = <T>(url: string, data: Record<string, unknown>, config?: AxiosRequestConfig) => {
  return api.put<T>(url, data, config);
};

// 可提交formData的POST请求
export const postFormData = <T>(url: string, data: FormData, config?: AxiosRequestConfig) => {
  return api.post<T>(url, data, config);
};

export const del = <T>(url: string, config?: AxiosRequestConfig) => {
  return api.delete<T>(url, config);
};
