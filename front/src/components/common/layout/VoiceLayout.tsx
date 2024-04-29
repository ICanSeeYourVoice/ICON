import { Outlet } from "react-router-dom";
const RecordLayout = () => {
  return (
    <div className="flex flex-col items-center w-screen pt-[3.125rem] gap-[4.5rem]  ">
      <header className="text-primary w-[15.25rem] text-2xl ">TTS</header>
      <main className="flex flex-col items-center justify-center w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default RecordLayout;
