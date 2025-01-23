
import './App.css'

import { ThemeProvider } from "@/components/theme-provider"
import { ResizableCom } from '@/components/resize-handle'
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-com";

function App() {
  // 获取用户信息
  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  // 获取是否需要注册
  const getRegister = () => {
    return localStorage.getItem("register");
  };

  const user = getUser();
  const register = getRegister();
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
  if (register) {
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
