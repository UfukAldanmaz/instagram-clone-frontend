import { Post } from "../models/PostModels";
import { Popup } from "./Popup";

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
            className="float-left w-[50%] h-[100%] absolute rounded-none	 top-0 bottom-0 left-0"
            src={post.url}
            alt={`Post ${post.id}`}
          />
        )}

        {post && (
          <div className="absolute right-32 text-center p-4">
            {post.username}
          </div>
        )}
      </div>
    </Popup>
  );
};
