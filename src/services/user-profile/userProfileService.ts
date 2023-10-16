import { AxiosResponse } from "axios";
import api from "../api-service-base";
import { GetUserResponse } from "../../models/UserProfileModels";
const API_URL = "/users";

export const getUser = (
  userId: string
): Promise<AxiosResponse<GetUserResponse>> => {
  return api.get(`${API_URL}/${userId}`);
};
