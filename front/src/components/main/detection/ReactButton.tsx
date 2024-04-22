import "./ReactButton.css";

const ReactButton = ({ icon, color }: { icon: string; color: string }) => {
  return (
    <div className="circle-container">
      <div
        style={{ backgroundColor: `${color}33` }}
        className="circle"
        id="circle1"
      >
        <div
          style={{ backgroundColor: `${color}33` }}
          className="circle"
          id="circle2"
        >
          <div
            style={{ backgroundColor: `${color}33` }}
            className="circle"
            id="circle3"
          ></div>
        </div>
      </div>
      <button
        className="flex justify-center items-center w-[7.5rem] h-[7.5rem] rounded-full absolute"
        style={{ backgroundColor: color }}
      >
        <img src={icon} alt="" />
      </button>
    </div>
  );
};

export default ReactButton;
