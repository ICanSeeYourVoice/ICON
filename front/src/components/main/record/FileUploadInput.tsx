import React, { useRef } from "react";
import CameraIcon from "../../../assets/svgs/record/camera.svg";
import toast from "react-hot-toast";
import { useImageStore } from "../../../stores/diary";

const FileUploadInput: React.FC = () => {
  const { imageFiles, previewUrls, addImages, removeImage } = useImageStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (imageFiles.length >= 6) {
      toast("사진은 최대 6장까지 등록 가능합니다.", {
        icon: "❗❗",
      });
      return;
    }

    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      addImages(newFiles);
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
        className="flex justify-center items-center rounded-[1rem] border border-gray-500 w-[3rem] h-[3rem] bg-gray-200 mb-[0.5rem]"
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
