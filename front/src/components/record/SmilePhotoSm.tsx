import React from "react";
import Smile from "../../assets/svgs/record/smile.svg";

interface SmilePhotoLgProps {
  src?: string;
}

const SmilePhotoLg: React.FC<SmilePhotoLgProps> = ({ src }) => {
  const backgroundImage = `url(${src || Smile})`;

  return (
    <div
      className="w-[73px] h-[73px] bg-zinc-100 rounded-[10px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage }}
    />
  );
};

export default SmilePhotoLg;
