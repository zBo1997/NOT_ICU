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
import { get } from "@/utils/request"; // 引入你的请求工具类

// 消息类型
type Message = {
  conversationId: string;
  content: string;
  sender: "user" | "system";
  timestamp: string;
};

type Conversation = {
  conversationId: string;
  messages: Message[];
};

type ConversationId = {
  conversationId: string;
};

export function ChatCard() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const msgRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // 发送消息
  const sendMessage = async () => {
    // 获取文章详情
    const response = await get<ConversationId>(`/generateConversationId`);
    const conversationId = response.data;
    const input = msgRef.current?.value ?? "";
    if (!input.trim()) return;

    // 关闭旧SSE
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    // 创建用户消息
    const userMessage: Message = {
      conversationId: conversationId.conversationId,
      content: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    // 更新会话
    setConversations((prev) => {
      const idx = prev.findIndex(
        (c) => c.conversationId === conversationId.conversationId
      );
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].messages.push(userMessage);
        return updated;
      } else {
        return [
          ...prev,
          {
            conversationId: conversationId.conversationId,
            messages: [userMessage],
          },
        ];
      }
    });

    msgRef.current!.value = "";

    // 新建SSE连接
    const url = `/api/sse?conversationId=${conversationId.conversationId}&content=${encodeURIComponent(input)}`;
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setConversations((prev) => {
        console.log("我被执行了");
        const updated = [...prev];
        const idx = updated.findIndex(
          (c) => c.conversationId === data.conversationId
        );
        if (idx !== -1) {
          const messages = updated[idx].messages;
          // 如果最后一条是 system 消息，则拼接
          if (
            messages.length > 0 &&
            messages[messages.length - 1].sender === "system"
          ) {
            messages[messages.length - 1].content += data.content;
          } else {
            // 否则新增一条 system 消息
            messages.push({
              conversationId: data.conversationId,
              content: data.content,
              sender: "system",
              timestamp: new Date().toISOString(),
            });
          }
          return updated;
        } else {
          // 新会话
          return [
            ...prev,
            {
              conversationId: data.conversationId,
              messages: [
                {
                  conversationId: data.conversationId,
                  content: data.content,
                  sender: "system",
                  timestamp: new Date().toISOString(),
                },
              ],
            },
          ];
        }
      });
    };

    eventSource.onerror = () => {
      eventSource.close();
    };
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [conversations]);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return (
    <Card className="h-[80vh] flex flex-col w-full shadow-lg">
      <CardHeader>
        <CardTitle>ICU Chat</CardTitle>
      </CardHeader>
      <CardContent ref={contentRef} className="flex-1 min-h-0 overflow-y-auto">
        {conversations.map((conversation) => (
          <div key={conversation.conversationId} className="mb-4">
            {conversation.messages.map((message) => (
              <div
                key={message.conversationId}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
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