import React, { useState } from "react";

import { Popup } from "./Popup";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { UploadResponse } from "../models/PostModels";
import { upload } from "../services/post/postService";
import uploadPhoto from "../assets/upload-photo.svg";

type ICreateContentProps = {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateContent: React.FC<ICreateContentProps> = ({
  trigger,
  setTrigger,
}) => {
  const [modalState, setModalState] = React.useState<"upload" | "caption">(
    "upload"
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setModalState("caption");
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!caption.trim()) {
      setError("Please write a caption for the photo.");
      return;
    }
    if (!selectedImage) {
      setError("Please select image");
      return;
    }
    setLoading(true);
    try {
      upload({ file: selectedImage as Blob }).then(
        (_response: AxiosResponse<UploadResponse>) => {
          navigate("/profile");
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }

    console.log("Selected Image:", selectedImage);
    console.log("Caption:", caption);

    setModalState("upload");
    setSelectedImage(null);
    setCaption("");
    setError(null);
    setTrigger(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedImage(file);
      setModalState("caption");
    }
  };

  return (
    <Popup
      trigger={trigger}
      setTrigger={() => setTrigger(false)}
      closeOnClickOutside={true}
      title={
        <h1 className="text-center text-2xl font-bold">Create New Post</h1>
      }
    >
      <div
        className="p-6 space-y-6 flex flex-col justify-between items-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {modalState === "upload" ? (
          <>
            <img src={uploadPhoto} alt="upload" />
            <p className="text-base leading-relaxed text-black">
              Drag photos and videos here
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="bg-blue-500 rounded-lg w-92 h-10 text-center text-white hover:bg-blue-600 focus:ring-0 focus:outline-none
                        focus:ring-blue-300 text-sm px-5 py-2.5 text-center cursor-pointer"
            >
              Select from computer
            </label>
          </>
        ) : (
          <>
            <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
              alt="Selected"
              className="w-32 h-32"
            />
            <input
              type="text"
              placeholder="Write a caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
            {error && <label className="text-red-500">{error}</label>}
            <button
              onClick={handleSubmit}
              className="cursor-pointer bg-blue-500 rounded-lg w-92 h-10 text-center text-white hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm px-5 py-2.5 text-center"
            >
              Share
            </button>
          </>
        )}
      </div>
    </Popup>
  );
};

export default CreateContent;
