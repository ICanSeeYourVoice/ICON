import { Outlet } from "react-router-dom";
const PoseLayout = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <header className="bg-white flex items-center text-primary h-[6rem] w-[80%] text-2xl fixed">
        자세 감지
      </header>
      <main className="flex flex-col items-center justify-center w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default PoseLayout;
