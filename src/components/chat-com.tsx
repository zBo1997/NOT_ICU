import { useRef, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// 消息类型
type Message = {
  id: number;
  sender: "user" | "system"; // 发送方
  content: string; // 消息内容
};

export function ChatCard() {
  const [messages, setMessages] = useState<Message[]>([]); // 消息历史
  const msgRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // 用于获取内容区域的 DOM 元素

  // 发送消息
  const sendMessage = () => {
    const input = msgRef.current?.value ?? "";
    if (!input.trim()) return;
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: input,
    };
    const systemMessage: Message = {
      id: messages.length + 2,
      sender: "system",
      content: `你说的是: "${input}"`, // 模拟回复
    };

    setMessages([...messages, userMessage, systemMessage]); // 添加消息
    msgRef.current!.value = "";
  };

  // 监听 messages 的变化，滚动到底部
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages]);

  // 监听服务器推送的消息
  useEffect(() => {
    const eventSource = new EventSource("api/sse");

    eventSource.onmessage = (event) => {
      const newMessage = event.data; // 获取服务器推送的消息
      setMessages((prevMessages) => [...prevMessages, newMessage]); // 更新消息列表
    };

    eventSource.onerror = () => {
      console.error("SSE connection error");
      eventSource.close();
    };

    return () => {
      eventSource.close(); // 组件卸载时关闭连接
    };
  }, []);

  return (
    <Card className="max-h-[80vh] flex flex-col">
      {/* 头部 */}
      <CardHeader>
        <CardTitle>ICU Chat</CardTitle>
      </CardHeader>

      {/* 消息内容区域 */}
      <CardContent ref={contentRef} className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[75%] ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </CardContent>

      {/* 输入框和按钮 */}
      <CardFooter className="flex space-x-2">
        <Input
          ref={msgRef}
          placeholder="输入消息..."
          className="flex-1"
          enterKeyHint="send"
          onKeyDown={(event) => event.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>发送</Button>
      </CardFooter>
    </Card>
  );
}
