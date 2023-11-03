import { User } from "./AuthModels";
import { Post } from "./PostModels";

export interface CommentProps {
  id: number;
  user: User;
  photo: Post;
  comment: string;
  createdAt: Date;
}
