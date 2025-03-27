import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AvatarCom } from "@/components/avatar-com";

// 模拟讨论话题数据
const topic = {
  title: "加班问题引发社会关注，你怎么看？",
  description: "",
  images: [
    "https://picx.zhimg.com/v2-a096c2cd85dfcecba81581f6bfad8411_r.jpg?source=2c26e567",
    "https://picx.zhimg.com/v2-a096c2cd85dfcecba81581f6bfad8411_r.jpg?source=2c26e567",
    "https://picx.zhimg.com/v2-a096c2cd85dfcecba81581f6bfad8411_r.jpg?source=2c26e567",
  ], // 最多3张图片
};

// 模拟已有评论数据
const existingComments = [
  {
    userName: "Alice",
    comment: "这是一个很严重的警告！希望公司能考虑员工的身心健康。",
    time: "2分钟前",
    avatarUrl: "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
  },
  {
    userName: "Bob",
    comment: "我也觉得加班问题越来越严重，作为程序员，压力真的很大。",
    time: "10分钟前",
    avatarUrl: "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
  },
  {
    userName: "Bob",
    comment: "我也觉得加班问题越来越严重，作为程序员，压力真的很大。",
    time: "10分钟前",
    avatarUrl: "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
  },
  {
    userName: "Bob",
    comment: "我也觉得加班问题越来越严重，作为程序员，压力真的很大。",
    time: "10分钟前",
    avatarUrl: "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
  },
  {
    userName: "Bob",
    comment: "我也觉得加班问题越来越严重，作为程序员，压力真的很大。",
    time: "10分钟前",
    avatarUrl: "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
  },
  {
    userName: "Bob",
    comment: "我也觉得加班问题越来越严重，作为程序员，压力真的很大。",
    time: "10分钟前",
    avatarUrl: "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
  },
];

export function SheetCom() {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(existingComments);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // 控制预览弹窗
  const [currentImage, setCurrentImage] = useState<string>("");

  // 打开预览模态框
  const handleImageClick = (image: string) => {
    setCurrentImage(image);
    setIsPreviewOpen(true);
  };

  // 关闭预览模态框
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const closeWindow = () => {
    handleClosePreview();
  };

  // 处理评论提交
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        userName: "当前用户", // 可以根据登录信息显示用户名
        comment: commentText,
        time: "刚刚", // 可以根据时间戳动态生成
        avatarUrl: "https://avatars.githubusercontent.com/u/53822786?s=96&v=4", // 当前用户头像
      };
      setComments([newComment, ...comments]); // 添加新评论到评论列表
      setCommentText(""); // 清空输入框
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">参与讨论</Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{topic.title}</SheetTitle>
          <SheetDescription>{topic.description}</SheetDescription>
          {/* 显示讨论话题的图片 */}
          <div className="mt-4  justify-center flex space-x-2">
            {topic.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`话题图片 ${index + 1}`}
                className="h-20 w-20 object-cover rounded-md"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </SheetHeader>

        {/* 预览模态框 */}
        {isPreviewOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative max-w-3xl max-h-[90vh] w-full h-full flex justify-center items-center">
              <img
                src={currentImage}
                alt="图片预览"
                className="w-full h-full object-contain"
              />
              <button
                onClick={handleClosePreview}
                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full"
              >
                x
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6 py-4">
          {/* 评论输入框 */}
          <div className="flex items-center space-x-3">
            <AvatarCom
              avatarInfo={{
                userName: "当前用户", // 显示当前用户的用户名
                avatarUrl:
                  "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
              }}
              size="sm"
            />
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="输入您的评论..."
              className="w-full"
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleCommentSubmit}
              disabled={!commentText.trim()}
            >
              提交评论
            </Button>
          </div>

          {/* 已有评论展示 */}
          <div className="space-y-4 mt-6">
            {comments.map((comment, index) => (
              <div key={index} className="flex space-x-4">
                <AvatarCom
                  avatarInfo={{
                    userName: comment.userName,
                    avatarUrl: comment.avatarUrl,
                  }}
                  size="sm"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{comment.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {comment.time}
                    </p>
                  </div>
                  <p className="mt-1">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={closeWindow}>
              关闭
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
