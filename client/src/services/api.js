import axios from "axios";

const getBaseUrl = () => {
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ) {
    const envUrl = import.meta.env.VITE_API_URL;
    if (envUrl && (envUrl.includes("localhost") || envUrl.includes("127.0.0.1"))) {
      return envUrl;
    }
    return "http://localhost:3200/api";
  }
  return import.meta.env.VITE_API_URL || "http://localhost:3200/api";
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config.url.includes("/auth/login") &&
      !error.config.url.includes("/auth/register")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;