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
import axios from "axios";
import { formatDistanceToNow } from "date-fns"; // 用于格式化时间
import { zhCN } from "date-fns/locale"; // 中文本地化

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
  images: string[];
}

interface Comments {
  ID: string;
  name: string;
  comment: string;
  CreatedAt: string;
  avatarUrl: string;
  parentId?: string | null; // 父评论ID
  parentName?: string | null; // 父评论用户名
}

export function SheetCom({ articleId }: CardProps) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comments[]>([]);
  const [article, setArticle] = useState<Article | null>(null); // 存储文章详情
  const [isSheetOpen, setIsSheetOpen] = useState(false); // 控制抽屉是否打开
  const [loading, setLoading] = useState(false); // 控制加载状态
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [replyTo, setReplyTo] = useState<Comments | null>(null); // 当前正在回复的评论

  // 打开预览模态框
  const handleImageClick = (image: string) => {
    setCurrentImage(image);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleOpenSheet = async () => {
    setIsSheetOpen(true);

    if (articleId) {
      try {
        setLoading(true);

        // 获取文章详情
        const response = await axios.get(`/api/article/${articleId}`);
        if (!response.data.article.images) {
          response.data.article.images = [
            "https://pic.rmb.bdstatic.com/bjh/news/b8b14a82230fd71763b347baca0efb9d.jpeg@h_1280",
          ];
        }
        setArticle(response.data.article);

        // 获取评论
        const commentsResponse = await axios.get(`/api/comments/${articleId}`);
        console.log(commentsResponse.data.comments);
        setComments(commentsResponse.data.comments || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.warn("未传入 articleId，无法获取文章数据");
    }
  };

  // 处理评论提交
  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      const newComment = {
        ID: "123",
        CreatedAt: new Date().toISOString(), // 使用 ISO 时间格式
        name: "当前用户",
        comment: commentText,
        time: new Date().toISOString(), // 使用 ISO 时间格式
        avatarUrl: "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
      };

      try {
        // 假设有一个后端 API 用于保存评论
        await axios.post(`/api/comments/add/${articleId}`, newComment);
        setComments([newComment, ...comments]);
        setCommentText("");
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  // 删除评论
  const handleDeleteComment = async (index: number) => {
    const commentToDelete = comments[index];
    try {
      await axios.delete(
        `/api/comments/${articleId}/comments/${commentToDelete.ID}`
      );
      setComments(comments.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting comment:", error);
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
                {article?.TagNames.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full mr-2"
                  >
                    #{tag}
                  </span>
                ))}
              </SheetDescription>
            </SheetHeader>

            {article?.images && article.images.length > 0 && (
              <div className="mt-4 flex justify-center">
                {article.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    //如果没有图片展示默认图片
                    src={image}
                    alt={`文章图片 ${index + 1}`}
                    className="object-cover rounded-md cursor-pointer"
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            )}

            <div className="mt-4">
              <MarkdownContentComp
                markdownContent={article?.content || ""}
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
                    userName: "当前用户",
                    avatarUrl:
                      "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
                  }}
                  size="sm"
                />
                <Input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={
                    replyTo ? `回复 @${replyTo.name}:` : "输入您的评论..."
                  }
                  className="w-full"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  onClick={handleCommentSubmit}
                  disabled={!commentText.trim()}
                >
                  {replyTo ? `回复 @${replyTo.name}:` : "提交评论"}
                </Button>
                {/* 当为评论文章时候不展示此按钮 */}
                {replyTo && (
                  <Button onClick={() => setReplyTo(null)}>取消回复</Button>
                )}
              </div>

              {/* 已有评论展示 */}
              <div className="space-y-4 mt-6">
                {comments.map((comment, index) => (
                  <div key={index} className="flex space-x-4">
                    <AvatarCom
                      avatarInfo={{
                        userName: comment.name,
                        avatarUrl: comment.avatarUrl,
                      }}
                      size="sm"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">
                          {comment.name}
                          {comment.parentName && (
                            <span className="text-sm text-gray-500 ml-2">
                              回复 @{comment.parentName}
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.CreatedAt), {
                            locale: zhCN,
                          })}{" "}
                          前
                        </p>
                      </div>
                      <p className="mt-1">{comment.comment}</p>
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => {
                            setReplyTo(comment); // 设置当前回复的评论
                          }}
                          className="text-sm text-blue-500"
                        >
                          回复
                        </button>
                        <button
                          onClick={() => handleDeleteComment(index)}
                          className="text-sm text-red-500"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
