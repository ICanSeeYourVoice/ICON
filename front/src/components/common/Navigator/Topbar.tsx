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
    <div className="fixed top-0 left-0 right-0 z-10">
      <div className="m-auto">
        <div className="flex justify-between items-center font-bold p-[3.125rem]">
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
