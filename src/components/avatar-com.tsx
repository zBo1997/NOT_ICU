import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function AvatarCom() {
    return (
        <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/53822786?s=96&v=4" alt="@shadcn" />
            <AvatarFallback>Mo</AvatarFallback>
        </Avatar>
    )
}