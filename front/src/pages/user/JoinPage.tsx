import LabelInput from "../../components/common/Input/LabelInput";
import PasswordInput from "../../components/common/Input/PasswordInput";
import TopBar from "../../components/common/Navigator/TopBar";
import PostButton from "../../components/common/button/PostButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userJoin } from "../../apis/User";
import toast from "react-hot-toast";
import {
  ID_INFO,
  NAME_INFO,
  NAME_REG,
  PASS_INFO,
  PASS_REG,
  REPASS_INFO,
} from "../../constants/join";
import { AxiosError } from "axios";

interface ErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

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
      navigate("/login", { replace: true });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response && error.response.data) {
        toast.error(error.response.data.detail, { duration: 1000 });
      } else {
        toast.error("아이디와 비밀번호를 확인해주세요", { duration: 1000 });
      }
    },
  });

  const handleConfirmClick = () => {
    if (nameValue && idValue && passwordValue) {
      if (!NAME_REG.test(nameValue)) {
        return toast.error(NAME_INFO, { duration: 800 });
      } else if (idValue.length < 5 || idValue.length > 12) {
        return toast.error(ID_INFO, { duration: 800 });
      } else if (!PASS_REG.test(passwordValue)) {
        return toast.error(PASS_INFO, { duration: 800 });
      } else if (passwordValue !== passwordCorValue) {
        return toast.error(REPASS_INFO, { duration: 800 });
      } else {
        mutate({
          uid: idValue,
          pw: passwordValue,
          name: nameValue,
        });
      }
    } else {
      return toast.error("모든 정보를 입력해주세요!", { duration: 800 });
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
    <div className="flex flex-col items-center h-screen w-screen">
      <TopBar text="회원 가입" />
      <main className="flex flex-col items-center justify-between w-[80%] h-full mt-[6rem]">
        <div className="grid gap-[1rem] mt-[1.5rem]">
          <LabelInput
            label="이름"
            placeholder="이름"
            value={nameValue}
            onChange={nameChange}
          />
          <div className="text-stone-400 text-xs whitespace-pre">
            {!NAME_REG.test(nameValue) ? NAME_INFO : <br />}
          </div>
          <LabelInput
            label="아이디"
            placeholder="아이디"
            value={idValue}
            onChange={idChange}
          />
          <div className="text-stone-400 text-xs whitespace-pre">
            {idValue.length < 5 || idValue.length > 12 ? ID_INFO : <br />}
          </div>
          <PasswordInput
            placeholder="비밀번호"
            label="비밀번호"
            onChange={passwordChange}
            value={passwordValue}
          />
          <div className="text-stone-400 text-xs whitespace-pre">
            {!PASS_REG.test(passwordValue) ? PASS_INFO : <br />}
          </div>
          <PasswordInput
            placeholder="비밀번호 확인"
            label="비밀번호 확인"
            onChange={passwordCorChange}
            value={passwordCorValue}
          />
          <div className="text-stone-400 text-xs whitespace-pre">
            {passwordValue != passwordCorValue ? REPASS_INFO : <br />}
          </div>
        </div>
        <div className="mb-[3rem]">
          <PostButton label="확인" onClick={handleConfirmClick} />
        </div>
      </main>
    </div>
  );
};

export default JoinPage;
