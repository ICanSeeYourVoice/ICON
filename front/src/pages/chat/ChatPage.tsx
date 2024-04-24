import React from "react";
import ChatDate from "../../components/main/chat/ChatDate";

const messageDate = "2024-04-24";

const ChatPage: React.FC = () => {
  return (
    <div>
      <div>
        <ChatDate date={new Date(messageDate)} />
      </div>
    </div>
  );
};

export default ChatPage;
