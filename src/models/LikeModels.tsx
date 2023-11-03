export interface LikeProps {
  id: number;
  url: string;
  user: User;
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
