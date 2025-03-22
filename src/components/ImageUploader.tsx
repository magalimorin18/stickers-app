// ImageUploader.tsx
import React, { useState } from "react";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  fixedWidth?: number;
  fixedHeight?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  fixedWidth,
  fixedHeight,
}) => {
  const [, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (fileList: FileList | null) => {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="main">
      <input
        type="file"
        className="hidden-input"
        accept=".jpg"
        onChange={(e) => handleFileChange(e.target.files)}
      />

      {imagePreview && (
        <div className="preview-container mt-4">
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            style={{
              width: `${fixedWidth}px`,
              height: `${fixedHeight}px`,
              objectFit: "cover",
            }}
            className="rounded shadow"
          />
          <div>
            <button className="mt-2 text-red-500" onClick={removeImage}>
              Remove Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
