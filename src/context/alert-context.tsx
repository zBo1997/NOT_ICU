// alert-context.tsx
import { createContext, useContext, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { AlertTitle, AlertDescription } from "@/components/ui/alert";

interface AlertContextType {
  showAlert: (title: string, message: string) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<{ title: string; message: string } | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false); // 控制弹窗是否可见

  const showAlert = (title: string, message: string) => {
    setAlert({ title, message });
    setIsVisible(true); // 显示弹窗

    // 3秒后自动隐藏
    setTimeout(() => {
      setIsVisible(false);
      setAlert(null); // 隐藏弹窗
    }, 3000);
  };

  const hideAlert = () => {
    setIsVisible(false);
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && isVisible && (
        <div
          className="fixed top-4 right-4 z-50 transition-all duration-500 transform"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-20px)",
          }}
        >
          <Alert>
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
