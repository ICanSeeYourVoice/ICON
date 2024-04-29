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
    <div className="fixed bottom-0 left-0 flex w-screen items-center px-3 py-2">
      <input
        type="text"
        className="flex-1 p-3 "
        placeholder="상담 내용을 입력하세요"
        value={message}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className={`w-[2rem] h-[2rem] flex items-center justify-center rounded-full p-2 ${
          message ? "bg-blue-500" : "bg-blue-300"
        }`}
      >
        <img src={ChatSend} alt="Send" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ChatInput;
