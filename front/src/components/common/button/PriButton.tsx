import React from "react";
import Volume from "../../../assets/svgs/voice/volume.svg";
import Trash from "../../../assets/svgs/voice/Trash.svg";
import { DeleteVoice } from "../../../apis/Voice";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ButtonProps {
  label: string;
  onClick: () => void;
  id: number;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, id }) => {
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
    <div className="flex justify-center">
      <div className="w-[20rem] h-[5rem] p-2 border-b border-gray-300 ">
        <div className=" text-[1rem] w-[17rem]">{label}</div>
        <div className="flex justify-between mt-[0.5rem] ">
          <div
            onClick={() => handleDelete(id)}
            className="flex justify-center items-center  rounded-[1rem] w-[1.5rem] h-[1.5rem] border-2 bg-gray-500"
          >
            <img src={Trash} alt="" />
          </div>
          <div
            onClick={onClick}
            className="flex justify-center items-center  rounded-[1rem] w-[1.5rem] h-[1.5rem] border-2 bg-primary "
          >
            <img src={Volume} alt="sound" className="w-[1rem] h-[1rem]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Button;
