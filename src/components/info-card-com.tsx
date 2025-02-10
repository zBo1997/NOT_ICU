import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/common/user-context";
import { AvatarUploadCom } from "@/components/avatar-upload";

export function InfoCardCom({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="rounded-xl p-16 space-y-6">
        {/* 个人信息卡片 */}
        <div>
          {/* 头像 */}
          <div className="flex justify-center">
            <AvatarUploadCom
              avatarInfo={{
                userName: user?.name || "",
                avatarUrl: `http://localhost:8080/api/file/${user?.avatar}`,
              }}
              size="lg"
              className="mt-1"
            />
          </div>
          {/* 用户名和简介 */}
          <div className="text-center">
            <h3 className="text-xl">{user?.name}</h3>
            <p className="text-sm mt-2">{user?.signature}</p>
          </div>
        </div>

        {/* 其他内容 (来自父组件) */}
        {children}
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        {/* 修改信息按钮 */}
        <div className="flex justify-center space-x-4">
          <Button>修改资料</Button>
          <Button>更改密码</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
