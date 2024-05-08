import { Outlet, useNavigate } from "react-router-dom";
import Refresh from "../../assets/svgs/chat/refresh.svg";
import { ClearChat } from "../../apis/Chat";
import { useMutation } from "@tanstack/react-query";
import { useChatStore } from "../../stores/chat";
import Vector from "../../assets/svgs/nav/Vector.svg";
import toast from "react-hot-toast";

const ChatLayout = () => {
  const navigate = useNavigate();

  // 채팅 초기화
  const clearMessages = useChatStore((state) => state.clearMessages);
  const { mutate: clearChat } = useMutation({
    mutationFn: ClearChat,
    onSuccess: () => {
      clearMessages();
    },
    onError: (error) => {
      console.error("Failed to clear chat: ", error);
    },
  });

  const handleTopClick = () => {
    navigate("/detection");
  };

  const hanlDeleteClick = () => {
    toast((t) => (
      <div className="flex flex-col items-center justify-center w-full">
        <p>일지를 삭제하시겠습니까?</p>
        <hr />
        <div className="mt-4 flex w-full justify-end text-white">
          <button
            className="bg-gray-1 py-2 px-4 rounded mr-[0.4rem]"
            onClick={() => {
              toast.dismiss(t.id);
            }}
          >
            취소
          </button>
          <button
            className="bg-primary py-2 px-4 rounded mr-2"
            onClick={() => {
              clearChat();
              toast.dismiss(t.id);
            }}
          >
            확인
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <div className="bg-white z-10 flex flex-col items-center w-full h-[6rem] fixed">
        <div className="m-auto w-[80%]">
          <div className="flex justify-between items-center font-bold">
            <button onClick={handleTopClick}>
              <img src={Vector} alt="Back" />
            </button>
            <div>상담 챗봇</div>
            <div>
              <button
                onClick={hanlDeleteClick}
                className=" w-[2rem] h-[2rem] bg-blue-400 rounded-lg"
              >
                <img src={Refresh} alt="chatClear" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex flex-col items-center justify-center w-[80%] mt-[6rem]">
        <Outlet />
      </main>
    </div>
  );
};

export default ChatLayout;
