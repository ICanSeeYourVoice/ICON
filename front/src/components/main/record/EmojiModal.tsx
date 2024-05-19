import { useNavigate } from "react-router-dom";
import Arrow from "../../../assets/svgs/record/arrowRight.svg";

const EmojiModal = ({
  showModal,
  setShowModal,
  handleCancel,
  handleEmojiClick,
  selectedEmoji,
  images,
}: {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleCancel: () => void;
  handleEmojiClick: (id: string) => void;
  selectedEmoji: string | null;
  images: { [key: string]: { id: string; url: string } };
}) => {
  const navigate = useNavigate();

  if (!showModal) return null;

  const handleSubmit = () => {
    if (selectedEmoji) {
      setShowModal(false);
      navigate("/record/diary/register");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-gray-100 pl-[1.5rem] pr-[1.5rem] pb-[1.5rem] pt-[1rem] rounded-[1rem] shadow-lg">
        <div className="w-full flex justify-end mb-[1rem]">
          <button className="text-black" onClick={handleCancel}>
            x
          </button>
        </div>
        <div className="flex justify-center items-center mb-[2rem] text-sm">
          오늘의 감정을 골라보세요
        </div>
        <div className="grid grid-cols-3 gap-4 mb-[2rem]">
          {Object.entries(images).map(([id, { url }]) => (
            <img
              key={id}
              src={url}
              alt="Emoji"
              className={`rounded-full w-[3rem] h-[3rem] cursor-pointer ${
                selectedEmoji === id ? "scale-125 shadow-lg" : ""
              }`}
              onClick={() => handleEmojiClick(id)}
            />
          ))}
        </div>
        <div className="flex justify-around">
          <button
            className={`py-1 px-1 rounded-[1rem] ${
              selectedEmoji
                ? "bg-primary text-white hover:bg-gray-400"
                : "bg-gray-300 text-gray-400 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!selectedEmoji}
          >
            <img src={Arrow} alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmojiModal;
