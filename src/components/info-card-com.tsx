import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/common/user-context";
import { AvatarUploadCom } from "@/components/avatar-upload";
import { toast } from "sonner"; // 引入 sonner 库 提示
import { postFormData } from "@/utils/request"; // 引入刚刚写的请求工具类
export function InfoCardCom({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  return (
    <Card className="flex flex-col  bg-gradient-to-r shadow-lg rounded-lg overflow-hidden">
      <CardContent className="w-full p-6">
        {/* 个人信息卡片 */}
        <div>
          {/* 头像 */}
          <div className="flex justify-center">
            <AvatarUploadCom
              avatarInfo={{
                userName: user?.name || "",
                avatarUrl: user?.avatar || "",
              }}
              onAvatarChange={async (newAvatarUrl) => {
                const formData = new FormData();
                formData.append("userId", user?.id || "");
                formData.append("avatar", newAvatarUrl || "");
                user!.avatar = newAvatarUrl;
                try {
                  const response = await postFormData<{
                    error: string;
                    errorContent: string;
                    imgKey: string;
                  }>("/updateAvatar", formData, {
                    headers: {
                      "Content-Type": "multipart/form-data", // 设置为表单数据类型
                      Authorization: `${
                        JSON.parse(localStorage.getItem("user") || "{}").token
                      }`,
                    },
                  });
                  if (response.data.error) {
                    toast(response.data.errorContent); // 更新失败弹出警告
                    return;
                  } else {
                    const imgKey = response.data.imgKey;
                    console.log("更新成功" + imgKey);
                    // 更新用户头像逻辑，例如更新用户信息或重新加载页面
                    user!.avatar = imgKey;
                    localStorage.setItem("user", JSON.stringify(user)); // 保存用户信息
                    window.location.reload(); // 重新加载页面
                  }
                } catch (error) {
                  toast("服务器出小差了"); // 更新失败弹出警告
                  console.log(error);
                  return;
                }
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
