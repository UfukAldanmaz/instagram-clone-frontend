import heart from "../assets/heart.svg";
import speach from "../assets/speach-balloon.svg";
import bookmark from "../assets/bookmark.svg";
import emoji from "../assets/emoji.svg";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useEffect, useState } from "react";
import { timeline } from "../services/post/postService";
import { Post } from "../models/PostModels";

const Home: React.FC = (): React.JSX.Element => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    timeline()
      .then((response) => {
        setPosts(response.data);
        console.log("timeline", response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts", error);
      });
  }, []);

  return (
    <div className=" flex items-start flex-col bg-purple-100 p-6 rounded-lg w-96 h-full ml-64 relative">
      {posts.map((post) => (
        <div key={post.id}>
          <ul className="flex flex-col justify-center ">
            <li>Username: {post.user ? post.user.username : "Unknown User"}</li>
            <li>
              <img
                src={post.user && post.user.profilePictureUrl}
                alt="profile-picture"
              />
            </li>
            <li>
              <img src={post.url} alt="post-image" />
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Home;
