import { useState, useRef, forwardRef, useImperativeHandle } from "react";
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
} from "@/components/ui/sheet";
import { AvatarCom } from "@/components/avatar-com";
import { MarkdownContentComp } from "@/components/markdown-com";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { post, get, del } from "@/utils/request";

type CardProps = {
  articleId?: string;
  onOpenChange?: (open: boolean) => void;
};

interface Article {
  ID: string;
  title: string;
  content: string;
  images: string[];
  name: string;
  avatarUrl?: string;
  TagNames?: string[];
  imageKey?: string;
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

interface SubmitComment {
  comment: string;
  parentId?: string | null;
}

export interface SheetComRef {
  openSheet: () => void;
  closeSheet: () => void;
}

export const SheetCom = forwardRef<SheetComRef, CardProps>(
  ({ articleId, onOpenChange }, ref) => {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState<DisplayComment[]>([]);
    const [article, setArticle] = useState<Article | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<string>("");
    const [replyTo, setReplyTo] = useState<DisplayComment | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // 合并读取
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const currentUserId = user?.id;
    const currentUserAvatar = user?.avatar;
    const currentUserName = user?.name;

    useImperativeHandle(ref, () => ({
      openSheet: () => {
        if (!isSheetOpen && articleId) handleOpenSheet();
      },
      closeSheet: () => setIsSheetOpen(false),
    }));

    const handleOpenSheet = async () => {
      setIsSheetOpen(true);
      if (!articleId) return;

      try {
        setLoading(true);
        const response = await get<Article>(`/article/${articleId}`);
        const a = response.data;
        a.images = a.imageKey ? [a.imageKey] : ["17399493345829518345670.jpg"];
        setArticle(a);

        const commentsResponse = await get<DisplayComment[]>(
          `/comments/${articleId}`
        );
        setComments(commentsResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleImageClick = (image: string) => {
      setCurrentImage(image);
      setIsPreviewOpen(true);
    };
    const handleClosePreview = () => setIsPreviewOpen(false);

    const handleCommentSubmit = async () => {
      if (!commentText.trim() || !articleId) return;

      const payload: SubmitComment = {
        comment: commentText.trim(),
        parentId: replyTo?.parentId || replyTo?.ID || null,
      };

      try {
        await post<DisplayComment>(`/comments/add/${articleId}`, {
          comment: payload.comment,
          parentId: payload.parentId,
          replyToUserId: replyTo?.userId || null,
        });

        const commentsResponse = await get<DisplayComment[]>(
          `/comments/${articleId}`
        );
        setComments(commentsResponse.data || []);
        setCommentText("");
        setReplyTo(null);
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    };

    const handleDeleteComment = async (
      commentId: string,
      parentId?: string
    ) => {
      try {
        await del(`comments/delete/${commentId}`);
        if (parentId) {
          setComments((prev) =>
            prev.map((c) =>
              c.ID === parentId
                ? {
                    ...c,
                    replies: (c.replies || []).filter(
                      (r) => r.ID !== commentId
                    ),
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

    function renderComment(comment: DisplayComment, parentId?: string) {
      const isSelfReply = String(comment.userId) === String(currentUserId);

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
                {String(comment.userId) === String(currentUserId)
                  ? `我 ( ${comment.name} ):`
                  : comment.name}
                {comment.replyUserName && (
                  <span className="text-sm text-gray-500 ml-2">
                    <span
                      className={
                        String(comment.replyToUserId) === String(currentUserId)
                          ? "text-red-700 font-bold"
                          : ""
                      }
                    >
                      回复 @{" "}
                      {String(comment.replyToUserId) === String(currentUserId)
                        ? "你"
                        : comment.replyUserName}
                    </span>
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
              {!isSelfReply && (
                <button
                  onClick={() => {
                    setReplyTo(comment);
                    setTimeout(() => inputRef.current?.focus(), 0);
                  }}
                  className="text-sm text-blue-500"
                >
                  回复
                </button>
              )}
              {String(comment.userId) === String(currentUserId) && (
                <button
                  onClick={() => handleDeleteComment(comment.ID, parentId)}
                  className="text-sm text-red-500"
                >
                  删除
                </button>
              )}
            </div>

            {!!comment.replies?.length && (
              <div className="pl-8 mt-2 space-y-2 border-l border-gray-200">
                {comment.replies.map((reply) =>
                  renderComment(reply, comment.ID)
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <Sheet
        open={isSheetOpen}
        onOpenChange={(open) => {
          setIsSheetOpen(open);
          onOpenChange?.(open);
        }}
      >
        {/* 注意：不再使用 SheetTrigger，由父组件控制 */}
        <SheetContent className="w-full max-w-xl overflow-y-auto">
          <SheetTitle>{article?.title || ""}</SheetTitle>

          {loading ? (
            <div className="py-4 text-center">加载中...</div>
          ) : (
            <>
              <SheetHeader>
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
                  {article?.TagNames?.map((tag, idx) => (
                    <span
                      key={`${tag}-${idx}`}
                      className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full mr-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </SheetDescription>
              </SheetHeader>

              {!!article?.images?.length && (
                <div className="mt-4 flex justify-center">
                  <Skeleton className="relative w-full h-40" />
                  {article.images.map((image, index) => (
                    <img
                      key={index}
                      src={`https://theta.icu/files/${image}`}
                      alt={`文章图片 ${index + 1}`}
                      className="object-cover rounded-md cursor-pointer opacity-0"
                      onLoad={(e) =>
                        ((e.target as HTMLImageElement).style.opacity = "1")
                      }
                      onClick={() => handleImageClick(image)}
                    />
                  ))}
                </div>
              )}

              <div className="mt-4">
                <MarkdownContentComp markdownContent={article?.content || ""} />
              </div>

              {/* 预览模态框 */}
              {isPreviewOpen && (
                <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
                  <div className="relative max-w-3xl max-h-[90vh] w-full h-full flex justify-center items-center">
                    <img
                      src={`https://theta.icu/files/${currentImage}`}
                      alt="图片预览"
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={handleClosePreview}
                      className="absolute top-2 right-2 text-white bg-black/50 p-2 rounded-full"
                    >
                      x
                    </button>
                  </div>
                </div>
              )}

              {/* 评论区 */}
              <div className="space-y-6 py-4">
                {replyTo && (
                  <div className="mb-2 px-3 py-2 rounded border-l-4 border-blue-400 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-blue-600">
                        回复 @
                        {String(replyTo.userId) === String(currentUserId)
                          ? "我"
                          : replyTo.name}
                      </span>
                      <span className="ml-2">{replyTo.comment}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <AvatarCom
                    avatarInfo={{
                      userName: currentUserName,
                      avatarUrl: currentUserAvatar,
                    }}
                    size="sm"
                  />
                  <Input
                    ref={inputRef}
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
                  {replyTo && (
                    <Button onClick={() => setReplyTo(null)}>取消回复</Button>
                  )}
                </div>

                <div className="space-y-4 mt-6">
                  {comments.map((comment) => renderComment(comment))}
                </div>
              </div>
            </>
          )}

          <SheetFooter>
            <SheetClose asChild>
              <Button type="button">关闭</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }
);
