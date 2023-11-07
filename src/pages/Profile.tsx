import { useEffect, useState } from "react";
import { Post } from "../models/PostModels";
import { list } from "../services/post/postService";
import {
  getProfile,
  upload,
} from "../services/user-profile/userProfileService";
import UploadAvatarPhoto from "../components/UploadAvatarPhoto";
import { Popup } from "../components/Popup";
import { UserProps } from "../models/UserProfileModels";
import {
  getFollower,
  getFollowing,
} from "../services/following-service/followingService";
import { FollowingResponse } from "../models/FollowingModels";
import anonymous from "../assets/anonym-avatar.jpeg";
import camera from "../assets/camera.svg";
import CreateContent from "../components/CreateContent";
import { ImageModal } from "../components/ImageModal";

export const Profile = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProps | null | undefined>(null);
  const [avatarSource, setAvatarSource] = useState<string | null>(null);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [followingUsers, setFollowingUsers] = useState<FollowingResponse[]>([]);
  const [followers, setFollowers] = useState<FollowingResponse[]>([]);
  const [popUp, setPopUp] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Post | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    list()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile", error);
      }).finally;
    {
      setLoading(false);
    }

    getProfile()
      .then((response) => {
        setUser(response.data);

        if (response.data.profilePictureUrl) {
          setAvatarSource(response.data.profilePictureUrl);
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile", error);
      });

    getFollowing()
      .then((response) => {
        setFollowingUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching following users:", error);
      });
    getFollower()
      .then((response) => {
        setFollowers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching following users:", error);
      });
  }, []);

  const handleAvatarUpload = async (file: File | null) => {
    if (file) {
      try {
        const response = await upload({ file });
        const { profilePictureUrl } = response.data;

        setAvatarSource(profilePictureUrl);

        setIsAvatarPopupOpen(false);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col items-center justify-between ml-20 mt-4 ">
          <div className="flex flex-col justify-around">
            <div className="flex gap-10 flex-row justify-around items-center overflow-hidden">
              {avatarSource ? (
                <img
                  onClick={() => setIsAvatarPopupOpen(true)}
                  className="inline-block h-36 w-36 rounded-full ring-2 ring-white"
                  src={avatarSource}
                  alt="avatar"
                />
              ) : (
                <img
                  onClick={() => setIsAvatarPopupOpen(true)}
                  className="inline-block h-36 w-36 rounded-full ring-2 ring-white"
                  src={anonymous}
                  alt="avatar"
                />
              )}
              <span>{user?.username}</span>
              <button className="bg-gray-200">Edit Profile</button>
            </div>
            <div className="  ml-32">
              <span className="mr-3"> {followers.length} Followers</span>
              <span> {followingUsers.length} Followings</span>
            </div>
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

            {posts && posts.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {posts.map((post) => {
                  console.log("POST", post);

                  return (
                    <li key={post.id}>
                      <img
                        onClick={() => {
                          setSelectedImage(post);
                          setIsImageModalOpen(true);
                        }}
                        className="w-48 h-48 rounded-lg"
                        src={post.url}
                        alt={`Post ${post.id}`}
                      />
                      <Popup
                        trigger={isImageModalOpen}
                        setTrigger={setIsImageModalOpen}
                      >
                        <ImageModal
                          post={selectedImage}
                          isOpen={isImageModalOpen}
                          onClose={() => setIsImageModalOpen(false)}
                          className="title"
                        />
                      </Popup>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="flex flex-col items-center mt-10 gap-5">
                <div className="border-2 border-gray-600 flex flex-row justify-around items-center overflow-hidden inline-block h-24 w-24 rounded-full ring-2 ring-white">
                  <img className="w-12" src={camera} alt="camera" />
                </div>
                <h2 className="text-[36px]">Share Photos</h2>
                <p>
                  When you share photos, they will appear on your profile.
                </p>{" "}
                <a className="cursor-pointer" onClick={() => setPopUp(true)}>
                  <p className="text-blue-500 hover:text-blue-600 font-semibold">
                    Share your first photo
                  </p>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <Popup
        trigger={isAvatarPopupOpen}
        setTrigger={setIsAvatarPopupOpen}
        title="Change Avatar"
        className="h-24 pb-28 pt-14"
      >
        <UploadAvatarPhoto onUpload={handleAvatarUpload} />
      </Popup>
      <Popup className="classname" trigger={popUp} setTrigger={setPopUp}>
        <CreateContent trigger={popUp} setTrigger={setPopUp} />
      </Popup>
    </>
  );
};
