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
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { LabelCom } from "@/components/label-com";
import { get, postFormData, post } from "@/utils/request"; // 引入你的请求工具类
import { useNavigate } from "react-router-dom"; // 引入 useNavigate
import { toast } from "sonner"; // 引入 sonner 库 提示

interface Tags {
  ID: string; // 文章ID
  CreatedAt: string; // 文章标题
  UpdatedAt: string; // 文章内容
  DeletedAt: string; // 文章图片
  title: string; // 作者名称
  userId?: string; // 作者头像
}

export function PublishCom() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageKey, setImagekey] = useState("");
  const [items, setItems] = useState<{ value: string; label: string }[]>([]); // 标签选项
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 图片预览 URL
  const [tags, setTags] = useState<string>(""); // 当前选中的标签
  const navigate = useNavigate(); // 初始化 useNavigate 钩子

  // 处理头像上传（使用 axios 工具类进行文件上传）
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      })
        .then((response) => {
          const fileKey = response.data.filekey; // 上传成功后返回的文件 key
          console.log("上传成功：" + fileKey);
          setImagekey(fileKey); // 设置图片 URL
          setImagePreview(URL.createObjectURL(file)); // 设置图片预览
          toast("图片上传成功！");
        })
        .catch((error) => {
          console.error("头像上传失败", error);
        })
        .finally(() => {
          console.log("上传完成");
        });
    }
  };

  // 获取标签
  const getTags = async () => {
    try {
      const response = await get<Tags[]>("/tags");
      if (response) {
        // 将标签数据转换为 LabelCom 需要的格式
        const formattedItems = response.data.map((item) => ({
          value: item.ID.toString(),
          label: item.title,
        }));
        setItems(formattedItems); // 设置标签选项
      }
    } catch (error) {
      console.error("获取标签失败：", error);
    }
  };

  const handleLabelChange = (value: string) => {
    console.log("选中的值是：", value);
    setTags(value);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast("标题和内容不能为空！");
      return;
    }

    if (!tags.trim()) {
      toast("请选择标签！");
      return;
    }

    // 模拟提交逻辑
    console.log("发布的文章：", { title, tags, content, imageUrl: imageKey });

    try {
      const response = await post<{
        error: string;
      }>("/article/pulish", {
        title: title,
        //转换为number
        tags: Number(tags),
        content: content,
        imageKey: imageKey,
      });

      //路由到首页
      if (response.data.error) {
        toast(response.data.error);
      } else {
        toast("文章发布成功！");
        navigate("/"); // 跳转到首页
      }
    } catch (error) {
      toast("服务器出小差了");
      console.error(error);
      return;
    }

    // 重置所有状态，包括封面图片
    setTitle("");
    setContent("");
    setTags("");
    setImagekey(""); // 清空封面图片的 URL
    setImagePreview(null); // 清空图片预览
  };

  // 页面加载时获取标签
  useEffect(() => {
    getTags();
  }, []);

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900">
      <Card className="w-full p-6 shadow-lg">
        {/* 头部 */}
        <CardHeader>
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            发布文章
          </div>
        </CardHeader>

        {/* 消息内容区域 */}
        <CardContent className="flex flex-col gap-4">
          {/* 标题、标签、上传图片 和 图片预览 */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* 左侧：标题、标签、上传图片 */}
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">标题</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="请输入回忆标题"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">标签</Label>
                <LabelCom
                  items={items}
                  placeholder="请选择文章标签"
                  value={tags}
                  onChange={handleLabelChange}
                  className="w-full"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageUpload">封面</Label>
                <div>
                  {/* 自定义上传按钮 */}
                  <Button
                    type="button"
                    onClick={() =>
                      document.getElementById("imageUpload")?.click()
                    }
                  >
                    上传图片
                  </Button>
                  {/* 隐藏默认文件选择框 */}
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden" // 使用 Tailwind 的隐藏样式
                  />
                </div>
              </div>
            </div>

            {/* 右侧：图片预览 */}
            <div className="flex items-center justify-center">
              {imagePreview ? (
                <div className="rounded-lg overflow-hidden relative w-full h-40 md:h-full border border-gray-200 shadow-sm">
                  <img
                    src={imagePreview}
                    alt="预览"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full border border-gray-200 rounded-lg text-gray-500">
                  无封面
                </div>
              )}
            </div>
          </div>

          {/* 内容输入 */}
          <div className="grid gap-2">
            <Label htmlFor="content">内容</Label>
            <Textarea
              placeholder="请输入你的回忆"
              onChange={(e) => setContent(e.target.value)}
              value={content}
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
              setImagekey("");
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