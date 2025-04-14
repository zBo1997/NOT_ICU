import { useEffect, useState } from "react";
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
import axios from "axios";

type CardProps = React.ComponentProps<typeof Sheet> & {
  articleId?: string;
};

interface Article {
  ID: string;
  CreatedAt: string;
  title: string;
  content: string;
  userId: string;
  avatarUrl: string;
  name: string;
  TagNames: string[];
}

export function SheetCom({ articleId }: CardProps) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<
    { userName: string; comment: string; time: string; avatarUrl: string }[]
  >([]);
  const [article, setArticle] = useState<Article | null>(null); // 存储文章详情
  const [isSheetOpen, setIsSheetOpen] = useState(false); // 控制抽屉是否打开
  const [loading, setLoading] = useState(false); // 控制加载状态
  //const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  // const [currentImage, setCurrentImage] = useState<string>("");

  // 👉 用 useEffect 在抽屉打开时请求数据
  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        if (articleId) {
          setLoading(true);
          const response = await axios.get(`/api/article/${articleId}`);
          console.log("文章详情:", response.data);
          setArticle(response.data.article);
        } else {
          console.warn("未传入 articleId，无法获取文章数据");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isSheetOpen) {
      fetchArticleDetails();
    }
  }, [articleId, isSheetOpen]);

  // // 打开预览模态框
  // const handleImageClick = (image: string) => {
  //   setCurrentImage(image);
  //   setIsPreviewOpen(true);
  // };

  // 关闭预览模态框
  // const handleClosePreview = () => {
  //   setIsPreviewOpen(false);
  // };

  // 点击按钮时触发请求并打开抽屉
  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  // 处理评论提交
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        userName: "当前用户",
        comment: commentText,
        time: "刚刚",
        avatarUrl: "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={handleOpenSheet}>
          让我看看
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-xl overflow-y-auto">
        {loading ? (
          <div className="py-4 text-center">加载中...</div>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle>{article?.title || ""}</SheetTitle>
              <div className="flex items-center space-x-4 mt-4">
                <AvatarCom
                  avatarInfo={{
                    userName: article?.name || "未知作者",
                    avatarUrl: article?.avatarUrl,
                  }}
                  size="sm"
                />
                <p className="text-sm text-muted-foreground">
                  作者：{article?.name}
                </p>
              </div>
              <SheetDescription className="mt-2">
                {/* {article.TagNames.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full mr-2"
                  >
                    #{tag}
                  </span>
                ))} */}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-4">
              <MarkdownContentComp
                markdownContent={article?.content || ""}
              ></MarkdownContentComp>
            </div>

            {/* {article.images && article.images.length > 0 && (
              <div className="mt-4 flex justify-center">
                {article.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`文章图片 ${index + 1}`}
                    className="object-cover rounded-md cursor-pointer"
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            )} */}

            {/* 预览模态框 */}
            {/* {isPreviewOpen && (
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
            )} */}

            <div className="space-y-6 py-4">
              {/* 评论输入框 */}
              <div className="flex items-center space-x-3">
                <AvatarCom
                  avatarInfo={{
                    userName: "当前用户",
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
              {/* <div className="space-y-4 mt-6">
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
              </div> */}
            </div>
          </>
        )}

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">关闭</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
