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
import ReactMarkdown from "react-markdown";

// 消息类型
type Message = {
  id: number;
  conversationId: string;
  type: "text" | "system" | "end";
  content: string;
  is_end: boolean;
  timestamp: string;
  sender?: "user" | "system";
};

// 会话类型
type Conversation = {
  id: string;
  messages: Message[];
};

export function ChatCard() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const msgRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // 发送消息
  const sendMessage = () => {
    const input = msgRef.current?.value ?? "";
    if (!input.trim()) return;

    // 生成会话ID（如果已有则复用）
    const conversationId = Date.now().toString();

    // 关闭旧SSE
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    // 前端先渲染用户消息
    const userMessage: Message = {
      id: Date.now(),
      conversationId,
      type: "text",
      content: input,
      is_end: false,
      timestamp: new Date().toISOString(),
      sender: "user",
    };
    setConversations((prev) => {
      const idx = prev.findIndex((c) => c.id === conversationId);
      if (idx !== -1) {
        // 已有会话，追加消息
        const updated = [...prev];
        updated[idx].messages.push(userMessage);
        return updated;
      } else {
        // 新会话
        return [...prev, { id: conversationId, messages: [userMessage] }];
      }
    });

    // 清空输入框
    msgRef.current!.value = "";

    // 新建SSE连接，带参数
    const url = `/api/sse?conversationId=${conversationId}&content=${encodeURIComponent(
      input
    )}&sender=user`;
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      const newMessage: Message = JSON.parse(event.data);

      setConversations((prevConversations) => {
        const updatedConversations = [...prevConversations];
        let conversation = updatedConversations.find(
          (conv) => conv.id === newMessage.conversationId
        );
        if (!conversation) {
          conversation = { id: newMessage.conversationId, messages: [] };
          updatedConversations.push(conversation);
        }
        const lastMsg = conversation.messages.at(-1);
        if (
          lastMsg &&
          lastMsg.type === "text" &&
          !lastMsg.is_end &&
          lastMsg.sender === "system"
        ) {
          lastMsg.content = newMessage.content; // 用 =，因为后端是全量内容
        } else {
          conversation.messages.push(newMessage);
        }
        return updatedConversations;
      });

      // 结束关闭SSE
      if (newMessage.is_end) {
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };
  };

  // 滚动到底部
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [conversations]);

  // 组件卸载时关闭 SSE
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return (
    <Card className="h-[80vh] flex flex-col w-full shadow-lg">
      {/* 头部 */}
      <CardHeader>
        <CardTitle>ICU Chat</CardTitle>
      </CardHeader>

      {/* 消息内容区域 */}
      <CardContent ref={contentRef} className="flex-1 min-h-0 overflow-y-auto">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="mb-4">
            {conversation.messages.map((message) => (
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
                  {message.sender === "system" ? (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  ) : (
                    message.content
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
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