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
import { MarkdownContentComp } from "@/components/markdown-com";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { detectLanguage } from "@/utils/formmat_code";


// 模拟讨论话题数据
const topic = {
  title: "最近公司裁员了，强制让我们签了变更主体的劳动合同",
  tag: "#裁员 #劳动合同 #变更主体 #劳动法",
  content: `最近公司裁员了，强制让我们签了变更主体的劳动合同。我们在公司工作了两年，突然就被告知要签一个新的合同，而且合同的条款和之前的完全不同。我们觉得这样不合理，想知道大家有没有类似的经历？你们是怎么处理的？\n\n## 讨论要点\n- 裁员的合法性\n- 劳动合同变更的法律规定\n- 如何保护自己的权益`,
  images: [
    "https://picx.zhimg.com/v2-a096c2cd85dfcecba81581f6bfad8411_r.jpg?source=2c26e567",
  ], // 最多1张图片
};

// 模拟已有评论数据
const existingComments = [
  {
    userName: "Alice",
    comment: "这样代码的很直观，易懂",
    time: "2分钟前",
    avatarUrl: "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
  },
  {
    userName: "Bob",
    comment: "的确，我也这么认为",
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
        <Button variant="outline">让我看看</Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{topic.title}</SheetTitle>
          {/* 显示讨论话题的图片 */}
          <div className="mt-4  justify-center flex space-x-10">
            {topic.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`话题图片 ${index + 1}`}
                className="object-cover rounded-md"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
          <SheetDescription>{topic.tag}</SheetDescription>
        </SheetHeader>

        <div className="mt-4">
          {/* 使用 ReactMarkdown 来渲染 Markdown 内容 */}
          <MarkdownContentComp
            markdownContent={topic.content}
          ></MarkdownContentComp>
        </div>

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
