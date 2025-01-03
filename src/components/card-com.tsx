import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const notifications = [
    {
        title: "Bot：",
        description: "哎。资本家的嘴脸",
        time: "2分钟前"
    },
    {
        title: "虚拟网友A：",
        description: "仲裁啊吧，让这些人收到应有的惩罚",
        time: "2小时前"
    },
    {
        title: "如意春风：",
        description: "哎..开可恶",
        time: "1小时前",
    },
]

type CardProps = React.ComponentProps<typeof Card>

export function CardCom({ className, ...props }: CardProps) {
    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <CardTitle>实时热点：</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5">
                <p className="text-sm font-medium leading-none">
                    "北京一程序员加班后在家脑出血.........."
                </p>
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                        <p className="text-sm text-muted-foreground">
                            那出的不是血啊，是一个家庭的顶梁柱啊！
                        </p>
                    </div>
                </div>
                <div>
                    {notifications.map((notification, index) => (
                        <div
                            key={index}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-3 last:mb-0 last:pb-0"
                        >
                            <span className="flex h-3 w-3 translate-y-1 rounded-full bg-sky-500" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {notification.description}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {notification.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    参与讨论
                </Button>
            </CardFooter>
        </Card>
    )
}
