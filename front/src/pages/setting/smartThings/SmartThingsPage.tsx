import { useMutation } from "@tanstack/react-query";
import { CheckRoutine } from "../../../apis/SmartThings";
import { PulseLoader } from "react-spinners";
import Nav from "../../../components/common/Navigator/Nav";
import TopBar from "../../../components/common/Navigator/TopBar";
import RegisterSmartThingsPage from "./RegisterSmartThingsPage";
import { useEffect, useState } from "react";
import SettingThingsPage from "./SettingThingsPage";

const SmartThingsPage = () => {
  const [isToken, setIsToken] = useState<boolean>();
  const [isLodding, setIsLodding] = useState(true);

  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate } = useMutation({
    mutationFn: CheckRoutine,
    onSuccess: (res) => {
      console.log("리스트 불러오기 성공(토큰 인증)", res);
      setIsToken(true);
    },
    onError: (error) => {
      console.log("리스트 불러오기 실패(토큰 미인증)", error);
      setIsToken(false);
    },
    onSettled: () => {
      setIsLodding(false);
    },
  });

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <TopBar text="SmartThings" path="setting" />
      <main className="flex flex-col items-center justify-center w-full flex-1">
        {isLodding ? (
          <div className="flex items-center justify-center w-full h-full">
            <PulseLoader color="#c8c8c8" />
          </div>
        ) : !isToken ? (
          <RegisterSmartThingsPage setIsToken={setIsToken} />
        ) : (
          <SettingThingsPage />
        )}
      </main>
      <Nav />
    </div>
  );
};

export default SmartThingsPage;
