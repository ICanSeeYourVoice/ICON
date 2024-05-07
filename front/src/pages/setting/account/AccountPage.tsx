import Nav from "../../../components/common/Navigator/Nav";
import TopBar from "../../../components/common/Navigator/TopBar";
import { useTokenStore } from "../../../stores/notification";

const AccountPage = () => {
  const { token } = useTokenStore();

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <TopBar text="계정" path="setting" />
      <main className="flex flex-col items-center justify-center w-[80%] mt-[6rem]">
        <p className="flex flex-col items-center justify-center w-full break-all">
          {token}
        </p>
      </main>
      <Nav />
    </div>
  );
};

export default AccountPage;
