import axios from "axios";
import { refreshToken } from "../services/auth/authService";
import { toast } from "react-toastify";

const baseUrl = "/api";

const api = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = "Bearer " + token;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const handleResponseError = (error: any) => {
  if (!error.response) {
    toast.error("Please try again later");

    return Promise.reject(error);
  }

  if (error.response.status !== 401) {
    toast.error("An error occurred");
    return Promise.reject(error.response);
  }

  const originalRequest = error.config;

  if (originalRequest._retry) {
    // navigate("/login");
    window.location.href = "/login";
    return Promise.reject(error.response);
  }

  originalRequest._retry = true;

  refreshToken()
    .then((response) => {
      localStorage.setItem("token", response.data.access_token);
      return api(originalRequest);
    })
    .catch((error) => {
      if (process.env.NODE_ENV !== "production") {
        toast.error("An error occurred");
      }
      // navigate("/login");
      window.location.href = "/login";

      return Promise.reject(error);
    });
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    handleResponseError(error);
  }
);

export default api;
