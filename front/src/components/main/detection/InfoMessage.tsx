const InfoMessage = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center w-[18.5625rem] h-[3.875rem] bg-gradient-to-r from-linear-0 to-linear-100 rounded-[0.625rem]">
      <div className="text-center text-white text-xl font-normal font-['NPSfont']">
        {text}
      </div>
    </div>
  );
};

export default InfoMessage;
