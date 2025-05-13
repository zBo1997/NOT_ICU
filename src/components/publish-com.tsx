import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { LabelCom } from "@/components/label-com";

export function PublishCom() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 图片预览 URL

  const items = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "blueberry", label: "Blueberry" },
    { value: "grapes", label: "Grapes" },
    { value: "pineapple", label: "Pineapple" },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // 生成图片预览 URL
    }
  };

  const handleLabelChange = (value: string) => {
    console.log("选中的值是：", value);
    setTags(value);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("标题和内容不能为空！");
      return;
    }

    // 模拟提交逻辑
    console.log("发布的文章：", { title, tags, content, imageUrl });
    alert("文章已成功发布！");
    setTitle("");
    setContent("");
    setTags("");
    setImageUrl("");
    setImagePreview(""); // 清空预览
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full p-6 shadow-lg">
        {/* 头部 */}
        <CardHeader>
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            发布文章
          </div>
        </CardHeader>

        {/* 消息内容区域 */}
        <CardContent className="flex flex-col gap-4">
          {/* 图片上传*/}

          {/* 标题和标签 */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="title">标题</Label>
              <Input
                id="title"
                type="text"
                placeholder="请输入标题"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div className="grid gap-2 md:col-span-1">
              <Label htmlFor="tags">标签</Label>
              <LabelCom
                items={items}
                placeholder="请选择水果"
                value={tags}
                onChange={handleLabelChange}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUpload">上传图片</Label>
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <div className="grid gap-2">
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="预览"
                  className="w-full max-h-60 object-cover rounded"
                />
              </div>
            )}
          </div>

          {/* 内容输入 */}
          <div className="grid gap-2">
            <Label htmlFor="content">内容</Label>
            <Input
              id="content"
              multiline // 启用多行输入
              placeholder="请输入内容"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="h-40" // 设置固定高度
              required
            />
          </div>
        </CardContent>

        {/* 输入框和按钮 */}
        <CardFooter className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => {
              setTitle("");
              setContent("");
              setTags("");
              setImageUrl("");
              setImagePreview(""); // 清空预览
            }}
          >
            清空
          </Button>
          <Button onClick={handleSubmit}>发布</Button>
        </CardFooter>
      </Card>
    </div>
  );
}