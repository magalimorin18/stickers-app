// ImageUploader.tsx
import React, { useState, useRef } from "react";

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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer?.files) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  return (
    <div className="main">
      <div
        className="dropzone-container"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden-input"
          accept=".jpg"
          onChange={(e) => handleFileChange(e.target.files)}
        />

        <label
          onClick={() => fileInputRef.current?.click()}
          className="file-label"
        >
          {isDragging
            ? "Release to drop image here."
            : "Drop image here or click here to upload."}
        </label>

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
    </div>
  );
};

export default ImageUploader;
