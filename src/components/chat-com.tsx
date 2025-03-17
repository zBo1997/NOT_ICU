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
  id: number; // 消息唯一 ID，数字类型
  conversationId: string; // 对话 ID，字符串类型
  type: "text" | "system" | "end"; // 消息类型
  content: string; // 消息内容
  is_end: boolean; // 是否结束
  timestamp: string; // 时间戳
  sender?: "user" | "system"; // 发送方（可选，用于前端区分）
};

// 对话类型
type Conversation = {
  id: string; // 对话 ID
  messages: Message[]; // 对话中的消息
};

export function ChatCard() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const msgRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 发送消息
  const sendMessage = () => {
    const input = msgRef.current?.value ?? "";
    if (!input.trim()) return;

    // 用户消息
    const userMessage: Message = {
      id: Date.now(), // 使用时间戳作为唯一 ID
      conversationId: Date.now().toString(), // 使用时间戳作为对话 ID
      type: "text",
      content: input,
      is_end: false,
      timestamp: new Date().toISOString(),
      sender: "user",
    };

    // 添加消息到对话
    setConversations((prevConversations) => {
      const newConversation: Conversation = {
        id: userMessage.conversationId,
        messages: [userMessage],
      };
      return [...prevConversations, newConversation];
    });

    msgRef.current!.value = "";
  };

  // 监听消息变化，滚动到底部
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [conversations]);

  // 监听服务器推送的消息
  useEffect(() => {
    const eventSource = new EventSource("api/sse");

    eventSource.onmessage = (event) => {
      const newMessage: Message = JSON.parse(event.data);

      // 更新对话
      setConversations((prevConversations) => {
        const updatedConversations = [...prevConversations];
        const conversationIndex = updatedConversations.findIndex(
          (conv) => conv.id === newMessage.conversationId
        );

        if (conversationIndex !== -1) {
          // 如果对话已存在，更新最后一条消息的内容（流式输出）
          const lastMessage =
            updatedConversations[conversationIndex].messages.at(-1);
          if (
            lastMessage &&
            lastMessage.type === "text" &&
            !lastMessage.is_end
          ) {
            lastMessage.content += newMessage.content; // 逐段追加内容
          } else {
            // 否则，将新消息添加到对话中
            updatedConversations[conversationIndex].messages.push(newMessage);
          }
        } else {
          // 如果对话不存在，创建新对话
          const newConversation: Conversation = {
            id: newMessage.conversationId,
            messages: [newMessage],
          };
          updatedConversations.push(newConversation);
        }

        return updatedConversations;
      });

      // 如果消息标记为结束，关闭 SSE 连接
      if (newMessage.is_end) {
        console.log("对话结束，关闭 SSE 连接");
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      console.error("SSE connection error");
      eventSource.close();
    };

    // 组件卸载时关闭连接
    return () => {
      eventSource.close();
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
                  {message.content}
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