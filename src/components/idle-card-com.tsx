import { cn } from "@/lib/utils"
import { AvatarCom } from '@/components/avatar-com';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SheetCom } from "./sheet-com";


type Notification = {
    avatarUrl: string,
    userName: string;
    title: string;
    description: string;
    imageUrl :string 
};

type CardProps = React.ComponentProps<typeof Card> & {
    notification?: Notification;
};

export function IdleCardCom({ className, 
    notification,
    ...props}: CardProps) {
  const avatarUrl = notification?.avatarUrl || "default-avatar.png"; // default image
  const userName = notification?.userName || "Unknown User"; // default name
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>
        <AvatarCom avatarInfo={{ userName, avatarUrl }} size="lg" className="mt-1"/>
        <div className="mt-3">
            {notification?.userName}
        </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex">
        {/* Left side: Content */}
        <div className="flex-1">
          <div className="space-y-2">
            <p className="text-sm font-medium">{notification?.title}</p>
            <p className="text-sm text-muted-foreground">{notification?.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
      <SheetCom/>
      </CardFooter>
    </Card>
  )
}
