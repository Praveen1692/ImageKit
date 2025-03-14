/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ImageKitProvider } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { useRef } from "react";

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
  const ikUploadRefTest = useRef(null);

  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
  };

  const onUploadProgess = (progess) => {
    console.log("Progress", progess);
  };

  const onUploadStart = (evt) => {
    console.log("evt", evt);
  };

  return (
    <div>
      <h1>ImageKit Next.js Quick Start</h1>
    </div>
  );
}
