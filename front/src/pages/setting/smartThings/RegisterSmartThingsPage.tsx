import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import LabelInput from "../../../components/common/Input/LabelInput";
import Button from "../../../components/common/button/PostButton";
import TokenInfo from "../../../components/main/setting/smartthings/TokenInfo";
import { RegisterToken } from "../../../apis/SmartThings";
import toast from "react-hot-toast";

interface RegisterSmartThingsPageProps {
  setIsToken: (isToken: boolean) => void;
}

const RegisterSmartThingsPage: React.FC<RegisterSmartThingsPageProps> = ({
  setIsToken,
}) => {
  const [smartthingsToken, setSmartthingsToken] = useState("");

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSmartthingsToken(e.target.value);
  };

  const handleRegisterToken = () => {
    if (smartthingsToken != "" && smartthingsToken.length > 10) {
      mutate({ token: smartthingsToken });
    } else {
      toast.error("스마트싱스 개인 토큰을 정확히 입력해주세요.");
    }
  };

  const { mutate } = useMutation({
    mutationFn: RegisterToken,
    onSuccess: () => {
      setIsToken(true);
      toast.success("스마트싱스 토큰 등록 성공", { duration: 800 });
    },
    onError: (error) => {
      toast.error("스마트싱스 접근 권한이 없습니다.", { duration: 800 });
      console.log("스마트싱스 접근 권한이 없습니다.", error);
    },
  });

  return (
    <div className="flex flex-col items-center mb-[1rem] gap-[1rem]">
      <LabelInput
        placeholder="토큰 입력"
        onChange={handleTokenChange}
        label="개인 토큰"
      />
      <TokenInfo />
      <Button label="등록하기" onClick={handleRegisterToken} />
    </div>
  );
};

export default RegisterSmartThingsPage;
