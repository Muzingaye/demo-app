"use client";
import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn, convertFileToUrl, getFileType } from "../libs/utils";
import Image from "next/image";
import Thumbnail from "./Thumbnail";
interface Props {
  ownerId: string;
  // id: string;
  className?: string;
}

const FileUploader = ({ ownerId, className }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  console.log(ownerId);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);

    // call api to upload the file.

    // setFiles((prevFiles) => prevFiles.filter((f) => f.name !== f.name),
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };
  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn("uploader-button", className)}>
        <Image src="/images/loading-bar.gif" 
        alt="Upload" width={20} height={9} />
      </Button>

      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100">
            Uploading
            {files.map((file, index) => {
              const { type, extension } = getFileType(file.name);
              return (
                <li
                  key={`${file.name}-${index}`}
                  className="uploader-preview-item"
                >
                  <div className="flex items-center gap-3">
                    <Thumbnail
                      type={type}
                      extension={extension}
                      url={convertFileToUrl(file) || ""}
                    />

                    <div className="preview-item-name">
                      {file.name}
                      <Image src='/images/loading-bar.gif' alt='loading' width={80} height={12}/>
                    </div>
                  </div>

                  <Image
                    src="/images/remove.png"
                    alt="loading"
                    width={18}
                    height={18}
                    onClick={(e) => handleRemoveFile(e, file.name)}
                  />
                </li>
              );
            })}
          </h4>
        </ul>
      )}
      {/* {isDragActive ? <p>Drop the files</p> : <p>Select files</p>} */}
    </div>
  );
};
export default FileUploader;
