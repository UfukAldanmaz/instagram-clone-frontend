import { AxiosResponse } from "axios";
import api from "../api-service-base";
import { FollowingResponse } from "../../models/FollowingModels";

const API_URL = "/following";

export const followUser = (
  followingId: string
): Promise<AxiosResponse<FollowingResponse>> => {
  return api.post(`${API_URL}/${followingId}`);
};

export const unfollowUser = (
  followingId: string
): Promise<AxiosResponse<FollowingResponse>> => {
  return api.delete(`${API_URL}/${followingId}`);
};
