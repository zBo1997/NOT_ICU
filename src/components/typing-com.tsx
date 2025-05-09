import { useState, useEffect } from "react";

interface TypingTextProps {
  texts: string[]; // 文案数组
  typingSpeed?: number; // 每个字的显示间隔时间（毫秒）
  switchDelay?: number; // 切换到下一个文案的延迟时间（毫秒）
  className?: string; // 自定义样式类名
}

export const TypingText: React.FC<TypingTextProps> = ({
  texts,
  typingSpeed = 150,
  switchDelay = 3000,
  className = "",
}) => {
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
      if (index < fullTextArray.length) {
        setDisplayedText(fullTextArray.slice(0, index + 1).join("")); // 使用切片确保正确显示字符
        index++;
      } else {
        clearInterval(typingInterval); // 清除逐字显示定时器
      }
    }, typingSpeed);

    // 切换到下一个文案
    const switchInterval = setTimeout(
      () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length); // 循环切换文案
      },
      fullTextArray.length * typingSpeed + switchDelay
    );

    return () => {
      clearInterval(typingInterval); // 清理逐字显示定时器
      clearTimeout(switchInterval); // 清理切换文案定时器
    };
  }, [currentIndex, texts, typingSpeed, switchDelay]);

  return (
    <span className={`typing-text ${className}`}>
      {displayedText}
      <span className="animate-blink"> _</span>
    </span>
  );
};
