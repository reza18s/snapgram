import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type FileUploader = {
  onChange: (FILES: File[]) => void;
  mediaUrl: string;
};
export default function FileUploader({ onChange, fileUrl, setFileUrl }) {
  const [file, setFile] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      onChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [onChange, setFileUrl],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpeg", ".jpg", ".svg"] },
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center flex cursor-pointer flex-col rounded-xl bg-dark-3"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex w-full flex-1 justify-center p-5 lg:p-10">
            <img src={fileUrl} className="file_uploader-img"></img>
          </div>
          <p className="file_uploader-label">
            {" "}
            Click or Drag your photo to replace
          </p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/public/assets/icons/file-upload.svg"
            width={96}
            height={77}
          ></img>
          <h1 className="base-medium mb-2 mt-6 to-light-2">
            Drag your photo here
          </h1>
          <p className="small-regular mb-6 text-light-4"></p>
          <Button className="shad-button_dark_4">select form computer</Button>
        </div>
      )}
    </div>
  );
}
