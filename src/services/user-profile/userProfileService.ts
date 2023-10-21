import { AxiosResponse } from "axios";
import api from "../api-service-base";
import { UserProps } from "../../models/UserProfileModels";
import { UploadRequest, UploadResponse } from "../../models/PostModels";
const API_URL = "/users";

export const getUser = (
  username: string
): Promise<AxiosResponse<UserProps>> => {
  return api.get(`${API_URL}/${username}`);
};
export const upload = (
  request: UploadRequest
): Promise<AxiosResponse<UserProps>> => {
  const formData = new FormData();

  formData.append("file", request.file);
  return api.post(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
