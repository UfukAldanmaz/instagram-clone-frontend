import axios from "axios";
import { AxiosResponse } from "axios";
import {
  ListResponse,
  UploadRequest,
  UploadResponse,
} from "../../models/PostModels";
import api from "../api-service-base";

const API_URL = "/post";

export const upload = (
  request: UploadRequest
): Promise<AxiosResponse<UploadResponse>> => {
  const formData = new FormData();

  formData.append("file", request.file);
  return api.post(`${API_URL}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const list = (): Promise<AxiosResponse<ListResponse>> => {
  return api.get(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const timeline = (): Promise<AxiosResponse<ListResponse>> => {
  return api.get(`${API_URL}/timeline`);
};
