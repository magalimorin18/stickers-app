// UploadToIPFSButton.tsx (using Pinata)
import React, { useState } from "react";
import axios from "axios";
import { PINATA_API_KEY, PINATA_SECRET_API_KEY } from "../globals";

interface UploadToIPFSButtonProps {
  imageFile: File | null;
  onUploadComplete: (cid: string) => void;
}

const UploadToIPFSButton: React.FC<UploadToIPFSButtonProps> = ({
  imageFile,
  onUploadComplete,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!imageFile) {
      setError("No image file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    const metadata = JSON.stringify({ name: imageFile.name });
    formData.append("pinataMetadata", metadata);

    try {
      setIsUploading(true);
      setError(null);

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY,
          },
        },
      );

      const cid = res.data.IpfsHash;
      onUploadComplete(cid);
    } catch (err: any) {
      console.error("Upload to Pinata failed:", err);
      setError("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-4 text-center">
      <button
        onClick={handleUpload}
        className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!imageFile || isUploading}
      >
        {isUploading ? "Uploading to IPFS..." : "Upload to IPFS"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default UploadToIPFSButton;
