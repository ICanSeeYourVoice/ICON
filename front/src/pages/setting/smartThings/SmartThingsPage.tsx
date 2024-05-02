import { useMutation } from "@tanstack/react-query";
import { CheckRoutine } from "../../../apis/SmartThings";
import Nav from "../../../components/common/Navigator/Nav";
import TopBar from "../../../components/common/Navigator/TopBar";
import RegisterSmartThingsPage from "./RegisterSmartThingsPage";
import { useEffect, useState } from "react";

const SmartThingsPage = () => {
  const [isToken, setIsToken] = useState<boolean>();

  useEffect(() => {
    mutate();
  }, []);

  const { mutate } = useMutation({
    mutationFn: CheckRoutine,
    onSuccess: (res) => {
      console.log("리스트 불러오기 성공", res);
      setIsToken(true);
    },
    onError: (error) => {
      console.log("리스트 불러오기 실패", error);
      setIsToken(false);
    },
  });

  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] gap-[1.5rem] ">
      <TopBar text="SmartThings" path="setting" />
      <main className="flex flex-col items-center justify-center w-full">
        {!isToken && <RegisterSmartThingsPage setIsToken={setIsToken} />}
        {isToken && <div>토큰있어요</div>}
      </main>
      <Nav />
    </div>
  );
};

export default SmartThingsPage;
