import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

type AvatarInfo = {
    userName: string;
    avatarUrl?: string;
};

type AvatarProps = React.ComponentProps<typeof Avatar> & {
    avatarInfo?: AvatarInfo;
    size?: "sm" | "md" | "lg" | "lger";  // 可以传入不同的尺寸
};

export function AvatarCom({
    avatarInfo,
    size = "md",  // 默认尺寸为 "md"
    className,
    ...props
}: AvatarProps) {
    const userName = avatarInfo?.userName || "用户";
    const avatarUrl = avatarInfo?.avatarUrl || "用户";

    // 生成用户名首字母
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    // 根据传入的尺寸设置头像大小
    const sizeClasses = {
        sm: "w-8 h-8",   // 小号尺寸 32px
        md: "w-10 h-10",  // 中号尺寸 40px
        lg: "w-12 h-12",  // 大号尺寸 48px
        lger: "w-48 h-48",  // 更大号尺寸 48px
    };

    return (
      <Avatar className={`${sizeClasses[size]} ${className}`} {...props}>
        <AvatarImage src={avatarUrl} alt={userName} />
        <AvatarFallback>{getInitials(userName)}</AvatarFallback>
      </Avatar>
    );
}
