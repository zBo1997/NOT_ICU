import { useState, useEffect } from "react";

interface TypingTextProps {
  texts: string; // 只接收一个文案
  typingSpeed?: number;
  switchDelay?: number;
  className?: string;
  onTypingEnd?: () => void;
}

export const TypingText: React.FC<TypingTextProps> = ({
  texts,
  typingSpeed = 150,
  switchDelay = 3000,
  className = "",
  onTypingEnd,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!texts) return;

    setDisplayedText("");
    let index = 0;
    const fullTextArray = Array.from(texts);

    const typingInterval = setInterval(() => {
      if (index < fullTextArray.length) {
        setDisplayedText(fullTextArray.slice(0, index + 1).join(""));
        index++;
      } else {
        clearInterval(typingInterval);
        // 输入完成后延迟 switchDelay 触发回调
        if (onTypingEnd) {
          setTimeout(() => {
            onTypingEnd();
          }, switchDelay);
        }
      }
    }, typingSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [texts, typingSpeed, switchDelay, onTypingEnd]);

  return (
    <span className={`typing-text ${className}`}>
      {displayedText}
      <span className="animate-blink"> _</span>
    </span>
  );
};