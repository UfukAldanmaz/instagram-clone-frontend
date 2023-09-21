import axios from 'axios';
import { AxiosResponse } from "axios";
import { AuthResponse, LoginFormValues, SignUpFormValues } from '../models/AuthModels';

const API_URL = '/api/auth';

export const signUp = (formData: SignUpFormValues): Promise<AxiosResponse<any>> => {
    return axios.post(`${API_URL}/sign-up`, formData);
}

export const login = (formData: LoginFormValues): Promise<AxiosResponse<AuthResponse>> => {
    return axios.post<AuthResponse>(`${API_URL}/login`, formData);
};