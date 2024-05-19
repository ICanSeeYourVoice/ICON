import { api } from "./Base";

interface TokenProps {
  token: string | null;
  isApp: boolean;
}

// patch: 앱 토큰 등록
export const AppToken = async (token: TokenProps) => {
  try {
    const response = await api.patch("/common-service/members/fcmtoken", token);
    return response.data;
  } catch (error) {
    console.error("AppToken 개인 토큰 등록 실패: ", error);
    throw error;
  }
};

export const GetCheckToken = async () => {
  try {
    const response = await api.get("/common-service/members/fcmtoken");
    return response.data;
  } catch (error) {
    console.error("AppToken 개인 토큰 조회 실패: ", error);
    throw error;
  }
};
