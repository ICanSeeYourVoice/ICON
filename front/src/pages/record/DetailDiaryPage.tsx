import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Vector from "../../assets/svgs/nav/Vector.svg";
import { PulseLoader } from "react-spinners";
import Clude0 from "../../assets/svgs/setting/delete.svg";
import { diaryDetail } from "../../apis/Diary";
import ExistDiary from "../../components/main/record/ExistDiary";

interface DiaryEntryProps {
  diary_id: number;
  date: string;
  content: string;
  image_urls: string[];
  emoji: string;
}

const DetailDiary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dateStr } = location.state || {};
  console.log(dateStr, "날짜");

  const [daily, setDaily] = useState("diary");
  const selectedDate: string | null = sessionStorage.getItem("date");
  console.log(typeof selectedDate);

  const { data: DiaryList, isLoading: DiaryLoading } =
    useQuery<DiaryEntryProps>({
      queryKey: ["diaryDetail"],
      queryFn: () => diaryDetail(selectedDate ?? ""),
    });

  const formattedDate = moment(selectedDate).format("MM월 DD일");
  const formattedDayOfWeek = moment(selectedDate).format("dddd");

  console.log(DiaryList);
  const handleDailyChange = (clickDaily: string) => {
    clickDaily === "daily" ? "diary" : "chart";
    setDaily(clickDaily);
  };

  const handleTopClick = () => {
    navigate("/record/diary");
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
            <div className="justify-center items-center flex mt-[6rem]">
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
                    ? "bg-gray-300 text-white shadow-lg"
                    : "bg-gray-200 hover:bg-gray-300"
                } rounded-l-lg`}
                onClick={() => handleDailyChange("diary")}
              >
                다이어리
              </button>
              <button
                className={`flex-1 p-2 transition-colors duration-300 ease-in-out ${
                  daily === "chart"
                    ? "bg-gray-300 text-white shadow-lg"
                    : "bg-gray-200 hover:bg-gray-300"
                } rounded-r-lg`}
                onClick={() => handleDailyChange("chart")}
              >
                통계
              </button>
            </div>

            {daily === "diary" ? <div>일지</div> : <div>chart</div>}
          </div>
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
