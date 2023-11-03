import { AxiosResponse } from "axios";
import { CommentProps } from "../../models/CommentModels";
import api from "../api-service-base";

const API_URL = "/post";

export const addComment = (
  photoId: number,
  comment: string
): Promise<AxiosResponse<CommentProps>> => {
  return api.post(
    `${API_URL}/comment/${photoId}`,
    { comment },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
