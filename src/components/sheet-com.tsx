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
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { formatDistanceToNow } from "date-fns"; // 用于格式化时间
import { zhCN } from "date-fns/locale"; // 中文本地化
import { post, get } from "@/utils/request"; // 引入你的请求工具类

type CardProps = React.ComponentProps<typeof Sheet> & {
  articleId?: string;
};

interface Article {
  ID: string; // 文章ID
  title: string; // 文章标题
  content: string; // 文章内容
  images: string[]; // 文章图片
  name: string; // 作者名称
  avatarUrl?: string; // 作者头像
  TagNames: string[]; // 标签名称数组
  imageKey: string; // 标签名称数组
}

interface DisplayComment {
  ID: string;
  name: string;
  comment: string;
  CreatedAt: string;
  avatarUrl: string;
  userId: number | string;
  parentId?: string | null;
  parentName?: string | null;
  replyToUserId?: number | string;
  replyUserName?: string;
  replies?: DisplayComment[];
}

// 提交评论的类型
interface SubmitComment {
  comment: string; // 评论内容
  parentId?: string | null; // 父评论ID（可选）
}

export function SheetCom({ articleId }: CardProps) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<DisplayComment[]>([]);
  const [article, setArticle] = useState<Article | null>(null); // 存储文章详情
  const [isSheetOpen, setIsSheetOpen] = useState(false); // 控制抽屉是否打开
  const [loading, setLoading] = useState(false); // 控制加载状态
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [replyTo, setReplyTo] = useState<DisplayComment | null>(null); // 当前正在回复的评论

  // 获取当前用户id
  const currentUserId = JSON.parse(localStorage.getItem("user") || "{}").id;

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
        const response = await get<Article>(`/article/${articleId}`);
        if (response.data.imageKey) {
          response.data.images = [response.data.imageKey];
        } else {
          console.log("文章详情", response.data.imageKey);
          response.data.images = ["17399493345829518345670.jpg"];
        }
        setArticle(response.data);

        // 获取评论
        const commentsResponse = await get<DisplayComment[]>(
          `/comments/${articleId}`
        );
        if (commentsResponse.data.length > 0) {
          setComments(commentsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.warn("未传入 articleId,无法获取文章数据");
    }
  };

  // 处理评论提交
  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      const newComment: SubmitComment = {
        comment: commentText,
        parentId: replyTo?.ID || null, // 如果是回复评论，设置父评论 ID
      };

      try {
        // 提交评论到后端
        const response = await post<DisplayComment>(
          `/comments/add/${articleId}`,
          {
            comment: newComment.comment,
            parentId: newComment.parentId,
          }
        );

        // 将后端返回的评论对象添加到评论列表
        setComments([response.data, ...comments]);

        // 清空评论输入框
        setCommentText("");

        // 清除回复状态
        setReplyTo(null);
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  // 删除评论
  const handleDeleteComment = async (commentId: string, parentId?: string) => {
    try {
      await axios.delete(`/api/comments/${articleId}/comments/${commentId}`);
      if (parentId) {
        setComments((prev) =>
          prev.map((c) =>
            c.ID === parentId
              ? {
                  ...c,
                  replies: (c.replies || []).filter((r) => r.ID !== commentId),
                }
              : c
          )
        );
      } else {
        setComments((prev) => prev.filter((c) => c.ID !== commentId));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // 递归渲染评论和子评论
  function renderComment(comment: DisplayComment, parentId?: string) {
    // 判断是否为子回复且是自己
    const isSelfReply =
      !!comment.parentId && String(comment.userId) === String(currentUserId);

    return (
      <div key={comment.ID} className="flex space-x-4">
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
                  回复 @{comment.replyUserName}
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
            {/* 只有不是自己对子回复时才显示回复按钮 */}
            {!isSelfReply && (
              <button
                onClick={() => setReplyTo(comment)}
                className="text-sm text-blue-500"
              >
                回复
              </button>
            )}
            <button
              onClick={() => handleDeleteComment(comment.ID, parentId)}
              className="text-sm text-red-500"
            >
              删除
            </button>
          </div>
          {/* 渲染二级回复 */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="pl-8 mt-2 space-y-2 border-l border-gray-200">
              {comment.replies.map((reply) => renderComment(reply, comment.ID))}
            </div>
          )}
        </div>
      </div>
    );
  }

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
                <Skeleton className="relative w-full h-40" />
                {article.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    //如果没有图片展示默认图片
                    src={`https://theta.icu/files/${image}`}
                    alt={`文章图片 ${index + 1}`}
                    className="object-cover rounded-md cursor-pointer opacity-0"
                    onLoad={(e) => {
                      // 图片加载完成后显示图片
                      (e.target as HTMLImageElement).style.opacity = "1";
                    }}
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
                    src={`https://theta.icu/files/${currentImage}`}
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
                {comments.map((comment) => renderComment(comment))}
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
