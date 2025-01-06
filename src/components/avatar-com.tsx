import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


type AvatarInfo = {
    userName: string;
    avatarUrl: string;
};

type AvatarProps = React.ComponentProps<typeof Avatar> & {
    avatarInfo?: AvatarInfo;
};


export function AvatarCom({ 
    avatarInfo,
    ...props}: AvatarProps) {
    return (
        <Avatar {...props}>
            <AvatarImage src={avatarInfo?.avatarUrl} alt="@shadcn" />
            <AvatarFallback>{avatarInfo?.userName}</AvatarFallback>
        </Avatar>
    )
}