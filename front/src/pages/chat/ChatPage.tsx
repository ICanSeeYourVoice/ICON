import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ChatAll, SendChat } from "../../apis/Chat";
import BotChat from "../../components/main/chat/BotChat";
import ChatDate from "../../components/main/chat/ChatDate";
import MyChat from "../../components/main/chat/MyChat";
import ChatInput from "../../components/main/chat/ChatInput";
import MoveButton from "../../components/common/button/MoveButton";
import { useChatStore } from "../../stores/chat";
import { PulseLoader } from "react-spinners";

interface MessageProps {
  message_type: "USER" | "ASSISTANT" | "date";
  content: string;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const { messages, setMessages } = useChatStore();
  const [isSending, setIsSending] = useState(false);

  // 채팅 가져오기
  const {
    data: chatAll,
    isLoading,
    isError,
  } = useQuery({
    queryFn: ChatAll,
    queryKey: ["chatAll"],
  });

  useEffect(() => {
    if (chatAll) {
      const convertedMessages = chatAll.map((msg: MessageProps) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));

      setMessages(convertedMessages.reverse());
    }
  }, [chatAll]);

  // 채팅 보내기
  const { mutate: sendChat } = useMutation({
    mutationFn: SendChat,
    onMutate: () => {
      setIsSending(true);
    },
    onSuccess: (res) => {
      setIsSending(false);

      const newMessage: MessageProps = {
        message_type: "ASSISTANT",
        content: res.content,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => {
        const newMessages = [newMessage, ...prevMessages];
        const lastMessage =
          prevMessages.length > 0
            ? prevMessages[prevMessages.length - 1]
            : null;

        if (
          lastMessage &&
          newMessage.timestamp.toDateString() !==
            lastMessage.timestamp.toDateString()
        ) {
          newMessages.splice(1, 0, {
            message_type: "date",
            content: "",
            timestamp: newMessage.timestamp,
          });
        }

        return newMessages;
      });
    },
    onError: () => {
      setIsSending(false);
      alert("채팅 보내기 실패");
    },
  });

  const handleSendMessage = (newContent: string) => {
    const newMessage: MessageProps = {
      message_type: "USER",
      content: newContent,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => {
      const newMessages = [newMessage, ...prevMessages];
      const lastMessage =
        prevMessages.length > 0 ? prevMessages[prevMessages.length - 1] : null;

      if (
        lastMessage &&
        newMessage.timestamp.toDateString() !==
          lastMessage.timestamp.toDateString()
      ) {
        newMessages.splice(1, 0, {
          message_type: "date",
          content: "",
          timestamp: newMessage.timestamp,
        });
      }

      return newMessages;
    });

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
            <div key={index}>
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

      {isSending && (
        <div className="flex justify-center items-center">
          <PulseLoader color="#7ec3f0" />
        </div>
      )}

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
