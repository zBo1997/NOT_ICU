import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


type Notification = {
    userName: string;
    title: string;
    description: string;
};

type CardProps = React.ComponentProps<typeof Card> & {
    notification?: Notification;
  };

export function IdleCardCom({ className, 
    notification,
    ...props}: CardProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>
        <div>
            {notification?.userName}
        </div>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {
            <div
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification?.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification?.description}
                </p>
              </div>
            </div>
          }
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
