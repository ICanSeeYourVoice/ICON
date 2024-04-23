import Logo from "../../assets/svgs/auth/Logo.svg";
import PostButton from "../../components/common/button/PostButton";
import { useNavigate } from "react-router";
import CommonInput from "../../components/common/Input/CommonInput";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/detection");
  };
  const handleJoinClick = () => {
    navigate("/join");
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center w-screen pt-[7rem] pb-[10rem] gap-[1rem] ">
      <img src={Logo} alt="Logo" className="mb-[1rem]" />
      <CommonInput
        placeholder="회원 ID"
        value={inputValue}
        onChange={handleInputChange}
      />
      <CommonInput
        placeholder="회원 ID"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className="flex gap-[0.5rem] text-[11px] justify-end w-[15.25rem]">
        <div onClick={handleJoinClick}>회원가입</div>
      </div>
      <PostButton label="로그인" onClick={handleButtonClick} />
    </div>
  );
};

export default LoginPage;
