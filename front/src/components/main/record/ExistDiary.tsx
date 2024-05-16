import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { diaryDelete, diaryDetail } from "../../../apis/Diary";
import { useState } from "react";
import Trash from "../../../assets/svgs/record/blackTrash.svg";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Vector from "../../../assets/svgs/nav/Vector.svg";
import { PulseLoader } from "react-spinners";
import Clude1 from "../../../assets/svgs/record/1.png";
import Clude2 from "../../../assets/svgs/record/2.png";
import Clude4 from "../../../assets/svgs/record/3.png";
import Clude3 from "../../../assets/svgs/record/4.png";
import Clude5 from "../../../assets/svgs/record/5.png";
import Clude6 from "../../../assets/svgs/record/6.png";
import Clude7 from "../../../assets/svgs/record/7.png";
import Clude8 from "../../../assets/svgs/record/8.png";
import Clude9 from "../../../assets/svgs/record/9.png";
import Clude0 from "../../../assets/svgs/record/blueClude.png";
import DoughnutChart from "./chart/DoughnutChart";
import VerticalTimeLine from "./timeline/VerticalTimeLine";
import DiaryChartToggle from "./DiaryChartToggle";

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

const ExistDiary = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [daily, setDaily] = useState("diary");
  const selectedDate: string | null = sessionStorage.getItem("date");
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
    clude9: { id: "clude2", url: Clude9 },
  };

  const { data: DiaryList, isFetching: DiaryLoading } =
    useQuery<DiaryEntryProps>({
      queryKey: ["diaryDetail"],
      queryFn: () => diaryDetail(selectedDate ?? ""),
    });

  //다이어리 삭제
  const { mutate: deleteDiaryEntry } = useMutation({
    mutationFn: diaryDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["DiaryList"] });
    },
    onError: (error) => {
      console.log(`일지 삭제 실패`, error);
    },
  });

  const formattedDate = moment(DiaryList!.date).format("M월 D일");
  const formattedDayOfWeek = moment(DiaryList!.date).format("dddd");

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === DiaryList!.image_urls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? DiaryList!.image_urls.length - 1 : prevIndex - 1
    );
  };

  const hanlDeleteClick = () => {
    setShowModal(true);
  };

  const handleDailyChange = (clickDaily: string) => {
    clickDaily === "daily" ? "diary" : "chart";
    setDaily(clickDaily);
  };

  const handleTopClick = () => {
    navigate("/record/diary");
  };

  // 로딩중 화면
  if (DiaryLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <PulseLoader color="#c8c8c8" />
      </div>
    );
  }

  return (
    <div className="w-full  h-screen ">
      <div className="flex flex-col items-center h-screen w-screen">
        <div className="w-full h-[6rem] fixed flex flex-col items-center z-10 ">
          <div className="m-auto w-[80%]">
            <div className="flex justify-between items-center font-bold">
              <button onClick={handleTopClick}>
                <img src={Vector} alt="Back" />
              </button>
              <div
                onClick={() => hanlDeleteClick()}
                className="flex justify-end  items-center w-[80%]"
              >
                <div className="w-[2rem] h-[2rem] flex justify-center items-center">
                  <img
                    src={Trash}
                    alt="삭제"
                    className="w-[1.5rem] h-[1.5rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 이모지 */}
        <div className="justify-center items-center flex mt-[4.5rem]">
          <img
            src={images[DiaryList!.emoji].url}
            alt=""
            className=" w-[5rem] h-[5rem]"
          />
        </div>

        <div className="flex flex-col w-full items-center  justify-center gap-[0.3rem]">
          <div className="text-[1.3rem] ">{formattedDate}</div>
          <div>{formattedDayOfWeek}</div>
        </div>

        {/* 다이어리 차트 토글 */}
        <DiaryChartToggle daily={daily} handleDailyChange={handleDailyChange} />

        {/* 삭제 버튼 */}

        {daily === "diary" ? (
          <div className="w-full flex justify-center ">
            <div className="w-[90%] justify-center items-center  rounded-[1rem] overflow-auto p-2 pt-[1rem]">
              <div className="relative flex justify-center items-center">
                {DiaryList!.image_urls.length > 1 && (
                  <button
                    onClick={prevImage}
                    className="absolute left-[-0.5rem] z-10"
                  >
                    &lt;
                  </button>
                )}
                <img
                  src={DiaryList!.image_urls[currentIndex]}
                  alt={`Image ${currentIndex}`}
                  className="flex-none w-[20rem] h-[17rem] object-cover"
                />
                {DiaryList!.image_urls.length > 1 && (
                  <button
                    onClick={nextImage}
                    className="absolute right-[-0.5rem]"
                  >
                    &gt;
                  </button>
                )}
              </div>
              <div className="text-gray-700 text-[1rem] p-5 border-[0.1rem] rounded-[1rem] mt-[0.5rem] max-h-[7rem] overflow-y-auto no-scrollbar">
                {DiaryList!.content}
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
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-gray-100 rounded-[1rem] shadow-lg p-5 ">
            <div className="flex justify-center items-center mb-[1rem] text-sm p-2">
              정말로 일지를 삭제 하시겠습니까?
            </div>
            <div className="flex justify-center">
              <div className="w-[11rem] flex justify-between ">
                <button
                  className="bg-primary text-white w-[5rem] py-1 rounded-[1rem] hover:bg-blue-400"
                  onClick={() => {
                    setShowModal(false);
                    deleteDiaryEntry(DiaryList!.date);
                    navigate("/record/diary");
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
  );
};

export default ExistDiary;
