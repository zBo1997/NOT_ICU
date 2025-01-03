import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { AvatarCom } from "@/components/avatar-com"

export function PopoverCom() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">登录</Button>
            </PopoverTrigger>
            <PopoverContent className="w-50">
                <div className="grid gap-1">
                    <div className="space-y-1">
                        <div className="font-medium leading-none">
                            <AvatarCom />
                        </div>
                    </div>
                    {/* 昵称 */}
                    <div className="text-lg font-semibold">馍 馍</div>
                    <div className="w-full space-y-3">
                        {/* GitHub */}
                        <div className="flex items-center space-x-2">
                            <a
                                href="https://github.com/zBo1997"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                GitHub: https://github.com/zBo1997
                            </a>
                        </div>
                        {/* Telegram */}
                        <div className="flex items-center space-x-2">
                            <a
                                href="https://t.me/MoMo6984"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Telegram: https://t.me/MoMo6984
                            </a>
                        </div>

                        {/* 电话 */}
                        <div className="flex items-center space-x-2">
                            <a
                                href="tel:1234567890"
                                className="text-blue-600 hover:underline"
                            >
                                微信:zbo1997
                            </a>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
