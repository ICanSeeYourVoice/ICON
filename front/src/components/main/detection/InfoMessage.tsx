const InfoMessage = ({ text }: { text: string }) => {
  return (
    <div className="w-[80%] h-[6rem]">
      <div className="flex items-center justify-center bg-gradient-to-r from-linear-0 to-linear-100 rounded-[0.625rem] p-2">
        <div className="text-center text-white text-lg font-normal font-['NPSfont']">
          {text}
        </div>
      </div>
    </div>
  );
};

export default InfoMessage;
