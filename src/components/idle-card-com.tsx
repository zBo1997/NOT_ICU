import { cn } from "@/lib/utils";
import { AvatarCom } from "@/components/avatar-com";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CarouselCom } from "./carouse-com";
import { SheetCom } from "./sheet-com";
import { format } from "date-fns";
import { useRef, useState } from "react";

interface ImageKey {
  CreatedAt: string;
  ID: number;
  articleId: string;
  caption: string;
  imageKey: string;
  UpdatedAt: string;
  sortOrder: number;
}

interface Article {
  ID: number;
  CreatedAt: string;
  title: string;
  content: string;
  userId: number;
  avatarUrl: string;
  name: string;
  tagNames: string[];
  imageKeys: ImageKey[];
}

type CardProps = React.ComponentProps<typeof Card> & {
  article?: Article;
};

//定义 SheetCom 的 ref 类型
type SheetComRefType = {
  openSheet: () => void;
  closeSheet: () => void;
};

export function IdleCardCom({ className, article, ...props }: CardProps) {
  // 新增：创建一个ref用于触发点击
  const sheetRef = useRef<SheetComRefType>(null);
  // 关键：关闭后短暂忽略下一次点击
  const justClosedRef = useRef(false);
  //新增状态：跟踪抽屉是否打开，默认关闭
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // 默认值处理
  const avatarUrl = `${article?.avatarUrl || "default"}`;
  const userName = `${article?.name || "匿名"}`;
  const formattedDate = article?.CreatedAt
    ? format(new Date(article.CreatedAt), "yyyy-MM-dd HH:mm")
    : "未知时间";

  return (
    <Card
      className={cn(
        "w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer", // 新增cursor-pointer
        className
      )}
      {...props}
      onClick={() => {
        // 如果抽屉已经打开，或者刚刚关闭（短时间内），都不要重新打开 （防抖）
        if (isSheetOpen || justClosedRef.current) return;
        sheetRef.current?.openSheet();
      }}
      key={article?.ID} // 确保每个卡片有唯一的 key
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AvatarCom
              avatarInfo={{ userName, avatarUrl }}
              size="lg"
              className="ring-2 ring-background transition-transform hover:scale-105"
            />
            <div>
              <CardTitle className="text-base font-semibold tracking-tight">
                {userName}
              </CardTitle>
              <div className="text-xs text-muted-foreground">
                发布于: {formattedDate}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 pb-6">
        {/* 外层容器：保持响应式布局，仅调整内部元素顺序和占比 */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* 左侧：轮播图（调整为第一个子元素） */}
          <div className="w-full md:w-2/5 relative overflow-hidden rounded-lg border border-border shadow-sm transition-transform hover:scale-[1.02]">
            <CarouselCom data={article?.imageKeys} />
          </div>

          {/* 右侧：标题、内容和标签（调整为第二个子元素） */}
          <div className="w-full md:w-3/5 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground/90 hover:text-foreground transition-colors cursor-pointer">
                {article?.title || "无标题"}
              </h3>
              <p className="text-sm text-muted-foreground/90 leading-relaxed line-clamp-3">
                {article?.content || "无内容"}
              </p>
            </div>

            {/* 标签区域 */}
            {article?.tagNames && article.tagNames.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {article.tagNames.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 bg-secondary/80 hover:bg-secondary text-secondary-foreground rounded-full text-xs transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-background/50 border-t border-border px-6 py-3">
        <SheetCom
          ref={sheetRef}
          articleId={article?.ID}
          onOpenChange={(open) => {
            setIsSheetOpen(open);
            if (!open) {
              // 关键：关闭后短暂忽略下一次点击，避免“关闭→立刻又打开”
              justClosedRef.current = true;
              setTimeout(() => {
                justClosedRef.current = false;
              }, 200);
            }
          }}
        />
      </CardFooter>
    </Card>
  );
}
