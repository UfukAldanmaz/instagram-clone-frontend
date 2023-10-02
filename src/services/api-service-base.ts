import axios, { AxiosError } from "axios";
// import * as notification from '@/components/notification'
import { refreshToken } from "../services/auth/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const baseUrl = "/api";

const api = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
});

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const handleResponseError = async (error: any) => {
  const navigate = useNavigate();

  if (!error.response) {
    toast.error("Please try again later");

    return Promise.reject(error);
  }

  if (error.response.status !== 401) {
    toast.error("An error occurred");
    return Promise.reject(error.response);
  }

  const originalRequest = error.config;

  if (
    error.response.headers["token-expired"] != "true" ||
    originalRequest._retry
  ) {
    navigate("/login");
    return Promise.reject(error.response);
  }

  originalRequest._retry = true;
  try {
    await refreshToken();
    const response = await api(originalRequest); // Retry the original request
    return response;
  } catch (refreshError) {
    if (process.env.NODE_ENV !== "production") {
      toast.error("An error occurred");
    }
    navigate("/login");
    return Promise.reject(refreshError);
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await handleResponseError(error);
    }
    return Promise.reject(error);
  }
);

export default api;
