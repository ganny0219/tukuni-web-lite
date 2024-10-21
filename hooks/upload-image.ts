import { useState } from "react";

export const UseUploadImage = () => {
  const [uploading, setUploading] = useState(false);

  const startUploading = () => {
    setUploading((prev) => !prev);
  };
  const uploadingFinish = () => {
    setUploading((prev) => !prev);
  };

  return {
    uploading,
    startUploading,
    uploadingFinish,
  };
};
