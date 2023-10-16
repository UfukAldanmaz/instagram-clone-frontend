import React, { useState, useEffect } from "react";
import { getUser } from "../services/user-profile/userProfileService";
import { UserProps } from "../models/UserProfileModels";
import {
  followUser,
  unfollowUser,
} from "../services/following-service/followingService";
import { useParams } from "react-router-dom";

const UserProfile: React.FC = () => {
  const { userId, followerId, followingId } = useParams();
  const [user, setUser] = useState<UserProps | null>();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user profile", error);
        });
    }
  }, [userId]);

  const handleFollowClick = () => {
    if (isFollowing && followerId && followingId) {
      unfollowUser(followerId, followingId)
        .then((_response) => {
          setIsFollowing(false);
        })
        .catch((error) => {
          console.error("Error unfollowing user", error);
        });
    } else if (followerId && followingId) {
      followUser(followerId, followingId)
        .then((_response) => {
          setIsFollowing(true);
        })
        .catch((error) => {
          console.error("Error following user", error);
        });
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.username}</h2>
          <button onClick={handleFollowClick}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      ) : (
        <div>Loading user profile...</div>
      )}
    </div>
  );
};

export default UserProfile;
