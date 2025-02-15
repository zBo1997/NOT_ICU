import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress"; // 引入进度条组件
import { postFormData } from "@/utils/request"; // 引入你的请求工具类

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
  const [avatarUrl, setAvatarUrl] =
    useState(
      avatarInfo?.avatarUrl ||
        JSON.parse(localStorage.getItem("user") || "{}").avatar
    ) || "";
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

  // 处理头像上传（使用 axios 工具类进行文件上传）
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0); // 重置进度条

      const formData = new FormData();
      formData.append("file", file);

      // 使用 axios 发送文件上传请求
      postFormData<{ filekey: string }>("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 设置为表单数据类型
          Authorization: `${
            JSON.parse(localStorage.getItem("user") || "{}").token
          }`,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(percent); // 更新进度
          }
        },
      })
        .then((response) => {
          const avatarKey = response.data.filekey; //如果成更则返回
          setAvatarUrl(avatarKey);
          if (onAvatarChange) {
            console.log("头像上传成功", avatarKey);
            onAvatarChange(avatarKey); // 调用回调函数传递新头像 URL
          }
        })
        .catch((error) => {
          console.error("头像上传失败", error);
        })
        .finally(() => {
          setIsUploading(false);
        });
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* 上传中状态（可选），显示进度条在头像上方 */}
      {isUploading && (
        <div className="absolute w-full max-w-[200px] bottom-full">
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}
      {/* 头像展示区域 */}
      <Avatar
        className={`${sizeClasses[size]} ${className}`}
        {...props}
        onClick={() => document.getElementById("avatar-upload")?.click()} // 点击头像时触发上传
      >
        <AvatarImage
          src={`https://theta.icu/api/file/${avatarUrl}`}
          alt={userName}
        />
        <AvatarFallback>{getInitials(userName)}</AvatarFallback>
      </Avatar>

      {/* 隐藏的文件选择 input */}
      <input
        id="avatar-upload"
        type="file"
        title="请选择头像"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleAvatarChange}
      />
    </div>
  );
}
