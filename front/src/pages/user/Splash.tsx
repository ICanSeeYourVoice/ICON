import Logo from "../../assets/svgs/auth/Logo.svg";
import PostButton from "../../components/common/button/PostButton";
import { useNavigate } from "react-router-dom";

const SplashPage = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className="flex flex-col items-center  pt-[13rem] gap-[1rem] tracking-wide">
      <div className="flex flex-col items-center w-screen  pb-[4rem] gap-[1rem] leading-10">
        <img src={Logo} alt="Logo" className="mb-[1rem]" />
        <div className="h-[6rem] text-center text-slate-400  font-bold ">
          AI와 스마트싱스 홈 카메라를 활용한 <br />
          청각 장애인 부모를 위한 아기 돌봄 보조 서비스
        </div>
      </div>
      <PostButton label="시작하기" onClick={handleLoginClick} />
    </div>
  );
};

export default SplashPage;
