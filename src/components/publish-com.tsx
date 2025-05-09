import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PublishCom() {
  // 文案数组
  const texts = [
    "最美的不是下雨天,是曾与你躲过雨的屋檐。",
    "弹指岁月倾城顷刻间烟灭，青石板街回眸一笑你婉约。‌‌",
    "冷咖啡离开了杯垫，我忍住的情绪在很后面，拼命想挽回的从前，在我脸上依旧清晰可见。",
  ];

  const [displayedText, setDisplayedText] = useState(""); // 当前显示的文本
  const [currentIndex, setCurrentIndex] = useState(0); // 当前文案索引

  useEffect(() => {
    if (!texts[currentIndex]) return; // 如果当前文案无效，直接返回

    let index = 0;
    const fullTextArray = Array.from(texts[currentIndex]); // 当前文案字符数组

    // 重置文本内容
    setDisplayedText("");

    // 定时器逐字显示当前文案
    const typingInterval = setInterval(() => {
      if (index < fullTextArray.length && fullTextArray[index + 1]) {
        setDisplayedText((prev) => prev + fullTextArray[index]);
        index++;
      } else {
        clearInterval(typingInterval); // 清除逐字显示定时器
      }
    }, 150); // 每个字的间隔时间（毫秒）

    // 切换到下一个文案
    const switchInterval = setTimeout(
      () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length); // 循环切换文案
      },
      fullTextArray.length * 150 + 3000
    ); // 等待当前文案显示完成后再切换，额外等待 2 秒

    return () => {
      clearInterval(typingInterval); // 清理逐字显示定时器
      clearTimeout(switchInterval); // 清理切换文案定时器
    };
  }, [currentIndex]); // 依赖当前文案索引

  return (
    <Card className="flex flex-col">
      {/* 头部 */}
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          {displayedText}
          <span className="animate-blink"> _</span>
        </CardTitle>
      </CardHeader>

      {/* 消息内容区域 */}
      <CardContent>这里是内容区域</CardContent>

      {/* 输入框和按钮 */}
      <CardFooter className="flex space-x-2"></CardFooter>
    </Card>
  );
}
