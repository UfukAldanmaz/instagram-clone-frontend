import axios from "axios";
import { AxiosResponse } from "axios";
import {
  AuthResponse,
  LoginFormValues,
  RefreshTokenResponse,
  SignUpFormValues,
} from "../../models/AuthModels";
import api from "../api-service-base";

const API_URL = "/auth";

export const signUp = (
  formData: SignUpFormValues
): Promise<AxiosResponse<any>> => {
  return api.post(`${API_URL}/sign-up`, formData);
};

export const login = (
  formData: LoginFormValues
): Promise<AxiosResponse<AuthResponse>> => {
  return api.post<AuthResponse>(`${API_URL}/login`, formData);
};

export const logout = (): Promise<AxiosResponse<any>> => {
  return api.post(`${API_URL}/logout`);
};

export const refreshToken = (): Promise<
  AxiosResponse<RefreshTokenResponse>
> => {
  return api.post(`${API_URL}/refresh`);
};
