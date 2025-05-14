import React, { useState } from "react";

interface ImageUploadProps {
  label?: string; // 上传按钮的标签
  onImageChange?: (file: File | null) => void; // 图片变化时的回调
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label = "上传图片",
  onImageChange,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 图片预览 URL

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // 设置图片预览 URL
      if (onImageChange) {
        onImageChange(file); // 触发回调，传递文件
      }
    } else {
      setImagePreview(null); // 清空预览
      if (onImageChange) {
        onImageChange(null); // 触发回调，传递 null
      }
    }
  };

  const clearImage = () => {
    setImagePreview(null); // 清空预览
    if (onImageChange) {
      onImageChange(null); // 触发回调，传递 null
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 上传按钮 */}
      <label className="block">
        <span className="text-gray-700">{label}</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
      </label>

      {/* 图片预览 */}
      {imagePreview && (
        <div className="relative w-full h-40 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <img
            src={imagePreview}
            alt="预览"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
          >
            清除
          </button>
        </div>
      )}
    </div>
  );
};
