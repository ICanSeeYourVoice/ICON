import React, { useState } from "react";
import ChatSend from "../../../assets/svgs/chat/ChatSend.svg";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex w-full bottom-0 items-center justify-between border-t px-3 py-1">
      <input
        type="text"
        className="p-3"
        placeholder="상담 내용을 입력하세요"
        value={message}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className={`w-[2rem] h-[2rem] flex items-center justify-center rounded-full ${
          message ? "bg-blue-500" : "bg-blue-300"
        }`}
      >
        <img src={ChatSend} alt="Send" className="w-[58%] h-[58%]" />
      </button>
    </div>
  );
};

export default ChatInput;
