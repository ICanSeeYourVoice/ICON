import React, { useState } from "react";
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
  // 시간 역순으로 정렬을 해야함
  const [messages, setMessages] = useState<Message[]>([
    {
      message_type: "ASSISTANT",
      content: "첫 번째 메시지입니다.",
      timestamp: new Date("2024-04-22T12:00:00"),
    },
    {
      message_type: "USER",
      content: "첫 번째 메시지입니다.",
      timestamp: new Date("2024-04-22T12:00:00"),
    },
    {
      message_type: "USER",
      content: "첫 번째 메시지입니다.",
      timestamp: new Date("2024-04-22T12:00:00"),
    },
    {
      message_type: "USER",
      content: "첫 번째 메시지입니다.",
      timestamp: new Date("2024-04-22T12:00:00"),
    },
  ]);
  const handleSendMessage = (newContent: string) => {
    const newMessage: Message = {
      message_type: "USER",
      content: newContent,
      timestamp: new Date(),
    };

    // 마지막 메시지와 새 메시지의 날짜를 비교하여 날짜가 변경되었는지 확인
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
    console.log("새로운 메시지", newMessage);
    newMessages.push(newMessage);
    setMessages([newMessage, ...messages]);
  };

  const addMessage = (content: string, message_type: "USER" | "ASSISTANT") => {
    const newMessage: Message = {
      message_type: message_type,
      content: content,
      timestamp: new Date(),
    };

    const lastMessage = messages[0];
    // 날짜 메시지 생성
    if (
      !lastMessage ||
      newMessage.timestamp.toDateString() !==
        lastMessage.timestamp.toDateString()
    ) {
      const dateMessage: Message = {
        message_type: "date",
        content: "",
        timestamp: newMessage.timestamp,
      };
      setMessages([dateMessage, newMessage, ...messages]);
    } else {
      setMessages([newMessage, ...messages]);
    }
  };

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
      <div>
        <button
          onClick={() => addMessage("봇 새로운 메시지", "ASSISTANT")}
          className=" bg-blue-100 "
        >
          봇 메시지
        </button>
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
