import React from "react";
import Check from "../../../assets/svgs/voice/check.svg";
import Trash from "../../../assets/svgs/voice/trash.svg";
import { DeleteVoice } from "../../../apis/Voice";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ButtonProps {
  label: string;
  onClick: () => void;
  id: number;
  isSelected: boolean;
}

// 자주 사용하는 문구 삭제
const Button: React.FC<ButtonProps> = ({ label, onClick, id, isSelected }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteVoice } = useMutation({
    mutationFn: DeleteVoice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["voiceList"],
      });
    },
    onError: (error) => {
      console.error("삭제 실패:", error);
    },
  });

  const handleDelete = (id: number) => {
    deleteVoice(id);
  };

  return (
    <div className="flex justify-center mb-[1rem]">
      <div className="w-full h-[5rem] border-b border-gray-300">
        <div className=" text-[1rem] w-[17rem]">{label}</div>
        <div className="flex justify-between mt-[0.5rem] ">
          <div
            onClick={() => handleDelete(id)}
            className="flex justify-center items-center  rounded-[1rem] w-[1.5rem] h-[1.5rem] bg-gray-400 "
          >
            <img src={Trash} alt="" />
          </div>
          <div
            onClick={onClick}
            className={`flex justify-center items-center rounded-full w-[1.5rem] h-[1.5rem] ${
              isSelected ? " bg-green-500" : " bg-primary"
            }`}
          >
            <img src={Check} alt="sound" className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Button;
