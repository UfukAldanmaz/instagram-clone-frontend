import heart from "../assets/heart.svg";
import speach from "../assets/speach-balloon.svg";
import bookmark from "../assets/bookmark.svg";
import emoji from "../assets/emoji.svg";
import { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { timeline } from "../services/post/postService";
import { Post } from "../models/PostModels";

const Home: React.FC = (): React.JSX.Element => {
  const [openEmojiBox, setOpenEmojiBox] = useState(false);
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts with usernames when the component mounts
    timeline()
      .then((response) => {
        setPosts(response.data);
        console.log("Posts:", response.data);
        response.data.forEach((post) => {
          console.log("Post:", post);
          // console.log("Username:", post.user[0].username);
        });
      })
      .catch((error) => {
        console.error("Error fetching posts", error);
      });
  }, []);

  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmojis([...selectedEmojis, emoji.native]);
    setOpenEmojiBox(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const comment = inputText + selectedEmojis.join("");
      setComments([...comments, comment]);
      setInputText("");
      setSelectedEmojis([]);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setInputText(e.currentTarget.textContent || "");
  };
  return (
    <div className=" flex items-start flex-col bg-purple-100 p-6 rounded-lg w-96 h-full relative">
      {posts.map((post) => (
        <div key={post.id}>
          {/* <p>{post.content}</p> */}
          {/* Display the username from the post data */}
          <ul>
            <li> Username: {post.user && post.user.username}</li>
            <li>
              {" "}
              <img src={post.url} alt="image" />
            </li>
          </ul>
        </div>
      ))}
      {/* <div className="flex flex-row items-center gap-2">
        <div className="flex -space-x-2 overflow-hidden">
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <p>username</p> <span>•</span> <span>12h</span>
      </div> */}
      {/* <span className="text-2xl absolute top-0 right-3">...</span>
      <img
        className="mt-4"
        src="https://akademidunyasi.com.tr/panel/assets/img/site/yazi/489resim%20kursu%208.jpeg"
      />
      <div className="flex  flex-row gap-4 mt-2">
        <img src={heart} />
        <img src={speach} />
        <img className="absolute right-6" src={bookmark} />
      </div> */}
      {/* 
      <p className="font-bold text-sm mt-2">5 likes</p>
      <div className="flex flex-row gap-3">
        <p>username</p> <p>Some comments</p>
      </div>
      <input
        placeholder="Add a comment..."
        className="w-full mt-4 text-sm outline-none"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      /> */}
      {/* <div className="emoji-container">
        {selectedEmojis.map((emoji, index) => (
          <span key={index} className="emoji">
            {emoji}
          </span>
        ))}
      </div> */}
      {/* <img src={emoji} onClick={() => setOpenEmojiBox(true)} />
      {openEmojiBox && <Picker data={data} onEmojiSelect={handleEmojiSelect} />}
      <div>
        {selectedEmojis.map((emoji, index) => (
          <span key={index}>{emoji}</span>
        ))}
      </div>
      <div>
        {comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
      </div> */}
    </div>
  );
};

export default Home;
