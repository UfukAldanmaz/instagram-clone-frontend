import React from "react";
import { Popup } from "./Popup";
import { LikedByUser } from "../models/PostModels";
import anonymous from "../assets/anonym-avatar.jpeg";
import { Link } from "react-router-dom";

type LikedByProps = {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  likedUsers: LikedByUser[];
};

const LikedBy: React.FC<LikedByProps> = ({
  likedUsers,
  trigger,
  setTrigger,
}) => {
  return (
    <Popup trigger={trigger} setTrigger={() => setTrigger(false)}>
      <div className="flex flex-col gap-6">
        {likedUsers &&
          likedUsers.map((item) => (
            <div className="flex justify-between">
              <div className="flex flex-row items-center gap-6">
                {item.profilePictureUrl ? (
                  <img
                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                    src={item.profilePictureUrl}
                    alt="profile"
                  />
                ) : (
                  <img
                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                    src={anonymous}
                    alt="profile"
                  />
                )}
                <Link
                  className="text-gray-700 hover:text-gray-700"
                  to={`/user/${item.username}`}
                >
                  <li>{item.username ? item.username : "Unknown User"}</li>
                </Link>{" "}
              </div>
              <button className="text-white bg-blue-400 hover:outline-none float-right">
                Follow
              </button>
            </div>
          ))}
      </div>
    </Popup>
  );
};

export default LikedBy;
