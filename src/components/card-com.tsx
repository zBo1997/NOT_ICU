import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CarouselCom } from "./carouse-com";

const notifications = [
  {
    title: "Bot：",
    description: "哎。资本家的嘴脸",
    time: "2分钟前",
  },
  {
    title: "虚拟网友A：",
    description: "仲裁啊吧，让这些人收到应有的惩罚",
    time: "2小时前",
  },
  {
    title: "如意春风：",
    description: "哎..开可恶",
    time: "1小时前",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function CardCom({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>热款</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <CarouselCom />
      </CardContent>
      <CardFooter>
        <Button className="w-full">参与讨论</Button>
      </CardFooter>
    </Card>
  );
}
