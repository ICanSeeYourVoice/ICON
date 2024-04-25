import Nav from "../../../components/common/Navigator/Nav";
import TopBar from "../../../components/common/Navigator/TitleBar";

const RegisterMultiNotificationPage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] gap-[1.5rem] ">
      <TopBar text="알림 계정 등록" path="setting" />
      <main className="flex flex-col items-center justify-center w-full">
        RegisterMultiNotificationPage
      </main>
      <Nav />
    </div>
  );
};

export default RegisterMultiNotificationPage;
