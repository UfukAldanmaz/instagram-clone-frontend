export interface Following {
  id: string;
  username: string;
  bio: any;
  profilePictureUrl: any;
}

export interface FollowingResponse {
  follower: Following;
  following: Following;
  id: number;
}
