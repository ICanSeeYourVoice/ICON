import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Vector from "../../assets/svgs/nav/Vector.svg";
import { PulseLoader } from "react-spinners";
import { diaryDetail } from "../../apis/Diary";
import ExistDiary from "../../components/main/record/ExistDiary";
import Clude1 from "../../assets/svgs/record/1.png";
import Clude2 from "../../assets/svgs/record/2.png";
import Clude4 from "../../assets/svgs/record/3.png";
import Clude3 from "../../assets/svgs/record/4.png";
import Clude5 from "../../assets/svgs/record/5.png";
import Clude6 from "../../assets/svgs/record/6.png";
import Clude7 from "../../assets/svgs/record/7.png";
import Clude8 from "../../assets/svgs/record/8.png";
import Clude9 from "../../assets/svgs/record/9.png";
import Clude0 from "../../assets/svgs/record/blueClude.png";
import { useEmojiStore } from "../../stores/diary";
import DoughnutChart from "../../components/main/record/chart/DoughnutChart";
import VerticalTimeLine from "../../components/main/record/timeline/VerticalTimeLine";
import DiaryChartToggle from "../../components/main/record/DiaryChartToggle";
import EmojiModal from "../../components/main/record/EmojiModal";

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

  const { data: DiaryList, isFetching: DiaryLoading } =
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
    clude9: { id: "clude", url: Clude9 },
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
                <div className="flex justify-between items-center font-bold">
                  <button onClick={handleTopClick}>
                    <img src={Vector} alt="Back" />
                  </button>
                </div>
              </div>
            </div>

            {/* 이모지 */}
            {DiaryLoading ? (
              <div className="justify-center items-center flex mt-[4.5rem] h-[5rem]">
                <PulseLoader color="#c8c8c8" />
              </div>
            ) : (
              <div className="justify-center items-center flex mt-[4.5rem]">
                <img src={Clude0} alt="" className=" w-[5rem] h-[5rem]" />
              </div>
            )}

            <div className="flex flex-col w-full items-center  justify-center gap-[0.3rem]">
              <div className="text-[1.3rem] ">{formattedDate}</div>
              <div>{formattedDayOfWeek}</div>
            </div>

            {/* 다이어리 차트 토글 */}
            <DiaryChartToggle
              daily={daily}
              handleDailyChange={handleDailyChange}
            />
            {!DiaryLoading &&
              (daily === "diary" ? (
                <div>
                  <div
                    onClick={goToRegister}
                    className="w-full justify-center  items-center mt-[3rem]"
                  >
                    <div className="mt-[2rem]">
                      일지가 없어요 일지를 작성해주세요
                    </div>
                    <div className="w-full flex justify-center mt-[3rem]">
                      <div className="text-white  w-[3rem] h-[3rem] flex justify-center items-center shadow-xl hover:bg-gray-400 bg-gray-300 text-[2rem] rounded-[1rem]">
                        +
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-[90%] h-full gap-[1rem]">
                  <div className="flex flex-col items-center flex-1">
                    <DoughnutChart date={selectedDate} />
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <VerticalTimeLine date={selectedDate} />
                  </div>
                </div>
              ))}
          </div>
          {showModal && (
            <EmojiModal
              showModal={showModal}
              setShowModal={setShowModal}
              handleCancel={handleCancel}
              handleEmojiClick={handleEmojiClick}
              selectedEmoji={selectedEmoji}
              images={images}
            />
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
