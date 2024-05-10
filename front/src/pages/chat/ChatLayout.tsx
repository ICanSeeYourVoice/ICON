import { Outlet, useNavigate } from "react-router-dom";
import Refresh from "../../assets/svgs/chat/refresh.svg";
import { ClearChat } from "../../apis/Chat";
import { useMutation } from "@tanstack/react-query";
import { useChatStore } from "../../stores/chat";
import Vector from "../../assets/svgs/nav/Vector.svg";
import { useState } from "react";

const ChatLayout = () => {
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(true);
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
            <div className="w-[2rem] h-[2rem]">
              <button
                onClick={hanlDeleteClick}
                className=" bg-primary rounded-full"
              >
                <img src={Refresh} alt="chatClear" />
              </button>
            </div>
          </div>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
              <div className="bg-gray-100 rounded-[1rem] shadow-lg p-5 ">
                <div className="flex justify-center items-center mb-[1rem] text-sm p-2">
                  정말로 채팅을 초기화 하시겠습니까?
                </div>
                <div className="flex justify-center">
                  <div className="w-[11rem] flex justify-between ">
                    <button
                      className="bg-primary text-white w-[5rem] py-1 rounded-[1rem] hover:bg-blue-400"
                      onClick={() => {
                        clearChat();
                        setShowModal(false);
                      }}
                    >
                      확인
                    </button>
                    <button
                      className=" bg-gray-400 text-white w-[5rem] py-1  rounded-[1rem] hover:bg-gray-500"
                      onClick={() => setShowModal(false)}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <main className="flex flex-col items-center justify-center w-[80%] mt-[6rem]">
        <Outlet />
      </main>
    </div>
  );
};

export default ChatLayout;
