import Nav from "../../../components/common/Navigator/Nav";
import TopBar from "../../../components/common/Navigator/TopBar";
import { useTokenStore } from "../../../stores/notification";

const AccountPage = () => {
  const { token } = useTokenStore();

  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] gap-[1.5rem] ">
      <TopBar text="계정" path="setting" />
      <main className="flex flex-col items-center justify-center w-full">
        <p className="flex flex-col items-center justify-center w-[15.25rem] break-all">
          {token}
        </p>
      </main>
      <Nav />
    </div>
  );
};

export default AccountPage;
