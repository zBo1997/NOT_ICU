import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CarouselCom } from "./carouse-com";

type CardProps = React.ComponentProps<typeof Card> & {
  header?: string | React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  footerContent?: string;
  buttonName?: string;
};

export function CardCom({
  className,
  header,
  footer,
  title = "",
  footerContent = "",
  buttonName = "",
  ...props
}: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      {/* 条件渲染头部 */}
      {(header || title) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {header && <div className="mt-2">{header}</div>}
        </CardHeader>
      )}

      <CardContent className="grid gap-5">
        <CarouselCom />
      </CardContent>

      {/* 条件渲染底部 */}
      {(footer || footerContent) && (
        <CardFooter>
          {footerContent}
          <Button className="w-full">{buttonName}</Button>
        </CardFooter>
      )}
    </Card>
  );
}
