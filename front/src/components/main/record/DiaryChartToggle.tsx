const DiaryChartToggle = ({
  daily,
  handleDailyChange,
}: {
  daily: string;
  handleDailyChange: (clickDaily: string) => void;
}) => (
  <div className="flex w-[90%] justify-start mt-[2rem]">
    <button
      className={`flex-1 p-2 transition-colors duration-300 ease-in-out ${
        daily === "diary"
          ? "bg-primary text-white"
          : "bg-gray-100 hover:bg-gray-300"
      } rounded-l-lg`}
      onClick={() => handleDailyChange("diary")}
    >
      다이어리
    </button>
    <button
      className={`flex-1 p-2 transition-colors duration-300 ease-in-out ${
        daily === "chart"
          ? "bg-primary text-white"
          : "bg-gray-100 hover:bg-gray-300"
      } rounded-r-lg`}
      onClick={() => handleDailyChange("chart")}
    >
      아이의 하루
    </button>
  </div>
);

export default DiaryChartToggle;
