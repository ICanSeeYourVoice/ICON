import { Outlet } from "react-router-dom";
import Refresh from "../../assets/svgs/chat/refresh.svg";
import { ClearChat } from "../../apis/Chat";
import { useMutation } from "@tanstack/react-query";
import { useChatStore } from "../../stores/chat";

const ChatLayout = () => {
  // 채팅 초기화
  const clearMessages = useChatStore((state) => state.clearMessages);

  const { mutate: clearChat } = useMutation({
    mutationFn: ClearChat,
    onSuccess: () => {
      clearMessages();
      console.log("Chat cleared successfully.");
    },
    onError: (error) => {
      console.error("Failed to clear chat: ", error);
    },
  });

  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem]  overflow-hidden">
      <header className="text-primary w-[15.25rem] text-2xl flex ">
        상담챗봇{" "}
        <button
          onClick={() => clearChat()}
          className="ml-[7.6rem] w-[2rem] h-[2rem] bg-blue-400 rounded-lg"
        >
          <img src={Refresh} alt="chatClear" />
        </button>
      </header>

      <main className="flex flex-col items-center justify-center w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ChatLayout;
