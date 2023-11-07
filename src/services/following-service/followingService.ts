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

export const getFollowing = (): Promise<AxiosResponse<FollowingResponse[]>> => {
  return api.get(`${API_URL}`);
};

export const getFollower = (): Promise<AxiosResponse<FollowingResponse[]>> => {
  return api.get(`${API_URL}/followers`);
};

export const getFollowingsByUsername = (
  username: string
): Promise<AxiosResponse<FollowingResponse[]>> => {
  return api.get(`${API_URL}/${username}/following`);
};

export const getFollowersByUsername = (
  username: string
): Promise<AxiosResponse<FollowingResponse[]>> => {
  return api.get(`${API_URL}/${username}/followers`);
};
