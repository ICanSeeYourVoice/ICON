import { Outlet } from "react-router-dom";

const ChatLayout = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] gap-[1rem] ">
      <header className="text-primary w-[15.25rem] text-2xl">상담챗봇</header>
      <main className="flex flex-col items-center justify-center w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ChatLayout;
