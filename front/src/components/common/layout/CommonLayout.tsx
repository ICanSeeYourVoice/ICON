import { Outlet } from "react-router-dom";
import Nav from "../Navigator/Nav";

const CommonLayout = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center h-screen w-screen ">
      <header className="bg-white flex items-center justify-center text-primary h-[6rem] w-full text-2xl fixed">
        <p className="w-[80%]">{title}</p>
      </header>
      <main className="flex flex-col items-center justify-center w-full mt-[6rem]">
        <Outlet />
      </main>
      <Nav />
    </div>
  );
};

export default CommonLayout;
