import { Outlet } from "react-router-dom";
const RecordLayout = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen ">
      <header className="bg-white flex items-center justify-center text-primary h-[6rem] w-full text-2xl fixed z-10">
        <p className="w-[80%]">음성 변환</p>
      </header>
      <main className="flex flex-col items-center justify-center w-full mt-[6rem]">
        <Outlet />
      </main>
    </div>
  );
};

export default RecordLayout;
