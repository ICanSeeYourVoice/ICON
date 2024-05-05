import React, { useRef, useState } from "react";
import CameraIcon from "../../../assets/svgs/record/camera.svg";
import toast from "react-hot-toast";

interface ImageUploadState {
  imageFiles: File[];
  previewUrls: string[];
}

const FileUploadInput: React.FC = () => {
  const [images, setImages] = useState<ImageUploadState>({
    imageFiles: [],
    previewUrls: [],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (images.imageFiles.length >= 6) {
      toast("사진은 최대 6장까지 등록 가능합니다", {
        icon: "❗❗",
      });
      return;
    }

    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const totalFiles = images.imageFiles.concat(newFiles).slice(0, 6);
      const fileURLs = totalFiles.map((file) => URL.createObjectURL(file));

      setImages({
        imageFiles: totalFiles,
        previewUrls: fileURLs,
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = images.imageFiles.filter((_, i) => i !== index);
    const newURLs = images.previewUrls.filter((_, i) => i !== index);
    setImages({
      imageFiles: newFiles,
      previewUrls: newURLs,
    });
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-[15rem]">
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
        className="flex justify-center items-center rounded-[1rem] border border-gray-500 w-[3rem] h-[3rem] bg-gray-200 mb-[0.3rem] ml-[0.3rem]"
      >
        <img src={CameraIcon} alt="Upload" className="w-[2rem] h-[2rem]" />
      </button>
      <div className="image-preview flex flex-wrap gap-x-5 gap-y-2 w-[15rem] h-[7rem] justify-center mb-[0.2rem]">
        {images.previewUrls.map((url, index) => (
          <div
            key={index}
            className="w-[3.5rem] h-[3.5rem] p-1 relative overflow-hidden"
          >
            <img
              src={url}
              alt={`Preview ${index + 1}`}
              className="w-full h-auto object-cover"
            />
            <button
              className="absolute top-0 right-0 bg-gray-400 text-white p-1 rounded-full text-[0.5rem] w-[1rem] h-[1rem] justify-center items-center flex"
              onClick={() => handleRemoveImage(index)}
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
