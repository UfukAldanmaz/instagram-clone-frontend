import React, { useState, useEffect } from "react";
import { getUser } from "../services/user-profile/userProfileService";
import { UserProps } from "../models/UserProfileModels";
import {
  followUser,
  getFollowing,
  unfollowUser,
} from "../services/following-service/followingService";
import { useParams } from "react-router-dom";
import { ListResponse, Post } from "../models/PostModels";
import { listUserPost } from "../services/post/postService";
import anonymous from "../assets/anonym-avatar.jpeg";

const UserProfile: React.FC = () => {
  const { username } = useParams();
  const [user, setUser] = useState<UserProps | null>();
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username) {
      getUser(username)
        .then((response) => {
          const userData = response.data;
          setUser(userData);
          setLoading(false);
          if (userData) {
            // Now that we have user data, we can check follow status
            getFollowing()
              .then((followResponse) => {
                console.log("followRes", followResponse);
                const userIsFollowed = followResponse.data.find(
                  (followingUser) => followingUser.following.id == userData.id
                );
                console.log("userIS", userIsFollowed);

                setIsFollowing(userIsFollowed != null);
              })
              .catch((error) => {
                console.error("Error fetching following users:", error);
                setLoading(false);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching user profile", error);
        });
      listUserPost(username)
        .then((response) => {
          setPosts(response.data as ListResponse);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [username]);

  const handleFollowClick = () => {
    if (!user) {
      return;
    }

    // Send a request to the server to toggle follow status
    if (isFollowing) {
      unfollowUser(user.id)
        .then((_response) => {
          // Update the follow status in the local state
          setIsFollowing(false);
        })
        .catch((error) => {
          console.error("Error unfollowing user", error);
        });
    } else {
      followUser(user.id)
        .then((_response) => {
          // Update the follow status in the local state
          setIsFollowing(true);
        })
        .catch((error) => {
          console.error("Error following user", error);
        });
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading user profile...</div>
      ) : (
        user && (
          <div className="flex flex-col items-center justify-center ml-20 mt-4 ">
            <div className="flex gap-4 justify-around items-center overflow-hidden">
              {user.profilePictureUrl ? (
                <img
                  className="inline-block h-36 w-36 rounded-full ring-2 ring-white"
                  src={user.profilePictureUrl}
                  alt="avatar"
                />
              ) : (
                <img
                  className="inline-block h-36 w-36 rounded-full ring-2 ring-white"
                  src={anonymous}
                  alt="avatar"
                />
              )}
              <h2 className="font-semibold">{user.username}</h2>
              <button
                className="text-white bg-blue-400 hover:outline-none"
                onClick={handleFollowClick}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
            <div className="flex flex-col justify-center items-center mt-10">
              <div className="mb-4 border-t border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center gap-4">
                  <li className="mr-2" role="presentation">
                    <button className="inline-block p-4 ">Posts</button>
                  </li>
                  <li className="mr-2" role="presentation">
                    <button className="inline-block p-4 ">Reels</button>
                  </li>
                  <li className="mr-2" role="presentation">
                    <button className="inline-block p-4 ">Tagged</button>
                  </li>
                </ul>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {posts.map((post) => {
                  return (
                    <li key={post.id}>
                      <img
                        className="w-48 h-48 rounded-lg"
                        src={post.url}
                        alt={`Post ${post.id}`}
                      />
                    </li>
                  );
                })}
              </ul>{" "}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default UserProfile;
