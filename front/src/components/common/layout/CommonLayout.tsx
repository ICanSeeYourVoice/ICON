import { Outlet } from "react-router-dom";
import Nav from "../Navigator/Nav";

const CommonLayout = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] gap-[1.5rem] ">
      <header className="text-primary w-[15.25rem] text-2xl">{title}</header>
      <main className="flex flex-col items-center justify-center w-full">
        <Outlet />
      </main>
      <Nav />
    </div>
  );
};

export default CommonLayout;
