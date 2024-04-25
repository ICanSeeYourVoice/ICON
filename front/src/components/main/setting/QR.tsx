import QRCode from "qrcode.react";

const QR = ({ data }: { data: object }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[12rem] h-[12rem] bg-white rounded-[0.875rem] border-4 border-primary border-opacity-40">
      <QRCode value={JSON.stringify(data)} size={146} fgColor="#393E46" />
    </div>
  );
};

export default QR;
