// src/utils/navigation.ts
import { useNavigate } from "react-router-dom";

// 路由跳转工具方法
export const useNavigateTo = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return { navigateTo };
};
