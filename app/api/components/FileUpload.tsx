/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileTypes?: "image" | "video";
}

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function FileUpload({
  onSuccess,
  onProgress,
  fileTypes = "image",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    console.log("Success", response);
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  const validateFile = (file: File) => {
    if (fileTypes === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file");
        return false;
      }
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return false;
    }
    return false;
  };

  return (
    <div className="space-y-2">
      <h1>ImageKit Next.js Quick Start</h1>
      <IKUpload
        fileName={fileTypes == "video" ? "video.mp4" : "image.jpg"}
        validateFile={validateFile}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleStartUpload}
        folder={fileTypes === "video" ? "videos/" : "images/"}
        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
      />
      {error && <p className="text-error">{error}</p>}
      {uploading && <p>Uploading...</p>}
      {uploading && <Loader2 className="animate-spin w-5 h-5 text-primary" />}
      {!uploading && (
        <p>Drag and drop your files here or click to select a file</p>
      )}
    </div>
  );
}
