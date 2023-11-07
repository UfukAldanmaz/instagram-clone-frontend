import heart from "../assets/heart.svg";
import redHeart from "../assets/redHeart.svg";

import speach from "../assets/speach-balloon.svg";
import bookmark from "../assets/bookmark.svg";
import { useEffect, useState } from "react";
import { timeline } from "../services/post/postService";
import { Post } from "../models/PostModels";
import anonymous from "../assets/anonym-avatar.jpeg";
import { Link } from "react-router-dom";
import {
  checkHasUserLiked,
  likePhoto,
  unlikePhoto,
} from "../services/like/likeService";
import LikedBy from "../components/LikedBy";
import { useAuth } from "../hooks/useAuth";
import { User } from "../models/AuthModels";
import { getProfile } from "../services/user-profile/userProfileService";
import { UserProps } from "../models/UserProfileModels";

const Home: React.FC = (): React.JSX.Element => {
  const [posts, setPosts] = useState<Post[]>([]);
  // const [likedStates, setLikedStates] = useState<boolean[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);

  const [trigger, setTrigger] = useState<boolean>(false);
  const { getUser } = useAuth();
  useEffect(() => {
    getProfile()
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile", error);
      });
  }, []);

  const fetchTimeline = async () => {
    try {
      const response = await timeline();
      if (response.data && response.data.length > 0) {
        const currentUserId = getUser()?.id;
        const userId = getUser() ? currentUserId : null;

        const updatedPosts = await Promise.all(
          response.data.map(async (post) => {
            if (userId) {
              const hasLikedResponse = await checkHasUserLiked(post.id, userId);
              const hasLiked = hasLikedResponse.data.length > 0;
              post.hasLiked = hasLiked;
            }
            return post;
          })
        );

        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error("Error fetching and updating the timeline", error);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

  const handleLikeClick = async (photoId: number, index: number) => {
    try {
      const updatedPosts = [...posts];

      if (updatedPosts[index].hasLiked) {
        await unlikePhoto(photoId);
        updatedPosts[index].hasLiked = false;
        updatedPosts[index].likes.length -= 1;
        setSelectedPost(null);
      } else {
        await likePhoto(photoId);
        updatedPosts[index].hasLiked = true;
        updatedPosts[index].likes.length += 1;
        setSelectedPost(updatedPosts[index]);
      }

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error handling like/unlike", error);
    }
  };
  const handleLikesCountClick = (post: Post) => {
    setSelectedPost(post);
    setTrigger(true);
  };
  return (
    <div className=" flex items-start flex-col p-6 rounded-lg w-[500px] h-full ml-64 relative">
      {posts.map((post, index) => (
        <div key={post.id}>
          <ul className="flex flex-col justify-center">
            <div className="flex flex-row gap-4 items-center float-left relative">
              <li>
                {post.user.profilePictureUrl ? (
                  <img
                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                    src={post.user && post.user.profilePictureUrl}
                    alt="profile-picture"
                  />
                ) : (
                  <img
                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                    src={anonymous}
                    alt="profile-picture"
                  />
                )}
              </li>
              {currentUser ? (
                <Link
                  className="text-gray-700 hover:text-gray-700"
                  to={
                    currentUser && post.user?.username === currentUser.username
                      ? "/profile"
                      : `/user/${post.user?.username || ""}`
                  }
                >
                  {post.user ? post.user.username : "Unknown User"}
                </Link>
              ) : (
                <Link to={`/user/${post.user?.username}`}>
                  {post.user ? post.user.username : "Unknown User"}
                </Link>
              )}
              <span className="text-2xl absolute top-0 right-3">...</span>
            </div>
            <li className="my-4">
              <img
                className="w-[500px] rounded-xl"
                src={post.url}
                alt="post-image"
              />
            </li>
            <div className="flex  flex-row gap-4 mt-2 mb-5">
              <img
                src={post.hasLiked ? redHeart : heart}
                onClick={() => handleLikeClick(post.id, index)}
              />

              <img src={speach} />
              <img className="absolute right-6" src={bookmark} />
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-left text-sm mt-2">
                {" "}
                {post.likes?.length ? (
                  <span onClick={() => handleLikesCountClick(post)}>
                    {post.likes.length}{" "}
                    {post.likes.length === 1 ? "like" : "likes"}
                  </span>
                ) : (
                  <span>{post.likes?.length || "No likes"}</span>
                )}
                {selectedPost && (
                  <LikedBy
                    likedUsers={selectedPost.likes}
                    trigger={trigger}
                    setTrigger={setTrigger}
                  />
                )}
              </div>
              <div className="flex flex-row gap-3">
                <li>{post.user ? post.user.username : "Unknown User"}</li>
              </div>
            </div>
            <input
              placeholder="Add a comment..."
              className="w-full mt-4 text-sm outline-none"
            />
            <hr className="mb-8 mt-2" />
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Home;
