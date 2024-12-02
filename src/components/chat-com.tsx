import { useRef, useState } from "react";
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

  return (
    <Card className="h-[100%] flex flex-col">
      <CardHeader>
        <CardTitle>ICU Chat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 overflow-y-auto flex-1">
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
      <CardFooter className="flex space-x-2">
        <Input
          ref={msgRef}
          placeholder="输入消息..."
          className="flex-1"
          enterKeyHint="send"
          onKeyDown={(event) => event.key === "Enter" && sendMessage()}
        />
      </CardFooter>
    </Card>
  );
}
