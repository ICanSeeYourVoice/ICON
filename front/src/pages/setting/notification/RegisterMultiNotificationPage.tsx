import Nav from "../../../components/common/Navigator/Nav";
import TopBar from "../../../components/common/Navigator/TopBar";
import MoveButton from "../../../components/common/button/MoveButton";
import AccountItem from "../../../components/main/setting/AccountItem";
import QR from "../../../components/main/setting/QR";

const RegisterMultiNotificationPage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] gap-[1.5rem] ">
      <TopBar text="알림 계정 등록" path="setting" />
      <main className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center w-[15.25rem] gap-[2.3rem]">
          <div className="flex flex-col items-center justify-center w-full gap-4">
            <QR data={{ userId: "kimssafy" }} />
            <div className="flex flex-col items-center justify-center w-full text-gray-0 text-[0.875rem]">
              <p>추가 보호자를 등록해</p>
              <p>울음감지 동시 알림을 받아보세요</p>
            </div>
            <MoveButton text="QR코드 촬영하기" path="/setting/scan" />
          </div>

          <div className="flex flex-col items-start w-full gap-3">
            <p className="text-sub-0 text-[0.875rem]">보호자 목록</p>
            <div>
              <AccountItem name="김싸피" userId="kimssafy" />
              <AccountItem name="이싸피" userId="leessafy" />
            </div>
          </div>
        </div>
      </main>
      <Nav />
    </div>
  );
};

export default RegisterMultiNotificationPage;
