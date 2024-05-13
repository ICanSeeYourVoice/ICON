import Nav from "../../../components/common/Navigator/Nav";
import TopBar from "../../../components/common/Navigator/TopBar";
import useMemberInfo from "../../../hooks/useMemberInfo";

const DisabledInput = ({
  type,
  label,
  value,
}: {
  type: string;
  label: string;
  value: string;
}) => {
  return (
    <div>
      <div className="text-black text-sm mb-2">{label}</div>
      <div
        className="w-[16rem] h-[3rem] relative flex-col justify-start 
        items-start inline-flex  border rounded-[1rem] border-gray-300"
      >
        <input
          type={type}
          value={value}
          className="w-full h-full rounded-[1rem] bg-white text-gray-0 text-sm p-4"
          disabled
        />
      </div>
    </div>
  );
};

const AccountPage = () => {
  const { memberInfo } = useMemberInfo();

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <TopBar text="계정" path="setting" />
      <main className="flex flex-col items-center justify-center w-[80%] mt-[6rem] gap-5">
        <DisabledInput
          type="text"
          value={(memberInfo as MemberInfoProps).name}
          label="이름"
        />
        <DisabledInput
          type="text"
          value={(memberInfo as MemberInfoProps).uid}
          label="아이디"
        />
        <DisabledInput type="password" value="******" label="비밀번호" />
      </main>
      <Nav />
    </div>
  );
};

export default AccountPage;
