import heart from "../assets/heart.svg";
import speach from "../assets/speach-balloon.svg";
import bookmark from "../assets/bookmark.svg";
import { useEffect, useState } from "react";
import { timeline } from "../services/post/postService";
import { Post } from "../models/PostModels";
import anonymous from "../assets/anonym-avatar.jpeg";
import { Link } from "react-router-dom";

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
    <div className=" flex items-start flex-col p-6 rounded-lg w-96 h-full ml-64 relative">
      {posts.map((post) => (
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
              <Link
                className="text-gray-700 hover:text-gray-700"
                to={`/user/${post.user?.username}`}
              >
                <li>{post.user ? post.user.username : "Unknown User"}</li>
              </Link>
              <span className="text-2xl absolute top-0 right-3">...</span>
            </div>
            <li className="my-4">
              <img
                className="w-96 rounded-xl"
                src={post.url}
                alt="post-image"
              />
            </li>
            <div className="flex  flex-row gap-4 mt-2 mb-5">
              <img src={heart} />
              <img src={speach} />
              <img className="absolute right-6" src={bookmark} />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-left text-sm mt-2">5 likes</p>
              <div className="flex flex-row gap-3">
                <p>username</p> <p>Some comments</p>
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
