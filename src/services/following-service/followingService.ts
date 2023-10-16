import { AxiosResponse } from "axios";
import api from "../api-service-base";
import { FollowingResponse } from "../../models/FollowingModels";

const API_URL = "/following";

export const followUser = (
  followerId: string,
  followingId: string
): Promise<AxiosResponse<FollowingResponse>> => {
  return api.post(`${API_URL}/${followerId}/${followingId}`);
};

export const unfollowUser = (
  followerId: string,
  followingId: string
): Promise<AxiosResponse<FollowingResponse>> => {
  return api.delete(`${API_URL}/${followerId}/${followingId}`);
};
