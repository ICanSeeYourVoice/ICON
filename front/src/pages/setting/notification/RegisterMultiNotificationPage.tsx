import { useQuery } from "@tanstack/react-query";
import Nav from "../../../components/common/Navigator/Nav";
import TopBar from "../../../components/common/Navigator/TopBar";
import MoveButton from "../../../components/common/button/MoveButton";
import AccountItem from "../../../components/main/setting/AccountItem";
import QR from "../../../components/main/setting/QR";
import { getGuardianList } from "../../../apis/Notification";
import useMemberInfo from "../../../hooks/useMemberInfo";

interface GuardianProps {
  id: number;
  name: string;
  uid: string;
}

const RegisterMultiNotificationPage = () => {
  const { memberInfo } = useMemberInfo();

  const { data: guardianList } = useQuery({
    queryKey: ["guardianList"],
    queryFn: getGuardianList,
  });

  return (
    <div className="flex flex-col items-center h-screen w-screen pt-[3.125rem] pb-[10.3125rem] gap-[1.5rem] ">
      <TopBar text="알림 계정 등록" path="setting" />
      <main className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center w-[15.25rem] gap-[2.3rem]">
          <div className="flex flex-col items-center justify-center w-full gap-4">
            <QR
              data={{
                id: (memberInfo as MemberInfoProps)?.id,
                uid: (memberInfo as MemberInfoProps)?.uid,
              }}
            />
            <div className="flex flex-col items-center justify-center w-full text-gray-0 text-[0.875rem]">
              <p>추가 보호자를 등록해</p>
              <p>울음감지 동시 알림을 받아보세요</p>
            </div>
            <MoveButton text="QR코드 촬영하기" path="/setting/scan" />
          </div>

          <div className="flex flex-col items-start w-full gap-3">
            <p className="text-sub-0 text-[0.875rem]">보호자 목록</p>
            <div>
              {guardianList &&
              Array.isArray(guardianList) &&
              guardianList.length > 0 ? (
                guardianList.map((guardian: GuardianProps) => (
                  <AccountItem
                    key={guardian.id}
                    id={guardian.id}
                    name={guardian.name}
                    userId={guardian.uid}
                  />
                ))
              ) : (
                <p className="text-[0.875rem] text-gray-0">
                  보호자를 등록해주세요.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Nav />
    </div>
  );
};

export default RegisterMultiNotificationPage;
