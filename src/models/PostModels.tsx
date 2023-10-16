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
  user: UserProps[];
}
