"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

export function UploadAvatar({
  onUploadSuccess,
}: {
  onUploadSuccess: () => void;
}) {
  const [progress, setProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    // 模拟文件上传过程
    const totalSize = file.size;
    const chunkSize = 1024 * 1024; // 每次上传1MB数据
    let uploaded = 0;

    const uploadInterval = setInterval(() => {
      if (uploaded < totalSize) {
        uploaded += chunkSize;
        const newProgress = Math.min((uploaded / totalSize) * 100, 100);
        setProgress(newProgress);
      } else {
        clearInterval(uploadInterval);
        setIsUploading(false);
        onUploadSuccess(); // 上传成功后的回调
      }
    }, 200); // 模拟每200ms上传1MB的数据
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        onChange={handleUpload}
        disabled={isUploading}
        className="mb-4"
      />
      {isUploading && (
        <div className="w-full max-w-sm">
          <Progress value={progress} className="w-full" />
          <div className="text-center mt-2">
            {Math.round(progress)}% 上传中...
          </div>
        </div>
      )}
      {!isUploading && progress === 100 && <div>上传完成！</div>}
    </div>
  );
}
