import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { CreateVoice } from "../../../apis/Voice";

const Button = () => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const { mutate: createVoice } = useMutation({
    mutationFn: CreateVoice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["voiceList"],
      });
    },
    onError: (error) => {
      console.error("Delete error:", error);
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    createVoice(text);
  };

  return (
    <div className="flex justify-center">
      <div className="w-[20rem] h-[5rem] p-2 border-b border-gray-300 overflow-hidden">
        <input
          type="text"
          placeholder="등록할 문구를 입력해주세요"
          value={text}
          onChange={handleChange}
          className="mt-1 text-sx w-full p-1"
        />
        <div className="flex justify-between">
          <div></div>
          <div
            className="w-[3rem] h-[2rem] bg-gray-400 flex justify-center items-center text-white text-sm rounded-full cursor-pointer"
            onClick={handleSubmit}
          >
            등록
          </div>
        </div>
      </div>
    </div>
  );
};

export default Button;
