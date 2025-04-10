import { cn } from "@/lib/utils";
import { AvatarCom } from "@/components/avatar-com";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SheetCom } from "./sheet-com";
import { format } from "date-fns";

type Article = {
  ID: string;
  CreatedAt: string;
  title: string;
  content: string;
  avatarUrl: string;
  name: string;
  userId: string;
  TagNames: string[];
};

type CardProps = React.ComponentProps<typeof Card> & {
  article?: Article;
};

export function IdleCardCom({ className, article, ...props }: CardProps) {
  // 默认值处理
  const avatarUrl = `${article?.avatarUrl || "default"}`;
  const userName = `${article?.name || "匿名"}`;
  const formattedDate = article?.CreatedAt
    ? format(new Date(article.CreatedAt), "yyyy-MM-dd HH:mm")
    : "未知时间";

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <AvatarCom avatarInfo={{ userName, avatarUrl }} size="lg" />
          <div>
            <CardTitle>{userName}</CardTitle>
            <div className="text-sm text-muted-foreground">{` 发布于: ${formattedDate}`}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">
            {article?.title || "无标题"}
          </h3>
          <p className="text-sm mt-2 line-clamp-3">
            {article?.content || "无内容"}
          </p>
        </div>

        {article?.TagNames && article.TagNames.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.TagNames.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end">
        <SheetCom articleId={article?.ID} />
      </CardFooter>
    </Card>
  );
}
