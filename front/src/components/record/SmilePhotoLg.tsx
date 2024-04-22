import React from "react";
import Smile from "../../assets/svgs/record/smile.svg";

interface SmilePhotoLgProps {
  src?: string;
}

const SmilePhotoLg: React.FC<SmilePhotoLgProps> = ({ src }) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${src || Smile})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      className="w-[153px] h-[153px] bg-zinc-100 rounded-[14px]"
      style={backgroundImageStyle}
    />
  );
};

export default SmilePhotoLg;
