import { useNavigate } from "react-router-dom";

const MoveButton = ({ text, path }: { text: string; path: string }) => {
  const navigate = useNavigate();
  const goPathClick = () => {
    navigate(`${path}`);
  };

  return (
    <button
      onClick={goPathClick}
      className=" flex justify-center items-center w-[9.375rem] h-[2.5625rem] bg-gradient-to-r from-linear-0 to-linear-100 rounded-[1.9375rem]"
    >
      <div className="text-[0.8rem] text-center text-white">{text}</div>
    </button>
  );
};

export default MoveButton;
