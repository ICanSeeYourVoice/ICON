import React from "react";
import Smile from "../../../assets/svgs/record/smile.svg";

interface SmilePhotoLgProps {
  src?: string;
}

const SmilePhotoLg: React.FC<SmilePhotoLgProps> = ({ src }) => {
  const backgroundImage = `url(${src || Smile})`;

  return (
    <div
      className="w-[10rem] h-[10rem] bg-zinc-100 rounded-[0.625rem] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: backgroundImage }}
    />
  );
};

export default SmilePhotoLg;
