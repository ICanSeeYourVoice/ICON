import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { CreateVoice } from "../../../apis/Voice";
import toast from "react-hot-toast";

const Button = () => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  // 자주 사용하는 문구 등록
  const { mutate: createVoice } = useMutation({
    mutationFn: CreateVoice,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["voiceList"],
      });
      setText("");
    },
    onError: () => {
      toast.error("정확한 문구를 작성해주세요");
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    if (inputText.length <= 30) {
      setText(inputText);
    } else {
      toast.error("최대 30자까지 등록 가능합니다");
      return;
    }
    setText(inputText);
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
