import { UserProps } from "./UserProfileModels";

export interface UploadResponse {
  id: number;
  url: string;
}

export interface UploadRequest {
  file: Blob;
}

export type ListResponse = Post[];

export interface Post {
  id: number;
  url: string;
  user: User;
  username: string;
  likes: LikedByUser[];
  hasLiked: boolean;
}
export interface LikedByUser {
  id: string;
  username: string;
  profilePictureUrl: null | string;
}

export interface User {
  id: string;
  username: string;
  profilePictureUrl: null | string;
}
