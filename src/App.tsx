
import './App.css'

import { ThemeProvider } from "@/components/theme-provider"
import { ResizableCom } from '@/components/resize-handle'
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-com";
import { UserProvider } from "@/common/user-context";
import { useState } from "react";

function App() {
  const user = UserProvider();
  const [register, setRegister] = useState(false); // 用 useState 管理 register 状态

  const toRegist = () => {
    setRegister(true); // 点击时更新 register 状态为 true
  };

  const toLogin = () => {
    setRegister(false); // 点击时更新 register 状态为 false
  };

  // 登录页面 没有用户或者没有打开注册按钮
  if (!user && !register) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm register={toRegist} /> {/* 将 toRegist 传递给 LoginForm */}
        </div>
      </div>
    );
  }
  //注册页面 需要展示注册页面
  if (register) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <RegisterForm register={toLogin} />
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
