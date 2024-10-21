import SecondaryButton from "@/components/button/secondary-button";
import FileIcon from "@/icons/file-icon";
import React, { ChangeEvent, useRef, useState } from "react";

type Props = {
  title: string;
  defaultFile?: File | null;
  multiple?: boolean;
  accept?: string;
  className?: string;
  onChange: (file: File | null) => void;
};

function FileInput({
  title,
  multiple,
  accept,
  onChange,
  className,
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
    <>
      {!file ? (
        <div className={`flex flex-row items-center my-4 ${className}`}>
          <SecondaryButton
            title={title}
            className="w-full py-2 my-2"
            onClick={onChooseFile}
          />
        </div>
      ) : (
        <div className={`flex flex-row items-center my-4 ${className}`}>
          <SecondaryButton
            title="Re-upload..."
            className="w-[30%] mr-4"
            onClick={onChooseFile}
          />
          <FileIcon />
          <p className="ml-2 text-red-300 text-sm">{file?.name}</p>
        </div>
      )}
      <input
        name={"file-" + title}
        ref={fileRef}
        type="file"
        className="hidden"
        onChange={onFileChange}
        multiple={multiple}
        accept={accept}
      />
    </>
  );
}

export default FileInput;
