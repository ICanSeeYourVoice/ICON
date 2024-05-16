import { useState } from "react";
import SettingNavItem from "../../components/main/setting/SettingNavItem";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/user";

interface SettingNavItemProps {
  text: string;
  path: string;
}

const SettingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const settingNavList: SettingNavItemProps[] = [
    { text: "계정", path: "/setting/account" },
    { text: "알림 계정 등록", path: "/setting/share" },
    { text: "SmartThings", path: "/setting/things" },
    { text: "워치 연결", path: "/setting/ble" },
  ];

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    navigate(0);
    useUserStore.persist.clearStorage();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {settingNavList.map((item, index) => (
        <SettingNavItem key={index} text={item.text} path={item.path} />
      ))}
      <button className="flex justify-center items-center w-full h-[3.5rem]">
        <div
          onClick={handleLogout}
          className="flex justify-between items-center w-[80%] "
        >
          <p className="text-red-0">로그아웃</p>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
            <div className="bg-gray-100 rounded-[1rem] shadow-lg p-5 ">
              <div className="flex justify-center items-center mb-[1rem] text-sm p-2">
                정말로 로그아웃 하시겠습니까?
              </div>
              <div className="flex justify-center">
                <div className="w-[11rem] flex justify-between ">
                  <button
                    className="bg-primary text-white w-[5rem] py-1 rounded-[1rem] hover:bg-blue-400"
                    onClick={handleConfirmLogout}
                  >
                    확인
                  </button>
                  <button
                    className=" bg-gray-400 text-white w-[5rem] py-1  rounded-[1rem] hover:bg-gray-500"
                    onClick={() => setShowModal(false)}
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </button>
    </>
  );
};

export default SettingPage;
