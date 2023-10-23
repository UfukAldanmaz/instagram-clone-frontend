import React, { useState, ChangeEvent } from "react";

type UploadPhotoProps = {
  onUpload: (file: File | null) => void;
};

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onUpload }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedImage(file || null);
  };

  const handleUpload = () => {
    onUpload(selectedImage);
  };

  return (
    <div className="flex flex-row justify-around items-center">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button
        className="border-2 border-gray-300 bg-gray-200 hover:bg-gray-300 hover:text-gray-600"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadPhoto;
