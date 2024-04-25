import React, { useState } from "react";
import BotChat from "../../components/main/chat/BotChat";
import ChatDate from "../../components/main/chat/ChatDate";
import MyChat from "../../components/main/chat/MyChat";

interface Message {
  id: number;
  type: "my" | "bot" | "date";
  text: string;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  // 시간 역순으로 정렬을 해야함
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "my",
      text: `첫 번째 메시지입니다`,
      timestamp: new Date("2024-04-24T12:20:00"),
    },
    {
      id: 2,
      type: "bot",
      text: "두 번째 메시지입니다.",
      timestamp: new Date("2024-04-23T15:00:00"),
    },
    {
      id: 3,
      type: "bot",
      text: "세 번째 메시지입니다.",
      timestamp: new Date("2024-04-23T13:00:00"),
    },
    {
      id: 4,
      type: "my",
      text: "네 번째 메시지입니다.",
      timestamp: new Date("2024-04-23T23:16:00"),
    },
    {
      id: 5,
      type: "bot",
      text: "다섯 번째 메시지입니다.",
      timestamp: new Date("2024-04-22T12:00:00"),
    },
  ]);

  const addMessage = (text: string, type: "my" | "bot") => {
    const newMessage: Message = {
      id: messages.length + 1,
      type: type,
      text: text,
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
        id: newMessage.id - 1,
        type: "date",
        text: "",
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
            <React.Fragment key={message.id}>
              {message.type === "my" && (
                <MyChat text={message.text} timestamp={message.timestamp} />
              )}
              {message.type === "bot" && (
                <BotChat text={message.text} timestamp={message.timestamp} />
              )}
              {isFirstMessageOfDay && <ChatDate date={message.timestamp} />}
            </React.Fragment>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => addMessage("봇 새로운 메시지", "bot")}
          className=" bg-blue-100 "
        >
          봇 메시지 추가
        </button>
        <button
          onClick={() => addMessage("나의 새로운 메시지", "my")}
          className=" bg-red-100 "
        >
          나의 메시지 추가
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
