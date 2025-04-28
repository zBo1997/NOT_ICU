import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CaptchaModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (captcha: string) => void;
}

export function CaptchaModal({ visible, onClose, onSubmit }: CaptchaModalProps) {
  const [captcha, setCaptcha] = useState("");

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">请输入验证码</h2>
        <Input
          type="text"
          placeholder="输入验证码"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
        />
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button
            onClick={() => {
              onSubmit(captcha);
              setCaptcha("");
            }}
          >
            确认
          </Button>
        </div>
      </div>
    </div>
  );
}