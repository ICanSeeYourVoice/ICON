import babyclosed from "../../../assets/svgs/detection/babyclosed.svg";

const UnresponsiveButton = () => {
  return (
    <div className="flex justify-center items-center aspect-square w-[80%] relative max-h-[17.75rem] max-w-[17.75rem]">
      <div className="max-w-[17.75rem] w-[80%] aspect-square flex justify-center items-center rounded-full bg-[#7BB7F715]">
        <div className="max-w-[14.625rem] w-[80%] aspect-square flex justify-center items-center rounded-full bg-[#7BB7F715]">
          <div className="max-w-[11.5rem] w-[80%] aspect-square flex justify-center items-center rounded-full bg-[#7BB7F715]"></div>
        </div>
      </div>
      <button
        className="flex justify-center items-center w-[35%] aspect-square rounded-full absolute max-w-[7.5rem] max-h-[7.5rem]"
        style={{ backgroundColor: "#7BB7F740" }}
      >
        <img src={babyclosed} alt="" />
      </button>
    </div>
  );
};

export default UnresponsiveButton;
