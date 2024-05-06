import { Outlet } from "react-router-dom";
import Nav from "../Navigator/Nav";

const DarkCommonLayout = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center bg-dark h-screen w-screen">
      <header className=" flex items-center bg-dark text-primary h-[6rem] w-[80%] text-2xl fixed">
        {title}
      </header>
      <main className="flex flex-col items-center justify-center w-full h-full mt-[6rem]">
        <Outlet />
      </main>
      <Nav />
    </div>
  );
};

export default DarkCommonLayout;
