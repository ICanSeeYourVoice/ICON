import { Outlet } from "react-router-dom";
import Nav from "../Navigator/Nav";

const DarkCommonLayout = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center bg-dark h-screen w-screen">
      <header className="bg-dark flex items-center justify-center text-primary h-[6rem] w-full text-2xl fixed">
        <p className="w-[80%]">{title}</p>
      </header>
      <main className="flex flex-col items-center justify-center w-full h-full mt-[6rem]">
        <Outlet />
      </main>
      <Nav />
    </div>
  );
};

export default DarkCommonLayout;
