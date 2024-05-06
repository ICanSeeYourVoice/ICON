import { useNavigate } from "react-router-dom";
import Vector from "../../../../src/assets/svgs/nav/Vector.svg";

interface TopBarProps {
  text: string;
  path?: string;
}

const TopBar: React.FC<TopBarProps> = ({ text, path }) => {
  const navigate = useNavigate();

  const handleTopClick = () => {
    if (path) {
      navigate(`/${path}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="bg-white z-10 flex flex-col items-center w-[80%] h-[6rem] fixed">
      <div className="m-auto w-full">
        <div className="flex justify-between items-center font-bold">
          <button onClick={handleTopClick}>
            <img src={Vector} alt="Back" />
          </button>
          <div>{text}</div>
          <div className="w-[16px]"></div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
