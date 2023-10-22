import { useEffect, useState } from "react";
import { ListResponse, Post } from "../models/PostModels";
import { list } from "../services/post/postService";
import { upload } from "../services/user-profile/userProfileService";
import UploadAvatarPhoto from "../components/UploadAvatarPhoto";
import { Popup } from "../components/Popup";
import anonymous from "../assets/anonym-avatar.jpeg";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const Profile = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const {
    value: avatarSource,
    setItem: setAvatarSource,
    getItem,
  } = useLocalStorage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await list();
        const responseData: ListResponse = response.data;
        console.log("profile", response.data);

        setPosts(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Load the avatar URL from local storage when the component mounts
    const storedAvatar = getItem("userAvatar");
    if (storedAvatar) {
      setAvatarSource("userAvatar", storedAvatar);
    }
  }, []);
  const handleAvatarUpload = async (file: File | null) => {
    if (file) {
      try {
        const response = await upload({ file });
        const { profilePictureUrl } = response.data; // Make sure the response data structure matches UserProps
        console.log("avatar", response.data);

        setAvatarSource("userAvatar", profilePictureUrl);
        setIsAvatarPopupOpen(false); // Close the avatar upload popup
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle the error here if needed
      }
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col ml-32 mb-64 bt-gray-800">
          <div className="flex flex-row items-center gap-2">
            <div className="flex -space-x-2 overflow-hidden">
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
            </div>
            <p>username</p> <span>•</span> <span>12h</span>
          </div>
          <div className="flex flex-row justify-center items-center">
            <h6 className="font-sm">Post</h6>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
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
          </ul>
        </div>
      )}

      <Popup
        trigger={isAvatarPopupOpen}
        setTrigger={setIsAvatarPopupOpen}
        title="Change Avatar"
      >
        <UploadAvatarPhoto onUpload={handleAvatarUpload} />
      </Popup>
    </>
  );
};
