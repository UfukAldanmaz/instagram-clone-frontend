import axios from "axios";
import { AxiosResponse } from "axios";
import {
  ListResponse,
  UploadRequest,
  UploadResponse,
} from "../../models/PostModels";

const API_URL = "/api/post";

export const upload = (
  request: UploadRequest
): Promise<AxiosResponse<UploadResponse>> => {
  const formData = new FormData();

  formData.append("file", request.file);
  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const list = (): Promise<AxiosResponse<ListResponse>> => {
  return axios.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
