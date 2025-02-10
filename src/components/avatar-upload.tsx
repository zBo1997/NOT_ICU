import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress"; // 引入进度条组件

type AvatarInfo = {
  userName: string;
  avatarUrl?: string;
};

type AvatarProps = React.ComponentProps<typeof Avatar> & {
  avatarInfo?: AvatarInfo;
  size?: "sm" | "md" | "lg" | "lger"; // 可以传入不同的尺寸
  onAvatarChange?: (newAvatarUrl: string) => void; // 新增回调函数
};

export function AvatarUploadCom({
  avatarInfo,
  size = "md", // 默认尺寸为 "md"
  className,
  onAvatarChange,
  ...props
}: AvatarProps) {
  const userName = avatarInfo?.userName || "用户";
  const [avatarUrl, setAvatarUrl] = useState(avatarInfo?.avatarUrl || "");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // 上传进度

  // 生成用户名首字母
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // 根据传入的尺寸设置头像大小
  const sizeClasses = {
    sm: "w-8 h-8", // 小号尺寸 32px
    md: "w-10 h-10", // 中号尺寸 40px
    lg: "w-12 h-12", // 大号尺寸 48px
    lger: "w-48 h-48", // 更大号尺寸 48px
  };

  // 处理头像上传（模拟上传）
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0); // 重置进度条

      // 模拟上传过程
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // 模拟返回新的头像 URL
            const newAvatarUrl = URL.createObjectURL(file);
            setAvatarUrl(newAvatarUrl);
            if (onAvatarChange) {
              onAvatarChange(newAvatarUrl); // 调用回调函数传递新头像 URL
            }
            setIsUploading(false);
            return 100; // 确保进度条是100%
          }
          return prev + 10; // 每次增加10%的进度
        });
      }, 500); // 每500ms更新一次进度
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* 上传中状态（可选），显示进度条在头像上方 */}
      {isUploading && (
        <div className="absolute left-full mr-2 transform -translate-y-1/2 w-24">
          <Progress value={uploadProgress} className="w-full" />
          <div className="text-center text-sm mt-2 text-gray-500">
            {Math.round(uploadProgress)}% 上传中...
          </div>
        </div>
      )}

      {/* 头像展示区域 */}
      <Avatar
        className={`${sizeClasses[size]} ${className}`}
        {...props}
        onClick={() => document.getElementById("avatar-upload")?.click()} // 点击头像时触发上传
      >
        <AvatarImage src={avatarUrl} alt={userName} />
        <AvatarFallback>{getInitials(userName)}</AvatarFallback>
      </Avatar>

      {/* 隐藏的文件选择 input */}
      <input
        id="avatar-upload"
        type="file"
        className="absolute inset-0 opacity-0"
        onChange={handleAvatarChange}
      />
    </div>
  );
}
