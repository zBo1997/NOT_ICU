import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useEffect, useState } from "react";
import { post, get } from "@/utils/request"; // 引入刚刚写的请求工具类
import { toast } from "sonner"; // 引入 sonner 库 提示
import { ModeToggle } from "@/components/mode-toggle";
export function LoginForm({
  className,
  register,
  ...props
}: React.ComponentProps<"div"> & { register: () => void }) {
  // 使用 ref 来获取输入框值
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const captchaRef = useRef<HTMLInputElement | null>(null); // 新增验证码输入框的 ref

  const [captchaImage, setCaptchaImage] = useState<string>(""); // 用于存储验证码图片的状态
  const [captchaId, setCaptchaId] = useState<string>(""); // 用于存储验证码 ID

  // 获取验证码图片
  const fetchCaptcha = async () => {
    try {
      // 这里直接拿到 JSON 对象
      const response = await get<{
        captcha_id: string;
        captcha_image: string;
      }>("/captcha");
      setCaptchaImage(`data:image/png;base64,${response.data.captcha_image}`);
      setCaptchaId(response.data.captcha_id);
    } catch (error) {
      console.error(error);
      toast("获取验证码失败");
    }
  };

  // 在组件加载时获取验证码
  useEffect(() => {
    fetchCaptcha();
  }, []);

  // 登录
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();
    const captchaCode = captchaRef.current?.value?.trim();

    // 手动验证必填字段
    if (!username) {
      toast("用户名不能为空");
      return;
    }
    if (!password) {
      toast("密码不能为空");
      return;
    }
    if (!captchaCode) {
      toast("验证码不能为空");
      return;
    }

    try {
      const response = await post<{
        error: string;
        errorContent: string;
        token: string;
      }>("login", {
        username,
        password,
        captchaCode, // 将验证码发送到后端
        captchaId: captchaId, // 将验证码 ID 一起发送到后端
      });
      if (response.data.error) {
        toast(response.data.error);
        fetchCaptcha(); // 验证失败时刷新验证码
        return;
      } else {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload();
      }
    } catch (error) {
      toast("服务器出小差了");
      fetchCaptcha(); // 请求失败时刷新验证码
      console.error(error);
      return;
    }
  };

  const toRegister = () => {
    //调用父组件传递的 setRegister 方法
    register();
  };

  return (
    <div className={cn("flex flex-col gap-5", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">欢迎回来</h1>
                <p className="text-balance text-muted-foreground">
                  登录你的ICU账户
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">账户</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="请输入你的账号"
                  autoComplete="username"
                  required
                  ref={usernameRef} // 使用 ref 来获取值
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">密码</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    忘记密码?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="请输入你的密码"
                  autoComplete="current-password"
                  required
                  ref={passwordRef}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="captcha">验证码</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="captcha"
                    type="text"
                    placeholder="请输入验证码"
                    required
                    ref={captchaRef}
                  />
                  <img
                    src={captchaImage}
                    alt="验证码"
                    className="h-10 cursor-pointer"
                    onClick={fetchCaptcha} // 点击刷新验证码
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" onClick={handleLogin}>
                登 录
              </Button>
              {/* 暗黑模式切换 */}
              <div className="text-center">
                亮瞎狗眼了？开启暗黑模式试试！
                <ModeToggle />
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  或者从这里继续
                </span>
              </div>
              {/* <div className="grid grid-cols-1 gap-4">
                <Button variant="outline" className="w-full">
                  <span>先不登录</span>
                </Button>
                {/* <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Meta</span>
                </Button>
              </div> */}
              <div className="text-center text-sm">
                没有账号?~{" "}
                <a
                  href="#"
                  className="underline underline-offset-4"
                  onClick={toRegister}
                >
                  注册一个ICU账号
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/home_picture.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        如果点击了继续,则代表你同意了我们的用户协议 <a href="#">服务条款</a> 和{" "}
        <a href="#">隐私政策</a>.
      </div>
    </div>
  );
}
