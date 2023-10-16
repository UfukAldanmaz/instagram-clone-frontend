export interface UserProps {
  id: string;
  username: string;
  bio: string;
  profilePictureUrl: string; // URL to the user's profile picture
  followersCount: number; // Number of followers
  followingCount: number; // Number of users being followed by this user
}
export interface GetUserResponse {
  user: UserProps;
}
