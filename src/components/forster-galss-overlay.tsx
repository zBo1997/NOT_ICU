import { useState } from "react";
import { Button } from "@/components/ui/button"; // 假设有一个 Button 组件

export function FrostedGlassOverlay() {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  return (
    <div>
      {/* 按钮来控制遮罩的显示与隐藏 */}
      <Button onClick={toggleOverlay}>显示磨砂玻璃遮罩</Button>

      {/* 磨砂玻璃遮罩层 */}
      {isOverlayVisible && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50"
          onClick={toggleOverlay} // 点击遮罩层关闭
        >
          {/* 这里是磨砂玻璃效果 */}
          <div className="flex justify-center items-center w-full h-full">
            <div className="bg-white p-8 rounded-lg opacity-90">
              <h2 className="text-xl">这是一个磨砂玻璃效果的遮罩层</h2>
              <Button onClick={toggleOverlay}>关闭遮罩</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
