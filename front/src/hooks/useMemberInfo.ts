import { useQuery } from "@tanstack/react-query";
import { getMemberInfo } from "../apis/Notification";

const useMemberInfo = () => {
  const {
    data: memberInfo,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["memberInfo"], queryFn: getMemberInfo });

  return { memberInfo, isLoading, isError, error };
};

export default useMemberInfo;
