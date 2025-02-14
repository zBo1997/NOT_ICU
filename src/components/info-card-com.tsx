import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/common/user-context";
import { AvatarUploadCom } from "@/components/avatar-upload";
import { useAlert } from "@/context/alert-context"; // 导入 useAlert
import { post } from "@/utils/request"; // 引入刚刚写的请求工具类
export function InfoCardCom({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  const { showAlert } = useAlert(); // 获取 showAlert 方法
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
                avatarUrl: user?.avatar || "",
              }}
              onAvatarChange={async (newAvatarUrl) => {
                // 更新用户信息
                // 这里只是模拟更新用户信息，实际项目中需要调用接口
                user!.avatar = newAvatarUrl;
                // 更新用户头像
                try {
                  const response = await post<{
                    error: string;
                    errorContent: string;
                    token: string;
                  }>("updateUser", {
                    user,
                  });
                  if (response.data.error) {
                    showAlert(response.data.error, response.data.errorContent); // 更新失败弹出警告
                    return;
                  } else {
                    //设置用户信息
                    localStorage.setItem("user", JSON.stringify(response.data)); // 保存用户信息
                    // 如果更新成功，可以保存 token 或用户信息到本地
                    window.location.reload(); // 重新加载页面
                  }
                } catch (error) {
                  showAlert("更新失败", "服务器出小差了"); // 更新失败弹出警告
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
