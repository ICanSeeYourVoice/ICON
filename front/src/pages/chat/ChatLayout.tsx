import { Outlet } from "react-router-dom";
import Refresh from "../../assets/svgs/chat/refresh.svg";

const ChatLayout = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem]  overflow-hidden">
      <header className="text-primary w-[15.25rem] text-2xl flex ">
        상담챗봇{" "}
        <button className="ml-[7.6rem] w-[2rem] h-[2rem] bg-blue-400 rounded-lg">
          <img src={Refresh} alt="" />
        </button>
      </header>

      <main className="flex flex-col items-center justify-center w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ChatLayout;
