import React from "react";
import Smile from "../../assets/svgs/record/smile.svg";

interface SmilePhotoLgProps {
  src?: string;
}

const SmilePhotoLg: React.FC<SmilePhotoLgProps> = ({ src }) => {
  const backgroundImage = `url(${src || Smile})`;

  return (
    <div
      className="w-[153px] h-[153px] bg-zinc-100 rounded-[14px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: backgroundImage }}
    />
  );
};

export default SmilePhotoLg;
