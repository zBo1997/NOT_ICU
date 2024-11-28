import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const notifications = [
    {
        title: "想睡",
        description: "1 hour ago",
    },
    {
        title: "那就睡",
        description: "1 hour ago",
    },
    {
        title: "马上睡",
        description: "2 hours ago",
    },
]

type CardProps = React.ComponentProps<typeof Card>

export function CardCom({ className, ...props }: CardProps) {
    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <CardTitle>你好!</CardTitle>
                <CardDescription>一定不要熬夜</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <BellRing />
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            开启睡觉提醒
                        </p>
                        <p className="text-sm text-muted-foreground">
                            发送一个让你睡觉的通知到你设备上
                        </p>
                    </div>
                    <Switch />
                </div>
                <div>
                    {notifications.map((notification, index) => (
                        <div
                            key={index}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {notification.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    <Check /> 老子知道了
                </Button>
            </CardFooter>
        </Card>
    )
}
