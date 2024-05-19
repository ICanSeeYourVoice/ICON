import { Outlet } from "react-router-dom";
import Nav from "../Navigator/Nav";
import { useLoading } from "../../../stores/detection";
import { PulseLoader } from "react-spinners";
import SettingButton from "../../main/detection/SettingButton";

const DarkCommonLayout = ({ title }: { title: string }) => {
  const isLoading = useLoading((state) => state.isLoading);

  return (
    <div>
      {isLoading && (
        <div className="flex items-center justify-center bg-gray-800 bg-opacity-50 fixed inset-0 z-10">
          <PulseLoader color="#ffff" />
        </div>
      )}
      <div className="flex flex-col items-center bg-dark h-screen w-screen">
        <header className="bg-dark flex items-center justify-center text-primary h-[6rem] w-full text-2xl fixed">
          <SettingButton />
          <p className="w-[80%]">{title}</p>
        </header>
        <main className="flex flex-col items-center justify-center w-full h-full mt-[6rem]">
          <Outlet />
        </main>
        <Nav />
      </div>
    </div>
  );
};

export default DarkCommonLayout;
