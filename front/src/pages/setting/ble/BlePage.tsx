import Nav from "../../../components/common/Navigator/Nav";
import TopBar from "../../../components/common/Navigator/TopBar";
import BleConnect from "./BleConnect";

const BlePage = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <TopBar text="워치 연결" path="setting" />
      <main className="flex flex-col items-center justify-center w-full flex-1">
        <BleConnect />
      </main>
      <Nav />
    </div>
  );
};
export default BlePage;
