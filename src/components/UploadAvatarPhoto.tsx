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
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadPhoto;
