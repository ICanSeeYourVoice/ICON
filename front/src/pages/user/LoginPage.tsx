import Logo from "../../assets/svgs/auth/Logo.svg";
import PostButton from "../../components/common/button/PostButton";
import { useNavigate } from "react-router";
import CommonInput from "../../components/common/Input/CommonInput";
import PasswordInput from "../../components/common/Input/PasswordInput";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/detection");
  };
  const handleJoinClick = () => {
    navigate("/join");
  };

  const [inputIdValue, setInputIdValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIdValue(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPasswordValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center w-screen pt-[10rem] pb-[10rem] gap-[1rem] ">
      <img src={Logo} alt="Logo" className="mb-[1rem]" />
      <CommonInput
        placeholder="회원 ID"
        value={inputIdValue}
        onChange={handleIdChange}
      />
      <PasswordInput
        placeholder="비밀번호 입력"
        value={inputPasswordValue}
        onChange={handlePasswordChange}
      />
      <div className="flex gap-[0.5rem] text-[11px] justify-end w-[15.25rem]">
        <div onClick={handleJoinClick}>회원가입</div>
      </div>
      <PostButton label="로그인" onClick={handleButtonClick} />
    </div>
  );
};

export default LoginPage;
