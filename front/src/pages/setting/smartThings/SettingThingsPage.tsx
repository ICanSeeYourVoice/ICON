import comport from "../../../assets/svgs/things/comport.svg";
import discomport from "../../../assets/svgs/things/discomport.svg";
import hungry from "../../../assets/svgs/things/hungry.svg";
import sick from "../../../assets/svgs/things/sick.svg";
import sleep from "../../../assets/svgs/things/sleep.svg";

const SettingThingsPage = () => {
  const lst = [
    { img: comport, text: "평온함" },
    { img: discomport, text: "불편함" },
    { img: sleep, text: "졸림" },
    { img: hungry, text: "배고픔" },
    { img: sick, text: "아픔" },
  ];

  return (
    <div className="flex flex-col text-gray-1 text-[1rem] w-[15.25rem] justify-center items-center gap-[2rem]">
      <p>상태에 따른 알림을 설정 해보세요</p>

      <div className="w-full flex flex-wrap justify-between gap-[1.2rem]">
        {lst.map(({ img }, idx) => (
          <div key={idx} className=" w-[7rem]">
            <div>
              <img src={img} className="rounded-[1rem]border-8 border-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingThingsPage;
