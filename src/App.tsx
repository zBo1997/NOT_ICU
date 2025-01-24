
import './App.css'

import { ThemeProvider } from "@/components/theme-provider"
import { ResizableCom } from '@/components/resize-handle'
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-com";
import { UserProvider, RegisterProvider } from "@/common/user-context";

function App() {
  const user = UserProvider();
  const register = RegisterProvider();

  // 登录页面 没有用户或者没有打开注册按钮
  if (!user && !register) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    );
  }
  //注册页面 需要展示注册页面
  if (user) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <RegisterForm />
        </div>
      </div>
    );
  }

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ResizableCom />
      </ThemeProvider>
    </>
  );
}

export default App
