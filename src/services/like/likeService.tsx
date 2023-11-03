import { AxiosResponse } from "axios";
import { LikeProps } from "../../models/LikeModels";
import api from "../api-service-base";
import { UserProps } from "../../models/UserProfileModels";

const API_URL = "/post";

export const likePhoto = (
  photoId: number
): Promise<AxiosResponse<LikeProps>> => {
  return api.post(`${API_URL}/like/${photoId}`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const unlikePhoto = (
  photoId: number
): Promise<AxiosResponse<LikeProps>> => {
  return api.delete(`${API_URL}/like/${photoId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getLikedByUsers = (
  photoId: number
): Promise<AxiosResponse<LikeProps[]>> => {
  return api.get(`${API_URL}/likedBy/${photoId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const checkHasUserLiked = (
  photoId: number,
  userId: string
): Promise<AxiosResponse<LikeProps[]>> => {
  return api.get(`${API_URL}/${photoId}/liked/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
