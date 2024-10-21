import SecondaryButton from "@/components/button/secondary-button";

import React, { ChangeEvent, useRef, useState } from "react";
import CustomImage from "../custom-image";
import LoadingIcon from "@/icons/loading-icon";

type Props = {
  title: string;
  uploading: boolean;
  defaultSrc?: string;
  defaultFile?: File | null;
  multiple?: boolean;
  accept?: string;
  className?: string;
  onChange: (file: File | null) => void;
};

function UploadImageInput({
  title,
  multiple,
  accept,
  uploading,
  onChange,
  className,
  defaultSrc,
  defaultFile,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null | undefined>(defaultFile);

  const onChooseFile = () => {
    fileRef.current?.click();
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.item(0)) {
      setFile(e.target.files.item(0));
      onChange(e.target.files?.item(0));
    }
  };

  return (
    <div className="flex felx-row items-center my-4">
      <CustomImage
        lazyload
        src={defaultSrc ? defaultSrc : "/images/avatar.jpg"}
        alt="image"
        size={100}
      />
      <div className="flex flex-col ml-4 text-sm">
        {!file ? (
          <div className={`flex flex-row items-center my-4 ${className}`}>
            <SecondaryButton
              title="Choose file..."
              className="w-full p-2 my-2"
              onClick={onChooseFile}
            />
          </div>
        ) : (
          <div className={`flex flex-row items-center my-4 ${className}`}>
            <SecondaryButton
              title="Change file"
              className="w-full p-2 my-2"
              onClick={onChooseFile}
            />
          </div>
        )}
        {uploading && <LoadingIcon size={20} />}
        <input
          name={"file-" + title}
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={onFileChange}
          multiple={multiple}
          accept={"jpg, png," + accept}
        />
      </div>
    </div>
  );
}

export default UploadImageInput;
