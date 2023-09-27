import { useEffect, useState } from "react";
import { ListResponse, Post } from "../models/PostModels";
import { list } from "../services/post/postService";

export const Profile = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await list();
        const responseData: ListResponse = response.data;
        setPosts(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col justify-start gap-2 w-full  ml-0 mt-0 mb-72 mr-72 b-2 bt-gray-800">
          <div className="flex flex-row justify-center items-center">
            <svg
              color="rgb(0, 0, 0)"
              fill="rgb(0, 0, 0)"
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <rect
                fill="none"
                height="18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="18"
                x="3"
                y="3"
              ></rect>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="9.015"
                x2="9.015"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="14.985"
                x2="14.985"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="21"
                x2="3"
                y1="9.015"
                y2="9.015"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="21"
                x2="3"
                y1="14.985"
                y2="14.985"
              ></line>
            </svg>
            <h6>Post</h6>
          </div>
          <ul className="flex flex-row gap-4 border-2 border-gray-200 rounded-lg h-screen p-2">
            {posts.map((post) => (
              <li key={post.id}>
                <img
                  className="w-48 rounded-lg"
                  src={post.url}
                  alt={`Post ${post.id}`}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
