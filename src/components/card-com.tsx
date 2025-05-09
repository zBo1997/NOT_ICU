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

type CardProps = React.ComponentProps<typeof Card>;

export function CardCom({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>回忆碎片</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <CarouselCom />
      </CardContent>
      <CardFooter>
        <Button className="w-full">查看回忆</Button>
      </CardFooter>
    </Card>
  );
}
