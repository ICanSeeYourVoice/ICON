import { Outlet } from "react-router-dom";
import Nav from "../Navigator/Nav";

const CommonLayout = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center h-screen w-screen ">
      <header className="bg-white flex items-center text-primary h-[6rem] w-[80%] text-2xl fixed">
        {title}
      </header>
      <main className="flex flex-col items-center justify-center w-full mt-[6rem]">
        <Outlet />
      </main>
      <Nav />
    </div>
  );
};

export default CommonLayout;
