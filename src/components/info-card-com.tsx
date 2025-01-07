import { cn } from "@/lib/utils"
import { AvatarCom } from '@/components/avatar-com';
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"


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

export function InfoCardCom({ className, 
    ...props}: CardProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardContent className="rounded-xl p-8 space-y-6">
      {/* 个人信息卡片 */}
      <div >
        {/* 头像 */}
        <div className="flex justify-center">
          <AvatarCom
            avatarInfo={{
              userName: "用户名称",
              avatarUrl: "https://avatars.githubusercontent.com/u/53822786?s=96&v=4",
            }}
            size="lg"
            className="mt-1"
          />
        </div>
        {/* 用户名和简介 */}
        <div className="text-center">
          <h3 className="text-xl">馍 馍</h3>
          <p className="text-sm mt-2">我清楚的记得人与人的路是不可复制的</p>
        </div>
      </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        {/* 修改信息按钮 */}
        <div className="flex justify-center space-x-4">
          <Button>
            修改资料
          </Button>
          <Button>
            更改密码
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
