import SmallButton from "../../../common/button/SmallButton";

const TokenInfo = () => {
  const handleOpenLink = () => {
    window.open("https://account.smartthings.com/tokens", "_blank");
  };
  return (
    <div className="flex flex-col items-start gap-[1rem] mt-[1rem] p-[1rem] w-[15.25rem] rounded-[0.875rem] bg-gray-2 text-xs">
      <div>개인 토큰 발급 방법: </div>
      <div>1. 토큰 발급 버튼을 클릭하여 삼성 계정에 로그인 합니다.</div>
      <div>2. 이용 약관에 동의합니다.</div>
      <div>3. ‘새 토큰 만들기’ 버튼을 클릭합니다.</div>
      <div>4. 토큰 이름을 설정하고 권한범위를 모두 선택해주세요.</div>
      <div>5. 토큰 복사를 클릭하고 개인 토큰 입력에 붙여넣기 해주세요.</div>
      <div className="flex flex-col w-full justify-center items-center">
        <SmallButton label="토큰 발급" onClick={handleOpenLink} />
      </div>
    </div>
  );
};

export default TokenInfo;
