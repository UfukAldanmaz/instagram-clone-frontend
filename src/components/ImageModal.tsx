import { Post } from "../models/PostModels";
import { Popup } from "./Popup";
import heart from "../assets/heart.svg";
import speach from "../assets/speach-balloon.svg";
import bookmark from "../assets/bookmark.svg";
import anonymous from "../assets/anonym-avatar.jpeg";

type ImageModalProps = {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  post: Post | null;
  className: string;
};

export const ImageModal: React.FC<ImageModalProps> = ({
  post,
  isOpen,
  onClose,
  className,
}) => {
  console.log("profil", post);

  return (
    <Popup
      className="h-[60%] w-[50%] border-none rounded-2xl"
      title="a"
      trigger={isOpen}
      setTrigger={onClose}
    >
      <div className={className}></div>
      <div className="flex flex-row justify-around">
        {post && (
          <img
            className="float-left w-[50%] h-[100%] absolute rounded-none top-0 bottom-0 left-0"
            src={post.url}
            alt={`Post ${post.id}`}
          />
        )}

        {post && (
          <div className="flex items-center flex-row absolute top-12 ml-32 gap-4">
            {post.profilePictureUrl ? (
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src={post.profilePictureUrl}
                alt={`Post ${post.id}`}
              />
            ) : (
              <img
                className="inline-block h-36 w-36 rounded-full ring-2 ring-white"
                src={anonymous}
                alt="avatar"
              />
            )}
            <div className="">{post.username}</div>
          </div>
        )}
        <div className="">
          <div className="flex flex-row absolute bottom-20 ml-4 gap-4">
            <img src={heart} />
            <img src={speach} />
          </div>
          <img className="absolute right-6 bottom-20" src={bookmark} />
          <input
            placeholder="Add a comment..."
            className=" ml-4 absolute bottom-8 text-sm outline-none"
          />
        </div>
      </div>
    </Popup>
  );
};
