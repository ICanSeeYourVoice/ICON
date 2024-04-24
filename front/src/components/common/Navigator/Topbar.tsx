import { useNavigate } from "react-router-dom";
import Vector from "../../../../src/assets/svgs/nav/Vector.svg";

interface TopbarProps {
  text: string;
  path?: string;
}

const Topbar: React.FC<TopbarProps> = ({ text, path }) => {
  const navigate = useNavigate();

  const handleTopClick = () => {
    if (path) {
      navigate(`/${path}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="top-0 left-0 right-0 z-10 flex flex-col items-center ">
      <div className="m-auto">
        <div className="flex w-[17rem] justify-between items-center font-bold pt-[3.125rem]">
          <div onClick={handleTopClick} className="cursor-pointer">
            <img src={Vector} alt="Back" />
          </div>
          <div>{text}</div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
