import { useMutation, useQueryClient } from "@tanstack/react-query";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createGuardian } from "../../../apis/Notification";
import TopBar from "../../../components/common/Navigator/TopBar";

const QRScanPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isScanned, setIsScanned] = useState(false);
  const [data, setData] = useState<{
    id: number;
    uid: string;
  } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const QrOptions = {
    preferredCamera: "environment",
    maxScansPerSecond: 5,
    highlightScanRegion: true,
  };

  const handleQRCodeScan = (result: QrScanner.ScanResult) => {
    const parsedData = JSON.parse(result.data);

    setData({
      id: parsedData.id,
      uid: parsedData.uid,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createGuardian,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guardianList"] });
      toast.success(`${data?.uid}를 보호자 목록에 추가하였습니다.`);
      setTimeout(() => {
        toast.dismiss();
      }, 1500);
    },
    onError: (error: any) => {
      if (error.response.status === 400) {
        toast.error("이미 등록된 보호자입니다");
      } else {
        toast.error(error.message);
      }
    },
  });

  useEffect(() => {
    const videoElem = videoRef.current;
    if (videoElem) {
      const qrScanner = new QrScanner(
        videoElem,
        (result) => handleQRCodeScan(result),
        QrOptions
      );
      qrScanner.start();

      return () => qrScanner.destroy();
    }
  }, []);

  useEffect(() => {
    if (data?.uid && !isScanned) {
      setIsScanned(true);

      toast(
        (t) => (
          <div className="flex flex-col items-center justify-center w-full">
            <p>{data.uid}(을)를 보호자로 등록하시겠습니까?</p>
            <hr />
            <div className="mt-4 flex w-full justify-end text-white">
              <button
                className="bg-gray-1 py-2 px-4 rounded mr-[0.4rem]"
                onClick={() => {
                  toast.dismiss(t.id);
                  setIsScanned(false);
                }}
              >
                취소
              </button>
              <button
                className="bg-primary py-2 px-4 rounded mr-2"
                onClick={() => {
                  mutate({ id: data.id });
                  setData(null);
                  navigate("/setting/share");
                  toast.dismiss(t.id);
                }}
              >
                확인
              </button>
            </div>
          </div>
        ),
        { duration: Infinity }
      );
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <TopBar text="QR코드 촬영" path="setting/share" />
      <main>
        <video
          className="w-screen h-screen"
          style={{ transform: "scaleX(-1)" }}
          ref={videoRef}
        />
      </main>
    </div>
  );
};

export default QRScanPage;
