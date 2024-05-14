import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Vector from "../../assets/svgs/nav/Vector.svg";
import { PulseLoader } from "react-spinners";
import Arrow from "../../assets/svgs/record/arrowRight.svg";
import { diaryDetail } from "../../apis/Diary";
import ExistDiary from "../../components/main/record/ExistDiary";
import Clude1 from "../../assets/svgs/record/blueClude.png";
import Clude2 from "../../assets/svgs/record/blueClude.png";
import Clude4 from "../../assets/svgs/record/blueClude.png";
import Clude3 from "../../assets/svgs/record/blueClude.png";
import Clude5 from "../../assets/svgs/record/blueClude.png";
import Clude6 from "../../assets/svgs/record/blueClude.png";
import Clude7 from "../../assets/svgs/record/blueClude.png";
import Clude8 from "../../assets/svgs/record/blueClude.png";
import Clude0 from "../../assets/svgs/record/blueClude.png";
import { useEmojiStore } from "../../stores/diary";
import DoughnutChart from "../../components/main/record/chart/DoughnutChart";
import VerticalTimeLine from "../../components/main/record/timeline/VerticalTimeLine";

interface DiaryEntryProps {
  diary_id: number;
  date: string;
  content: string;
  image_urls: string[];
  emoji: string;
}

interface ImageMap {
  [key: string]: {
    id: string;
    url: string;
  };
}

const DetailDiary = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { setSelectedEmojiId } = useEmojiStore();
  const selectedEmoji = useEmojiStore((state) => state.selectedEmojiId);

  const [daily, setDaily] = useState("diary");
  const selectedDate: string | null = sessionStorage.getItem("date");

  const { data: DiaryList, isLoading: DiaryLoading } =
    useQuery<DiaryEntryProps>({
      queryKey: ["diaryDetail"],
      queryFn: () => diaryDetail(selectedDate ?? ""),
    });

  const handleCancel = () => {
    setShowModal(false);
    setSelectedEmojiId(null);
  };

  const handleEmojiClick = (id: string) => {
    setSelectedEmojiId(id);
  };

  const formattedDate = moment(selectedDate).format("MM월 DD일");
  const formattedDayOfWeek = moment(selectedDate).format("dddd");

  const images: ImageMap = {
    clude: { id: "clude", url: Clude0 },
    clude1: { id: "clude1", url: Clude1 },
    clude2: { id: "clude2", url: Clude2 },
    clude3: { id: "clude2", url: Clude3 },
    clude4: { id: "clude2", url: Clude4 },
    clude5: { id: "clude2", url: Clude5 },
    clude6: { id: "clude2", url: Clude6 },
    clude7: { id: "clude2", url: Clude7 },
    clude8: { id: "clude2", url: Clude8 },
  };

  const handleDailyChange = (clickDaily: string) => {
    clickDaily === "daily" ? "diary" : "chart";
    setDaily(clickDaily);
  };

  const handleTopClick = () => {
    navigate("/record/diary");
  };

  const goToRegister = () => {
    setShowModal(true);
  };

  return (
    <>
      {!DiaryList?.diary_id ? (
        <div className="w-full  h-screen ">
          <div className="flex flex-col items-center h-screen w-screen">
            <div className="w-full h-[6rem] fixed flex flex-col items-center z-10 ">
              <div className="m-auto w-[80%]">
                {DiaryLoading && (
                  <div className="w-screen h-screen flex justify-center items-center">
                    <PulseLoader color="#7ec3f0" />
                  </div>
                )}
                <div className="flex justify-between items-center font-bold">
                  <button onClick={handleTopClick}>
                    <img src={Vector} alt="Back" />
                  </button>
                </div>
              </div>
            </div>

            {/* 이모지 */}
            <div className="justify-center items-center flex mt-[4.5rem]">
              <img src={Clude0} alt="" className=" w-[5rem] h-[5rem]" />
            </div>

            <div className="flex flex-col w-full items-center  justify-center gap-[0.3rem]">
              <div className="text-[1.3rem] ">{formattedDate}</div>
              <div>{formattedDayOfWeek}</div>
            </div>

            {/* 다이어리 차트 토글 */}
            <div className="flex w-[90%] justify-start mt-[2rem]">
              <button
                className={`flex-1 p-2 transition-colors duration-300 ease-in-out ${
                  daily === "diary"
                    ? "bg-gray-300 text-white"
                    : "bg-gray-100 hover:bg-gray-300"
                } rounded-l-lg`}
                onClick={() => handleDailyChange("diary")}
              >
                다이어리
              </button>
              <button
                className={`flex-1 p-2 transition-colors duration-300 ease-in-out ${
                  daily === "chart"
                    ? "bg-gray-300 text-white"
                    : "bg-gray-100 hover:bg-gray-300"
                } rounded-r-lg`}
                onClick={() => handleDailyChange("chart")}
              >
                통계
              </button>
            </div>

            {daily === "diary" ? (
              <div
                onClick={goToRegister}
                className="w-full justify-center flex items-center mt-[3rem]"
              >
                <div className="text-white fixed bottom-[5rem] w-[3rem] h-[3rem] flex justify-center items-center shadow-xl hover:bg-gray-400 bg-gray-300 text-[2rem] rounded-[1rem]">
                  +
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center m-[1rem] gap-[1rem] flex-1">
                  <DoughnutChart date={selectedDate} />
                </div>
                <div className="flex flex-col items-center mb-[1rem] gap-[1rem] flex-1">
                  <VerticalTimeLine date={selectedDate} />
                </div>
              </div>
            )}
          </div>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
              <div className="bg-gray-100 pl-[1.5rem] pr-[1.5rem] pb-[1.5rem] pt-[1rem] rounded-[1rem] shadow-lg  ">
                <div className="w-full flex justify-end mb-[1rem]">
                  <button className=" text-black" onClick={handleCancel}>
                    x
                  </button>
                </div>
                <div className="flex justify-center items-center mb-[2rem] text-sm">
                  오늘의 감정을 골라보세요
                </div>
                <div className="grid grid-cols-3 gap-4 mb-[2rem]">
                  {Object.entries(images).map(([id, { url }]) => (
                    <img
                      key={id}
                      src={url}
                      alt="Emoji"
                      className={`rounded-full w-[3rem] h-[3rem] cursor-pointer ${
                        selectedEmoji === id ? "scale-125 shadow-lg" : ""
                      }`}
                      onClick={() => handleEmojiClick(id)}
                    />
                  ))}
                </div>
                <div className="flex justify-around">
                  <button
                    className="bg-gray-300 text-white py-1 px-1 rounded-[1rem] hover:bg-gray-400"
                    onClick={() => {
                      setShowModal(false);
                      navigate("/record/diary/register");
                    }}
                  >
                    <img src={Arrow} alt="arrow" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <ExistDiary />
        </div>
      )}
    </>
  );
};

export default DetailDiary;
