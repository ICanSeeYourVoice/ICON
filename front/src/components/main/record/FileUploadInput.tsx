import React, { useRef } from "react";
import CameraIcon from "../../../assets/svgs/record/camera.svg";
import toast from "react-hot-toast";
import { useImageStore } from "../../../stores/diary";
import { useMutation } from "@tanstack/react-query";
import { diaryImage } from "../../../apis/Diary";
import axios from "axios";

const FileUploadInput: React.FC = () => {
  const { previewUrls, addImage, removeImage } = useImageStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: ImageRegister } = useMutation({
    mutationFn: diaryImage,
    onSuccess: (res) => {
      addImage(res.url);
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 413) {
          toast.error("파일 크기가 커서 등록에 실패했어요");
        } else {
          toast.error("이미지 업로드에 실패했습니다.");
        }
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
      console.error("API error: ", error);
    },
  });
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (previewUrls.length >= 6) {
      toast("사진은 최대 6장까지 등록 가능합니다.", {
        icon: "❗❗",
      });
      return;
    }

    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      newFiles.forEach((file) => {
        ImageRegister({ imageData: file });
      });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />
      <div className="text-sm mb-1">사진 등록</div>
      <button
        onClick={handleClick}
        className="flex justify-center items-center rounded-[1rem] border  w-[3rem] h-[3rem] bg-gray-100  mb-[0.5rem]"
      >
        <img src={CameraIcon} alt="Upload" className="w-[2rem] h-[2rem]" />
      </button>
      <div className="image-preview flex flex-wrap gap-x-5 gap-y-5 w-[18rem] h-[12rem] justify-center mb-[0.2rem]">
        {previewUrls.map((url, index) => (
          <div
            key={index}
            className="w-[5rem] h-[5rem] p-1 relative overflow-hidden"
          >
            <img
              src={url}
              alt={`Preview ${index + 1}`}
              className="w-full h-auto object-cover"
            />
            <button
              className="absolute top-0 right-0 bg-gray-400 text-white p-1 rounded-full text-[0.5rem] w-[1rem] h-[1rem] justify-center items-center flex"
              onClick={() => removeImage(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploadInput;
