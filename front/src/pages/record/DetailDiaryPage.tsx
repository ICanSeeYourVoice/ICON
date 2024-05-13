import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { diaryDelete, diaryDetail } from "../../apis/Diary";
import { useState } from "react";
import toast from "react-hot-toast";
import Trash from "../../assets/svgs/record/blackTrash.svg";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Vector from "../../assets/svgs/nav/Vector.svg";
import { PulseLoader } from "react-spinners";
import Clude1 from "../../assets/svgs/record/blueClude.png";
import Clude2 from "../../assets/svgs/record/blueClude.png";
import Clude4 from "../../assets/svgs/record/blueClude.png";
import Clude3 from "../../assets/svgs/record/blueClude.png";
import Clude5 from "../../assets/svgs/record/blueClude.png";
import Clude6 from "../../assets/svgs/record/blueClude.png";
import Clude7 from "../../assets/svgs/record/blueClude.png";
import Clude8 from "../../assets/svgs/record/blueClude.png";
import Clude0 from "../../assets/svgs/setting/delete.svg";

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
  const queryClient = useQueryClient();
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
  };

  const { data: DiaryList } = useQuery<DiaryEntryProps>({
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

  if (!DiaryList) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <PulseLoader color="#7ec3f0" />
      </div>
    );
  }

  const formattedDate = moment(DiaryList.date).format("M월 D일");
  const formattedDayOfWeek = moment(DiaryList.date).format("dddd");

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === DiaryList.image_urls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? DiaryList.image_urls.length - 1 : prevIndex - 1
    );
  };

  const hanlDeleteClick = (diaryDay: string) => {
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
              deleteDiaryEntry(diaryDay);
              toast.dismiss(t.id);
              navigate("/record/diary");
            }}
          >
            확인
          </button>
        </div>
      </div>
    ));
  };

  const handleDailyChange = (clickDaily: string) => {
    clickDaily === "daily" ? "diary" : "chart";
    setDaily(clickDaily);
  };

  const handleTopClick = () => {
    navigate("/record");
  };

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
                onClick={() => hanlDeleteClick(DiaryList.date)}
                className="pt-[1rem] flex justify-end  items-center  mb-[0.5rem]"
              >
                <div className="w-[2rem] h-[2rem] flex justify-center items-center">
                  <img src={Trash} alt="삭제" className="w-[1.5rem]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 이모지 */}
        <div className="justify-center items-center flex mt-[6rem]">
          {daily === "diary" ? (
            <div>
              <img
                src={images[DiaryList.emoji].url}
                alt=""
                className=" w-[5rem] h-[5rem]"
              />
            </div>
          ) : (
            <div>
              <img src={Clude0} alt="" className=" w-[5rem] h-[5rem]" />
            </div>
          )}
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

        {daily === "diary" ? (
          <div className="w-full flex justify-center ">
            <div className="w-[90%] justify-center items-center  rounded-[1rem] overflow-auto p-2 pt-[2rem]">
              <div className="relative flex justify-center items-center">
                {DiaryList.image_urls.length > 1 && (
                  <button onClick={prevImage} className="absolute left-0 z-10">
                    &lt;
                  </button>
                )}
                <img
                  src={DiaryList.image_urls[currentIndex]}
                  alt={`Image ${currentIndex}`}
                  className="flex-none w-[20rem] h-[17rem] object-cover"
                />
                {DiaryList.image_urls.length > 1 && (
                  <button onClick={nextImage} className="absolute right-0 z-10">
                    &gt;
                  </button>
                )}
              </div>
              <div className="text-gray-700 text-[1rem] p-5 bg-gray-200 rounded-[1rem] mt-[0.5rem]">
                {DiaryList.content}
              </div>
            </div>
          </div>
        ) : (
          <div>chart</div>
        )}
      </div>
    </div>
  );
};

export default DetailDiary;
