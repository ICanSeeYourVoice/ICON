import LabelInput from "../../components/common/Input/LabelInput";
import PasswordInput from "../../components/common/Input/PasswordInput";
import TopBar from "../../components/common/Navigator/TopBar";
import PostButton from "../../components/common/button/PostButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userJoin } from "../../apis/User";
import toast from "react-hot-toast";

const JoinPage = () => {
  const [nameValue, setNameValue] = useState("");
  const [idValue, setIdValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordCorValue, setPasswordCorValueValue] = useState("");

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: userJoin,
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다.\n로그인해주세요!");
      navigate("/login");
    },
    onError: () => {
      toast.error("아이디와 비밀번호를 확인해주세요");
    },
  });
  const handleConfirmClick = () => {
    if (nameValue && idValue && passwordValue) {
      if (passwordValue === passwordCorValue) {
        mutate({
          uid: idValue,
          pw: passwordValue,
          name: nameValue,
        });
      } else {
        toast.error("비밀번호를 다시 확인해 주세요!");
      }
    } else {
      toast.error("모든 정보를 입력해주세요!");
    }
  };

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const idChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(e.target.value);
  };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const passwordCorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCorValueValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] gap-[1.5rem]">
      <TopBar text="회원 가입" />
      <div className="flex flex-col items-center gap-[1.6rem] mt-10">
        <LabelInput
          label="이름"
          placeholder="이름"
          value={nameValue}
          onChange={nameChange}
        />
        <LabelInput
          label="아이디"
          placeholder="아이디"
          value={idValue}
          onChange={idChange}
        />
        <PasswordInput
          placeholder="비밀번호"
          label="비밀번호"
          onChange={passwordChange}
          value={passwordValue}
        />
        <PasswordInput
          placeholder="비밀번호 확인"
          label="비밀번호 확인"
          onChange={passwordCorChange}
          value={passwordCorValue}
        />
        <div className="mt-14">
          <PostButton label="확인" onClick={handleConfirmClick} />
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
