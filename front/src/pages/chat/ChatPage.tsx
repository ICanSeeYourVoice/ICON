import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ChatAll, SendChat } from "../../apis/Chat";
import BotChat from "../../components/main/chat/BotChat";
import ChatDate from "../../components/main/chat/ChatDate";
import MyChat from "../../components/main/chat/MyChat";
import ChatInput from "../../components/main/chat/ChatInput";
import MoveButton from "../../components/common/button/MoveButton";

interface Message {
  message_type: "USER" | "ASSISTANT" | "date";
  content: string;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  // 채팅 전체 받아오기
  const {
    data: chatAll,
    isLoading,
    isError,
  } = useQuery({
    queryFn: ChatAll,
    queryKey: ["chatAll"],
  });

  useEffect(() => {
    if (chatAll && Array.isArray(chatAll)) {
      const convertedMessages = chatAll.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(convertedMessages);
    }
  }, [chatAll]);

  // 채팅 보내기
  const { mutate: sendChat } = useMutation({
    mutationFn: SendChat,
    onSuccess: (res) => {
      const newMessage: Message = {
        message_type: "ASSISTANT",
        content: res.content,
        timestamp: new Date(),
      };

      const newMessages = [newMessage, ...messages];

      const lastMessage = newMessages[1];
      if (
        !lastMessage ||
        newMessage.timestamp.toDateString() !==
          lastMessage.timestamp.toDateString()
      ) {
        newMessages.splice(1, 0, {
          message_type: "date",
          content: "",
          timestamp: newMessage.timestamp,
        });
      }

      setMessages(newMessages);
    },
    onError: () => {
      alert("채팅 보내기 실패");
    },
  });

  const handleSendMessage = (newContent: string) => {
    const newMessage: Message = {
      message_type: "USER",
      content: newContent,
      timestamp: new Date(),
    };

    const lastMessage =
      messages.length > 0 ? messages[messages.length - 1] : null;
    const newMessages = [...messages];
    if (
      lastMessage &&
      newMessage.timestamp.toDateString() !==
        lastMessage.timestamp.toDateString()
    ) {
      newMessages.push({
        message_type: "date",
        content: "",
        timestamp: newMessage.timestamp,
      });
    }
    newMessages.push(newMessage);
    setMessages([newMessage, ...messages]);
    sendChat({ message: newContent });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading chat data.</div>;
  }

  return (
    <div className="flex flex-col gap-[1rem] p-[2rem]">
      <div className="flex flex-col-reverse overflow-auto h-[60vh]">
        {messages.map((message, index, arr) => {
          const isFirstMessageOfDay =
            index === arr.length - 1 ||
            message.timestamp.toDateString() !==
              arr[index + 1].timestamp.toDateString();

          return (
            <div>
              {isFirstMessageOfDay && <ChatDate date={message.timestamp} />}
              {message.message_type === "USER" && (
                <MyChat
                  content={message.content}
                  timestamp={message.timestamp}
                />
              )}
              {message.message_type === "ASSISTANT" && (
                <BotChat
                  content={message.content}
                  timestamp={message.timestamp}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-auto">
        <div className="flex justify-center pb-5">
          <MoveButton text="메인으로 돌아가기" path="/detection" />
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
